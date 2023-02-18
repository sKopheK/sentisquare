import { Dispatch, SetStateAction } from 'react';

import { NlpEntity } from 'components/types';

export interface TextHighlightProps {
  content: string;
  entities: NlpEntity[];
  highlightedEntity?: NlpEntity;
  setHighlightedEntity: Dispatch<SetStateAction<NlpEntity | undefined>>;
}
