import { ReactNode } from 'react';
import { GraphType } from '../types';

export interface SwitchGraphType {
  type: GraphType;
  label: string;
  icon: ReactNode;
}

export interface TypeSwitchProps {
  blockId: string;
  types: SwitchGraphType[];
  selected: GraphType;
  setType: (type: GraphType) => void;
}
