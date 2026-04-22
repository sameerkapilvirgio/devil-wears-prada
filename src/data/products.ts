export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "miranda",
    name: "Miranda",
    description: "Structured Power Blazer Dress",
    price: "₹4,999",
    badge: "DEVIL",
  },
  {
    id: "cerulean",
    name: "Cerulean",
    description: "Blue Wrap Silk Midi",
    price: "₹3,499",
    badge: "DEVIL",
  },
  {
    id: "runway",
    name: "Runway",
    description: "Tailored Column Gown",
    price: "₹3,999",
  },
  {
    id: "andrea",
    name: "Andrea",
    description: "Pleated Chiffon Skirt Set",
    price: "₹1,999",
  },
  {
    id: "priestly",
    name: "Priestly",
    description: "Draped Satin Evening Dress",
    price: "₹4,499",
    badge: "DEVIL",
  },
  {
    id: "emily",
    name: "Emily",
    description: "Bodycon Knit Mini Dress",
    price: "₹2,499",
  },
  {
    id: "jacqueline",
    name: "Jacqueline",
    description: "Off-Shoulder Organza Top",
    price: "₹2,999",
  },
  {
    id: "lily",
    name: "Lily",
    description: "Sequin Slip Dress",
    price: "₹3,799",
    badge: "DEVIL",
  },
  {
    id: "serena",
    name: "Serena",
    description: "High-Waist Wide Leg Trousers",
    price: "₹2,199",
  },
  {
    id: "valentina",
    name: "Valentina",
    description: "Velvet Corset Maxi Dress",
    price: "₹4,299",
  },
  {
    id: "nadia",
    name: "Nadia",
    description: "Cropped Tweed Jacket",
    price: "₹3,299",
  },
  {
    id: "charlotte",
    name: "Charlotte",
    description: "Tulle A-Line Skirt",
    price: "₹3,999",
    badge: "DEVIL",
  },
];
