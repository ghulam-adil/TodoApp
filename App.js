import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppNavigator from './src/AppNavigator';

const initialState = {
  name: '',
  todos: []
}

const reducer = (state = initialState, action) => {
  switch(action.type)
  {
    case 'SET_NAME':
      return {
        name: action.value
      }
    case 'SET_TODO':
      return {
        todos: action.value
      }
  }
  return state;
}

const store = createStore(reducer);

class App extends Component {
  render () {
    return(
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
} 

export default App;