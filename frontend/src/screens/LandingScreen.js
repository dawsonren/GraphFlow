import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Wrapper } from '../components/containers/Wrapper'

export const LandingScreen = () => {
  const navigate = useNavigate()
  const user = useSelector(data => data.user)

  return (
    <Wrapper showIn={true}>
      <h1>Landing Screen</h1>
      <button onClick={() => navigate(user.user ? '/graph' : '/graph/public')}>Create a Graph</button>
    </Wrapper>
  )
}
