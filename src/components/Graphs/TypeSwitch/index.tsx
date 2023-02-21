import { FC } from 'react';

import { Button, ButtonGroup } from 'react-bootstrap';
import cx from 'classnames';

import { TypeSwitchProps } from './types';

import style from './styles.module.scss';

const TypeSwitch: FC<TypeSwitchProps> = ({
  types,
  blockId,
  selected,
  setType,
}) => {
  return (
    <ButtonGroup size="sm" aria-label="Graph type">
      {types.map((graphType, i) => {
        const radioBtnId = `typeswitch-${graphType.label}`;
        const isChecked = selected === graphType.type;
        return (
          <Button
            key={i}
            variant={isChecked ? 'dark' : 'outline-dark'}
            className="p-0"
          >
            <input
              type="checkbox"
              className="btn-check"
              id={radioBtnId}
              data-testid={graphType.label}
              name={`${blockId}-typeswitch`}
              checked={isChecked}
              onChange={() => setType(graphType.type)}
            />
            <label
              aria-label={graphType.label}
              htmlFor={radioBtnId}
              className={cx(style.icon, 'p-2', 'h-100')}
            >
              {graphType.icon}
            </label>
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default TypeSwitch;
