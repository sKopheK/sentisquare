import { NlpEntity, Results } from 'components/types';

export const getAllEntities = (results: Results) => {
  return [...results.values()].flat();
};

export const getTypeGraphData = (entities: NlpEntity[]) => {
  if (!Array.isArray(entities)) throw new Error('Invalid data');
  const frequency = new Map<string, number>();
  entities.forEach((entity) => {
    if (!Array.isArray(entity.type)) return;
    entity.type.forEach((type) => {
      frequency.set(type, (frequency.get(type) ?? 0) + 1);
    });
  });
  return [...frequency.entries()].map(([key, value]) => ({
    name: key,
    value,
  }));
};
