import { selectHTML } from '../../utils/xpath';
import { WithNodeValue } from './types';

export const getPageAnchors = async (doc: Document, baseUrl: string, limit?: number): Promise<string[]> => {
  const nodes = selectHTML("//x:a/@href", doc);
  // @ts-ignore
  const urls: string[] = nodes.map(({ nodeValue }: WithNodeValue) => nodeValue.startsWith('http')
    ? nodeValue
    : joinBaseUrlWithRelative(baseUrl, nodeValue));

  if (typeof limit === 'number') {
    return urls.slice(0, limit);
  }
  return urls;
}

const joinBaseUrlWithRelative = (base: string, path: string): string => {
  const lastBaseChar = base[base.length - 1];
  const firstPathChar = path[0];
  if (lastBaseChar === '/' && firstPathChar === '/') {
    return base + path.slice(1);
  }
  if (lastBaseChar !== '/' && firstPathChar === '/'
  || lastBaseChar === '/' && firstPathChar !== '/' ) {
    return base + path;
  }
  return base + '/' + path;
}
