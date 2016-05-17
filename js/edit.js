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
function writeToFile(str) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", "createHelper.php?q=" + str, true);
    xmlhttp.send();
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
function makeCheckbox(top, tops, edges, parent, uniq) {
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
        chlabel.setAttribute('for', 'checkbox_'+i+j+'_'+uniq);
        checkbox = document.createElement('input');
        checkbox.setAttribute('id', 'checkbox_'+i+j+'_'+uniq);
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'needed');
        if (top-1 == i) checkbox.setAttribute('disabled', 'disabled');
        chlabel.addEventListener('click', function (event) {
            makeCha(event.target);
        });
        textNode = document.createTextNode(tops[i].name);
        parent.appendChild(checkbox);
        parent.appendChild(chlabel);
        parent.appendChild(textNode);

    }
    makeChecked(parent, edge);
}
function makeChecked(parent, checkedElems) {
    var checkbox = parent.getElementsByClassName('needed');
    for (var k = 0; k < checkedElems.length; k++) {
        checkbox[checkedElems[k]-1].defaultChecked = true;
    }
}
function makeCha(elem) {
    var id = elem.getAttribute('for'),
        input = document.getElementById(id);
    console.log(id + ":::" + input.getAttribute('id'));
    document.getElementById(id).checked = !document.getElementById(id).checked;
    if (input.hasAttribute('checked')) {
        input.removeAttribute('checked');
    } else {
        input.setAttribute('checked', 'checked')
    }
}
function createForm(x, y, name, imageN, parent, top, tops, edges) {
    var imageSrc = ['APUNAH', 'BART', 'DRHIBB', 'HOMER', 'KENTBR', 'LISA', 'MAGGIE', 'MARGE', 'MILHOU', 'POLICE'],
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
        removeButton = document.createElement('button'),
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
    makeCheckbox(top, tops, edges, testDiv, Math.random());
    form.appendChild(testDiv);
    saveButton.innerHTML = 'Сохранить';
    saveButton.setAttribute('class', 'saveButton');
    form.appendChild(saveButton);
    removeButton.innerHTML = 'Удалить';
    removeButton.setAttribute('class', 'removeButton');
    form.appendChild(removeButton);
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
function removeEdges(arr, index) {
    var i = 0;
    for (i; i < arr.length; i++) {
        if (arr[i][0] == index || arr[i][1] == index || arr[i][0] == arr[i][1]) {
            arr.splice(i, 1);
        }
    }
}
function decrement(arr, index) {
    var index = index + 1;
    for (var i in arr) {
        for (var j in arr[i]) {
            if (arr[i][j] >= index) {
                arr[i][j] = arr[i][j] - 1;
            }
        }
    }
}
window.onload = function () {
    var main = document.getElementsByTagName('main')[0],
        tops = getJSONFile('tops'),
        edges = getJSONFile('edges');
    createTops(tops, edges);
    var newDataTop = {
            x: 0, y: 0, name: '', imageN: 0
        };
    main.addEventListener('click', function (event) {
        event.preventDefault();
        var target = event.target, i = 0, index, indexRm, messageRm;
        if (target.tagName == 'H2' || target.className == 'editButton') {
            index = $(target).parent().index();
            $(target).parent().find('form').slideToggle();
            $(target).parent().find('form').toggleClass('activeForm');
        }
        if (target.className == 'saveButton') {
            index = $(target).parent().parent().index();
            newDataTop.name = $(target).parent().find('input')[0].value;
            newDataTop.x = $(target).parent().find('input')[1].value;
            newDataTop.y = $(target).parent().find('input')[2].value;
            newDataTop.imageN = $(target).parent().find('select')[0].selectedIndex;
            var checkboxes = $(target).parent().find('input[type=checkbox]');
            removeEdges(edges, index+1);
            removeEdges(edges, index+1);
            removeEdges(edges, index+1);
            for (i; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    edges.push([i+1, index+1]);
                }
            }
            tops[index] = newDataTop;
            var message = JSON.stringify(tops) + '~' + JSON.stringify(edges);
            writeToFile(message);
            $(target).parent().parent().toggleClass('suc');
            setTimeout(function () {
                $(target).parent().parent().toggleClass('suc');
                location.reload();
            }, 1500);

        }
        if (target.className == 'removeButton') {
            indexRm = $(target).parent().parent().index();
            // console.log(edges + '');
            tops.splice(indexRm, 1);
            removeEdges(edges, indexRm+1);
            removeEdges(edges, indexRm+1);
            removeEdges(edges, indexRm+1);
            removeEdges(edges, indexRm+1);
            removeEdges(edges, indexRm+1);
            decrement(edges, indexRm);
            // console.log(edges + '');
            messageRm = JSON.stringify(tops) + '~' + JSON.stringify(edges);
            writeToFile(messageRm);
            $(target).parent().parent().toggleClass('rem');
            setTimeout(function () {
                $(target).parent().parent().toggleClass('rem');
                location.reload();
            }, 2000);
        }
    });
};



