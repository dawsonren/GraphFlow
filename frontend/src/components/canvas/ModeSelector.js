import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiAddCircleFill, RiArrowRightFill, RiCursorFill, RiDeleteBin7Fill, RiForbid2Line } from 'react-icons/ri';

import { Row } from '../styled'

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
  width: 75px;
  border-radius: 15px;
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

export const ModeSelector = ({mode, setMode, setGraphJson}) => {
  const modes = ['add_node', 'add_edge', 'select', 'delete']
  const modeNames = ['Add Node', 'Add Edge', 'Select', 'Delete']
  const icons = [<RiAddCircleFill size={30} />,
                 <RiArrowRightFill size={30} />,
                 <RiCursorFill size={30} />,
                 <RiDeleteBin7Fill size={30} />]

  return (
    <LeftContainer>
      {modes.map((m, i) => {
        return (
          <ModeRow key={i} id={i} icon={icons[i]} selected={mode === m}
            onClickCard={() => setMode(m)} modeName={modeNames[i]} />
        )
      })}
      <ModeRow key={modes.length} icon={<RiForbid2Line size={30} />} selected={mode === modes.length}
        onClickCard={() => setGraphJson({nodes: [], edges: []})} modeName={'Clear'} />
    </LeftContainer>
  )

}
