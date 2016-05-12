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

    form.setAttribute('class', 'editForm');
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
    saveButton.innerHTML = 'Сохранить изменения';
    saveButton.setAttribute('class', 'saveButton');
    form.appendChild(saveButton);
    parent.appendChild(form);
}

function createTops(tops, edges) {
    var i = 0,
        wrap, blockName, blockNameText,
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
        blockName = document.createElement('h2');
        blockName.setAttribute('class', 'topName');
        blockNameText = document.createTextNode(tops[i].name);
        button = document.createElement('button');
        textButton = document.createTextNode('Редактировать');
        button.setAttribute('class', 'editButton');
        blockName.appendChild(blockNameText);
        wrap.appendChild(blockName);
        button.appendChild(textButton);
        wrap.appendChild(button);
        document.getElementsByTagName('main')[0].appendChild(wrap);
        createForm(top.x, top.y, top.name, top.imageN, wrap, i, tops, edges);
    }
}
window.onload = function () {
    var main = document.getElementsByTagName('main')[0],
        tops = getJSONFile('tops'),
        edges = getJSONFile('edges');
    createTops(tops, edges);

    var editHeader = document.getElementsByTagName('h2')[0],
        editButton = document.getElementsByClassName('editButton')[0],
        editForm = document.getElementsByClassName('editForm')[0],
        newDataTop = {
            x: 0, y: 0, name: '', imageN: 0
        },
        newEdges = [];

    main.addEventListener('click', function (event) {
        event.preventDefault();
        var target = event.target, i = 0, index;
        if (target.tagName == 'H2' || target.className == 'editButton') {
            index = $(target).parent().index();
            $(target).parent().find('form').slideToggle();

        }
        if (target.className == 'saveButton') {
            index = $(target).parent().parent().index();
            newDataTop.name = $(target).parent().find('input')[0].value;
            newDataTop.x = $(target).parent().find('input')[1].value;
            newDataTop.y = $(target).parent().find('input')[2].value;
            newDataTop.imageN = $(target).parent().find('select')[0].selectedIndex;
            var checkboxes = $(target).parent().find('input[type=checkbox]');

            for (i; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    newEdges.push([i+1, index+1]);
                }
            }
            console.log(newDataTop);
            console.log(newEdges);
        }
    })
};

