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
  const [showEdgeMenu, setShowEdgeMenu] = useState(false)

  const [nodes, setNodes] = useState(graphJson.nodes)
  const [edges, setEdges] = useState(graphJson.edges)

  // ids must monotonically increase, since some nodes/edges may be deleted
  const [nodeCounter, setNodeCounter] = useState(0)
  const [edgeCounter, setEdgeCounter] = useState(0)

  const [fromNode, setFromNode] = useState(null)
  const [toNode, setToNode] = useState(null)

  const canvasWidth = 700
  const canvasHeight = 400
  const nodeRadius = 15

  // Modify JSON to modify View
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
      if (Math.pow(node.display_data.top - top, 2) + Math.pow(node.display_data.left - left, 2) < Math.pow(nodeRadius * 2, 2)) {
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

    const newNode = {
      display_data: {
        top: nodeTop,
        left: nodeLeft,
        radius: nodeRadius,
      },
      id: nodeCounter
    }
    setNodeCounter(nodeCounter + 1)
    newNodeOnGraph(newNode)
  }

  function deleteNode(node) {
    const oldNodes = [...graphJson.nodes]
    setGraphJson({...graphJson, nodes: oldNodes.filter((n) => n.id !== node.id)})
  }

  ///
  /// ADD EDGE FUNCTIONS
  ///

  function newEdgeOnGraph(edge) {
    const oldEdges = [...graphJson.edges]
    setGraphJson({...graphJson, edges: [...oldEdges, edge]})
  }

  function setEdgeValueOnGraph(field) {
    return (edge, value) => {
      const oldEdges = [...graphJson.edges]
      const newEdges = oldEdges.map((e) => {
        if (e.id === edge.id) {
          // It's ok to modify e, since it's passed by value.
          e[field] = value
        }
        return e
      })
      setGraphJson({...graphJson, edges: newEdges})
    }
  }

  const setEdgeWeightOnGraph = setEdgeValueOnGraph('weight')
  const setEdgeMinFlowOnGraph = setEdgeValueOnGraph('min_flow')
  const setEdgeMaxFlowOnGraph = setEdgeValueOnGraph('max_flow')

  function handleNodeClick(e, node) {
    // Stop from bubbling up to canvasHandleClick
    e.stopPropagation()

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
      deleteNode(node)
      const related_edges = graphJson.edges.filter((edge) => edge.from === node.id || edge.to === node.id)
      console.log(related_edges)
      for (const edge of related_edges) {
        deleteEdge(edge)
      }
    }
  }

  useEffect(() => {
    if (fromNode && toNode && mode === 'add_edge') {
      // Don't allow multiple edges from a certain to-from node pair
      const notDuplicate = graphJson.edges.filter((edge) => edge.from === fromNode.id && edge.to === toNode.id).length === 0
      // Don't allow nodes to link to themselves
      const notSelfLink = fromNode.id !== toNode.id
      if (notDuplicate && notSelfLink) {
        handleAddEdge()
      }
    }
  }, [fromNode, toNode])

  function handleAddEdge() {
    const weight = 5;

    const newEdge = {
      display_data: {
        fromX: fromNode.display_data.left + nodeRadius,
        fromY: fromNode.display_data.top + nodeRadius,
        toX: toNode.display_data.left + nodeRadius,
        toY: toNode.display_data.top + nodeRadius,
      },
      from: fromNode.id,
      to: toNode.id,
      weight: weight,
      min_flow: null,
      max_flow: null,
      id: edgeCounter
    }

    setEdgeCounter(edgeCounter + 1)
    newEdgeOnGraph(newEdge)

    setFromNode(null)
    setToNode(null)
  }

  function deleteEdge(edge) {
    const oldEdges = [...graphJson.edges]
    setGraphJson({...graphJson, edges: oldEdges.filter((e) => e.id !== edge.id)})
  }

  function canvasHandleClick(e) {
    if (mode === 'add_node') {
      handleAddNode(e)
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
          <Edge key={i} edge={edge} nodeRadius={nodeRadius}
            showEdgeMenu={showEdgeMenu} setShowEdgeMenu={(input) => mode === 'select' && setShowEdgeMenu(input)}
            setWeight={setEdgeWeightOnGraph} setMinFlow={setEdgeMinFlowOnGraph} setMaxFlow={setEdgeMaxFlowOnGraph}/>
        )
      })}
    </CanvasBase>
  )
}
