import { getAverageTextFragments } from './get-average-text-fragments-count';

export const run = async (xml: string): Promise<void> => {
  const avgTextElementsCountResult = getAverageTextFragments(xml);
  console.table({
    'Pages count': avgTextElementsCountResult.pages,
    'All fragments count': avgTextElementsCountResult.textFragments,
    'Average text fragments count': avgTextElementsCountResult.avgTextFragments,
  });
}
