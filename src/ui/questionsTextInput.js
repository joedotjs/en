/* @flow */
import React from 'react';
import {updateJSON} from '../store';

type Props = {
  inputJSON: string,
  inputError: ?string
};
import store from '../store';

const updateState = (e: SyntheticEvent<*>) => {
  store.dispatch(updateJSON(e.currentTarget.value));
};

export default ({inputJSON, inputError}: Props) =>
  (
    <div id="text-input">
      <textarea
        className={inputError ? 'error' : ''}
        onChange={updateState}
        value={inputJSON}/>
        {inputError ? <pre>{inputError}</pre> : null}
    </div>
  )