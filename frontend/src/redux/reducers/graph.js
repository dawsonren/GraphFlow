///
/// Graph I/O
///

export const loadGraph = value => ({
  type: 'LOAD_GRAPH',
  value,
});

///
/// Graph Metadata
///

export const setGraphName = value => ({
  type: 'SET_GRAPH_NAME',
  value,
});

///
/// Graph Nodes
///

// Expects arguments to be top, left, radius, and id
export const addGraphNode = value => ({
  type: 'ADD_GRAPH_NODE',
  value
});

// Expects value to be node id
export const deleteGraphNode = value => ({
  type: 'DELETE_GRAPH_NODE',
  value,
});

export const modifyGraphNodeName = (id, name) => ({
  type: 'MODIFY_GRAPH_NODE_NAME',
  value: [id, name],
});

export const modifyGraphNodeType = (id, type) => ({
  type: 'MODIFY_GRAPH_NODE_TYPE',
  value: [id, type],
});

export const modifyGraphNodeDemand = (id, demand) => ({
  type: 'MODIFY_GRAPH_NODE_DEMAND',
  value: [id, demand],
});

// Expect pos to be an object with top, left, and radius fields.
export const modifyGraphNodePosition = (id, pos) => ({
  type: 'MODIFY_GRAPH_NODE_POSITION',
  value: [id, pos],
});

///
/// Graph Edges
///

// Expects value to be an Edge object
export const addGraphEdge = value => ({
  type: 'ADD_GRAPH_EDGE',
  value,
});

// Expects value to be edge id
export const deleteGraphEdge = value => ({
  type: 'DELETE_GRAPH_EDGE',
  value,
});

export const modifyGraphEdgeCost = (id, cost) => ({
  type: 'MODIFY_GRAPH_EDGE_COST',
  value: [id, cost],
});

export const modifyGraphEdgeMinflow = (id, min_flow) => ({
  type: 'MODIFY_GRAPH_EDGE_MINFLOW',
  value: [id, min_flow],
});

export const modifyGraphEdgeMaxflow = (id, max_flow) => ({
  type: 'MODIFY_GRAPH_EDGE_MAXFLOW',
  value: [id, max_flow],
});

export const modifyGraphEdgeCurve = (id, curve) => ({
  type: 'MODIFY_GRAPH_EDGE_CURVE',
  value: [id, curve],
});


///
/// Reset Graph
///

export const resetGraph = () => ({
  type: 'MODIFY_GRAPH_EDGE',
  value: null
});

const defaultState = {
  title: 'Untitled Graph',
  nodes: [],
  edges: []
};


// Given an array of objects with some field: value mapping
// and each object having a unique id, find the object
// with the id and update its attribute. Return the modified array.
function updateAttributeInList(list, id, field, value) {
  return list.map(item => {
    if (item.id === id) {
      const update = {}
      update[field] = value
      return { ...item, ...update }
    } else {
      return item
    }
  })
}

function updateDisplayAttributeInList(list, id, field, value) {
  return list.map(item => {
    if (item.id === id) {
      const new_data = item.display_data
      new_data[field] = value
      return { ...item, display_data: new_data }
    } else {
      return item
    }
  })
}

export const graph = (state = defaultState, { type, value }) => {
  console.log(type)
  console.log(value)
  if (type === 'LOAD_GRAPH') {
    return value
  } else if (type === 'SET_GRAPH_NAME') {
    return { ...state, name: value }
  } else if (type === 'ADD_GRAPH_NODE') {
    const oldNodes = [...state.nodes]
    return { ...state, nodes: [...oldNodes, value]}
  } else if (type === 'DELETE_GRAPH_NODE') {
    // Get rid of all edges related to the node
    const relatedEdges = state.edges
    .filter(edge => 
      edge.from === value || edge.to === value)
    .map(edge => edge.id)
    const oldNodes = [...state.nodes]
    const oldEdges = [...state.edges]
    
    const newNodes = oldNodes.filter(node => node.id !== value)
    const newEdges = oldEdges.filter(edge => !relatedEdges.includes(edge.id))

    return { ...state, nodes: newNodes, edges: newEdges }
  } else if (type === 'MODIFY_GRAPH_NODE_NAME') {
    const [id, name] = value
    const newNodes = updateAttributeInList(state.nodes, id, 'name', name)

    return { ...state, nodes: newNodes }
  } else if (type === 'MODIFY_GRAPH_NODE_TYPE') {
    const [id, type] = value
    const newNodes = updateAttributeInList(state.nodes, id, 'type', type)

    return { ...state, nodes: newNodes }
  } else if (type === 'MODIFY_GRAPH_NODE_DEMAND') {
    const [id, demand] = value
    const newNodes = updateAttributeInList(state.nodes, id, 'demand', demand)

    return { ...state, nodes: newNodes }
  } else if (type === 'MODIFY_GRAPH_NODE_POSITION') {
    const [id, pos] = value
    const newNodes = updateAttributeInList(state.nodes, id, 'display_data', pos)
    const node = newNodes.filter(n => n.id === id)

    // Update edges for all that are related to the node
    const oldEdges = [...state.edges]
    const newEdges = oldEdges.map(edge => {
      if (edge.from === id) {
        edge['display_data']['fromX'] = node.display_data.left + node.display_data.radius
        edge['display_data']['fromY'] = node.display_data.top + node.display_data.radius
      } else if (edge.to === node.id) {
        edge['display_data']['toX'] = node.display_data.left + node.display_data.radius
        edge['display_data']['toY'] = node.display_data.top + node.display_data.radius
      }

      return edge
    })

    return { ...state, nodes: newNodes, edges: newEdges }
  } else if (type === 'ADD_GRAPH_EDGE') {
    const oldEdges = [...state.edges]
    return { ...state, edges: [...oldEdges, value]}
  } else if (type === 'DELETE_GRAPH_EDGE') {
    const newEdges = state.edges.filter(edge => edge.id !== value)
    return { ...state, edges: newEdges }
  } else if (type === 'MODIFY_GRAPH_EDGE_COST') {
    const [id, cost] = value
    const newEdges = updateAttributeInList(state.edges, id, 'cost', cost)

    return { ...state, edges: newEdges }
  } else if (type === 'MODIFY_GRAPH_EDGE_MINFLOW') {
    const [id, min_flow] = value
    const newEdges = updateAttributeInList(state.edges, id, 'min_flow', min_flow)

    return { ...state, edges: newEdges }
  } else if (type === 'MODIFY_GRAPH_EDGE_MAXFLOW') {
    const [id, max_flow] = value
    const newEdges = updateAttributeInList(state.edges, id, 'max_flow', max_flow)

    return { ...state, edges: newEdges }
  } else if (type === 'MODIFY_GRAPH_EDGE_CURVE') {
    const [id, curve] = value
    const newEdges = updateDisplayAttributeInList(state.edges, id, 'curve', curve)

    return { ...state, edges: newEdges }
  } else if (type === 'RESET_GRAPH') {
    return defaultState
  }

  return state;
};
