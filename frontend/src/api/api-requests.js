import {
  getGraphAction, createGraphAction, deleteGraphAction, updateGraphAction
} from './api-actions'

import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'http://localhost:9000'
});

export async function getGraph(id) {
  const { data } = await axiosApi(getGraphAction(id))

  return data
}

export async function createGraph() {
  const { data } = await axiosApi(createGraphAction())

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
