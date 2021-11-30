import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { GraphContainer } from '../components/containers/GraphContainer'
import { getGraph } from '../api/api-requests'

export const GraphScreen = () => {
  const { uuid } = useParams()
  const [graphJson, setGraphJson] = useState({nodes: [], edges: []})
  const [graphTitle, setGraphTitle] = useState('')

  async function loadData() {
    const data = await getGraph(uuid)
    setGraphJson({nodes: data.nodes, edges: data.edges})
    setGraphTitle(data.name)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <GraphContainer pub={false} graphJson={graphJson} setGraphJson={setGraphJson}
      graphTitle={graphTitle} setGraphTitle={setGraphTitle} />
  )
}
