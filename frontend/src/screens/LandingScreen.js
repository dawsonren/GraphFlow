import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Wrapper } from '../components/containers/Wrapper'
import { createGraph } from '../api/api-requests'
import { Row, Column, FlexGrow, Button, Link } from '../components/styled'
import graphExample from '../img/graphExample.png'
import personal from '../img/personal.jpg'

const Section = styled.div`
  width: 100%;
  height: ${props => props.height}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ConvertButton = styled.button`
  width: 175px;
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  background-color: var(--accent);
  color: var(--white);
  border: none;

  &:hover {
    background-color: var(--accent-shade);
  }
`

export const LandingScreen = () => {
  const navigate = useNavigate()

  async function goToCreate() {
    navigate('/graph/public')
  }

  return (
    <Wrapper showIn={true} sideMargin={false}>
      <Section height={650}>
        <div style={{margin: '0px 50px'}}>
          <h1>Minimum Cost Network Flows<br/><u>visualized</u>.</h1>
          <p>Are you a student, educator, or academic? Consider using GraphFlow to help visualize and intuitively understand network flows. Design, manage, and explore the networks you create or import.</p>
          <ConvertButton onClick={goToCreate}>Create Your Network</ConvertButton>
        </div>
        <img style={{width: '50%', height: 'auto'}} src={graphExample} alt='Example of a network created with GraphFlow' />
      </Section>
      <Section height={650}>
        <Column style={{alignSelf: 'flex-start'}}>
          <h2>Hi There!</h2>
          <p style={{width: '80vw'}}>
            My name's Dawson Ren, and this is a project I started in October 2021.
            I'm currently a sophomore studying Industrial Engineering and Computer Science
            at Northwestern University, and I thought this was a fun way to explore my
            interest in both subjects. My hope is that it will also serve to benefit
            other students as they explore graph theory, linear programming, and other
            exciting topics!
          </p>
          <img style={{width: '30%', height: 'auto', border: '2px solid var(--black)'}} src={personal} alt='Picture of Dawson Ren' />
          <p>
            Feel free to contact me at <Link href='mailto:DawsonRen2024@u.northwestern.edu?subject=Hello from GraphFlow!'>DawsonRen2024@u.northwestern.edu</Link>.
          </p>
        </Column>
      </Section>
    </Wrapper>
  )
}
