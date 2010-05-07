render: (ctx, graph, locations) ->
  ctx.lineWidth: 3
  graph.each_edge (edge) ->
    [source, target]: edge
    ls: locations[source]
    lt: locations[target]
    ctx.beginPath()
    ctx.moveTo ls.x, ls.y
    ctx.lineTo lt.x, lt.y
    ctx.closePath()
    ctx.stroke()

  graph.each_node (node) ->
    loc: locations[node]
    ctx.beginPath();
    ctx.arc loc.x, loc.y, 15, 0, Math.PI * 2, false
    ctx.closePath()
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.fill()
    ctx.stroke()

draw: (graph, layoutFunction) ->
  canvas: document.getElementById "canvas"
  dim: new Vector canvas.width, canvas.height
  ctx: canvas.getContext "2d"
  locations: layoutFunction graph, dim
  render ctx, graph, locations
