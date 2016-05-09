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


window.onload = function () {
    var tops = getJSONFile('tops'),
        edges = getJSONFile('edges'),
        createButton = document.getElementsByClassName('createButton')[0];
    var newTop = {
        x: 0,
        y: 0,
        name: '',
        imageN: 0
    };
    createButton.addEventListener('click', function () {
        var topLenght = tops.length + 1,
            i = 0, fromSelect, newEdges, val;
        newTop.x = document.getElementsByClassName('inX')[0].value;
        newTop.y = document.getElementsByClassName('inY')[0].value;
        newTop.name = document.getElementsByClassName('inName')[0].value;
        newTop.imageN = document.getElementsByClassName('imageSelect')[0].selectedIndex - 1;
        tops.push(newTop);
        fromSelect = document.getElementsByClassName('edgeSelect')[0].selectedOptions;
        for (i; i < fromSelect.length; i++) {
            val = parseInt(fromSelect[i].value) + 1;
            newEdges = [val, topLenght];
            edges.push(newEdges);
        }
        var newTopsJSON = JSON.stringify(tops),
            newEdgesJSON = JSON.stringify(edges),
            message = newTopsJSON + '~' + newEdgesJSON;
        console.log(newEdgesJSON);
        writeToFile(message);
    })
};