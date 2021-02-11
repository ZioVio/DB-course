import { selectHTML } from './../../utils/xpath';
import { Product } from './types';
export const getProducts = (doc: Document, maxCount?: number): Product[] => {
  const images: Node[] = selectHTML("//x:img[contains(@class, 'catalogCard-img')]/@src", doc) as unknown as Node[];
  // //x:*[@class='catalogCard-title']/text() this didn't work(
  const titles: Node[] = selectHTML("//x:*[@class='catalogCard-title']/*[1]", doc) as unknown as Node[];
  const prices: Node[] = selectHTML("//x:div[@class='catalogCard-price']/text()", doc) as unknown as Node[];

  const count = Math.min(images.length, titles.length, prices.length, maxCount);

  const products: Product[] = new Array(count).fill(0).map((_, idx) => ({
    img: images[idx].nodeValue,
    name: titles[idx].firstChild.nodeValue.trim(),
    price: prices[idx].nodeValue.trim(),
  }));

  return products;
}
