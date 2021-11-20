import React, { Fragment, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Node } from './Node'
import { Edge } from './Edge'

const CanvasBase = styled.div`
  border: 2px solid var(--primary);
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

export const Canvas = ({graphJson, setGraphJson, mode=''}) => {
  // Utility
  const [highlight, setHighlight] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  // Controlled by JSON
  const [nodes, setNodes] = useState(graphJson.nodes)
  const [edges, setEdges] = useState(graphJson.edges)

  // ids must monotonically increase, since some nodes/edges may be deleted
  const [nodeCounter, setNodeCounter] = useState(0)
  const [edgeCounter, setEdgeCounter] = useState(0)

  // For adding edges
  const [fromNode, setFromNode] = useState(null)
  const [toNode, setToNode] = useState(null)

  // Constants
  const canvasWidth = 700
  const canvasHeight = 400
  const nodeRadius = 15

  // Offsets
  const [offsets, setOffsets] = useState(null)
  useEffect(() => {
    setOffsets(document.getElementById('graph-canvas').getBoundingClientRect())
  }, [])

  // Modify JSON to modify View
  useEffect(() => {
    setNodes(graphJson.nodes)
    setEdges(graphJson.edges)
  }, [graphJson])

  // Reset edge adding when not on add mode
  useEffect(() => {
    if (mode !== 'add') {
      setFromNode(null)
      setToNode(null)
    }
  }, [mode])

  // Help drag/drop nodes
  const canvasRef = useRef(null)

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
    const nodeTop = e.clientY - offsets.top - nodeRadius
    const nodeLeft = e.clientX - offsets.left - nodeRadius

    if (!inBounds(nodeTop, nodeLeft) || showMenu) { return }

    const newNode = {
      display_data: {
        top: nodeTop,
        left: nodeLeft,
        radius: nodeRadius,
      },
      id: `n${nodeCounter}`,
      name: '',
      type: '',
      supply: 0
    }
    setNodeCounter(nodeCounter + 1)
    newNodeOnGraph(newNode)

    setFromNode(null)
    setToNode(null)
  }

  function deleteNode(node) {
    const related_edge_ids = graphJson.edges.filter((edge) => edge.from === node.id || edge.to === node.id).map((edge) => edge.id)
    const oldNodes = [...graphJson.nodes]
    const oldEdges = [...graphJson.edges]

    const newNodes = oldNodes.filter((n) => n.id !== node.id)
    const newEdges = oldEdges.filter((e) => !related_edge_ids.includes(e.id))
    setGraphJson({nodes: newNodes, edges: newEdges})
  }

  function setNodeValueOnGraph(field) {
    return (node, value) => {
      const oldNodes = [...graphJson.nodes]
      const newNodes = oldNodes.map((n) => {
        if (n.id === node.id) {
          // It's ok to modify e, since it's passed by value.
          n[field] = value
        }
        return n
      })
      setGraphJson({...graphJson, nodes: newNodes})
    }
  }

  const setNodeNameOnGraph = setNodeValueOnGraph('name')
  const setNodeTypeOnGraph = setNodeValueOnGraph('type')

  // Update node and edge position
  function setNodePosOnGraph(node, value) {
    if (!inBounds(value.top, value.left)) { return }

    // Update node position
    const oldNodes = [...graphJson.nodes]
    const newNodes = oldNodes.map((n) => {
      if (n.id === node.id) {
        // It's ok to modify e, since it's passed by value.
        n['display_data'] = value
      }
      return n
    })

    // Update edge position
    const oldEdges = [...graphJson.edges]
    const newEdges = oldEdges.map((e) => {
      if (e.from === node.id) {
        e['display_data']['fromX'] = node.display_data.left + node.display_data.radius
        e['display_data']['fromY'] = node.display_data.top + node.display_data.radius
      } else if (e.to === node.id) {
        e['display_data']['toX'] = node.display_data.left + node.display_data.radius
        e['display_data']['toY'] = node.display_data.top + node.display_data.radius
      }

      return e
    })
    setGraphJson({ edges: newEdges, nodes: newNodes })
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
  const setEdgeSupplyOnGraph = setEdgeValueOnGraph('supply')

  function setEdgeCurveOnGraph(edge, value) {
    const oldEdges = [...graphJson.edges]
    const newEdges = oldEdges.map((e) => {
      if (e.id === edge.id) {
        // It's ok to modify e, since it's passed by value.
        e['display_data']['curve'] = value
      }
      return e
    })
    setGraphJson({...graphJson, edges: newEdges})
  }

  function handleNodeClick(e, node) {
    // Stop from bubbling up to canvasHandleClick
    e.stopPropagation()

    if (mode === 'add') {
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
    }
  }

  useEffect(() => {
    if (fromNode && toNode && mode === 'add') {
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
    const newEdge = {
      display_data: {
        fromX: fromNode.display_data.left + nodeRadius,
        fromY: fromNode.display_data.top + nodeRadius,
        toX: toNode.display_data.left + nodeRadius,
        toY: toNode.display_data.top + nodeRadius,
        curve: 0
      },
      from: fromNode.id,
      to: toNode.id,
      weight: 5,
      min_flow: null,
      max_flow: null,
      id: `e${edgeCounter}`
    }

    setEdgeCounter(edgeCounter + 1)
    newEdgeOnGraph(newEdge)

    setFromNode(null)
    setToNode(null)
  }

  function deleteEdge(edge) {
    const oldEdges = [...graphJson.edges]
    const newJson = {...graphJson, edges: oldEdges.filter((e) => e.id !== edge.id)}
    setGraphJson(newJson)
  }

  function canvasHandleClick(e) {
    if (mode === 'add') {
      handleAddNode(e)
    }
  }

  return (
    <CanvasBase id='graph-canvas' onClick={(e) => canvasHandleClick(e)}
      width={canvasWidth} height={canvasHeight} ref={canvasRef}>
      {nodes.map((node, i) => {
        return (
          <Node key={i} id={i} node={node} highlight={highlight} setHighlight={setHighlight} offsets={offsets}
            showMenu={showMenu} setShowMenu={(input) => mode === 'select' && setShowMenu(input)}
            mode={mode} handleNodeClick={handleNodeClick} setName={setNodeNameOnGraph} setType={setNodeTypeOnGraph}
            setPos={setNodePosOnGraph} canvasRef={canvasRef} setSupply={setEdgeSupplyOnGraph} />
        )
      })}
      {edges.map((edge, i) => {
        return (
          <Edge key={i} edge={edge} nodeRadius={nodeRadius} offsets={offsets}
            showMenu={showMenu} setShowMenu={(input) => mode === 'select' && setShowMenu(input)}
            setWeight={setEdgeWeightOnGraph} setMinFlow={setEdgeMinFlowOnGraph} setMaxFlow={setEdgeMaxFlowOnGraph}
            mode={mode} deleteEdge={deleteEdge} setCurve={setEdgeCurveOnGraph} />
        )
      })}
    </CanvasBase>
  )
}
