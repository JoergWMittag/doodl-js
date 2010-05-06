"use strict";

function render(ctx, graph, locations) {
    ctx.lineWidth = 3;
    graph.each_edge(function (edge) {
        var source = edge[0],
            target = edge[1],
            ls = locations[source],
            lt = locations[target];
        ctx.beginPath();
        ctx.moveTo(ls.x, ls.y);
        ctx.lineTo(lt.x, lt.y);
        ctx.closePath();
        ctx.stroke();
    });
    graph.each_node(function (node) {
        var loc = locations[node];
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, 15, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.stroke();
    });

}

function draw() {
    var graph = new Graph([1, 2, 3, 4, 5], [[1, 2], [2, 3], [3, 1], [1, 3]]),
        canvas = document.getElementById("canvas"),
        dim = new Vector(canvas.width, canvas.height),
        layout = new RandomLayout(),
    //     layout = new CircleLayout(),
        ctx = canvas.getContext("2d"),
        locations = layout.layout(graph, dim);
    layout.layout(graph, dim);

    render(ctx, graph, locations);
}

/*globals Graph, RandomLayout, Vector
*/
/*members PI, arc, beginPath, closePath, each_edge, each_node, fill, 
    fillStyle, getContext, getElementById, height, layout, lineTo, 
    lineWidth, moveTo, stroke, width, x, y
*/
/*jslint white: true, browser: true, onevar: true, undef: true, 
    nomen: true, eqeqeq: true, plusplus: true, bitwise: true, 
    regexp: true, newcap: true, immed: true, strict: true, 
    maxlen: 77
*/