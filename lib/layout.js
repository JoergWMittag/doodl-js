"use strict";

function Vector(x, y) {
    if (x !== undefined) {
        this.x = x;
    }
    if (y !== undefined) {
        this.y = y;
    }
}

Vector.prototype = {
    x: 0,
    y: 0,
    dist: function (other) {
        Math.sqrt(Math.pow((this.x - other.x), 2) + Math.pow((this.y - other.y), 2));
    },

    add:  function (other) {
        return new Vector(this.x + other.x, this.y + other.y);
    },

    sub: function (other) {
        return new Vector(this.x - other.x, this.y - other.y);
    },

    mul: function (scalar) {
        return new Vector(scalar * this.x, scalar * this.y);
    },

    div: function (scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    },

    length: function () {
        Math.sqrt(Math.pow(this.x, 2), Math.pow(this.y, 2));
    },

    normalize: function () {
        return this.div(this.length());
    }
};

function circleLayout(graph, dimension) {
    var locations = {},
        center = new Vector(dimension.x / 2, dimension.y / 2),
        radius = Math.min(center.x, center.y) * 0.75,
        main = 2 * Math.PI / graph.num_nodes(),
        index = 0;
    graph.each_node(function (node) {
        var x = center.x + radius * Math.sin(index * main),
            y = center.y + radius * Math.cos(index * main);
        locations[node] = new Vector(x, y);
        index += 1;
    });
    return locations;
}

function randomLayout(graph, dimension) {
    var locations = {};
    graph.each_node(function (node) {
        locations[node] = new Vector(Math.random() * dimension.x, Math.random() * dimension.y);
    });
    return locations;
}

/*members PI, add, cos, dist, div, each_node, length, min, mul, 
    normalize, num_nodes, pow, random, sin, sqrt, sub, x, y
*/
/*jslint white: true, onevar: true, undef: true, nomen: true, 
    eqeqeq: true, plusplus: true, bitwise: true, regexp: true, 
    newcap: true, immed: true, strict: true, maxlen: 99
*/
