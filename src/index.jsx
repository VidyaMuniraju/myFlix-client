import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />;
      </Provider>
    );
  }
}

// finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// tells react to render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);