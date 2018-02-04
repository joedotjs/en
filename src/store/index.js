/* @flow */
import {createStore} from 'redux';

import type {
  Questions,
  State
} from '../types';

import type {
  ActionDictionary,
  Action,
  AppendNewQuestionAction,
  RepositionQuestionAction,
  UpdateJSONAction
} from '../types';

const initialState: State = {
  inputError: null,
  inputJSON: '[]',
  questions: []
};

const stringifyQuestions = (questions: Questions): string =>
  JSON.stringify(questions, null, 4);

const repositionOtherQuestions = (allQuestions: Questions, currentPosition, newPosition): Questions => {
    const questionMovingForward = newPosition > currentPosition;
    const otherQuestionsAdjusting = allQuestions.filter(
      questionMovingForward
        ? q => q.position > currentPosition && q.position <= newPosition
        : q => q.position < currentPosition && q.position >= newPosition
    );
    return otherQuestionsAdjusting.map(
      questionMovingForward
        ? q => Object.assign({}, q, {position: q.position - 1 })
        : q => Object.assign({}, q, {position: q.position + 1 })
    );
};

export const actionDictionary: ActionDictionary = { // Exported for ease of testing.

  'APPEND_NEW_QUESTION': (newState, action: AppendNewQuestionAction) => {
    const idForNewQuestion = Math.max(...newState.questions.map(q => q.position)) + 1;
    const positionForNewQuestion = newState.questions.length; // positions start at 0
    newState.questions = [...newState.questions, {
      id: idForNewQuestion,
      position: positionForNewQuestion,
      text: action.text
    }];
    newState.inputJSON = stringifyQuestions(newState.questions);
    newState.inputError = null;
    return newState;
  },

  'REPOSITION_QUESTION': (newState, action: RepositionQuestionAction) => {

    const questionInTransit = newState.questions.find(q => q.id === action.questionId);
    if (!questionInTransit) return newState; // No question with given id. No-op.

    const currentPosition = questionInTransit.position;
    const newPosition = action.moveTo;

    // This shouldn't happen, but prudence pays.
    if (currentPosition === newPosition) return newState;

    const adjustedOtherQuestions = repositionOtherQuestions(
      newState.questions,
      currentPosition,
      newPosition
    );

    const updatedMovingQuestion = {...questionInTransit, position: newPosition};
    const allRepositionedQuestions = [...adjustedOtherQuestions, updatedMovingQuestion];
    const allRepositionedIds = allRepositionedQuestions.map(q => q.id);
    const unchangedQuestions = newState.questions.filter(q => !allRepositionedIds.includes(q.id));

    newState.questions = [...unchangedQuestions, ...allRepositionedQuestions];
    newState.inputJSON = stringifyQuestions(newState.questions);
    newState.inputError = null;
    return newState;
  },

  'UPDATE_INPUT_JSON': (newState, action: UpdateJSONAction) => {
    newState.inputJSON = action.newJSON;
    // try/catch is for the JSON.parse.
    try {
      const newQuestions = JSON.parse(action.newJSON);
      newState.inputError = null;
      newState.questions = newQuestions;
    } catch(e) {
      newState.inputError = 'You entered invalid JSON. ;(';
    }
    return newState;
  }

};

const knownActions: Action[] = Object.keys(actionDictionary);

export default createStore((state: State = initialState, action) => {
  if (knownActions.includes(action.type)) {
    return actionDictionary[action.type]({...state}, action);
  }
  return state;
});