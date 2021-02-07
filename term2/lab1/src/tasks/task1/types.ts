export interface Fragment {
  type: 'text' | 'image',
  data: string;
}

export interface PageData {
  url: string;
  fragments: Fragment[],
}

export interface WithNodeValue {
  nodeValue: string;
  value: string;
}
