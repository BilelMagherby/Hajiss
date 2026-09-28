export const products = [
  { id: "caramel", name: "سيروب إنترزو كراميل", detail: "750 مل · نكهة غنية", price: 41.98, image: "photo-1517701604599-bb29b565090c" },
  { id: "vanilla", name: "سيروب إنترزو فانيليا", detail: "750 مل · فانيليا طبيعية", price: 41.98, image: "photo-1495474472287-4d71bcdd2085" },
  { id: "hazelnut", name: "سيروب إنترزو بندق", detail: "750 مل · بندق محمص", price: 41.98, image: "photo-1442512595331-e89e73853f31" },
  { id: "white-chocolate", name: "صوص شوكولاتة بيضاء", detail: "500 غ · قوام كريمي", price: 34.5, image: "photo-1511920170033-f8396924c348" },
  { id: "arabica", name: "حبوب أرابيكا مختارة", detail: "250 غ · تحميص متوسط", price: 56, image: "photo-1447933601403-0c6688de566e" },
  { id: "blend", name: "خلطة هاجس اليومية", detail: "250 غ · متوازنة وغنية", price: 48, image: "photo-1447933601403-0c6688de566e" },
];

export type CartItem = { id: string; quantity: number };
export const cartStorageKey = "hajiss-cart";
export const photoUrl = (id: string, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
