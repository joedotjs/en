/* @flow */
import React from 'react';
type Props = {
  inputJSON: string,
  inputError: ?string
};
export default ({inputJSON, inputError}: Props) =>
(
  <div>
    <textarea>
      {inputJSON}
    </textarea>
  </div>
)