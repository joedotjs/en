/* @flow */
import React, {Component} from 'react';
import {render} from 'react-dom';
import store from './store';

class App extends Component<{}> {}

const appElement = document.getElementById('app');
if (!appElement) throw new Error('App element is missing, JOE.');
render(<App />, appElement);