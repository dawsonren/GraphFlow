import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import { MainRouter } from './router/MainRouter';

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

function App() {

  return (
    <OuterContainer>
      <Router>
        <MainRouter />
      </Router>
    </OuterContainer>
  );
}

export default App;
