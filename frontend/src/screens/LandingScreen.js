import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Wrapper } from '../components/containers/Wrapper'
import { createGraph } from '../api/api-requests'

export const LandingScreen = () => {
  const navigate = useNavigate()
  const user = useSelector(data => data.user)

  async function goToCreate() {
    if (user.uuid) {
      const graph = await createGraph('Untitled Graph', user.uuid)
      await navigate(`/graph/${graph._id}`)
    } else {

      navigate('/graph/public')
    }
  }

  return (
    <Wrapper showIn={true}>
      <h1>Landing Screen</h1>
      <button onClick={goToCreate}>Create a Graph</button>
    </Wrapper>
  )
}
