import { GraphData } from 'components/Graphs/types';
import { NlpEntity } from 'components/types';

export const getRelevanceData = (entities: NlpEntity[]): GraphData => {
  if (!Array.isArray(entities)) throw new Error('Invalid data');
  return entities.map((entity) => ({
    name: entity.entityId,
    value: entity.relevanceScore,
  }));
};

export const getMaximumValue = (data: GraphData) => {
  return data.reduce((max, value) => Math.max(max, value.value), 0);
};

export const getDataWithinRange = (
  data: GraphData,
  min: number,
  max: number
) => {
  return data.filter((item) => item.value >= min && item.value <= max);
};
