/**
 * Created by lavor on 01.05.2016.
 */
window.onload = function () {

    var tops = getJSONFile('tops'),
        edges = getJSONFile('edges'),
        weight = getJSONFile('weight'),
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
        canvasHeight = canvas.height;

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
            drawAll(canvas);
        }
    });
    function clearAll(canvasElement) {
        var ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    function drawAll(canvasElement) {
        var ctx = canvasElement.getContext('2d');
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
            drawCircle(tops[top].x, tops[top].y, tops[top].name, canvasElement);
        }
        for (edge in edges) {
            line.from = edges[edge][0] - 1;
            line.to = edges[edge][1] - 1;
            line.x1 = tops[line.from].x;
            line.y1 = tops[line.from].y;
            line.x2 = tops[line.to].x;
            line.y2 = tops[line.to].y;
            line.w = weight[edge];
            drawLine(line.x1, line.y1, line.x2, line.y2, "", canvasElement);
        }
    }
    function drawCircle(x, y, name, canvasElement) {
        var ctx = canvasElement.getContext('2d');
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
    function drawLine(x1, y1, x2, y2, weight, canvasElement) {
        var ctx = canvasElement.getContext('2d');
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
        for (i = 0; i < edges.length; i++) {
            var edge = edges[i];
            for (j = 0; j < 2; j++) {
                findNewCycles( [edge[j]] );
            }
        }
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
    };
    drawAll(canvas);
    findAllCycles();
    function createCanvas(idName, item) {
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'result_canvas');
        var caption = document.createElement('p');
        var text = document.createTextNode('Цикл #'+(item+1));
        var newCanvas = document.createElement('canvas');
        newCanvas.setAttribute('width', ''+canvasWidth / 2+'');
        newCanvas.setAttribute('height', ''+canvasHeight / 2+'');
        newCanvas.setAttribute('id', idName);
        var resultBlock = document.getElementsByClassName('result')[0];
        var consistBlock = document.getElementById(idName);
        if (!consistBlock) {
            caption.appendChild(text);
            newDiv.appendChild(caption);
            newDiv.appendChild(newCanvas);
            resultBlock.appendChild(newDiv);
        }
    }
    function createResultGraph(resultArray, canvasItem, number) {
        var resultTop,
            newLine = {
                from: 0,
                to: 0,
                x1: 0,
                y1: 0,
                name: '',
                x2: 0,
                y2: 0
            };
        for (resultTop = 1; resultTop < resultArray[number].length; resultTop++) { // ето линии
            newLine.from = resultArray[number][resultTop-1] - 1;
            newLine.to = resultArray[number][resultTop] - 1;
            newLine.x1 = tops[newLine.from].x / 2;
            newLine.y1 = tops[newLine.from].y / 2;
            newLine.name = tops[newLine.from].name;
            newLine.x2 = tops[newLine.to].x / 2;
            newLine.y2 = tops[newLine.to].y / 2;
            drawLine(newLine.x1, newLine.y1, newLine.x2, newLine.y2, '', canvasItem);
            drawCircle(newLine.x1, newLine.y1, newLine.name, canvasItem)
        }
    }
    function makeResult(number, resultArray) {
        for (item in resultArray) { //превратил в нужный вид результат
            var firstItem = resultArray[item][0];
            resultArray[item].push(firstItem);
        }
        var item, element, string = 'canvasResult__', idName;
        for (item = 0; item <= number-1; item++) {
            idName = string + item;
            createCanvas(idName, item);
            element = document.getElementById(idName);
            clearAll(element);
            createResultGraph(cycles, element, item);
        }
    }
    var justDoIt = document.getElementsByClassName('makeResult')[0];
    justDoIt.addEventListener('click', function () {
        makeResult(cycles.length, cycles);
    });
    function getJSONFile(name) {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': name+".json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    }
};