import { PageData } from './types';
import builder from 'xmlbuilder';

export const pagedDataToXML = (pagesData: PageData[]): string => {
    let xml = builder.create('data');
    pagesData.forEach(({ url, fragments }) => {
      xml = xml.ele('page', { url });
      fragments.forEach(({ type, data }) => {
        xml = xml.ele('fragment', { type }, data).up();
      });
      xml = xml.up();
    });
    return xml.end({ pretty: true, indent: '      ' });;
}
