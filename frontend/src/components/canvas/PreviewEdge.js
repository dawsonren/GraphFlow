import React, { Fragment } from 'react';

export const PreviewEdge = ({nodeRadius, fromNode, toX, toY}) => {
  const fromX = fromNode.display_data.left
  const fromY = fromNode.display_data.top

  const markerSize = 25
  const width = Math.abs(fromX - toX)
  const height = Math.abs(fromY - toY)

  const edgeLeft = Math.min(fromX, toX) - nodeRadius
  const edgeTop = Math.min(fromY, toY) - nodeRadius

  const angle = Math.atan((toY - fromY) / (toX - fromX))

  // For arctan, since range is not the full circle
  const flipConstant = Math.sign(toX - fromX)

  // The arrow should originate from the edge of the from node, not the center
  const reduceX = flipConstant * Math.cos(angle) * nodeRadius
  const reduceY = flipConstant * Math.sin(angle) * nodeRadius

  // Swapped b/c of this tip (see the last one by T Scherer)
  // https://stackoverflow.com/questions/31278293/svg-align-tip-of-marker-end-with-end-of-line
  const arrowStartX = toX - edgeLeft - reduceX
  const arrowStartY = toY - edgeTop - reduceY
  const arrowEndX = fromX - edgeLeft + reduceX
  const arrowEndY = fromY - edgeTop + reduceY

  return (
    <svg width={width + markerSize} height={height + markerSize}>
      <defs>
        <marker id='arrow' markerWidth={markerSize} markerHeight={markerSize} refX='1.5' refY='1.5' orient='auto'>
          <path d='M0,1.5 L6,3 L6,0 L0,1.5' style={{fill: 'var(--secondary)'}} />
        </marker>
      </defs>
      <path d={`M${arrowStartX},${arrowStartY} ${arrowEndX},${arrowEndY}`}
        style={{stroke: 'var(--secondary)', strokeWidth: '2px', fill: 'none', markerStart: 'url(#arrow)'}} />
    </svg>
  )

}
