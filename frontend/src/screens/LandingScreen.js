import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Wrapper } from '../components/containers/Wrapper'

export const LandingScreen = () => {
  const navigate = useNavigate()

  return (
    <Wrapper showIn={true}>
      <h1>Landing Screen</h1>
      <button onClick={() => navigate('/create-graph')}>Go to Create Graph</button>
    </Wrapper>
  )
}
