import React from 'react';
import PropTypes from 'prop-types';
import { Shortcuts } from 'react-shortcuts';
import { ElementContent } from './element_content';
import { pure } from 'recompose';

export const ElementControls = pure((props) => {
  const {
    selectElement,
    removeElement,
    isSelected,
    handlers,

    // We could pull off the relevant properties of the following two objects,
    // but since they aren't used in the parent it would actually make this more
    // annoying to test and read
    elementTypeDefintion,
    renderable,
    state,
    size,
  } = props;

  // TODO: pass in render element dimensions
  const selectedClassName = isSelected ? 'selected' : '';

  const selectHandler = (ev) => {
    ev && ev.stopPropagation();
    selectElement();
  };

  const removeHandler = (ev) => {
    ev && ev.stopPropagation();
    removeElement();
  };

  const handleShortcuts = (action) => {
    if (action === 'DELETE' && isSelected) return removeElement();
  };

  return (
    <div
      className={`canvas__workpad--element ${selectedClassName}`}
      onClick={selectHandler}
    >
      {/*
        Yeah, in theory we could put RenderElement in here, but the ElementContent component actually contains a
        bunch of logic for error handling. Its actually pretty nice to keep them seperate.
      */}

      <Shortcuts name="ELEMENT" handler={handleShortcuts}>
        <ElementContent
           state={state}
           renderable={renderable}
           elementTypeDefintion={elementTypeDefintion}
           size={size}
           handlers={handlers}
         />

        {!isSelected ? null :
          (<i
            className="fa fa-times-circle canvas__workpad--element-remove"
            style={{ cursor: 'pointer' }}
            onClick={removeHandler}/>)
        }
      </Shortcuts>
    </div>
  );
});

ElementControls.propTypes = {
  selectElement: PropTypes.func,
  removeElement: PropTypes.func,
  isSelected: PropTypes.bool,
  elementTypeDefintion: PropTypes.object,
  renderable: PropTypes.object,
  size: PropTypes.object,
  state: PropTypes.string,
  handlers: PropTypes.object,
};
