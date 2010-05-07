class Graph
  constructor: (nodes, edges) ->
    @nodes: nodes
    @edges: edges

  nodes: []
  edges: []
  num_nodes: -> @nodes.length
  num_edges: -> @edges.length
  each_node: (action) -> action node for node in @nodes
  each_edge: (action) -> action edge for edge in @edges
  each_adjacent_edge: (action) -> action edge for edge in @edges when edge[0] is node
  out_degree: (node) ->
    (null for edge in @edges when edge[0] is node).length
  in_degree: (node) ->
    (null for edge in @edges when edge[1] is node).length
