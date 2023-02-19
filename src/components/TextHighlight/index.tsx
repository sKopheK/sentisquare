import { FC, Fragment, MutableRefObject, useMemo, useRef } from 'react';

import { orderEntities } from './helpers';
import { TextHighlightProps } from './types';

import { NlpEntity } from 'components/types';
import styles from './styles.module.scss';

const TextHighlight: FC<TextHighlightProps> = ({
  content,
  entities,
  highlightedEntity,
  setHighlightedEntity,
}) => {
  const orderedEntities = useMemo(
    () => [...entities].sort(orderEntities),
    [entities]
  );
  const words = new Map<NlpEntity, MutableRefObject<HTMLElement | null>>();
  orderedEntities.forEach((entity) => words.set(entity, useRef(null)));

  words.forEach((word, entity) =>
    word.current?.classList.toggle(styles.active, highlightedEntity === entity)
  );

  const children = useMemo(() => {
    const output: JSX.Element[] = [];
    let processedTextLen = 0;
    orderedEntities.forEach((entity) => {
      // skipping words within already highlighted matched text
      if (entity.startingPos < processedTextLen) return;
      output.push(
        <Fragment key={processedTextLen}>
          {content.substring(processedTextLen, entity.startingPos)}
        </Fragment>
      );
      output.push(
        <mark
          key={`entity${entity.id}`}
          ref={words.get(entity)}
          className={styles.entity}
          onMouseEnter={() => setHighlightedEntity(entity)}
          onMouseLeave={() => setHighlightedEntity(undefined)}
        >
          {content.substring(
            entity.startingPos,
            entity.startingPos + entity.matchedText.length
          )}
        </mark>
      );
      processedTextLen = entity.startingPos + entity.matchedText.length;
    });
    output.push(
      <Fragment key="leftover">{content.substring(processedTextLen)}</Fragment>
    );

    return output;
  }, [orderedEntities, content]);

  return <>{children}</>;
};

export default TextHighlight;
