import {
  tokenAction,
  registerUserAction, loginUserAction,
  getGraphAction, createGraphAction, deleteGraphAction, updateGraphAction
} from './api-actions'

import { axiosApi } from './http'

export async function tokenAuth(){
  const { data } = await axiosApi(tokenAction());

  return data;
}

export async function registerUser(user) {
  const { data, errors } = await axiosApi(registerUserAction(user))

  return { data, errors }
}

export async function loginUser(user) {
  const { data, errors } = await axiosApi(loginUserAction(user))

  return { data, errors }
}

export async function getGraph(id) {
  const { data } = await axiosApi(getGraphAction(id))

  return data
}

export async function createGraph(name, user) {
  const { data } = await axiosApi(createGraphAction({name, user}))

  return data
}

export async function deleteGraph(id) {
  const { data } = await axiosApi(deleteGraphAction(id))

  return data
}

export async function updateGraph(id, values) {
  const { data } = await axiosApi(updateGraphAction(id, values))

  return data
}
