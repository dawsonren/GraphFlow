import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'

import { Wrapper } from './Wrapper'
import { Canvas } from '../canvas/Canvas'
import { ModeSelector } from '../canvas/ModeSelector'
import { ActionSelector } from '../canvas/ActionSelector'
import { Row, Column, Button, Link, TitleInput } from '../styled'
import { useOutsideClick } from '../../utils/use-outside-click';

export const GraphContainer = ({pub}) => {
  const navigate = useNavigate()

  const [graphData, setGraphData] = useState('Untitled')
  const [graphJson, setGraphJson] = useState({nodes: [], edges: []})
  const [graphTitle, setGraphTitle] = useState('')
  const [mode, setMode] = useState('add_node')

  const canvasWidth = 700
  const canvasHeight = 400

  const modeRef = useRef(null)
  useOutsideClick(modeRef, () => setMode('select'))

  return (
    <Wrapper>
      <Column style={{marginTop: 120}}>
        <TitleInput />
        <Row ref={modeRef}>
          <ModeSelector mode={mode} setMode={setMode} setGraphJson={setGraphJson} />
          <Canvas graphJson={graphJson} setGraphJson={setGraphJson} mode={mode} setMode={setMode}
            canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
          <ActionSelector graphJson={graphJson} setGraphJson={setGraphJson} pub={pub} />
        </Row>
        {pub &&
          <p>Want to save your graph? <Link onClick={() => navigate('/register')}>Register</Link></p>
        }
      </Column>
    </Wrapper>
  )
}
