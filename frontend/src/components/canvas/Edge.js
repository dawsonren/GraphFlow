import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

export const Edge = ({edge, nodeRadius}) => {
  const markerSize = 20
  const width = Math.abs(edge.fromX - edge.toX)
  const height = Math.abs(edge.fromY - edge.toY)

  const edgeLeft = Math.min(edge.fromX, edge.toX) - nodeRadius
  const edgeTop = Math.min(edge.fromY, edge.toY) - nodeRadius

  const offsets = document.getElementById('graph-canvas').getBoundingClientRect()

  const angle = Math.atan((edge.toY - edge.fromY) / (edge.toX - edge.fromX))
  const reduceAmount = nodeRadius + 15
  // For arctan, since domain is not the full circle
  const flipConstant = Math.sign(edge.toX - edge.fromX)

  const arrowStartX = edge.fromX - edgeLeft + flipConstant * Math.cos(angle) * nodeRadius
  const arrowStartY = edge.fromY - edgeTop + flipConstant * Math.sin(angle) * nodeRadius
  const arrowEndX = edge.toX - edgeLeft - flipConstant * Math.cos(angle) * reduceAmount
  const arrowEndY = edge.toY - edgeTop -  flipConstant * Math.sin(angle) * reduceAmount

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
    </div>
  )
}
