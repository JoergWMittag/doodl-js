var Vector, circleLayout, randomLayout;
Vector = function Vector(x, y) {
  this.x = x;
  this.y = y;
  return this;
};
Vector.prototype.dist = function dist(other) {
  return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
};
Vector.prototype.add = function add(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.sub = function sub(other) {
  return new Vector(this.x - other.x, this.y - other.y);
};
Vector.prototype.mul = function mul(scalar) {
  return new Vector(scalar * this.x, scalar * this.y);
};
Vector.prototype.div = function div(scalar) {
  return new Vector(scalar / this.x, scalar / this.y);
};
Vector.prototype.length = function length() {
  return Math.sqrt(Math.pow(this.x, 2), Math.pow(this.y, 2));
};
Vector.prototype.normalize = function normalize() {
  return this.div(this.length);
};
circleLayout = function circleLayout(graph, dimension) {
  var center, index, locations, main, radius;
  locations = {};
  center = new Vector(dimension.x / 2, dimension.y / 2);
  radius = Math.min(center.x, center.y) * 0.75;
  main = 2 * Math.PI / graph.num_nodes();
  index = 0;
  graph.each_node(function(node) {
    var x, y;
    x = center.x + radius * Math.sin(index * main);
    y = center.y + radius * Math.cos(index * main);
    locations[node] = new Vector(x, y);
    return index += 1;
  });
  return locations;
};
randomLayout = function randomLayout(graph, dimension) {
  var locations;
  locations = {};
  graph.each_node(function(node) {
    locations[node] = new Vector(Math.random() * dimension.x, Math.random() * dimension.y);
    return locations[node];
  });
  return locations;
};
