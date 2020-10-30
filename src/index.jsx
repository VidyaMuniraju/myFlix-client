import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return <MainView/>;
  }
}

// finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// tells react to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);