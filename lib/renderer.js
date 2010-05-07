var draw, render;
render = function render(ctx, graph, locations) {
  ctx.lineWidth = 3;
  graph.each_edge(function(edge) {
    var _a, ls, lt, source, target;
    _a = edge;
    source = _a[0];
    target = _a[1];
    ls = locations[source];
    lt = locations[target];
    ctx.beginPath();
    ctx.moveTo(ls.x, ls.y);
    ctx.lineTo(lt.x, lt.y);
    ctx.closePath();
    return ctx.stroke();
  });
  return graph.each_node(function(node) {
    var loc;
    loc = locations[node];
    ctx.beginPath();
    ctx.arc(loc.x, loc.y, 15, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();
    return ctx.stroke();
  });
};
draw = function draw(graph, layoutFunction) {
  var canvas, ctx, dim, locations;
  canvas = document.getElementById("canvas");
  dim = new Vector(canvas.width, canvas.height);
  ctx = canvas.getContext("2d");
  locations = layoutFunction(graph, dim);
  return render(ctx, graph, locations);
};
