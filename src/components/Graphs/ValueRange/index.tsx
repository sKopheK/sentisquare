import { FC } from 'react';

import { Direction, Range, getTrackBackground } from 'react-range';

import { ValueRangeProps } from './types';

const ValueRange: FC<ValueRangeProps> = ({
  min,
  max,
  step = 1,
  values,
  setValues,
  height,
  sliderWidth = 5,
  thumbSize = 16,
  direction = Direction.Up,
}) => {
  return (
    <Range
      direction={direction}
      values={values}
      // might print out warning "The `values` property is in conflict with the current `step`, `min`, and `max` properties."
      // https://github.com/tajo/react-range/pull/58
      step={step}
      min={min}
      max={max}
      onChange={(values) => setValues(values)}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            flexGrow: 1,
            width: `${sliderWidth * 2}px`,
            display: 'flex',
            height: `${height}px`,
          }}
        >
          <div
            ref={props.ref}
            style={{
              width: `${sliderWidth}px`,
              height: '100%',
              borderRadius: '4px',
              background: getTrackBackground({
                values,
                colors: ['#ccc', '#548BF4', '#ccc'],
                min: min,
                max: max,
                direction,
              }),
              alignSelf: 'center',
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: `${thumbSize}px`,
            width: `${thumbSize}px`,
            borderRadius: '50%',
            backgroundColor: '#FFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 2px 6px #AAA',
          }}
        >
          <div
            style={{
              width: `${thumbSize * 0.35}px`,
              height: '5px',
              backgroundColor: isDragged ? '#548BF4' : '#CCC',
            }}
          />
        </div>
      )}
    />
  );
};

export default ValueRange;
