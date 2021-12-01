import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftSLine } from 'react-icons/ri'

import { Wrapper } from './Wrapper'
import { Canvas } from '../canvas/Canvas'
import { ModeSelector } from '../canvas/ModeSelector'
import { ActionSelector } from '../canvas/ActionSelector'
import { Row, Column, Button, Link, TitleInput } from '../styled'
import { useOutsideClick } from '../../utils/use-outside-click';

export const GraphContainer = ({pub, graphJson, setGraphJson}) => {
  const navigate = useNavigate()

  const [mode, setMode] = useState('add_node')

  const canvasWidth = 700
  const canvasHeight = 400

  const modeRef = useRef(null)
  useOutsideClick(modeRef, () => setMode('select'))

  function updateTitle(newTitle) {
    setGraphJson({...graphJson, name: newTitle})
  }

  return (
    <Wrapper>
      <Row style={{ paddingTop: '20px' }}>
        <Link onClick={() => navigate(`/${pub ? '' : 'account'}`)} style={{display: 'flex', alignItems: 'center'}}>
          <RiArrowLeftSLine style={{marginRight: '5px'}} />Back to {pub ? 'home' : 'account'}
        </Link>
      </Row>
      <Column style={{marginTop: 120}}>
        {!pub &&
          <TitleInput value={graphJson.name} onChange={(e) => updateTitle(e.target.value)} />
        }
        <Row ref={modeRef}>
          <ModeSelector mode={mode} setMode={setMode} graphJson={graphJson} setGraphJson={setGraphJson} />
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
