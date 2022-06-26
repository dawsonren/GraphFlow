import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { loadGraph } from '../redux/reducers/graph';
import { GraphContainer } from '../components/containers/GraphContainer'
import { getGraph } from '../api/api-requests'

export const GraphScreen = () => {
  const { uuid } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function loadData() {
    try {
      const data = await getGraph(uuid)
      dispatch(loadGraph({name: data.name, nodes: data.nodes, edges: data.edges}))
    } catch (err) {
      navigate('/')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <GraphContainer pub={false} />
  )
}
