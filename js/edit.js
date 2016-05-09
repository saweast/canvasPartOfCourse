/**
 * Created by lavor on 09.05.2016.
 */

function getJSONFile(name) {
    var json = null;
    $.post({
        'async': false,
        'global': false,
        'url': 'data/'+name+".json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}

function makeSelectImg(imageSrc, imageN, parent) {
    var option, textNode, i = 0;
    for (i; i < imageSrc.length; i++) {
        option = document.createElement('option');
        textNode = document.createTextNode(imageSrc[i]);
        option.setAttribute('value', i);
        if (i == imageN) {
            option.setAttribute('selected', 'true');
        }
        option.appendChild(textNode);
        parent.appendChild(option);
    }
}
function makeCheckbox(top, tops, edges, parent) {
    var chlabel, checkbox, textNode, i = 0, j = 0, edge = [], top = top + 1;
    for (j; j < edges.length; j++) {
        if (edges[j][0] == top) {
            edge.push(edges[j][1]);
        } else if (edges[j][1] == top) {
            edge.push(edges[j][0]);
        }
    }
    for (i; i < tops.length; i++) {

        chlabel = document.createElement('label');
        checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        if (top-1 == i) checkbox.setAttribute('disabled', 'disabled');
        checkbox.setAttribute('class', 'needed');
        textNode = document.createTextNode(tops[i].name);
        chlabel.appendChild(checkbox);
        chlabel.appendChild(textNode);
        parent.appendChild(chlabel);
    }
    makeChecked(parent, edge);
}
function makeChecked(parent, checkedElems) {
    var checkbox = parent.getElementsByClassName('needed');
    for (var k = 0; k < checkedElems.length; k++) {
        checkbox[checkedElems[k]-1].checked = true;
    }
}
function makeSelectEdge(top, tops, edges, parent) {
    var option, textNode, i = 0, j = 0, edge = [], top = top + 1;
    for (j; j < edges.length; j++) {
        if (edges[j][0] == top) {
            edge.push(edges[j][1]);
        } else if (edges[j][1] == top) {
            edge.push(edges[j][0]);
        }
    }
    for (i; i < tops.length; i++) {
        option = document.createElement('option');
        textNode = document.createTextNode(tops[i].name);
        option.setAttribute('value', i);
        if (i == top-1) {
            option.setAttribute('disabled', 'true');
        }
        option.appendChild(textNode);
        parent.appendChild(option);
    }
    for (var k = 0; k < edge.length; k++) {
        parent[edge[k]-1].setAttribute('selected', 'selected');
    }
    parent.selectedOptions = edge;
}
function createForm(x, y, name, imageN, parent, top, tops, edges) {
    var imageSrc = ['Apartment-Building', 'Contract', 'Factory', 'House', 'House-Rent', 'House-Sale', 'Lands', 'Mortgage', 'Office-Building', 'Swimming-Pool'],
        form = document.createElement('form'),
        labelName = document.createElement('label'),
        inputName = document.createElement('input'),
        labelCoordX = document.createElement('label'),
        labelCoordY = document.createElement('label'),
        inputX = document.createElement('input'),
        inputY = document.createElement('input'),
        labelSelectImg = document.createElement('label'),
        selectImg = document.createElement('select'),
        labelEdge = document.createElement('label'),
        selectEdge = document.createElement('select'),
        saveButton = document.createElement('button'),
        testDiv = document.createElement('div');

    labelName.innerHTML = 'Название вершины ';
    inputName.value = name;
    labelName.appendChild(inputName);
    form.appendChild(labelName);
    labelCoordX.innerHTML = "Координаты<br>x: ";
    inputX.setAttribute('type', 'number');
    inputX.value = x;
    labelCoordX.appendChild(inputX);
    form.appendChild(labelCoordX);
    labelCoordY.innerHTML = "y: ";
    inputY.setAttribute('type', 'number');
    inputY.value = y;
    labelCoordY.appendChild(inputY);
    form.appendChild(labelCoordY);
    labelSelectImg.innerHTML = "Изображение ";
    selectImg.className = 'imageSelect';
    makeSelectImg(imageSrc, imageN, selectImg);
    labelSelectImg.appendChild(selectImg);
    form.appendChild(labelSelectImg);
    labelEdge.innerHTML = "Связи: ";
    form.appendChild(labelEdge);
    makeCheckbox(top, tops, edges, testDiv);
    form.appendChild(testDiv);
    // selectEdge.className = "edgeSelect";
    // makeSelectEdge(top, tops, edges, selectEdge);
    // selectEdge.setAttribute('multiple', 'true');
    // form.appendChild(selectEdge);
    saveButton.innerHTML = 'Сохранить изменения';
    form.appendChild(saveButton);



    parent.appendChild(form);
}

function createTops(tops, edges) {
    var i = 0,
        wrap, div, textDiv,
        button, textButton,
        top = {
            x:0, y:0, name: '', imageN: 0
        };
    for (i; i < tops.length; i++) {
        top.x = tops[i].x;
        top.y = tops[i].y;
        top.name = tops[i].name;
        top.imageN = tops[i].imageN;
        wrap = document.createElement('div');
        wrap.setAttribute('class', 'wrapperTop');
        div = document.createElement('div');
        button = document.createElement('button');
        textButton = document.createTextNode('Редактировать');
        button.appendChild(textButton);
        wrap.appendChild(button);
        wrap.appendChild(div);
        document.getElementsByTagName('main')[0].appendChild(wrap);
        createForm(top.x, top.y, top.name, top.imageN, document.getElementsByTagName('main')[0], i, tops, edges);
    }
}
window.onload = function () {
    var main = document.getElementsByTagName('main')[0],
        tops = getJSONFile('tops'),
        edges = getJSONFile('edges');
    createTops(tops, edges);
};