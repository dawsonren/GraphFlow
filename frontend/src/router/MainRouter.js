import React, { Fragment } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { LandingScreen } from '../screens/LandingScreen'
import { AccountScreen } from '../screens/AccountScreen'
import { GraphScreen } from '../screens/GraphScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { RegisterScreen } from '../screens/RegisterScreen'

const PrivateRoute = ({children}) => {
  const data = useSelector(user => user.user)
  const navigate = useNavigate()

  if (data.isAuthenticated) {
    return children
  } else {
    navigate('/')
    return null
  }
}

export const MainRouter = (props) => {
  return (
    <Fragment>
      <div id='main-screen'>
        <Routes>
          <Route path='/' element={<LandingScreen />} />
          <Route path='/graph' element={<GraphScreen />} />
          <Route path='/graph/public' element={<GraphScreen pub={true} />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/account'
            element={
              <PrivateRoute>
                <AccountScreen />
              </PrivateRoute>
            } />
        </Routes>
      </div>
    </Fragment>
  )
}
