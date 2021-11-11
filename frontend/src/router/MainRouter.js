import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomeScreen } from '../screens/HomeScreen'
import { CreateGraphScreen } from '../screens/CreateGraphScreen'

export const MainRouter = (props) => {
  return (
    <Fragment>
      <div id="main-screen">
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/create-graph" element={<CreateGraphScreen />} />
        </Routes>
      </div>
    </Fragment>
  )
}
