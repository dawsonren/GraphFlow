import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RiFileCopy2Fill } from 'react-icons/ri'

import { getGraph, createGraph, deleteGraph, updateGraph } from '../api/api-requests'
import { Wrapper } from '../components/containers/Wrapper'
import { Canvas } from '../components/canvas/Canvas'
import { ModeSelector } from '../components/canvas/ModeSelector'
import { Row, Column, Button } from '../components/styled'
import { useOutsideClick } from '../utils/use-outside-click';
import { TooltipWrapper } from '../components/TooltipWrapper'

const IconHolder = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  border: none;
  background-color: var(--black-3);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--black-2);
  }
`

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

  function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
      f=>f,
      function handleFailure() {
        console.log('Failed to copy to clipboard')
    });
  }

  return (
    <Wrapper>
      <Column style={{marginTop: 50}}>
        <p>Create Graph Screen</p>
        <Row ref={modeRef}>
          <ModeSelector mode={mode} setMode={setMode} setGraphJson={setGraphJson} />
          <Canvas graphJson={graphJson} setGraphJson={setGraphJson} mode={mode} />
        </Row>
        <div style={{alignSelf: 'flex-end', marginTop: 20}}>
          <TooltipWrapper text='Copy JSON'>
            <IconHolder onClick={() => updateClipboard(JSON.stringify(graphJson))}>
              <RiFileCopy2Fill size={20} />
            </IconHolder>
          </TooltipWrapper>
        </div>
        {/* Future Idea... Loading JSON directly from the user? Potential XSS hacks,
          set nosniff on MIME sniffing to stop attacks, and sanitize JSON, and check length for DOS attacks */}
      </Column>
    </Wrapper>
  )
}
