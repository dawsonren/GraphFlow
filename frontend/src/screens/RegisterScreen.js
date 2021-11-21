import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftSLine } from 'react-icons/ri'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import { registerUser } from '../api/api-requests'
import { Wrapper } from '../components/containers/Wrapper'
import { Row, Column, Link, FormInput, FormInputLabel, FormSubmitButton, Error } from '../components/styled'


export const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  async function createUser(e) {
    e.preventDefault()

    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2
    }

    try {
      const { data, error } = await registerUser(newUser)
      navigate('/graph')
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
        <h3>Register below</h3>
        <p>Already have an account? <Link onClick={() => navigate('/login')}>Log in</Link></p>
        <form noValidate onSubmit={(e) => createUser(e)}>
          <Column>
            <FormInputLabel htmlFor='name'>Name</FormInputLabel>
            <FormInput onChange={(e) => setName(e.target.value)} value={name}
              error={errors.name} id='name' type='text' className={classnames("", { invalid: errors.name })} />
            <Error>{errors.name}</Error>
          </Column>
          <Column>
            <FormInputLabel htmlFor='email'>Email</FormInputLabel>
            <FormInput onChange={(e) => setEmail(e.target.value)} value={email}
              error={errors.name} id='email' type='email' className={classnames("", { invalid: errors.email })} />
            <Error>{errors.email}</Error>
          </Column>
          <Column>
            <FormInputLabel htmlFor='password'>Password</FormInputLabel>
            <FormInput onChange={(e) => setPassword(e.target.value)} value={password}
              error={errors.name} id='password' type='password' className={classnames("", { invalid: errors.password })} />
            <Error>{errors.password}</Error>
          </Column>
          <Column>
            <FormInputLabel htmlFor='password2'>Confirm Password</FormInputLabel>
            <FormInput onChange={(e) => setPassword2(e.target.value)} value={password2}
              error={errors.name} id='password2' type='password' className={classnames("", { invalid: errors.password2 })} />
            <Error>{errors.password2}</Error>
            <FormSubmitButton type="submit">Sign up</FormSubmitButton>
          </Column>
        </form>
      </Column>
    </Wrapper>
  )
}
