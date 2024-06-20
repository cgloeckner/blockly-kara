var tempActorDirection;
var tempActorImageSrc;
var tempTerritoryContent;

function saveFile(saveTarget) {
    var content = "";
    var fileName = "";
    console.log('Save Target: ', saveTarget);

    switch (saveTarget) {
        case "code":
            content = saveCode();
            fileName = "blockly_kara.code.txt";
            break;
        case "territory":
            content = saveTerritory();
            fileName = "blockly_kara.territory.txt";
            break;
        default:
            alert("Fehler beim Speichern der Datei!");
    }

    if (content !== "" && fileName !== "") {
        var element = document.createElement('a');
        element.setAttribute("href", "data:text/plain;charset=utf-8," + Base64.encode(content));
        element.setAttribute("download", fileName);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    } else {
        alert("Fehler beim Speichern der Datei!");
    }
}

function saveTerritory() {
    saveTemporaryTerritory();
    var territoryString = tempActorDirection + "|" + tempActorImageSrc + "|" + tempCurrentX + "|" +
        tempCurrentY + "|" + tempActorRow + "|" + tempActorColumn + "|" + row + "|" + column + "|";
    territoryString += JSON.stringify(tempTerritoryContent);
    return territoryString;
}

function loadTerritory(fileContent) {
    stopCode();
    var territoryString = Base64.decode(fileContent);
    const paramsArray = territoryString.split("|");
    tempActorDirection = paramsArray[0];
    tempActorImageSrc = paramsArray[1];
    tempCurrentX = parseInt(paramsArray[2], 10);
    tempCurrentY = parseInt(paramsArray[3], 10);
    tempActorRow = parseInt(paramsArray[4], 10);
    tempActorColumn = parseInt(paramsArray[5], 10);
    row = parseInt(paramsArray[6], 10);
    column = parseInt(paramsArray[7], 10);
    tempTerritoryContent = JSON.parse(paramsArray[8]);

    maxColumn = column;
    document.getElementById("column").max = maxColumn;
    document.getElementById("row").value = row;
    document.getElementById("column").value = column;
    resizeTerritory();
    createCellContent();
    loadTemporaryTerritory();
}

function saveTemporaryTerritory() {
    tempActorDirection = actorDirection;
    tempActorImageSrc = actorImageSrc;
    tempTerritoryContent = JSON.parse(JSON.stringify(territoryContent));

    tempCurrentX = currentX;
    tempCurrentY = currentY;
    tempActorRow = actorRow;
    tempActorColumn = actorColumn;
}

function loadTemporaryTerritory() {
    actorDirection = tempActorDirection;
    actorImageSrc = tempActorImageSrc;
    copyTerritory();
    //console.log(tempTerritoryContent);

    currentX = tempCurrentX;
    currentY = tempCurrentY;
    actorRow = tempActorRow;
    actorColumn = tempActorColumn;
    drawBasicTerritory();
    drawTerritoryContent();
    actorImage.src = actorImageSrc;
}

function copyTerritory() {
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < column; c++) {
            territoryContent[r][c] = new CellContent();
            territoryContent[r][c].setActor(tempTerritoryContent[r][c].actor);
            territoryContent[r][c].setTree(tempTerritoryContent[r][c].tree);
            territoryContent[r][c].setLeaf(tempTerritoryContent[r][c].leaf);
            territoryContent[r][c].setMushroom(tempTerritoryContent[r][c].mushroom);
        }
    }
}