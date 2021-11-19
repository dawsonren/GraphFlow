import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Wrapper } from '../components/containers/Wrapper'
import { removeToken } from '../api/http'
import { authenticateUser, resetUser } from '../redux/reducers/user';

export const AccountScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(data => data.user)


  async function logout() {
    await dispatch(resetUser())
    await removeToken()
    await navigate('/')
  }

  return (
    <Wrapper showIn={true}>
      <h1>{`Welcome Back, ${user.name}`}</h1>
      <button onClick={logout}>Logout</button>
    </Wrapper>
  )
}
