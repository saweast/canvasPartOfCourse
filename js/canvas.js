/**
 * Created by lavor on 01.05.2016.
 */
window.onload = function () {
    var top = [
        {
            x: 80,
            y: 50,
            name: 'First'
        },
        {
            x: 25,
            y: 80,
            name: 'Second'
        },
        {
            x: 110,
            y: 220,
            name: 'Third'
        },
        {
            x: 220,
            y: 110,
            name: 'Four'
        }
    ],
        radius = 5, drag = false, currElement,
        canvas = document.getElementsByClassName('mainDraw')[0],
        canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', function (event) {
        var dx, dy, item;
        dx = event.pageX - this.offsetLeft;
        dy = event.pageY - this.offsetTop;
        for (item in top) {
            if (dx >= top[item].x + radius || dx <= top[item].x - radius
                &&
                dy >= top[item].y + radius || dy <= top[item].y - radius) {
                drag = false;
                currElement = '';
            } else {
                drag = true;
                currElement = item;
                console.log(currElement);
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
            top[currElement].x = event.pageX - this.offsetLeft;
            top[currElement].y = event.pageY - this.offsetTop;
            drawAll();
            console.log('mouseMove');
        }
    });



    drawAll();


    function drawAll() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawCircle(top[0].x, top[0].y, top[0].name);
        drawCircle(top[1].x, top[1].y, top[1].name);
        drawCircle(top[2].x, top[2].y, top[2].name);
        drawCircle(top[3].x, top[3].y, top[3].name);
        drawLine(top[0].x, top[0].y, top[1].x, top[1].y, 4);
        drawLine(top[0].x, top[0].y, top[2].x, top[2].y, 7);
        drawLine(top[0].x, top[0].y, top[3].x, top[3].y, 11);
        drawLine(top[1].x, top[1].y, top[3].x, top[3].y, 17);
        drawLine(top[2].x, top[2].y, top[3].x, top[3].y, 3);
        drawLine(top[1].x, top[1].y, top[2].x, top[2].y, 14);
    }
    function drawCircle(x, y, name) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fill();
        ctx.stroke();
        ctx.font = '12px serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0, 0, 255, 1)';
        ctx.fillText(name, x, y-10);
        ctx.closePath();
    }
    function drawLine(x1, y1, x2, y2, weight) {
        var weight = weight || '';
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.font = '10px serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0, 255, 0, 1)';
        ctx.fillText(weight, (x1+x2)/2, (y1+y2)/2);
        ctx.closePath();
    }




}