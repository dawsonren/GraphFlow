import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { RiAddCircleLine, RiArrowRightLine, RiDragMove2Fill, RiCursorFill, RiDeleteBin7Fill, RiForbid2Line } from 'react-icons/ri';

import { Row } from '../styled'
import { resetGraph } from '../../redux/reducers/graph';
import { setModeAddEdge, setModeAddNode, setModeSelect, setModeDelete, setModeMove } from '../../redux/reducers/mode';

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65px;
  width: 65px;
  border-radius: 12px;
  background-color: var(--black-3);

  &:hover {
    background-color: var(--black-2);
  }

  ${props => props.selected && `
    background-color: var(--black-2);
  `}
`

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`

const ModeRow = ({id, icon, selected, onClickCard, modeName}) => {
  return (
    <Row key={id} style={{margin: '2px 0px'}}>
      <Card onClick={onClickCard} selected={selected}>
        {icon}
      </Card>
      <div style={{margin: '0px 20px'}}>
        {modeName}
      </div>
    </Row>
  )
}

export const ModeSelector = () => {
  const modes = [setModeAddNode, setModeAddEdge, setModeMove, setModeSelect, setModeDelete]
  const modeNames = ['Add Node', 'Add Edge', 'Move', 'Select', 'Delete']
  const icons = [<RiAddCircleLine size={30} />,
                 <RiArrowRightLine size={30} />,
                 <RiDragMove2Fill size={30} />,
                 <RiCursorFill size={30} />,
                 <RiDeleteBin7Fill size={30} />]
  const dispatch = useDispatch()
  const mode = useSelector(data => data.mode);

  function setMode(action) {
    dispatch(action());
  }
  
  function clearGraph() {
    dispatch(resetGraph())
  }

  return (
    <LeftContainer>
      {modes.map((action, i) => {
        return (
          <ModeRow key={i} id={i} icon={icons[i]} selected={mode === action().value}
            onClickCard={() => setMode(action)} modeName={modeNames[i]} />
        )
      })}
      <ModeRow key={modes.length} icon={<RiForbid2Line size={30} />} selected={mode === modes.length}
        onClickCard={clearGraph} modeName={'Clear'} />
    </LeftContainer>
  )

}
