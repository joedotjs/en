/* @flow */
import React, {Component} from 'react';
import type {Question, Questions} from '../types';
import store, {repositionQuestion} from '../store';

import QuestionEntry from './question';

type Props = {
  questions: Questions
};

type State = {
  movingQuestion: ?Question,
  targetQuestion: ?Question
};

export default class QuestionsList extends Component<Props, State> {

  constructor() {
    super();
    this.state = {
      movingQuestion: null,
      targetQuestion: null
    };
  }

  handleEndDrag = () => {
    if (!this.state.movingQuestion || !this.state.targetQuestion) return;
    store.dispatch(
      repositionQuestion(this.state.movingQuestion, this.state.targetQuestion.position)
    );
    this.setState({
      movingQuestion: null,
      targetQuestion: null
    });
  };

  setMovingQuestion = (question: Question) => {
    this.setState({movingQuestion: question});
  };

  setTargetQuestion = (question: Question) => {
    if (!this.state.movingQuestion) return;
    if (this.state.movingQuestion.id === question.id) return;
    this.setState({targetQuestion: question});
  };

  sortByPosition = (questions: Questions) =>
    [...questions].sort((q1, q2) =>
      q1.position < q2.position ? -1 : 1
    );

  render() {
    const {questions} = this.props;
    return (
      <div id="question-list">
        {this.sortByPosition(questions).map(q =>
          <QuestionEntry
            key={q.id}
            isTarget={!!this.state.targetQuestion && this.state.targetQuestion.id === q.id}
            question={q}
            onDragEnd={this.handleEndDrag}
            setMoving={this.setMovingQuestion}
            setTarget={this.setTargetQuestion}/>
        )}
      </div>
    )
  }

}