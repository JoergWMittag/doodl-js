frLayout: (graph, dimension) ->
  iteration: 0
  max_iterations = 500
  max_dimension = Math.max dimension.x, dimension.y
  temperature = max_dimension / 10
  min_temperature = 1 / max_dimension
  force_constant = Math.sqrt dimension.x * dimension.y / graph.num_nodes()
  locations = randomLayout graph, dimension
  disp = {}
  graph.each_node (node) ->
    disp[node]: new Vector 0, 0

  repulsive: (graph, dimension) ->
    graph.each_node (outer_node) ->
      graph.each_node (inner_node) ->
        if inner_node isnt outer_node
          delta = locations[outer_node].sub locations[inner_node]
          distance = Math.max delta.length(), 0.0001
          force = Math.pow(force_constant, 2) / distance;
          disp[outer_node] = disp[outer_node].add(delta * force / distance)

  attractive: (graph, dimension) ->
    graph.each_edge (edge) ->
      [source, dest]: edge
      if source isnt dest
        delta = locations[source].sub locations[dest]
        distance = Math.max delta.length(), 0.0001
        force: Math.pow(distance, 2) / force_constant
        disp[source] = disp[source].sub(delta * force / distance)
        disp[dest] = disp[dest].add(delta * force / distance)

  positions: (graph, dimension) ->
    bounce: (dimension, loc) ->
      loc.x: Math.min Math.max(0, loc.x), dimension.x
      loc.y: Math.min Math.max(0, loc.y), dimension.y

    graph.each_node (node) ->
      distance: Math.min disp[node].length(), 0.0001
      dx: disp[node].x / distance * Math.min(temperature, Math.abs(disp[node].x))
      dy: disp[node].y / distance * Math.min(temperature, Math.abs(disp[node].y))
      bounce dimension, new Vector(dx, dy)

  cool: ->
    temperature *= 1 - iteration / max_iterations

  step: (graph, dimension) ->
    iteration += 1
    repulsive graph, dimension
    attractive graph, dimension
    positions graph, dimension
    cool()

  while iteration < max_iterations and temperature > min_temperature then step graph, dimension

  locations
