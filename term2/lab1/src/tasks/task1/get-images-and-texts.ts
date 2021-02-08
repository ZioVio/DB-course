import { PageData, Fragment, WithNodeValue } from './types';
import { selectHTML } from '../../utils/xpath';

const IGNORED_TAGS = [
  'script', 'style', 'iframe'
]

export const getImagesAndTexts = (doc: Document, url: string): PageData => {
  // @ts-ignore
  // xpath doesn't work, cannot exclude script and style =( ?????
  // */text()[not(ancestor::script)]
  // */text()[not(parent::script or style)]
  // */text()[not(parent::script | style)]
  // *[not(self::script | style)]/text()
  const nodes = selectHTML("//x:img/@src | //x:*/text()", doc)
    .filter((node: Node) =>
    // @ts-ignore
    !IGNORED_TAGS.includes((node.parentNode as Node)?.tagName)
  );

  const fragments: Fragment[] = nodes.map((node: Node & WithNodeValue) => ({
    type: node.nodeName === 'src' ? 'image' : 'text' as 'image' | 'text',
    data: node.nodeValue,
  })).filter(fragment => !!fragment.data.trim());
  return {
    url,
    fragments,
  };
}
