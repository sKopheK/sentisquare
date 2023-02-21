import { Direction } from 'react-range';

export interface ValueRangeProps {
  min: number;
  max: number;
  step?: number;
  values: number[];
  setValues: (value: number[]) => void;
  height: number;
  sliderWidth?: number;
  thumbSize?: number;
  direction?: Direction;
}
