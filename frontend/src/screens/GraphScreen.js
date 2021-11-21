import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { getGraph, createGraph, deleteGraph, updateGraph } from '../api/api-requests'
import { Wrapper } from '../components/containers/Wrapper'
import { Canvas } from '../components/canvas/Canvas'
import { ModeSelector } from '../components/canvas/ModeSelector'
import { ActionSelector } from '../components/canvas/ActionSelector'
import { Row, Column, Button } from '../components/styled'
import { useOutsideClick } from '../utils/use-outside-click';


export const GraphScreen = () => {
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
      <Column style={{marginTop: 50}}>
        <p>Create Graph Screen</p>
        <Row ref={modeRef}>
          <ModeSelector mode={mode} setMode={setMode} setGraphJson={setGraphJson} />
          <Canvas graphJson={graphJson} setGraphJson={setGraphJson} mode={mode} setMode={setMode} />
          <ActionSelector graphJson={graphJson} setGraphJson={setGraphJson} />
        </Row>
        {/* Future Idea... Loading JSON directly from the user? Potential XSS hacks,
          set nosniff on MIME sniffing to stop attacks, and sanitize JSON, and check length for DOS attacks */}
      </Column>
    </Wrapper>
  )
}
