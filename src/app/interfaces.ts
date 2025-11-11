export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
  discountPrice: string;
  category: string;
}

export interface ProductsResponse {
  data: Product[];
}

export interface ProductsResponse2 {
  data: Product2;
}

export interface Product2 {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: string;
  sizes: Record<string, SizeDetail>;
  additives: Additive[];
}

export interface SizeDetail {
  size: string;
  price: string;
  discountPrice?: string;
}

export interface Sizes {
  s?: SizeDetail;
  m?: SizeDetail;
  l?: SizeDetail;
  [key: string]: SizeDetail | undefined;
}

export interface Additive {
  name: string;
  price: string;
}
