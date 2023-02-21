import { Results } from 'components/types';

export const getAllEntities = (results: Results) => {
  return [...results.values()].flat();
};
