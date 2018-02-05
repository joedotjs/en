/* @flow */
// $FlowIssue
import './styles.scss'

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import App from './ui/app';

const appElement = document.getElementById('app');
if (!appElement) throw new Error('App element is missing, JOE.');
render(
  (<Provider store={store}>
    <App/>
  </Provider>),
  appElement);