import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { GraphContainer } from '../components/containers/GraphContainer'
import { getGraph } from '../api/api-requests'

export const GraphScreen = () => {
  const { uuid } = useParams()
  const navigate = useNavigate()
  const [graphJson, setGraphJson] = useState({name: '', nodes: [], edges: []})

  async function loadData() {
    try {
      const data = await getGraph(uuid)
      setGraphJson({name: data.name, nodes: data.nodes, edges: data.edges})
    } catch (err) {
      navigate('/')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <GraphContainer pub={false} graphJson={graphJson} setGraphJson={setGraphJson} />
  )
}
