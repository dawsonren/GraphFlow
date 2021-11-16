import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomeScreen } from '../screens/HomeScreen'
import { CreateGraphScreen } from '../screens/CreateGraphScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { RegisterScreen } from '../screens/RegisterScreen'

export const MainRouter = (props) => {
  return (
    <Fragment>
      <div id="main-screen">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/create-graph" element={<CreateGraphScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </Fragment>
  )
}
