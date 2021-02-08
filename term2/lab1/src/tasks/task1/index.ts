import { PageData } from './types';
import { getImagesAndTexts } from './get-images-and-texts';
import { HTMLToXMLDocument } from './../../utils/html-to-xml-document';
import { getPageAnchors } from './get-page-anchors';
import { getHtml } from './../../utils/html-fetcher';
import { PAGES_TO_PARSE_COUNT } from './config';
import { pagesDataToXML } from './pages-data-to-xml';
import fsPromise from 'fs/promises';
import config from '../../config';

const getPagesDataRecursive = async (url: string): Promise<PageData[]> => {
  const html = await getHtml(url);
  const baseXMLDocument = HTMLToXMLDocument(html);

  const anchors = await getPageAnchors(
    baseXMLDocument, url, PAGES_TO_PARSE_COUNT
  ); // 20 anchors

  const otherPagesResponse = (await Promise.allSettled(anchors.map(getHtml))) // 20 pages request
    .map((res, idx) => ({...res, url: anchors[idx] }))
    // some requests may throw an error. Ignore them
    .filter(res => res.status === 'fulfilled');

  const pagesData = otherPagesResponse
    .map((res: PromiseFulfilledResult<string> & { url: string }) => {
      const xmlDoc = HTMLToXMLDocument(res.value);
      return getImagesAndTexts(xmlDoc, res.url);
    });

  return pagesData; // parsed and found images and texts
}

export const run = async (url: string): Promise<string> => {
  const pagesData = await getPagesDataRecursive(url);
  const xml = pagesDataToXML(pagesData);
  await fsPromise.writeFile(config.TASK1_FILE_NAME, xml);
  return xml;
}
