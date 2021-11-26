import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { GraphContainer } from '../components/containers/GraphContainer'
import { getGraph } from '../api/api-requests'

export const GraphScreen = () => {
  const { uuid } = useParams()
  const navigate = useNavigate()
  const [graphJson, setGraphJson] = useState({nodes: [], edges: []})
  const [graphTitle, setGraphTitle] = useState('')

  async function loadData() {
    try {
      const data = await getGraph(uuid)
      await setGraphJson({nodes: data.nodes, edges: data.edges})
      await setGraphTitle(data.name)
    } catch (e) {
      await navigate('/')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <GraphContainer pub={false} graphJson={graphJson} setGraphJson={setGraphJson}
      graphTitle={graphTitle} setGraphTitle={setGraphTitle} />
  )
}
