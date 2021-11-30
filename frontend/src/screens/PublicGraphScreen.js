import React, { useState } from 'react';

import { GraphContainer } from '../components/containers/GraphContainer'


export const PublicGraphScreen = ({}) => {
  const [graphJson, setGraphJson] = useState({name: '', nodes: [], edges: []})

  return (
    <GraphContainer pub={true} graphJson={graphJson} setGraphJson={setGraphJson} />
  )
}
