"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { Compass, LocateFixed, RotateCcw, Satellite, Mountain, Building2, Minus, Plus, Map, Globe2, Phone, ExternalLink, Share2, Clock3 } from "lucide-react";

// FPX5+2X is a short Plus Code. Resolved against Hail, it corresponds to the
// full code 7HR3FPX5+2X and is the precise location supplied by the user.
const LNG = 41.7099375;
const LAT = 27.5975625;
const PLUS_CODE = "FPX5+2X, Hail, Saudi Arabia";
const ADDRESS = "Al Samra, 6469 Audayra, Hail 55425, Saudi Arabia";
const PHONE = "+966555486151";
const WEBSITE = "https://www.natheelco.com/";

export default function HailMapInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [terrain, setTerrain] = useState(true);
  const [buildings, setBuildings] = useState(true);
  const [bearing, setBearing] = useState(0);
  const [baseLayer, setBaseLayer] = useState<"satellite" | "street">("satellite");
  const [camera, setCamera] = useState<"3d" | "2d">("3d");
  const [mapMessage, setMapMessage] = useState("");

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: {
          imagery: {
            type: "raster",
            tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
            tileSize: 256,
            attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
            maxzoom: 19,
          },
          labels: {
            type: "raster",
            tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"],
            tileSize: 256,
            maxzoom: 19,
          },
          streetTiles: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
            maxzoom: 19,
          },
          terrainDem: {
            type: "raster-dem",
            tiles: ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],
            tileSize: 256,
            encoding: "terrarium",
            maxzoom: 15,
          },
          openfreemap: {
            type: "vector",
            url: "https://tiles.openfreemap.org/planet",
          },
        },
        layers: [
          { id: "satellite", type: "raster", source: "imagery" },
          { id: "place-labels", type: "raster", source: "labels", paint: { "raster-opacity": 0.88 } },
          { id: "street-map", type: "raster", source: "streetTiles", layout: { visibility: "none" } },
        ],
        terrain: { source: "terrainDem", exaggeration: 1.35 },
        sky: {},
      },
      center: [LNG, LAT],
      zoom: 15.7,
      pitch: 68,
      bearing: -18,
      minZoom: 2,
      maxZoom: 20,
      maxPitch: 85,
      dragPan: true,
      dragRotate: true,
      scrollZoom: true,
      touchZoomRotate: true,
      keyboard: true,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false, visualizePitch: true }), "top-right");
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 110, unit: "metric" }), "bottom-right");

    let settled = false;
    const readyTimer = window.setTimeout(() => {
      if (settled) return;
      // Keep the address and controls usable even when an external tile source
      // is slow; MapLibre can continue drawing tiles after this fallback.
      setLoaded(true);
      setMapMessage("Satellite layers are taking longer to load. You can still explore the map.");
    }, 9000);

    map.on("error", (event) => {
      console.warn("Map layer could not be loaded:", event.error);
      setMapMessage("Some map layers are temporarily unavailable. The map controls are still active.");
    });

    map.on("load", () => {
      settled = true;
      window.clearTimeout(readyTimer);
      setMapMessage("");
      // Show the controls as soon as the base map is ready. Optional 3D data
      // should never keep the entire map UI behind its loading screen.
      setLoaded(true);
      // OpenFreeMap's OSM building footprints add real extruded geometry above
      // the satellite imagery where building height data is available.
      if (map.getSource("openfreemap") && !map.getLayer("hail-3d-buildings")) {
        try {
          map.addLayer({
            id: "hail-3d-buildings",
            source: "openfreemap",
            "source-layer": "building",
            type: "fill-extrusion",
            minzoom: 14,
            filter: ["!", ["==", ["get", "hide_3d"], true]],
            paint: {
              "fill-extrusion-color": ["interpolate", ["linear"], ["coalesce", ["get", "render_height"], ["get", "height"], 8], 0, "#c8a978", 35, "#f0c987", 90, "#fff0d0"],
              "fill-extrusion-height": ["coalesce", ["get", "render_height"], ["get", "height"], 5],
              "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], ["get", "min_height"], 0],
              "fill-extrusion-opacity": 0.84,
              "fill-extrusion-vertical-gradient": true,
            },
          });
        } catch (error) {
          console.warn("3D building layer could not be initialized:", error);
          setBuildings(false);
        }
      }

      const marker = document.createElement("div");
      marker.className = "hail-location-marker";
      marker.setAttribute("aria-label", "Al Samra location marker");
      marker.innerHTML = '<span class="hail-location-marker__pulse"></span><svg class="hail-location-marker__pin" viewBox="0 0 48 62" aria-hidden="true"><path class="hail-location-marker__shape" d="M24 60S5 37 5 23A19 19 0 1 1 43 23C43 37 24 60 24 60Z"/><circle cx="24" cy="23" r="9.5" fill="#102027"/><path d="M24 17v12M18 23h12" fill="none" stroke="#f4dfb8" stroke-width="2" stroke-linecap="round"/></svg>';
      const popup = new maplibregl.Popup({ offset: 25, closeButton: false, closeOnClick: false, className: "hail-map-popup" })
        .setHTML(`<div class="hail-map-popup__eyebrow">NATHEEL · HAIL</div><div class="hail-map-popup__title">Al Samra</div><div class="hail-map-popup__address">${ADDRESS}</div>`);
      new maplibregl.Marker({ element: marker, anchor: "bottom" }).setLngLat([LNG, LAT]).setPopup(popup).addTo(map).togglePopup();
      setLoaded(true);
    });

    map.on("rotate", () => setBearing(map.getBearing()));
    return () => { window.clearTimeout(readyTimer); map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!loaded || !map?.isStyleLoaded() || !map.getLayer("street-map")) return;
    map.setLayoutProperty("street-map", "visibility", baseLayer === "street" ? "visible" : "none");
    map.setLayoutProperty("satellite", "visibility", baseLayer === "satellite" ? "visible" : "none");
    map.setLayoutProperty("place-labels", "visibility", baseLayer === "satellite" ? "visible" : "none");
  }, [baseLayer, loaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!loaded || !map?.isStyleLoaded()) return;
    map.setTerrain(terrain ? { source: "terrainDem", exaggeration: 1.35 } : null);
  }, [terrain, loaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!loaded || !map?.isStyleLoaded() || !map.getLayer("hail-3d-buildings")) return;
    map.setLayoutProperty("hail-3d-buildings", "visibility", buildings ? "visible" : "none");
  }, [buildings, loaded]);

  const focusAddress = useCallback(() => {
    const map = mapRef.current;
    setCamera("3d");
    setTerrain(true);
    map?.flyTo({ center: [LNG, LAT], zoom: 17.2, pitch: 68, bearing: -18, duration: 1600, essential: true });
  }, []);
  const resetNorth = useCallback(() => mapRef.current?.easeTo({ bearing: 0, duration: 700 }), []);
  const changeCamera = useCallback((mode: "2d" | "3d") => {
    setCamera(mode);
    mapRef.current?.easeTo({ pitch: mode === "3d" ? 68 : 0, bearing: mode === "3d" ? -18 : 0, duration: 850 });
    if (mode === "2d") setTerrain(false);
  }, []);
  const shareLocation = useCallback(async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PLUS_CODE)}`;
    try {
      await navigator.clipboard.writeText(url);
      setMapMessage("Google Maps location link copied.");
      window.setTimeout(() => setMapMessage(""), 2600);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <div className="hail-map-shell">
      <div ref={containerRef} className="hail-map-canvas" aria-label="Interactive 3D satellite map of Al Samra, Hail" />
      <div className="hail-map-vignette" aria-hidden="true" />

      <aside className="hail-map-card" aria-label="Map controls and location information">
        <div className="hail-map-card__topline"><span className="hail-map-live"><i /> LIVE MAP</span><span className="hail-map-card__index">01 / HAIL</span></div>
        <div className="hail-map-place">
          <div className="hail-map-place__icon"><LocateFixed size={19} strokeWidth={1.7} /></div>
          <div><div className="hail-map-place__eyebrow">NATHEEL · OUR LOCATION</div><h2>Al Samra<span>حائل · Hail</span></h2></div>
        </div>
        <p className="hail-map-address">{ADDRESS}</p>
        <div className="hail-map-pluscode"><Map size={13} /><span>{PLUS_CODE}</span></div>
        <div className="hail-map-business"><span><i /> Closed · Opens at 09:00</span><Clock3 size={13} /></div>
        <div className="hail-map-contact">
          <a href={WEBSITE} target="_blank" rel="noreferrer"><Globe2 size={14} /> Website <ExternalLink size={11} /></a>
          <a href={`tel:${PHONE}`}><Phone size={14} /> Call <span>+966 55 548 6151</span></a>
        </div>
        <div className="hail-map-divider" />
        <div className="hail-map-tools-title">MAP STYLE <span>01 / 02</span></div>
        <div className="hail-map-segment" role="group" aria-label="Map base layer">
          <button className={baseLayer === "satellite" ? "is-active" : ""} onClick={() => setBaseLayer("satellite")} aria-pressed={baseLayer === "satellite"}><Satellite size={14} /> Satellite</button>
          <button className={baseLayer === "street" ? "is-active" : ""} onClick={() => setBaseLayer("street")} aria-pressed={baseLayer === "street"}><Map size={14} /> Street</button>
        </div>
        <div className="hail-map-tools-title hail-map-tools-title--layers">3D LAYERS <span>02</span></div>
        <button className={`hail-map-layer ${terrain ? "is-on" : ""}`} onClick={() => setTerrain((v) => !v)} aria-pressed={terrain}>
          <span className="hail-map-layer__icon"><Mountain size={16} /></span><span className="hail-map-layer__copy"><b>Terrain relief</b><small>Elevation &amp; contours</small></span><span className="hail-map-switch" />
        </button>
        <button className={`hail-map-layer ${buildings ? "is-on" : ""}`} onClick={() => setBuildings((v) => !v)} aria-pressed={buildings}>
          <span className="hail-map-layer__icon"><Building2 size={16} /></span><span className="hail-map-layer__copy"><b>3D buildings</b><small>Extruded city forms</small></span><span className="hail-map-switch" />
        </button>
        <div className="hail-map-divider" />
        <div className="hail-map-tools-title">CAMERA <span>FREE ORBIT</span></div>
        <div className="hail-map-segment hail-map-segment--camera" role="group" aria-label="Camera perspective">
          <button className={camera === "3d" ? "is-active" : ""} onClick={() => changeCamera("3d")} aria-pressed={camera === "3d"}>3D Orbit</button>
          <button className={camera === "2d" ? "is-active" : ""} onClick={() => changeCamera("2d")} aria-pressed={camera === "2d"}>2D Flat</button>
        </div>
        <div className="hail-map-instructions"><span className="hail-map-mouse-icon"><i /></span><span><b>Explore in 3D</b><small>Drag to pan · right-drag to rotate<br />Scroll to zoom · Ctrl + drag to tilt</small></span></div>
        <button className="hail-map-reset" onClick={focusAddress}><LocateFixed size={15} /> FOCUS LOCATION <span>↗</span></button>
        <div className="hail-map-actions">
          <a className="hail-map-directions" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PLUS_CODE)}`} target="_blank" rel="noreferrer">DIRECTIONS <span>↗</span></a>
          <button className="hail-map-share" onClick={shareLocation}><Share2 size={13} /> SHARE</button>
        </div>
      </aside>

      <div className="hail-map-coordinates"><span>27°35′51″N</span><i /> <span>41°42′36″E</span></div>
      <div className="hail-map-compass" aria-label={`Map bearing ${Math.round(bearing)} degrees`}><Compass size={17} style={{ transform: `rotate(${-bearing}deg)` }} /><span>N</span></div>
      <div className="hail-map-toolbar" aria-label="Map view controls">
        <button onClick={() => mapRef.current?.zoomIn({ duration: 250 })} aria-label="Zoom in"><Plus size={17} /></button>
        <button onClick={() => mapRef.current?.zoomOut({ duration: 250 })} aria-label="Zoom out"><Minus size={17} /></button>
        <span />
        <button onClick={resetNorth} aria-label="Reset map orientation"><RotateCcw size={16} /></button>
        <button onClick={focusAddress} aria-label="Focus Al Samra"><Satellite size={16} /></button>
      </div>
      {!loaded && <div className="hail-map-loading"><div className="hail-map-loading__orbit"><span /></div><p>LOADING SATELLITE TERRAIN</p><span>HAIL · SAUDI ARABIA</span></div>}
      {mapMessage && loaded && <div className="hail-map-status" role="status">{mapMessage}</div>}
      <div className="hail-map-attribution">IMAGERY © ESRI <i /> © OPENSTREETMAP <i /> 3D DATA © OPENFREEMAP</div>
    </div>
  );
}
