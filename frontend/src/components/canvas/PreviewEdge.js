import React, { Fragment, useState, useEffect } from 'react';

const markerSize = 25

export const PreviewEdge = ({nodeRadius, fromNode, toX, toY, offsets}) => {
  const [edgeTop, setEdgeTop] = useState(null)
  const [edgeLeft, setEdgeLeft] = useState(null)
  const [svgWidth, setSvgWidth] = useState(null)
  const [svgHeight, setSvgHeight] = useState(null)
  const [arrowStartX, setArrowStartX] = useState(null)
  const [arrowStartY, setArrowStartY] = useState(null)
  const [arrowEndX, setArrowEndX] = useState(null)
  const [arrowEndY, setArrowEndY] = useState(null)

  const calculate = () => {
    const fromX = fromNode.display_data.left
    const fromY = fromNode.display_data.top

    const width = Math.abs(fromX - toX)
    const height = Math.abs(fromY - toY)

    const angle = Math.atan((toY - fromY) / (toX - fromX))

    // For arctan, since range is not the full circle
    const flipConstant = Math.sign(toX - fromX)

    // The arrow should originate from the edge of the from node, not the center
    const reduceX = flipConstant * Math.cos(angle) * nodeRadius
    const reduceY = flipConstant * Math.sin(angle) * nodeRadius

    // Swapped b/c of this tip (see the last one by T Scherer)
    // https://stackoverflow.com/questions/31278293/svg-align-tip-of-marker-end-with-end-of-line
    setArrowStartX(toX - edgeLeft)
    setArrowStartY(toY - edgeTop)
    setArrowEndX(fromX - edgeLeft + nodeRadius)
    setArrowEndY(fromY - edgeTop + nodeRadius)

    setSvgWidth(width + markerSize + nodeRadius)
    setSvgHeight(height + markerSize + nodeRadius)

    setEdgeLeft(Math.min(fromX, toX) - nodeRadius)
    setEdgeTop(Math.min(fromY, toY) - nodeRadius)
  }

  useEffect(() => {
    calculate()
  }, [fromNode, toX, toY, offsets])


  return (
    <div style={{position: 'absolute', top: `${offsets.top + edgeTop}px`, left: `${offsets.left + edgeLeft}px`}}>
      <svg width={svgWidth} height={svgHeight}>
        <defs>
          <marker id='arrow' markerWidth={markerSize} markerHeight={markerSize} refX='1.5' refY='1.5' orient='auto'>
            <path d='M0,1.5 L6,3 L6,0 L0,1.5' style={{fill: 'var(--secondary)'}} />
          </marker>
        </defs>
        <path d={`M${arrowStartX},${arrowStartY} ${arrowEndX},${arrowEndY}`}
          style={{stroke: 'var(--secondary)', strokeWidth: '2px', fill: 'none', markerStart: 'url(#arrow)'}} />
      </svg>
    </div>
  )

}
