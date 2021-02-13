import { Product } from './types';
import builder from 'xmlbuilder';

export const productsToXML = (products: Product[]): string => {
  let xml = builder.create('root');
  products.forEach((p) => {
    xml = xml.ele('product')
            .ele('img', {}, p.img).up()
            .ele('name', {}, p.name).up()
            .ele('price', {}, p.price).up()
          .up();
  });
  return xml.end({ pretty: true, indent: '  ' });
}
