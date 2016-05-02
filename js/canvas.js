/**
 * Created by lavor on 01.05.2016.
 */
window.onload = function () {
    var tops = [
            {
                x: 50,
                y: 50,
                name: 'One'
            },
            {
                x: 350,
                y: 100,
                name: 'Two'
            },
            {
                x: 50,
                y: 480,
                name: 'Three'
            },
            {
                x: 250,
                y: 400,
                name: 'Four'
            },
            {
                x: 380,
                y: 350,
                name: 'Five'
            },
            {
                x: 150,
                y: 250,
                name: 'Six'
            }
        ],
        edges = [
            [1,2], // 14
            [1,3], // 19
            [1,6], // 18
            [2,1], // 14
            [2,3], // 3
            [2,4], // 24
            [2,5], // 8
            [2,6], // 2
            [3,1], // 19
            [3,2], // 3
            [3,4], // 7
            [3,6], // 9
            [4,2], // 24
            [4,3], // 7
            [4,5], // 36
            [4,6], // 4
            [5,2], // 8
            [5,4], // 36
            [5,6], // 19
            [6,1], // 18
            [6,2], // 2
            [6,3], // 9
            [6,4], // 4
            [6,5] // 19
        ],
        weight = [14,19,18,14,3,24,8,2,19,3,7,9,24,7,36,4,8,36,19,18,2,9,4,19],


        radius = 5,
        lineColor = 'rgba(0, 173, 255, .5)',
        lineDescrColor = 'rgba(0, 0, 255, 1)',
        lineDescrFont = '10px serif',
        circleColor = 'rgba(0, 173, 255, 1)',
        circleNameColor = 'rgba(0, 0, 255, 1)',
        circleNameFont = '12px serif',
        drag = false, currElement,
        canvas = document.getElementsByClassName('mainDraw')[0],
        canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', function (event) {
        var dx, dy, item;
        dx = event.pageX - this.offsetLeft;
        dy = event.pageY - this.offsetTop;
        for (item in tops) {
            if (dx >= tops[item].x + radius || dx <= tops[item].x - radius
                &&
                dy >= tops[item].y + radius || dy <= tops[item].y - radius) {
                drag = false;
                currElement = '';
            } else {
                drag = true;
                currElement = item;
                return [currElement, drag];
            }
        }
    });
    canvas.addEventListener('mouseup', function (event) {
        drag = false;
        currElement = '';
    });
    canvas.addEventListener('mousemove', function (event) {
        if (drag) {
            tops[currElement].x = event.pageX - this.offsetLeft;
            tops[currElement].y = event.pageY - this.offsetTop;
            drawAll();
        }
    });
    function drawAll() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        var top = 0,
            edge = 0,
            count = 0,
            line = {
                from: 0,
                to: 0,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                w: 0
            };
        for (top in tops) {
            drawCircle(tops[top].x, tops[top].y, tops[top].name);
        }
        for (edge in edges) {
            line.from = edges[edge][0] - 1;
            line.to = edges[edge][1] - 1;
            line.x1 = tops[line.from].x;
            line.y1 = tops[line.from].y;
            line.x2 = tops[line.to].x;
            line.y2 = tops[line.to].y;
            line.w = weight[edge];
            drawLine(line.x1, line.y1, line.x2, line.y2, line.w)
        }
    }
    function drawCircle(x, y, name) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.fillStyle = circleColor;
        ctx.strokeStyle = circleColor;
        ctx.fill();
        ctx.stroke();
        ctx.font = circleNameFont;
        ctx.textAlign = 'center';
        ctx.fillStyle = circleNameColor;
        ctx.fillText(name, x, y-15);
        ctx.closePath();
    }
    function drawLine(x1, y1, x2, y2, weight) {
        var weight = weight || '';
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.font = lineDescrFont;
        ctx.textAlign = 'center';
        ctx.fillStyle = lineDescrColor;
        ctx.fillText(weight, ((x1+x2)/2)-5, ((y1+y2)/2)-5);
        ctx.closePath();
    }

    var cycles = [];

    function findAllCycles() {
        var i, j, len;

        // var st1 = new Date().getTime();

        for (i = 0; i < edges.length; i++) {
            var edge = edges[i];
            for (j = 0; j < 2; j++) {
                findNewCycles( [edge[j]] );
            }
        }

        // var st2 = new Date().getTime();
        // console.log("time: " + (st2-st1));
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


    drawAll();
    findAllCycles();
    // console.log(JSON.stringify(cycles));

    function createResultCanvas(resultArray) {
        var newCanvas = document.createElement('canvas');
        newCanvas.setAttribute('width', ''+canvasWidth / 2+'');
        newCanvas.setAttribute('height', ''+canvasHeight / 2+'');
        newCanvas.setAttribute('class', 'resultCanvas');
        var resultBlock = document.getElementsByClassName('result')[0];
        resultBlock.appendChild(newCanvas);
        var resultCanvasArray = document.getElementsByClassName('resultCanvas');
        var resultCanvas = resultCanvasArray[resultCanvasArray.length];

        var resultGraph,
            resultTop,
            item,
            newGraph = {
                number: 0,
                x: 0,
                y: 0,
                name: ''
            },
            newLine = {
                from: 0,
                to: 0,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0
            };
        for (item in resultArray) {
            var firstItem = resultArray[item][0];
            resultArray[item].push(firstItem);
        }
        console.log(JSON.stringify(resultArray));
        for (resultGraph = 0; resultGraph < resultArray.length; resultGraph++) { // тут я делаю линии
            for (resultTop = 1; resultTop < resultArray[resultGraph].length; resultTop++) {
                newLine.from = resultArray[resultGraph][resultTop-1] - 1;
                newLine.to = resultArray[resultGraph][resultTop] - 1;
                newLine.x1 = tops[newLine.from].x;
                newLine.y1 = tops[newLine.from].y;
                newLine.x2 = tops[newLine.to].x;
                newLine.y2 = tops[newLine.to].y;
                // console.log(newLine.from+" "+newLine.to)
            }
        }
        resultGraph = resultTop = 0;
        for (resultGraph in resultArray) { // сдесь я делаю вершины
            for (resultTop in resultArray[resultGraph]) {
                newGraph.number = resultArray[resultGraph][resultTop] - 1;
                newGraph.x = tops[newGraph.number].x;
                newGraph.y = tops[newGraph.number].y;
                newGraph.name = tops[newGraph.number].name;
            }
        }
    }
    createResultCanvas(cycles);

};