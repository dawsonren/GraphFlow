import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  width: calc(100vw - 40px);
  padding: 10px 20px;
  background-color: var(--black-3);
  display: flex;
  flex-direction: row;
  position: fixed;
`

const Content = styled.div`
  margin: 60px 20px;
`

const Logo = styled.img`
  height: 30px;
  margin-right: 5px;
`

const Brand = styled.div`
  height: 40px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`

export const Wrapper = ({children}) => {
  const navigate = useNavigate()

  return (
    <Container>
      <Header>
        <Brand onClick={() => navigate('/')}><Logo src="/logo192.png" />GraphFlow</Brand>
      </Header>
      <Content>
        {children}
      </Content>
    </Container>
  )
}
