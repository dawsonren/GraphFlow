import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { Wrapper } from './Wrapper'
import { Canvas } from '../canvas/Canvas'
import { ModeSelector } from '../canvas/ModeSelector'
import { ActionSelector } from '../canvas/ActionSelector'
import { Row, Column, Link, TitleInput } from '../styled'
import { useOutsideClick } from '../../utils/use-outside-click'
import { setGraphName } from '../../redux/reducers/graph'

export const GraphContainer = ({pub}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const graph = useSelector(data => data.graph)

  const [mode, setMode] = useState('add_node')

  const canvasWidth = 700
  const canvasHeight = 400

  const modeRef = useRef(null)
  useOutsideClick(modeRef, () => setMode('select'))

  function updateTitle(newTitle) {
    dispatch(setGraphName(newTitle))
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
          <TitleInput value={graph.name} onChange={(e) => updateTitle(e.target.value)} />
        }
        <Row ref={modeRef}>
          <ModeSelector mode={mode} setMode={setMode} />
          <Canvas mode={mode} setMode={setMode} canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
          <ActionSelector pub={pub} />
        </Row>
        {pub &&
          <p>Want to save your graph? <Link onClick={() => navigate('/register')}>Register</Link></p>
        }
      </Column>
    </Wrapper>
  )
}
