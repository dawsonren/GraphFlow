import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useScrollPosition from '@react-hook/window-scroll'
import { useDispatch, useSelector } from 'react-redux'

import { Node } from './Node'
import { Edge } from './Edge'
import { PreviewEdge } from './PreviewEdge'
import { addGraphNode, deleteGraphNode, addGraphEdge, modifyGraphEdgeCurve } from '../../redux/reducers/graph';

const CanvasBase = styled.div`
  border: 2px solid var(--primary);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

const Cursor = styled.div`
  ${props => props.hide && 'display: none;'}
  position: fixed;
  pointer-events: none;
  background-color: var(--primary);
  height: ${props => props.nodeRadius * 2}px;
  width: ${props => props.nodeRadius * 2}px;
  border-radius: ${props => props.nodeRadius}px;
  box-sizing: border-box;
  z-index: 3;
  border: 2px solid var(--black);
`

export const Canvas = ({canvasWidth, canvasHeight}) => {
  // Redux
  const dispatch = useDispatch()
  const graph = useSelector(data => data.graph)
  const mode = useSelector(data => data.mode)

  // Utility
  const [highlight, setHighlight] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showPreviewNode, setShowPreviewNode] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const scrollY = useScrollPosition(60) // fps

  // ids must monotonically increase, since some nodes/edges may be deleted
  const [nodeCounter, setNodeCounter] = useState(0)
  const [edgeCounter, setEdgeCounter] = useState(0)

  // Next node/edge id should be larger than largest node/edge id
  useEffect(() => {
    if (graph.nodes.length > 0) {
      setNodeCounter(parseInt(graph.nodes.slice(-1)[0].id.slice(1)) + 1)
    }
    if (graph.edges.length > 0) {
      setEdgeCounter(parseInt(graph.edges.slice(-1)[0].id.slice(1)) + 1)
    }
  }, [graph])

  // For adding edges
  const [fromNode, setFromNode] = useState(null)
  const [toNode, setToNode] = useState(null)

  // Constants
  const nodeRadius = 15

  // Offsets
  const [offsets, setOffsets] = useState(null)
  useEffect(() => {
    setOffsets(document.getElementById('graph-canvas').getBoundingClientRect())
  }, [graph])

  // Reset edge adding when not on add edge
  useEffect(() => {
    if (mode !== 'add_edge') {
      setFromNode(null)
      setToNode(null)
    }
  }, [mode])

  // Help drag/drop nodes
  const canvasRef = useRef(null)
  const cursor = document.getElementById('preview-node')
  const preview_edge = document.getElementById('preview-edge')
  const canvas = document.getElementById('graph-canvas')

  ///
  /// ADD NODE FUNCTIONS
  ///

  function inBounds(top, left) {
    // Check out of canvas boundary
    if (top < 0 || top > (canvasHeight - (2 * nodeRadius)) || left < 0 || left > (canvasWidth - (2 * nodeRadius))) {
      return false
    }

    // Check too close to other nodes
    // Inefficient, should use k-d trees if # of nodes grow large
    for (const node of graph.nodes) {
      if (Math.pow(node.display_data.top - top, 2) + Math.pow(node.display_data.left - left, 2) < Math.pow(nodeRadius * 2, 2)) {
        return false
      }
    }

    return true
  }

  function handleAddNode(e) {
    const nodeTop = e.clientY - offsets.top - nodeRadius
    const nodeLeft = e.clientX - offsets.left - nodeRadius

    if (!inBounds(nodeTop, nodeLeft) || showMenu) { return }

    dispatch(addGraphNode({
      display_data: {
        top: nodeTop,
        left: nodeLeft,
        radius: nodeRadius
      },
      id: `n${nodeCounter}`,
      name: '',
      type: '',
      demand: 0
    }))

    setFromNode(null)
    setToNode(null)
  }

  ///
  /// ADD EDGE FUNCTIONS
  ///

  function handleNodeClick(e, node) {
    if (mode === 'add_edge') {
      if (!fromNode) {
        setFromNode(node)
      } else if (!toNode) {
        setToNode(node)
      } else {
        setFromNode(null)
        setToNode(null)
      }
    } else if (mode === 'delete') {
      dispatch(deleteGraphNode(node.id))
    }
  }

  useEffect(() => {
    if (fromNode && toNode && mode === 'add_edge') {
      // Don't allow multiple edges from a certain to-from node pair
      const notDuplicate = graph.edges.filter(edge => edge.from === fromNode.id && edge.to === toNode.id).length === 0
      // Don't allow nodes to link to themselves
      const notSelfLink = fromNode.id !== toNode.id

      // Creating a reciprocal pair? Need to change curvature!
      console.log('change curve');
      console.log(graph)
      const reciprocal = graph.edges.filter(edge => edge.to === fromNode.id && edge.from === toNode.id)[0]

      if (notDuplicate && notSelfLink) {
        if (reciprocal && reciprocal.length !== 0) {
          console.log(reciprocal)
          dispatch(modifyGraphEdgeCurve(reciprocal.id, -1))
          handleAddEdge(1)
        } else {
          handleAddEdge(0)
        }
      }
    }
  }, [fromNode, toNode])

  function handleAddEdge(curve) {
    dispatch(addGraphEdge({
      display_data: {
        fromX: fromNode.display_data.left + nodeRadius,
        fromY: fromNode.display_data.top + nodeRadius,
        toX: toNode.display_data.left + nodeRadius,
        toY: toNode.display_data.top + nodeRadius,
        curve: curve
      },
      from: fromNode.id,
      to: toNode.id,
      cost: 5,
      min_flow: null,
      max_flow: null,
      id: `e${edgeCounter}`
    }))

    setFromNode(null)
    setToNode(null)
  }

  function canvasHandleClick(e) {
    if (mode === 'add_node') {
      handleAddNode(e)
    }
  }

  ///
  /// Extras
  ///

  function handleCursorMove(e, cursor) {
    if (mode === 'add_node') {
      cursor.style.left = e.clientX - nodeRadius + 'px'
      cursor.style.top = e.clientY - nodeRadius + 'px'
    } else if (mode === 'add_edge') {
      setCursorPos({ x: e.clientX - offsets.left, y: e.clientY - offsets.top + scrollY})
    }
  }

  function canvasOnMouseEnter() {
    canvas.addEventListener('mousemove', e => handleCursorMove(e, cursor))
    if (mode === 'add_node') {
      setShowPreviewNode(true)
    }
  }

  function canvasOnMouseLeave() {
    canvas.removeEventListener('mousemove', e => handleCursorMove(e, cursor))
    if (mode === 'add_node') {
      setShowPreviewNode(false)
    }
  }

  return (
    <CanvasBase id='graph-canvas' onClick={(e) => canvasHandleClick(e)}
      width={canvasWidth} height={canvasHeight} ref={canvasRef}
      onMouseEnter={canvasOnMouseEnter} onMouseLeave={canvasOnMouseLeave}>
      {graph.nodes.map((node, i) => {
        return (
          <Node key={i} id={i} node={node} highlight={highlight} setHighlight={setHighlight} offsets={offsets}
            showMenu={showMenu} setShowMenu={(input) => mode === 'select' && setShowMenu(input)} canvasRef={canvasRef}
            handleNodeClick={handleNodeClick} />
        )
      })}
      {graph.edges.map((edge, i) => {
        return (
          <Edge key={i} edge={edge} nodeRadius={nodeRadius} offsets={offsets}
            showMenu={showMenu} setShowMenu={(input) => mode === 'select' && setShowMenu(input)} />
        )
      })}
      <Cursor id='preview-node' nodeRadius={nodeRadius} hide={!showPreviewNode} />
      {fromNode &&
        <PreviewEdge id='preview-edge' nodeRadius={nodeRadius} fromNode={fromNode} toX={cursorPos.x} toY={cursorPos.y}
          offsets={offsets}/>
      }
    </CanvasBase>
  )
}
