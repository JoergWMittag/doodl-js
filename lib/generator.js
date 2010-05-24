function complete(size) {
    var nodes = [],
        edges = [];
    for (var i = 1; i <= size; i += 1) {
        nodes.push(i);
        for (var j = 1; j <= size; j += 1) {
            if (i !== j) {
                edges.push([i, j]);
            }
        }
    }
    return new Graph(nodes, edges);
}

function completeBipartite(size) {
    var ns = [],
        edges = [],
        i;
   for (i = 1; i <= size; i++) {
       ns.push(i);
       for (var j = 1; j <= size; j += 1) {
           if ((i % 2) + (j % 2) == 1) {
               edges.push([i, j]);
           }
       }
  }
    return new Graph(ns, edges);
}

function linear(size) {
    var nodes = [],
        edges = [],
        i;
    for (i = 1; i <= size; i += 1) {
        nodes.push(i);
        if (i + 1 <= size) {
            edges.push([i, i+1]);
        }
    }
    return new Graph(nodes, edges);
}

function ring(size) {
    var nodes = [],
        edges = [],
        i;
    for (i = 1; i <= size; i += 1) {
        nodes.push(i);
        if (i + 1 <= size) {
            edges.push([i, i+1]);
        }
    }
    if (size > 2) {
        edges.push([size, 1]);
    }
    return new Graph(nodes, edges);
}

function star(size) {
    var nodes = [],
        edges = [],
        i;
    for (i = 1; i <= size; i += 1) {
        nodes.push(i);
        if (i > 1) {
            edges.push([1, i]);
        }
    }
    return new Graph(nodes, edges);
}

function wheel (size) {
    var nodes = [],
        edges = [],
        i;
    for (i = 1; i <= size; i += 1) {
        nodes.push(i);
        if (i > 1) {
            edges.push([1, i]);
            if (i  == size) {
                edges.push([i, 2]);
            }
            else {
                edges.push([i, i + 1]);
            }
        }
    }
    return new Graph(nodes, edges);
}

function random (numOfNodes, numOfEdges) {
    var c = complete(10),
        nodes = c.nodes,
        edges = [],
        i, j;
    for (i = 0; i < numOfEdges; i += 1) {
        j = Math.floor(Math.random() * c.edges.length);
        edges.push(c.edges.splice(j, 1));
    }
    return new Graph(nodes, edges);
}

function scaleFree(size) {
    var i, j, prob, links, rand
        edges = [],
        nodes = [];
    for (i = 1; i <= size; i += 1) {
        nodes.push(i);
        for (j = 1; j < i; j += 1) {
            rand = Math.random();
            links = numLinks(j);
            prob = links / edges.length;
            if (edges.length == 0 || rand < prob) {
                edges.push([i, j]);
            }
        }
    }
    return new Graph(nodes, edges);

    function numLinks (node) {
        return edges.reduce(function functionName (prev, curr, i, a) {
            if (curr[0] == node || curr[1] == node) {
                return prev + 1;
            }
            else {
                return prev;
            }
        }, 0);
    }
}