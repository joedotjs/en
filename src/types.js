/* @flow */
import type {Reducer} from 'redux';

export type SelectResponse = {
  type: 'select',
  options: string[],
  value: ?string
};

export type TextResponse = {
  type: 'text',
  value: ?string
};

export type Question = {
  id: string,
  position: number,
  text: string
};

export type Questions = Question[];

export type State = {
  inputError: ?string,
  inputJSON: string,
  questions: Question[]
};

type KnownActions = {
  'APPEND_NEW_QUESTION': true,
  'REPOSITION_QUESTION': true,
  'UPDATE_INPUT_JSON': true
};

export type Action = $Keys<KnownActions>;

export type ActionDictionary = {
  [$Keys<KnownActions>]: Reducer<*, *>
}

export type AppendNewQuestionAction = {
  type: 'APPEND_NEW_QUESTION',
  text: string
};

export type RepositionQuestionAction = {
  type: 'REPOSITION_QUESTION',
  questionId: number,
  moveTo: number
};

export type UpdateJSONAction = {
  type: 'UPDATE_INPUT_JSON',
  newJSON: string
};

