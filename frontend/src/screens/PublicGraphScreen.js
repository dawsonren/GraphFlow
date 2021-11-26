import React, { useState } from 'react';

import { GraphContainer } from '../components/containers/GraphContainer'


export const PublicGraphScreen = ({}) => {
  const [graphJson, setGraphJson] = useState({nodes: [], edges: []})
  const [graphTitle, setGraphTitle] = useState('')

  return (
    <GraphContainer pub={true} graphJson={graphJson} setGraphJson={setGraphJson}
      graphTitle={graphTitle} setGraphTitle={setGraphTitle} />
  )
}
