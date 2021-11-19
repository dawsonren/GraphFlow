import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from './redux/configure-store';

import { TokenProvider } from './api/TokenProvider';

import { MainRouter } from './router/MainRouter';

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

function App() {

  return (
    <OuterContainer>
      <ReduxProvider store={configureStore}>
        <TokenProvider>
          <Router>
            <MainRouter />
          </Router>
        </TokenProvider>
      </ReduxProvider>
    </OuterContainer>
  );
}

export default App;
