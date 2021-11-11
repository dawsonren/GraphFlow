import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomeScreen } from '../screens/HomeScreen'
import { CreateGraphScreen } from '../screens/CreateGraphScreen'

export const MainRouter = (props) => {
  return (
    <Fragment>
      <div id="main-screen">
        <Routes>
          <Route path="/create-graph" element={<CreateGraphScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </div>
    </Fragment>
  )
}
