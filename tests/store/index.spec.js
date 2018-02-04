import {expect} from 'chai';
import {actionDictionary} from '../../src/store';

describe('Action Dictionary', () => {

  describe('REPOSITION_QUESTION', () => {

    let state;
    beforeEach(() => {
      const questions = [
        { id: 1, text: 'id1', position: 2 },
        { id: 2, text: 'id2', position: 3 },
        { id: 3, text: 'id3', position: 4 },
        { id: 4, text: 'id4', position: 1 },
        { id: 5, text: 'id5', position: 0 }
      ];
      state = {questions, inputJSON: JSON.stringify(questions, null, 4), inputError: null};
    });

    it('should correctly update question set when question is moving forward', () => {

      const newState = actionDictionary['REPOSITION_QUESTION'](state, {
        type: 'REPOSITION_QUESTION',
        questionId: 1,
        moveTo: 4
      });

      expect(newState.questions).to.be.include.deep.members([
        { id: 1, text: 'id1', position: 4 },
        { id: 2, text: 'id2', position: 2 },
        { id: 3, text: 'id3', position: 3 },
        { id: 4, text: 'id4', position: 1 },
        { id: 5, text: 'id5', position: 0 }
      ]);

    });

    it('should correctly update question set when question is moving back', () => {

      const newState = actionDictionary['REPOSITION_QUESTION'](state, {
        type: 'REPOSITION_QUESTION',
        questionId: 2,
        moveTo: 1
      });

      expect(newState.questions).to.be.include.deep.members([
        { id: 1, text: 'id1', position: 3 },
        { id: 2, text: 'id2', position: 1 },
        { id: 3, text: 'id3', position: 4 },
        { id: 4, text: 'id4', position: 2 },
        { id: 5, text: 'id5', position: 0 }
      ]);

    });

  });

});