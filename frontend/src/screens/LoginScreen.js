import React, { Fragment, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RiArrowLeftSLine } from 'react-icons/ri'

import { loginUser } from '../api/api-requests'
import { setToken } from '../api/http'
import { authenticateUser } from '../redux/reducers/user';
import { Wrapper } from '../components/containers/Wrapper'
import { Row, Column, Link, FormInput, FormInputLabel, FormSubmitButton, Error } from '../components/styled'


export const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function login(e) {
    e.preventDefault()

    const user = {
      email: email,
      password: password
    }

    try {
      const { data, error } = await loginUser(user)
      console.log(data)
      if (data.token) {
        await setToken(data.token)
        await dispatch(authenticateUser(data.user))
        navigate('/create-graph')
      }

    } catch (error) {
      if (error.response) {
        setErrors(error.response.data)
      }
    }
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
            <Error>{errors.email || errors.emailnotfound}</Error>
          </Column>
          <Column>
            <FormInputLabel htmlFor='password'>Password</FormInputLabel>
            <FormInput onChange={(e) => setPassword(e.target.value)} value={password} error={errors.name} id='password' type='password' />
            <Error>{errors.password || errors.passwordincorrect}</Error>
            <FormSubmitButton type="submit">Log in</FormSubmitButton>
          </Column>
        </form>
      </Column>
    </Wrapper>
  )
}
