interface Product {
  id: string|number;
  name: string;
  description: string;
  subtitle: string;
  price: number;
}

interface Checkout {
  shipping_fee: number;
  products: Poduct[];
  sub_total: number;
  total: number;
}
type Highlights = "info" | "product" | "payment" | "sign" | "questions";
