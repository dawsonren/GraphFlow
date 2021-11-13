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

export const ModeSelector = ({mode, setMode}) => {
  const modes = ['add_node', 'add_edge', 'select', 'delete', 'clear']
  const modeNames = ['Add Node', 'Add Edge', 'Select', 'Delete', 'Clear']
  const icons = [<RiAddCircleFill size={30} />,
                 <RiArrowRightFill size={30} />,
                 <RiCursorFill size={30} />,
                 <RiDeleteBin7Fill size={30} />,
                 <RiForbid2Line size={30} />]

  return (
    <LeftContainer>
      {modes.map((m, i) => {
        return (
          <Row key={i} style={{margin: '2px 0px'}}>
            <Card onClick={() => setMode(m)} selected={mode === m}>
              {icons[i]}
            </Card>
            <div style={{margin: '0px 20px'}}>
              {modeNames[i]}
            </div>
          </Row>
        )
      })}
    </LeftContainer>
  )

}
