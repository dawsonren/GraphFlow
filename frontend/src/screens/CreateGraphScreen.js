import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import { getGraph, createGraph, deleteGraph, updateGraph } from '../api/api-requests'

const CenterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const CreateGraphScreen = () => {
  const [graphId, setGraphId] = useState("5")
  const [json, setJson] = useState("")

  return (
    <CenterWrapper>
      <p>Create Graph Screen</p>
      <input value={graphId} onChange={(e) => setGraphId(e.target.value)} />
      <textarea value={json} onChange={(e) => setJson(e.target.value)} />
      <button onClick={() => getGraph(graphId)}>Get Graph</button>
      <button onClick={() => createGraph()}>Create Graph</button>
      <button onClick={() => deleteGraph(graphId)}>Delete Graph</button>
      <button onClick={() => updateGraph(graphId, json)}>Update Graph</button>
    </CenterWrapper>
  )
}
