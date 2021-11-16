import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftSLine } from 'react-icons/ri'

import { Wrapper } from '../components/containers/Wrapper'
import { Row, Column, Link, FormInput, FormInputLabel, FormSubmitButton } from '../components/styled'


export const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  function login(e) {
    e.preventDefault()

    const user = {
      email: email,
      password: password
    }

    console.log(user)
  }

  function updateForm(e) {
    console.log(e)
  }

  return (
    <Wrapper>
      <Row style={{ paddingTop: '20px' }}>
        <Link onClick={() => navigate('/')} style={{display: 'flex', alignItems: 'center'}}>
          <RiArrowLeftSLine style={{marginRight: '5px'}} />Back to home
        </Link>
      </Row>
      <Column>
        <h3>Log in below</h3>
        <p>Don't have an account? <Link onClick={() => navigate('/register')}>Register</Link></p>
        <form noValidate onSubmit={(e) => login(e)}>
          <Column>
            <FormInputLabel htmlFor='email'>Email</FormInputLabel>
            <FormInput onChange={(e) => setEmail(e.target.value)} value={email} error={errors.name} id='email' type='email' />
          </Column>
          <Column>
            <FormInputLabel htmlFor='password'>Password</FormInputLabel>
            <FormInput onChange={(e) => setPassword(e.target.value)} value={password} error={errors.name} id='password' type='password' />
            <FormSubmitButton type="submit">Sign up</FormSubmitButton>
          </Column>
        </form>
      </Column>
    </Wrapper>
  )
}
