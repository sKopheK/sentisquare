import { NlpEntity } from 'components/types';

export const orderEntities = (entityA: NlpEntity, entityB: NlpEntity) => {
  if (entityA.startingPos < entityB.startingPos) return -1;
  if (entityA.startingPos > entityB.startingPos) return 1;
  return 0;
};
