/**
 * Created by lavor on 01.05.2016.
 */
window.onload = function () {
    var tops = [
            {
                x: 50,
                y: 50,
                name: 'First'
            },
            {
                x: 280,
                y: 100,
                name: 'Second'
            },
            {
                x: 50,
                y: 280,
                name: 'Third'
            },
            {
                x: 280,
                y: 280,
                name: 'Four'
            }
        ],
        edges = [
            {
                to: [1, 2, 3], // от нашей вершины (0) к другим
                weight: [7, 19, 3] // веса от нашей вершины (0) к другим
            },
            {
                to: [0, 2, 3],
                weight: [7, 29, 9]
            },
            {
                to: [0, 1, 3],
                weight: [19, 29, 14]
            },
            {
                to: [0, 1, 2],
                weight: [3, 9, 14]
            }
        ],
        radius = 5, drag = false, currElement,
        canvas = document.getElementsByClassName('mainDraw')[0],
        canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        ctx = canvas.getContext('2d');
    drawAll();
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
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                w: 0
            };
        for (top in tops) {
            drawCircle(tops[top].x, tops[top].y, tops[top].name);
        }
        for (edge; edge <= edges.length; edge++) {
            count = 0;
            try {
                for (count; count <= edges[edge].to.length; count++) {
                    if (edge == count) {
                        continue;
                    }
                    if (edge == 0 || edge == 1) {
                        line.w = edges[edge].weight[count-1];
                    } else {
                        line.w = edges[edge].weight[count];
                    }
                    line.x1 = tops[edge].x;
                    line.y1 = tops[edge].y;
                    line.x2 = tops[count].x;
                    line.y2 = tops[count].y;
                    drawLine(line.x1, line.y1, line.x2, line.y2, line.w);
                }
            } catch (err) {} //иначе куча ошибок, а они вам надо?
        }
    }
    function drawCircle(x, y, name) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.fillStyle = 'rgba(0, 173, 255, 1)';
        ctx.strokeStyle = 'rgba(0, 173, 255, 1)';
        ctx.fill();
        ctx.stroke();
        ctx.font = '12px serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0, 0, 255, 1)';
        ctx.fillText(name, x, y-15);
        ctx.closePath();
    }
    function drawLine(x1, y1, x2, y2, weight) {
        var weight = weight || '';
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 173, 255, .5)';
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.font = '10px serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillText(weight, ((x1+x2)/2)-5, ((y1+y2)/2)-5);
        ctx.closePath();
    }
};