/*
Taken from:
https://networkx.org/documentation/stable/_modules/networkx/algorithms/flow/networksimplex.html#network_simplex
*/


export function solveNetwork(graphData, setError) {
  console.log(graphData)
  const nodes = graphData.nodes
  const edges = graphData.edges

  const nodeDemands = nodes.map(node => node.demand)
  const edgeCosts = edges.map(edge => edge.cost)
  const edgeMaxFlows = edges.map(edge => edge.max_flow)

  if (nodes.length === 0) {
    setError('graph has no nodes')
  }

  ///
  /// Quick Error Detection
  ///
  if (nodeDemands.includes(Infinity)) {
    setError(`a node has infinite demand`)
  }

  if (edgeCosts.includes(Infinity)) {
    setError(`an edge has infinite cost`)
  }

  ///
  /// Quick Infeasibility Detection
  ///
  if (nodeDemands.sum() !== 0) {
    setError('total node demand is not zero')
  }
  edges.forEach(edge => {
    if (edge.max_flow < 0) {
      setError(`edge ${edge.id} has negative capacity`)
    }
  })

  ///
  /// Initialization
  ///
  
}
