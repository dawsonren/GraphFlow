import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { FlexGrow, LoginButton, RegisterButton } from '../styled'

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
  align-items: center;
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

const AccountButton = styled(LoginButton)`
  width: 95px;
`


export const Wrapper = ({children, showIn=false}) => {
  const navigate = useNavigate()
  const user = useSelector(data => data.user)

  return (
    <Container>
      <Header>
        <Brand onClick={() => navigate('/')}><Logo src="/logo192.png" />GraphFlow</Brand>
        <FlexGrow />
        {user.isAuthenticated ?
          <AccountButton onClick={() => navigate('/account')}>My Account</AccountButton> :
          <Fragment>
            <LoginButton onClick={() => navigate('/login')}>Log in</LoginButton>
            <RegisterButton onClick={() => navigate('/register')}>Sign up</RegisterButton>
          </Fragment>
        }
      </Header>
      <Content>
        {children}
      </Content>
    </Container>
  )
}
