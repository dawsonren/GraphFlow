import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useOutsideClick } from '../../utils/use-outside-click';

const Circle = styled.div`
  position: absolute;
  background-color: var(--primary);
  height: ${props => props.radius * 2}px;
  width: ${props => props.radius * 2}px;
  border-radius: ${props => props.radius}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: 1;
  box-sizing: border-box;
  border: 2px solid var(--black);

  ${props => props.highlight && `
    border: 2px solid var(--secondary);
  `}
`

const DropdownMenu = styled.div`
  position: absolute;
  border: 0.5px solid var(--black-2);
  border-radius: 5px;
  width: 100px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background-color: var(--black-3);
  z-index: 2;
`

const DropdownMenuRow = styled.div`
  height: 20px;
  padding-left: 2px;
  border-radius: 5px;

  &:hover {
    background-color: var(--black-4);
  }
`

export const Node = ({id, node, highlight, setHighlight, showMenu, setShowMenu}) => {
  const nodeRef = useRef(null)

  useOutsideClick(nodeRef, () => showMenu === id && setShowMenu(false))

  return (
    <div ref={nodeRef}>
      <Circle radius={node.radius} top={node.top} left={node.left}
        highlight={highlight === id} onMouseEnter={() => setHighlight(id)}
        onMouseLeave={() => setHighlight(false)} onClick={() => setShowMenu(id)} />
      {showMenu === id &&
        <DropdownMenu top={node.top + node.radius} left={node.left + node.radius}>
          <DropdownMenuRow>Hello</DropdownMenuRow>
          <DropdownMenuRow>Goodbye</DropdownMenuRow>
          <DropdownMenuRow>Sweet</DropdownMenuRow>
          <DropdownMenuRow>Good man</DropdownMenuRow>
          <DropdownMenuRow>Boop</DropdownMenuRow>
        </DropdownMenu>
      }
    </div>
  )
}
