var Graph;
Graph = function Graph(nodes, edges) {
  this.nodes = nodes;
  this.edges = edges;
  return this;
};
Graph.prototype.nodes = [];
Graph.prototype.edges = [];
Graph.prototype.num_nodes = function num_nodes() {
  return this.nodes.length;
};
Graph.prototype.num_edges = function num_edges() {
  return this.edges.length;
};
Graph.prototype.each_node = function each_node(action) {
  var _a, _b, _c, _d, node;
  _a = []; _c = this.nodes;
  for (_b = 0, _d = _c.length; _b < _d; _b++) {
    node = _c[_b];
    _a.push(action(node));
  }
  return _a;
};
Graph.prototype.each_edge = function each_edge(action) {
  var _a, _b, _c, _d, edge;
  _a = []; _c = this.edges;
  for (_b = 0, _d = _c.length; _b < _d; _b++) {
    edge = _c[_b];
    _a.push(action(edge));
  }
  return _a;
};
Graph.prototype.each_adjacent_edge = function each_adjacent_edge(action) {
  var _a, _b, _c, _d, edge;
  _a = []; _c = this.edges;
  for (_b = 0, _d = _c.length; _b < _d; _b++) {
    edge = _c[_b];
    edge[0] === node ? _a.push(action(edge)) : null;
  }
  return _a;
};
Graph.prototype.out_degree = function out_degree(node) {
  var _a, _b, _c, _d, edge;
  return (function() {
    _a = []; _c = this.edges;
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      edge = _c[_b];
      edge[0] === node ? _a.push(null) : null;
    }
    return _a;
  }).call(this).length;
};
Graph.prototype.in_degree = function in_degree(node) {
  var _a, _b, _c, _d, edge;
  return (function() {
    _a = []; _c = this.edges;
    for (_b = 0, _d = _c.length; _b < _d; _b++) {
      edge = _c[_b];
      edge[1] === node ? _a.push(null) : null;
    }
    return _a;
  }).call(this).length;
};
