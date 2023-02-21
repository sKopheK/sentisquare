import { NlpEntity } from 'components/types';

export const getConfidenceData = (enities: NlpEntity[]) => {
  return enities.map((entity) => ({
    name: entity.entityId,
    value: entity.confidenceScore,
  }));
};
