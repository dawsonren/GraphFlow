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


export const Edge = ({edge, nodeRadius, offsets, showMenu, setShowMenu, setCost, setMinFlow, setMaxFlow, mode, deleteEdge, setCurve}) => {
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
  const d_angle = angle * 180 / Math.PI
  // For arctan, since range is not the full circle
  const flipConstant = Math.sign(toX - fromX)

  // Calculate curvature - +/- 1/5 of the length, going normal to the midpoint
  const arrowLength = Math.sqrt(Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2))
  const magCurve = 0.2 * arrowLength * edge.display_data.curve

  // Global offset helps us fit in the curvature
  const off = Math.abs(magCurve)

  // Create normals
  const curveX = magCurve * Math.cos(angle + (Math.PI / 2))
  const curveY = magCurve * Math.sin(angle + (Math.PI / 2))

  // The arrow should originate from the edge of the from node, not the center
  const reduceX = flipConstant * Math.cos(angle) * nodeRadius
  const reduceY = flipConstant * Math.sin(angle) * nodeRadius

  // Swapped b/c of this tip (see the last one by T Scherer)
  // https://stackoverflow.com/questions/31278293/svg-align-tip-of-marker-end-with-end-of-line
  const arrowStartX = toX - edgeLeft - reduceX + off
  const arrowStartY = toY - edgeTop - reduceY + off
  const arrowEndX = fromX - edgeLeft + reduceX + off
  const arrowEndY = fromY - edgeTop + reduceY + off

  // Quadratic Bezier Curve Control point, default at midpoint
  const controlX = curveX + (arrowStartX + arrowEndX) / 2
  const controlY = curveY + (arrowStartY + arrowEndY) / 2

  // Shift by total width/length of ValueContainer
  const valueX = (curveX + arrowStartX + arrowEndX - 28) / 2
  const valueY = (curveY + arrowStartY + arrowEndY - 20) / 2

  const edgeRef = useRef(null)

  useOutsideClick(edgeRef, () => showMenu === edge.id && setShowMenu(false))

  const [showCost, setShowCost] = useState(edge.cost)
  const [showMinFlow, setShowMinFlow] = useState(edge.min_flow || '-')
  const [showMaxFlow, setShowMaxFlow] = useState(edge.max_flow || '-')
  const [showCurve, setShowCurve] = useState(edge.display_data.curve)

  // Sync curvature, not sure why we need this...?
  useEffect(() => {
    setShowCurve(edge.display_data.curve)
  }, [edge.display_data.curve])

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

  const updateCost = updateValue(setShowCost, setCost)
  const updateMinFlow = updateValue(setShowMinFlow, setMinFlow)
  const updateMaxFlow = updateValue(setShowMaxFlow, setMaxFlow)

  function updateCurve(e) {
    setShowCurve(e.target.value)

    // only update if value is valid
    const value = parseFloat(e.target.value)
    if (Number.isFinite(value) && Math.abs(value) <= 1) {
      setCurve(edge, value)
    }
  }

  // Swap start and end so that the marker is contained within the value of the arrow line.
  return (
    <div style={{position: 'absolute', top: `${offsets.top + edgeTop - off}px`, left: `${offsets.left + edgeLeft - off}px`}}>
      <svg width={width + markerSize + 2 * Math.abs(magCurve)} height={height + markerSize + 2 * Math.abs(magCurve)}>
        <defs>
          <marker id='arrow' markerWidth={markerSize} markerHeight={markerSize} refX='1.5' refY='1.5' orient='auto'>
            <path d='M0,1.5 L6,3 L6,0 L0,1.5' style={{fill: 'var(--secondary)'}} />
          </marker>
        </defs>
        <path d={`M${arrowStartX},${arrowStartY} Q${controlX},${controlY} ${arrowEndX},${arrowEndY}`}
          style={{stroke: 'var(--secondary)', strokeWidth: '2px', fill: 'none', markerStart: 'url(#arrow)'}} />
      </svg>
      <div ref={edgeRef} onClick={() => mode === 'delete' ? deleteEdge(edge) : setShowMenu(edge.id)}>
        <ValueContainer top={valueY} left={valueX} angle={d_angle}>
          <p style={{margin: 0, padding: 0}}>
            {showCost}/
            <RedSpan>{showMinFlow}</RedSpan>/
            <GreenSpan>{showMaxFlow}</GreenSpan>
          </p>
        </ValueContainer>
        {showMenu === edge.id &&
          <DropdownMenu top={valueY + 10} left={valueX + 10} width={175}>
            <DropdownMenuRow>Edge Cost <FlexGrow /><SmallInput value={showCost} onChange={updateCost} /></DropdownMenuRow>
            <DropdownMenuRow>Edge Min Flow (u) <FlexGrow /><SmallInput value={showMinFlow} onChange={updateMinFlow} /></DropdownMenuRow>
            <DropdownMenuRow>Edge Max Flow (l) <FlexGrow /><SmallInput value={showMaxFlow} onChange={updateMaxFlow} /></DropdownMenuRow>
            <DropdownMenuRow>Curvature <FlexGrow /><SmallInput value={showCurve} onChange={updateCurve} style={{width: 35}} /></DropdownMenuRow>
          </DropdownMenu>
        }
      </div>
    </div>
  )
}
