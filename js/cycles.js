/**
 * Created by lavor on 01.05.2016.
 */

// var edges = [[37,36], [37,168], [37,85], [37,2264], [37,3203], [36,85], [36,536], [36,5097], [85,168], [85,654], [85,755], [85,3607], [85,4021], [85,5097], [168,755], [536,4021], [536,5097], [536,5464], [536,6533], [654,3607], [654,4021], [654,5564], [654,6533], [755,2357], [755,3203], [755,3607], [2264,2357], [2264,3203], [2357,3203], [4021,5097], [5464,5564], [5464,6533], [5564,6533]];
var edges = [
    [1,2],
    [1,3],
    [1,6],
    [2,1],
    [2,3],
    [2,4],
    [2,5],
    [2,6],
    [3,1],
    [3,2],
    [3,4],
    [3,6],
    [4,2],
    [4,3],
    [4,5],
    [4,6],
    [5,2],
    [5,4],
    [5,6],
    [6,1],
    [6,2],
    [6,3],
    [6,4],
    [6,5]
];
var cycles = [];

function findAllCycles() {
    var i, j, len;

    var st1 = new Date().getTime();

    for (i = 0; i < edges.length; i++) {
        var edge = edges[i];
        for (j = 0; j < 2; j++) {
            findNewCycles( [edge[j]] );
        }
    }

    var st2 = new Date().getTime();
    console.log("time: " + (st2-st1));
};

function findNewCycles(path) {
    var startNode = path[0],
        nextNode;

    // visit each edge and each node of each edge
    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];
        for (var j = 0; j < 2; j++) {
            var node = edge[j];
            if (node === startNode) //  edge refers to our current node
            {
                nextNode = edge[(j + 1) % 2];
                if ( !visited(nextNode, path) ) { //  neighbor node not on path yet
                    //  explore extended path
                    findNewCycles( [nextNode].concat(path), edges, cycles );
                }
                else if ( (path.length > 2) && (nextNode === path[path.length - 1]) ) { //  cycle found
                    //var p = normalize(path);
                    //var inv = invert(p);
                    if ( isNew(path, cycles) ) {
                        cycles.push(path);
                    }
                }
            }
        }
    }
}

// check if vertex n is contained in path
function visited(node, path) {
    return (path.indexOf(node) !== -1);
}

function isNew(path, cycles) {
    for (var i = 0; i < cycles.length; i++) {
        if ( equal(path, cycles[i]) ) {
            return false;
        }
    }

    return true;
}

function equal(path1, path2) {
    if (path1.length !== path2.length) {
        return false;
    }

    for (var i = 0; i < path1.length; i++) {
        var node1 = path1[i];
        for (var j = 0; j < path2.length; j++) {
            var node2 = path2[j];
            if (node1 === node2) {
                break;
            }
        }
        if (j === path2.length) {
            return false;
        }
    }

    return true;
}

findAllCycles();
console.log(cycles);
