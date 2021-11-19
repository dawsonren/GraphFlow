import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RiCheckboxBlankCircleLine, RiCheckboxBlankCircleFill } from 'react-icons/ri'

import { useOutsideClick } from '../../utils/use-outside-click';
import { Row, FlexGrow, DropdownMenu, DropdownMenuRow, SmallInput } from '../styled'

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

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 13px;
    color: var(--white);
  }

  ${props => props.highlight && `
    border: 2px solid var(--secondary);
  `}
`

const RadioButton = ({trigger, input, updateType}) => {
  return (
    <Row onClick={() => updateType(trigger)} style={{marginLeft: 5}}>
      {trigger === input ?
        <RiCheckboxBlankCircleFill /> :
        <RiCheckboxBlankCircleLine />
      }
      {trigger || 'none'}
    </Row>
  )

}

export const Node = ({id, node, highlight, setHighlight, showMenu, setShowMenu, handleNodeClick, setName, setType}) => {
  const nodeRef = useRef(null)

  useOutsideClick(nodeRef, () => showMenu === id && setShowMenu(false))

  const offsets = document.getElementById('graph-canvas').getBoundingClientRect()

  const [showName, setShowName] = useState(node.name)
  const [showType, setShowType] = useState(node.type)

  function updateName(e) {
    const value = e.target.value
    setShowName(value)
    setName(node, value)
  }

  function updateType(type) {
    setType(node, type)
  }

  return (
    <div ref={nodeRef} onClick={(e) => handleNodeClick(e, node)}>
      <Circle radius={node.display_data.radius} top={node.display_data.top + offsets.top} left={node.display_data.left + offsets.left}
        highlight={highlight === id} onMouseEnter={() => setHighlight(id)}
        onMouseLeave={() => setHighlight(false)} onClick={() => setShowMenu(id)}>
        <p>{node.name.slice(0, 3)}</p>
      </Circle>
      {showMenu === id &&
        <DropdownMenu top={node.display_data.top + node.display_data.radius + offsets.top}
          left={node.display_data.left + node.display_data.radius + offsets.left}
          width={177}>
          <DropdownMenuRow style={{width: 175}}>Node name <FlexGrow /><SmallInput value={node.name} style={{width: 75}} onChange={updateName}/></DropdownMenuRow>
          <DropdownMenuRow style={{width: 175}}>
            Type <FlexGrow />
            <RadioButton trigger='s' input={node.type} updateType={updateType} />
            <RadioButton trigger='t' input={node.type} updateType={updateType} />
            <RadioButton trigger='' input={node.type} updateType={updateType} />
          </DropdownMenuRow>
        </DropdownMenu>
      }
    </div>
  )
}
