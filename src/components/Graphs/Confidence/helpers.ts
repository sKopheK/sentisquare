import { NlpEntity } from 'components/types';

export const getConfidenceData = (entities: NlpEntity[]) => {
  return entities.map((entity) => ({
    name: entity.entityId,
    value: entity.confidenceScore,
  }));
};
