import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Wrapper } from '../components/containers/Wrapper'

export const HomeScreen = () => {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <h1>Home Screen</h1>
      <button onClick={() => navigate('/create-graph')}>Go to Create Graph</button>
    </Wrapper>
  )
}
