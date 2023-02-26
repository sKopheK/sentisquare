import { NlpEntity, ResultList } from 'components/types';

export const getAllEntities = async (
  results: ResultList
): Promise<NlpEntity[]> => {
  const promises = results.map(async ([_, promise]) => {
    try {
      return Promise.resolve(promise.read());
    } catch (unresolved) {
      await unresolved;
      return promise.read();
    }
  });
  const entities = await Promise.allSettled(promises);
  return entities
    .map((promise) => (promise.status === 'fulfilled' ? promise.value : false))
    .filter((entity) => entity && typeof entity !== 'string')
    .flat() as unknown as NlpEntity[];
};
