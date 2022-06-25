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

// Expects node to be a Node object
export const addGraphNode = value => ({
  type: 'ADD_GRAPH_NODE',
  value,
});

// Expects value to be node id
export const deleteGraphNode = value => ({
  type: 'DELETE_GRAPH_NODE',
  value,
});

// Expects attrs to be a mapping from node
// field to value
export const modifyGraphNode = (id, attrs) => ({
  type: 'MODIFY_GRAPH_NODE',
  value: [id, attrs],
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

// Expects attrs to be a mapping from edge
// field to value
export const modifyGraphEdge = (id, attrs) => ({
  type: 'MODIFY_GRAPH_EDGE',
  value: [id, attrs],
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

export const graph = (state = defaultState, { type, value }) => {
  if (type === 'LOAD_GRAPH') {
    return value
  } else if (type === 'SET_GRAPH_NAME') {
    return { ...state, name: value }
  } else if (type === 'ADD_GRAPH_NODE') {
    const oldNodes = [...state.nodes]
    return { ...state, nodes: [...oldNodes, value]}
  } else if (type === 'DELETE_GRAPH_NODE') {
    const relatedEdges = state.edges
    .filter(edge => 
      edge.from === value || edge.to === value)
    .map(edge => edge.id)
    const oldNodes = [...state.nodes]
    const oldEdges = [...state.edges]

    const newNodes = oldNodes.filter(node => node.id !== value)
    const newEdges = oldEdges.filter(edge => !relatedEdges.includes(edge.id))

    return { ...state, nodes: newNodes, edges: newEdges }
  } else if (type === 'MODIFY_GRAPH_NODE') {
    const [id, attrs] = value
    const newNodes = [...state.nodes]
    newNodes.map(node => {
      if (node.id === id) {
        return { ...node, ...attrs }
      } else {
        return node
      }
    })
  } else if (type === 'ADD_GRAPH_EDGE') {
    const oldEdges = [...state.edges]
    return { ...state, edges: [...oldEdges, value]}
  } else if (type === 'DELETE_GRAPH_EDGE') {
    const newEdges = state.edges.filter(edge => edge.id !== value)
    return { ...state, edges: newEdges }
  } else if (type === 'MODIFY_GRAPH_EDGE') {
    const [id, attrs] = value
    const newEdges = [...state.edges]
    newEdges.map(edge => {
      if (edge.id === id) {
        return { ...edge, ...attrs }
      } else {
        return edge
      }
    })
  } else if (type === 'RESET_GRAPH') {
    return defaultState
  }

  return state;
};
