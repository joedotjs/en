/* @flow */
import React, {Component} from 'react';
import type {Question} from '../types';

type Props = {
  isTarget: boolean,
  onDragEnd: (SyntheticEvent<*>) => void,
  question: Question,
  setMoving: (Question) => void,
  setTarget: (Question) => void
};

export default class extends Component<Props> {

  setSelfMoving = () => {
    this.props.setMoving(this.props.question);
  };

  setSelfTarget = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    this.props.setTarget(this.props.question);
  };

  render() {
    const {isTarget, onDragEnd, question} = this.props;
    return (
      <div
        className={`question${isTarget ? ' target' : ''}`}
        draggable="true"
        onDragEnd={onDragEnd}
        onDragOver={this.setSelfTarget}
        onDragStart={this.setSelfMoving}>
        <h4>{question.text}</h4>
        <input type="text"/>
      </div>
    );
  }

}