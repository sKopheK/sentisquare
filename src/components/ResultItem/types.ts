import { NlpEntity } from '../types';

export interface ResultItemProps {
  text: string;
  entities: NlpEntity[];
}
