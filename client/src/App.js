import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Main from './components/MainComponent';
import store from './store/store';
// import logo from './logo.svg';
// import './App.css';
import { PersistGate } from 'redux-persist/integration/react'
import persistor from './store/persistGate';

function App() {
  return (
    <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
      <Router>
          <Main />
      </Router>
         </PersistGate>
    </Provider>
  );
}

export default App;
