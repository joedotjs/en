/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import QuestionsTextInput from './questionsTextInput';
import QuestionsList from './questionList';

import type {State as ReduxState} from '../types';
import type {MapStateToProps} from 'react-redux';

const App = ({inputError, inputJSON, questions}: ReduxState) =>
  (
    <div id="app-container">
      <QuestionsList questions={questions} />
      <QuestionsTextInput inputJSON={inputJSON} inputError={inputError}/>
    </div>
  );

const mapStateToProps: MapStateToProps<*, *, *> = (state: ReduxState) => ({...state});
export default connect(mapStateToProps)(App);
