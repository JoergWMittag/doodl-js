var frLayout;
frLayout = function frLayout(graph, dimension) {
  var attractive, cool, disp, force_constant, iteration, locations, max_dimension, max_iterations, min_temperature, positions, repulsive, step, temperature;
  iteration = 0;
  max_iterations = 500;
  max_dimension = Math.max(dimension.x, dimension.y);
  temperature = max_dimension / 10;
  min_temperature = 1 / max_dimension;
  force_constant = Math.sqrt(dimension.x * dimension.y / graph.num_nodes());
  locations = randomLayout(graph, dimension);
  disp = {};
  graph.each_node(function(node) {
    disp[node] = new Vector(0, 0);
    return disp[node];
  });
  repulsive = function repulsive(graph, dimension) {
    return graph.each_node(function(outer_node) {
      return graph.each_node(function(inner_node) {
        var delta, distance, force;
        if (inner_node !== outer_node) {
          delta = locations[outer_node].sub(locations[inner_node]);
          distance = Math.max(delta.length(), 0.0001);
          force = Math.pow(force_constant, 2) / distance;
          disp[outer_node] = disp[outer_node].add(delta * force / distance);
          return disp[outer_node];
        }
      });
    });
  };
  attractive = function attractive(graph, dimension) {
    return graph.each_edge(function(edge) {
      var _a, delta, dest, distance, force, source;
      _a = edge;
      source = _a[0];
      dest = _a[1];
      if (source !== dest) {
        delta = locations[source].sub(locations[dest]);
        distance = Math.max(delta.length(), 0.0001);
        force = Math.pow(distance, 2) / force_constant;
        disp[source] = disp[source].sub(delta * force / distance);
        disp[dest] = disp[dest].add(delta * force / distance);
        return disp[dest];
      }
    });
  };
  positions = function positions(graph, dimension) {
    var bounce;
    bounce = function bounce(dimension, loc) {
      loc.x = Math.min(Math.max(0, loc.x), dimension.x);
      loc.y = Math.min(Math.max(0, loc.y), dimension.y);
      return loc.y;
    };
    return graph.each_node(function(node) {
      var distance, dx, dy;
      distance = Math.min(disp[node].length(), 0.0001);
      dx = disp[node].x / distance * Math.min(temperature, Math.abs(disp[node].x));
      dy = disp[node].y / distance * Math.min(temperature, Math.abs(disp[node].y));
      return bounce(dimension, new Vector(dx, dy));
    });
  };
  cool = function cool() {
    return temperature *= 1 - iteration / max_iterations;
  };
  step = function step(graph, dimension) {
    iteration += 1;
    repulsive(graph, dimension);
    attractive(graph, dimension);
    positions(graph, dimension);
    return cool();
  };
  while (iteration < max_iterations && temperature > min_temperature) {
    step(graph, dimension);
  }
  return locations;
};
