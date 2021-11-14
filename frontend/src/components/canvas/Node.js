import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useOutsideClick } from '../../utils/use-outside-click';
import { DropdownMenu, DropdownMenuRow } from '../styled'

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

export const Node = ({id, node, highlight, setHighlight, showMenu, setShowMenu, handleNodeClick}) => {
  const nodeRef = useRef(null)

  useOutsideClick(nodeRef, () => showMenu === id && setShowMenu(false))

  const offsets = document.getElementById('graph-canvas').getBoundingClientRect()

  return (
    <div ref={nodeRef} onClick={(e) => handleNodeClick(e, node)}>
      <Circle radius={node.display_data.radius} top={node.display_data.top + offsets.top} left={node.display_data.left + offsets.left}
        highlight={highlight === id} onMouseEnter={() => setHighlight(id)}
        onMouseLeave={() => setHighlight(false)} onClick={() => setShowMenu(id)} />
      {showMenu === id &&
        <DropdownMenu top={node.display_data.top + node.display_data.radius + offsets.top}
          left={node.display_data.left + node.display_data.radius + offsets.left}
          width={100}>
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
