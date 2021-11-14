import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Node } from './Node'
import { Edge } from './Edge'

const CanvasBase = styled.div`
  border: 2px solid var(--primary);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

export const Canvas = ({graphJson, setGraphJson, mode=''}) => {
  const [highlight, setHighlight] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const [nodes, setNodes] = useState(graphJson.nodes)
  const [edges, setEdges] = useState(graphJson.edges)

  const [fromNode, setFromNode] = useState(null)
  const [toNode, setToNode] = useState(null)

  const canvasWidth = 700
  const canvasHeight = 400
  const nodeRadius = 15

  useEffect(() => {
    setNodes(graphJson.nodes)
    setEdges(graphJson.edges)
  }, [graphJson])

  useEffect(() => {
    if (mode !== 'add_edge') {
      setFromNode(null)
      setToNode(null)
    }
  }, [mode])

  ///
  /// ADD NODE FUNCTIONS
  ///

  function drawNode(node) {
    const oldNodes = [...nodes]
    setNodes([...oldNodes, node])
  }

  function newNodeOnGraph(node) {
    const oldNodes = [...graphJson.nodes]
    setGraphJson({...graphJson, nodes: [...oldNodes, node]})
  }

  function inBounds(top, left) {
    // Check out of canvas boundary
    if (top < 0 || top > (canvasHeight - (2 * nodeRadius)) || left < 0 || left > (canvasWidth - (2 * nodeRadius))) {
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
    const offsets = document.getElementById('graph-canvas').getBoundingClientRect()
    const nodeTop = e.clientY - offsets.top - nodeRadius
    const nodeLeft = e.clientX - offsets.left - nodeRadius

    if (!inBounds(nodeTop, nodeLeft) || showMenu) { return }

    const newNode = {top: nodeTop, left: nodeLeft, radius: nodeRadius, id: nodes.length}
    drawNode(newNode)
    newNodeOnGraph(newNode)
  }

  ///
  /// ADD EDGE FUNCTIONS
  ///

  function drawEdge(edge) {
    const oldEdges = [...edges]
    setEdges([...oldEdges, edge])
  }

  function newEdgeOnGraph(edge) {
    const oldEdges = [...graphJson.edges]
    setGraphJson({...graphJson, edges: [...oldEdges, edge]})
  }

  function handleNodeClick(e, node) {
    // Stop from bubbling up to add edge
    e.stopPropagation()

    if (!fromNode) {
      setFromNode(node)
    } else if (!toNode) {
      setToNode(node)
    } else {
      setFromNode(null)
      setToNode(null)
    }
  }

  useEffect(() => {
    if (fromNode && toNode) {
      handleAddEdge()
    }
  }, [fromNode, toNode])

  function handleAddEdge() {
    const value = 5;

    const newEdge = {
      fromX: fromNode.left + nodeRadius,
      fromY: fromNode.top + nodeRadius,
      toX: toNode.left + nodeRadius,
      toY: toNode.top + nodeRadius,
      from: fromNode.id,
      to: toNode.id,
      value: value
    }

    drawEdge(newEdge)
    newEdgeOnGraph(newEdge)

    setFromNode(null)
    setToNode(null)
  }

  ///
  /// DELETE FUNCTIONS
  ///

  function handleDelete(e) {
    return
  }

  function canvasHandleClick(e) {
    switch (mode) {
      case 'add_node':
        handleAddNode(e)
        break
      case 'add_edge':
        return
      case 'select':
        return
      case 'delete':
        handleDelete(e)
        break
      case 'clear':
        setGraphJson({nodes: [], edges: []})
        setNodes([])
        return
      default:
        console.log('unrecognized modality')
    }
  }

  return (
    <CanvasBase id='graph-canvas' onClick={(e) => canvasHandleClick(e)}
      width={canvasWidth} height={canvasHeight}>
      {nodes.map((node, i) => {
        return (
          <Node key={i} id={i} node={node} highlight={highlight} setHighlight={setHighlight}
            showMenu={showMenu} setShowMenu={(input) => mode === 'select' && setShowMenu(input)}
            mode={mode} handleNodeClick={handleNodeClick} />
        )
      })}
      {edges.map((edge, i) => {
        return (
          <Edge key={i} edge={edge} nodeRadius={nodeRadius} />
        )
      })}
    </CanvasBase>
  )
}
