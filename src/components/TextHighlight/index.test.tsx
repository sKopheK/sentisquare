import { fireEvent, render } from '@testing-library/react';
import TextHighlight from '.';
import { NlpEntity } from 'components/types';

const sentence = 'Good morning, ladies and gentlemen';
const entities: NlpEntity[] = [
  {
    id: 5,
    confidenceScore: 5,
    entityId: 'morning',
    matchedText: 'morning',
    relevanceScore: 0.0297,
    startingPos: 5,
    type: ['time of the day'],
  },
  {
    id: 0,
    confidenceScore: 0.3,
    entityId: 'lady',
    matchedText: 'ladies',
    relevanceScore: 0.0297,
    startingPos: 14,
    type: ['person'],
  },
  {
    id: 22,
    confidenceScore: 0.25,
    entityId: 'man',
    matchedText: 'gentlemen',
    relevanceScore: 0.374,
    startingPos: 25,
    type: ['person'],
  },
];

describe('TextHighlight component', () => {
  it('should render component', () => {
    expect(() =>
      render(
        <TextHighlight
          content={sentence}
          entities={entities}
          setHighlightedEntity={jest.fn()}
        />
      )
    ).not.toThrow();
  });

  it('should render mark DOM elements for each entity', () => {
    const { getByText } = render(
      <TextHighlight
        content={sentence}
        entities={entities}
        setHighlightedEntity={jest.fn()}
      />
    );
    entities.forEach((entity) => {
      expect(() => getByText(entity.matchedText)).not.toThrow();
      expect(getByText(entity.matchedText).tagName).toBe('MARK');
    });
  });

  it('should call callback on entity mouseover', () => {
    const mouseEnterCallback = jest.fn();
    const { getByText } = render(
      <TextHighlight
        content={sentence}
        entities={entities}
        setHighlightedEntity={mouseEnterCallback}
      />
    );
    const entity = entities[1];
    fireEvent.mouseEnter(getByText(entity.matchedText));
    expect(mouseEnterCallback).toHaveBeenCalledWith(entity);
  });
});
