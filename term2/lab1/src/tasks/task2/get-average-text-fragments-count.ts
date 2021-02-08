import { selectXML } from './../../utils/xpath';
import { parseXML } from '../../utils/parse-xml';
import { AverageTextFragmentsCountResult } from './types';

export const getAverageTextFragments = (xml: string): AverageTextFragmentsCountResult => {
  const doc = parseXML(xml);

  const pagesCount = selectXML('count(//page)', doc) as unknown as number;
  const textFragmentsCount = selectXML("count(//page/fragment[@type='text'])", doc) as unknown as number;

  const avgTextFragmentsCount = selectXML(
    "count(//page/fragment[@type='text']) div count(//page)", doc
  ) as unknown as number;

  return {
    pages: pagesCount,
    textFragments: textFragmentsCount,
    avgTextFragments: avgTextFragmentsCount,
  };
};
