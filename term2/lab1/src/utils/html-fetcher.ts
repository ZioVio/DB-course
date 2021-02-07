import fetch from 'node-fetch';
import config from '../config';
import path from 'path';
import fsPromise from 'fs/promises';
import fs from 'fs';

const getFileNameFromUrl = (url: string): string => `${url.replace(/\//g, '-')}.html`;
const getCachedFilePath = (url: string): string => path.join(config.CACHE_DIR, getFileNameFromUrl(url));

export const getHtml = async (url: string): Promise<string> => {
  const cachedFilePath = getCachedFilePath(url);
  if (fs.existsSync(cachedFilePath)) {
    return (await fsPromise.readFile(cachedFilePath)).toString();
  }
  const html = await fetch(url).then(res => res.text());
  await fsPromise.writeFile(cachedFilePath, html);
  return html;
}
