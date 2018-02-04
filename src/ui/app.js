/* @flow */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import QuestionsTextInput from './questionsTextInput';

import type {State as ReduxState} from '../types';
import type {MapStateToProps} from 'react-redux';

class App extends Component<ReduxState> {

  render() {
    const {inputJSON, inputError} = this.props;
    return (
      <div>
        <QuestionsTextInput inputJSON={inputJSON} inputError={inputError} />
      </div>
    )
  }

}

const mapStateToProps: MapStateToProps<*, *, *> = (state: ReduxState) => ({...state});
export default connect(mapStateToProps)(App);
