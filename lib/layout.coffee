class Vector
  constructor: (x, y) ->
    @x = x
    @y = y

  dist: (other) -> Math.sqrt Math.pow(@x - other.x, 2) + Math.pow(@y - other.y, 2)
  add: (other) -> new Vector @x + other.x, @y + other.y
  sub: (other) -> new Vector @x - other.x, @y - other.y
  mul: (scalar) -> new Vector scalar * @x, scalar * @y
  div: (scalar) -> new Vector scalar / @x, scalar / @y
  length: -> Math.sqrt Math.pow(@x, 2), Math.pow(@y, 2)
  normalize: -> @div @length

circleLayout: (graph, dimension) ->
  locations: {}
  center: new Vector dimension.x / 2, dimension.y / 2
  radius: Math.min(center.x, center.y) * 0.75
  main: 2 * Math.PI / graph.num_nodes()
  index: 0
  graph.each_node (node) ->
    x: center.x + radius * Math.sin(index * main)
    y: center.y + radius * Math.cos(index * main)
    locations[node]: new Vector x, y
    index += 1

  locations

randomLayout: (graph, dimension) ->
  locations: {}
  graph.each_node (node) ->
    locations[node] = new Vector Math.random() * dimension.x, Math.random() * dimension.y

  locations
