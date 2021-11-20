import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useOutsideClick } from '../../utils/use-outside-click';
import { FlexGrow, DropdownMenu, DropdownMenuRow, SmallInput } from '../styled'

const ValueContainer = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: 3;
  min-width: 20px;
  height: 20px;
  border-radius: 5px;
  font-size: 10px;
  background-color: var(--black-3);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${props => props.angle}deg);
  padding: 0px 4px;
  user-select: none;

  &:hover {
    background-color: var(--black-2);
  }
`

const GreenSpan = styled.span`
  color: var(--green);
`

const RedSpan = styled.span`
  color: var(--red);
`

export const Edge = ({edge, nodeRadius, offsets, showMenu, setShowMenu, setWeight, setMinFlow, setMaxFlow, mode, deleteEdge}) => {
  const fromX = edge.display_data.fromX
  const toX = edge.display_data.toX
  const fromY = edge.display_data.fromY
  const toY = edge.display_data.toY

  const markerSize = 25
  const width = Math.abs(fromX - toX)
  const height = Math.abs(fromY - toY)

  const edgeLeft = Math.min(fromX, toX) - nodeRadius
  const edgeTop = Math.min(fromY, toY) - nodeRadius

  const angle = Math.atan((toY - fromY) / (toX - fromX))
  const reduceAmount = nodeRadius + 15
  // For arctan, since range is not the full circle
  const flipConstant = Math.sign(toX - fromX)

  // The arrow should originate from the edge of the from node, not the center
  const reduceStartX = flipConstant * Math.cos(angle) * nodeRadius
  const reduceStartY = flipConstant * Math.sin(angle) * nodeRadius

  // The arrow tip should touch the edge of the to node
  const reduceEndX = flipConstant * Math.cos(angle) * reduceAmount
  const reduceEndY = flipConstant * Math.sin(angle) * reduceAmount

  const arrowStartX = fromX - edgeLeft + reduceStartX
  const arrowStartY = fromY - edgeTop + reduceStartY
  const arrowEndX = toX - edgeLeft - reduceEndX
  const arrowEndY = toY - edgeTop - reduceEndY

  // Shift by total width/length of ValueContainer
  const valueX = (arrowStartX + arrowEndX - 28) / 2
  const valueY = (arrowStartY + arrowEndY - 20) / 2

  const edgeRef = useRef(null)

  useOutsideClick(edgeRef, () => showMenu === edge.id && setShowMenu(false))

  const [showWeight, setShowWeight] = useState(edge.weight)
  const [showMinFlow, setShowMinFlow] = useState(edge.min_flow || "-")
  const [showMaxFlow, setShowMaxFlow] = useState(edge.max_flow || "-")

  function updateValue(setShowValue, setValue) {
    return (e) => {
      setShowValue(e.target.value)

      // only update if value is valid
      const value = parseInt(e.target.value)
      if (Number.isInteger(value)) {
        setValue(edge, value)
      }
    }
  }

  const updateWeight = updateValue(setShowWeight, setWeight)
  const updateMinFlow = updateValue(setShowMinFlow, setMinFlow)
  const updateMaxFlow = updateValue(setShowMaxFlow, setMaxFlow)

  return (
    <div style={{position: 'absolute', top: `${offsets.top + edgeTop}px`, left: `${offsets.left + edgeLeft}px`}}>
      <svg width={width + markerSize} height={height + markerSize}>
        <defs>
          <marker id="arrow" markerWidth={markerSize} markerHeight={markerSize} refX="2" refY="6" orient="auto">
            <path d="M2,2 L2,10 L10,6 L2,2" style={{fill: 'var(--secondary)'}} />
          </marker>
        </defs>
        <path d={`M${arrowStartX},${arrowStartY} L${arrowEndX},${arrowEndY}`}
          style={{stroke: 'var(--secondary)', strokeWidth: '2px', fill: 'none', markerEnd: 'url(#arrow)'}} />
      </svg>
      <div ref={edgeRef} onClick={() => mode === 'delete' ? deleteEdge(edge) : setShowMenu(edge.id)}>
        <ValueContainer top={valueY} left={valueX} angle={angle * 180 / Math.PI}>
          <p style={{margin: 0, padding: 0}}>
            {showWeight}/
            <RedSpan>{showMinFlow}</RedSpan>/
            <GreenSpan>{showMaxFlow}</GreenSpan>
          </p>
        </ValueContainer>
        {showMenu === edge.id &&
          <DropdownMenu top={valueY + 10} left={valueX + 10} width={150}>
            <DropdownMenuRow>Edge Weight <FlexGrow /><SmallInput value={showWeight} onChange={updateWeight} /></DropdownMenuRow>
            <DropdownMenuRow>Edge Min Flow <FlexGrow /><SmallInput value={showMinFlow} onChange={updateMinFlow} /></DropdownMenuRow>
            <DropdownMenuRow>Edge Max Flow <FlexGrow /><SmallInput value={showMaxFlow} onChange={updateMaxFlow} /></DropdownMenuRow>
          </DropdownMenu>
        }
      </div>
    </div>
  )
}
