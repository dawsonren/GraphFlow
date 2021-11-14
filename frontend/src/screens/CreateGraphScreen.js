import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { getGraph, createGraph, deleteGraph, updateGraph } from '../api/api-requests'
import { Wrapper } from '../components/containers/Wrapper'
import { Canvas } from '../components/canvas/Canvas'
import { ModeSelector } from '../components/canvas/ModeSelector'
import { Row, Column } from '../components/styled'
import { useOutsideClick } from '../utils/use-outside-click';

export const CreateGraphScreen = () => {
  const [graphId, setGraphId] = useState('5')
  const [graphData, setGraphData] = useState('')
  const [graphJson, setGraphJson] = useState({nodes: [], edges: []})
  const [mode, setMode] = useState('add_node')

  const modeRef = useRef(null)
  useOutsideClick(modeRef, () => setMode('select'))

  async function populate() {
    const id = await parseInt(graphId)
    if (Number.isInteger(id)) {
      const data = await getGraph(parseInt(id))
      await setGraphData(data)
    }
  }

  return (
    <Wrapper>
      <Column>
        <p>Create Graph Screen</p>
        {/*
        <input value={graphId} onChange={(e) => setGraphId(e.target.value)} />
        <textarea value={graphData} onChange={(e) => setGraphData(e.target.value)} />*/}
        <p>JSON</p>
        <p>{JSON.stringify(graphJson)}</p>
        {/*<button onClick={populate}>Get Graph</button>
        <button onClick={() => createGraph()}>Create Graph</button>
        <button onClick={() => deleteGraph(graphId)}>Delete Graph</button>
        <button onClick={() => updateGraph(graphId, graphData)}>Update Graph</button>*/}
        <Row ref={modeRef}>
          <ModeSelector mode={mode} setMode={setMode} setGraphJson={setGraphJson} />
          <Canvas graphJson={graphJson} setGraphJson={setGraphJson} mode={mode} />
        </Row>
      </Column>
    </Wrapper>
  )
}
