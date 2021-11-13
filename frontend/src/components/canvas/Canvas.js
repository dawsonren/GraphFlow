import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Node } from './Node'

const CanvasBase = styled.div`
  border: 2px solid var(--primary);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

export const Canvas = ({graphJson, setGraphJson, mode=''}) => {
  const [nodes, setNodes] = useState([])
  const [highlight, setHighlight] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const canvasWidth = 700
  const canvasHeight = 400
  const nodeRadius = 15

  function drawNode(node) {
    const oldNodes = [...nodes]
    setNodes([...oldNodes, node])
  }

  function newNodeOnGraph(node) {
    const oldNodes = [...graphJson.nodes]
    setGraphJson({...graphJson, nodes: [...oldNodes, node]})
  }

  function inBounds(top, left) {
    const offsets = document.getElementById('graph-canvas').getBoundingClientRect()

    // Check out of canvas boundary
    if (top < 0 || top > (canvasHeight + offsets.top - (2 * nodeRadius)) || left < 0 || left > (canvasWidth + offsets.left - (2 * nodeRadius))) {
      return false
    }

    // Check too close to other nodes
    // Inefficient, should use k-d trees if # of nodes grow large
    for (const node of nodes) {
      if (Math.pow(node.top - top, 2) + Math.pow(node.left - left, 2) < Math.pow(nodeRadius * 2, 2)) {
        return false
      }
    }

    return true
  }

  function handleAddNode(e) {
    const nodeTop = e.clientY - nodeRadius
    const nodeLeft = e.clientX - nodeRadius

    if (!inBounds(nodeTop, nodeLeft) || showMenu) { return }

    const newNode = {top: nodeTop, left: nodeLeft, radius: nodeRadius, id: nodes.length}
    drawNode(newNode)
    newNodeOnGraph(newNode)
  }

  function handleAddEdge(e) {
    return
  }

  function canvasHandleClick(e) {
    switch (mode) {
      case 'add_node':
        handleAddNode(e)
      case 'add_edge':
        handleAddEdge(e)
      default:
        return
    }
  }

  return (
    <CanvasBase id='graph-canvas' onClick={(e) => canvasHandleClick(e)}
      width={canvasWidth} height={canvasHeight}>
      {nodes.map((node, i) => {
        return (
          <Node key={i} id={i} node={node} highlight={highlight} setHighlight={setHighlight}
            showMenu={showMenu} setShowMenu={(input) => mode === 'select' && setShowMenu(input)} />
        )
      })}
    </CanvasBase>
  )
}
