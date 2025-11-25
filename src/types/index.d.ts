interface Product {
  id: string | number;
  name: string;
  description: string;
  subtitle: string;
  nav_description: string;
  price: ProductPrice[];
  selected_price?: ProductPrice;
}

interface ProductPrice {
  id?: string;
  frequency: number;
  unit: string;
  value: number;
  currency: string;
}

interface SelectedProduct {
  product_id: string | number;
  price_id?: string | number;
}


interface Checkout {
  shipping_fee: number;
  products: Product[];
  sub_total: number;
  total: number;
  discount_code?: string;
  discount_amount?: number;
}
type Highlights = "info" | "product" | "payment" | "sign" | "questions";
