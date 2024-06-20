function turnLeft() {
    if ("south" == actorDirection) {
        actorDirection = "east";
        actorImageSrc = "./images/kara_right.png";
    } else if ("east" == actorDirection) {
        actorDirection = "north";
        actorImageSrc = "./images/kara_top.png";
    } else if ("north" == actorDirection) {
        actorDirection = "west";
        actorImageSrc = "./images/kara_left.png";
    } else {
        actorDirection = "south";
        actorImageSrc = "./images/kara_bottom.png";
    }
    drawBasicTerritory();
    drawTerritoryContent();
    actorImage.src = actorImageSrc;
}

function turnRight() {
    if ("south" == actorDirection) {
        actorDirection = "west";
        actorImageSrc = "./images/kara_left.png";
    } else if ("east" == actorDirection) {
        actorDirection = "south";
        actorImageSrc = "./images/kara_bottom.png";
    } else if ("north" == actorDirection) {
        actorDirection = "east";
        actorImageSrc = "./images/kara_right.png";
    } else {
        actorDirection = "north";
        actorImageSrc = "./images/kara_top.png";
    }
    drawBasicTerritory();
    drawTerritoryContent();
    actorImage.src = actorImageSrc;
}

function move() {
    if (!treeFront() && !mushroomFront()) {
        territoryContent[actorRow][actorColumn].setActor(false);
        if ("south" == actorDirection) {
            actorRow = (actorRow + 1) % row;
            currentY = actorRow * cellHeight + 25;
        } else if ("east" == actorDirection) {
            actorColumn = (actorColumn + 1) % column;
            currentX = actorColumn * cellWidth + 30;
        } else if ("north" == actorDirection) {
            actorRow = (actorRow + row - 1) % row;
            currentY = actorRow * cellHeight + 25;
        } else {
            actorColumn = (actorColumn + column - 1) % column;
            currentX = actorColumn * cellWidth + 30;
        }
        territoryContent[actorRow][actorColumn].setActor(true);
        drawBasicTerritory();
        drawTerritoryContent();
        drawActor();
    } else if (mushroomFront()) {
        if (possibleToMoveMushroom()) {
            territoryContent[actorRow][actorColumn].setActor(false);
            if ("south" == actorDirection) {
                actorRow = (actorRow + 1) % row;
                currentY = actorRow * cellHeight + 25;
                territoryContent[(actorRow + 1) % row][actorColumn].setMushroom(true);
            } else if ("east" == actorDirection) {
                actorColumn = (actorColumn + 1) % column;
                currentX = actorColumn * cellWidth + 30;
                territoryContent[actorRow][(actorColumn + 1) % column].setMushroom(true);
            } else if ("north" == actorDirection) {
                actorRow = (actorRow + row - 1) % row;
                currentY = actorRow * cellHeight + 25;
                territoryContent[(actorRow + row - 1) % row][actorColumn].setMushroom(true);
            } else {
                actorColumn = (actorColumn + column - 1) % column;
                currentX = actorColumn * cellWidth + 30;
                territoryContent[actorRow][(actorColumn + column - 1) % column].setMushroom(true);
            }
            territoryContent[actorRow][actorColumn].setMushroom(false);
            territoryContent[actorRow][actorColumn].setActor(true);
            drawBasicTerritory();
            drawTerritoryContent();
            drawActor();
        } else {
            window.alert("Kara kann nicht nach vorne laufen - hinter dem Pilz liegt ein anderes Objekt!");
            stopCode();
        }
    } else {
        window.alert("Kara kann nicht gegen einen Baumstumpf laufen");
        stopCode();
    }
}

function possibleToMoveMushroom() {
    var result = false;
    if ("south" == actorDirection) {
        result = (!territoryContent[(actorRow + 2) % row][actorColumn].getTree()) && (!territoryContent[(actorRow + 2) % row][actorColumn].getMushroom());
    } else if ("east" == actorDirection) {
        result = (!territoryContent[actorRow][(actorColumn + 2) % column].getTree()) && (!territoryContent[actorRow][(actorColumn + 2) % column].getMushroom());
    } else if ("north" == actorDirection) {
        result = (!territoryContent[(actorRow + row - 2) % row][actorColumn].getTree()) && (!territoryContent[(actorRow + row - 2) % row][actorColumn].getMushroom());
    } else {
        result = (!territoryContent[actorRow][(actorColumn + column - 2) % column].getTree()) && (!territoryContent[actorRow][(actorColumn + column - 2) % column].getMushroom());
    }
    console.log("result: ", result);
    return result;
}

function takeLeaf() {
    if (onLeaf()) {
        territoryContent[actorRow][actorColumn].setLeaf(false);
        drawBasicTerritory();
        drawTerritoryContent();
        drawActor();
    } else {
        window.alert("Kein Kleeblatt da");
        stopCode();
    }
}

function putLeaf() {
    if (!onLeaf()) {
        currentDraggableToCanvas = "leafImage";
        var x = cellWidth * actorColumn + (cellWidth / 2);
        var y = cellHeight * actorRow + (cellHeight / 2);
        var position = [x, y];
        setCellContent(actorRow, actorColumn, position);
    } else {
        window.alert("Kara kann kein Kleeblatt auf ein Feld legen, auf dem schon eines ist!");
        stopCode();
    }
}

function treeFront() {
    var result = false;
    console.log("actorRow:", actorRow);
    console.log("actorColumn: ", actorColumn);
    console.log("row: ", row);
    console.log("column: ", column);
    console.log("actorDirection: ", actorDirection);
    if ("south" == actorDirection) {
        result = territoryContent[(actorRow + 1) % row][actorColumn].getTree();
    } else if ("east" == actorDirection) {
        result = territoryContent[actorRow][(actorColumn + 1) % column].getTree();
    } else if ("north" == actorDirection) {
        result = territoryContent[(actorRow + row - 1) % row][actorColumn].getTree();
        console.log((actorRow + row - 1) % row)
    } else {
        result = territoryContent[actorRow][(actorColumn + column - 1) % column].getTree();
    }
    console.log("result: ", result);
    return result;
}

function onLeaf() {
    return territoryContent[actorRow][actorColumn].getLeaf();
}

function treeLeft() {
    var result = false;
    if ("west" == actorDirection) {
        result = territoryContent[(actorRow + 1) % row][actorColumn].getTree();
    } else if ("south" == actorDirection) {
        result = territoryContent[actorRow][(actorColumn + 1) % column].getTree();
    } else if ("east" == actorDirection) {
        result = territoryContent[(actorRow + row - 1) % row][actorColumn].getTree();
    } else {
        result = territoryContent[actorRow][(actorColumn + column - 1) % column].getTree();
    }
    console.log("result: ", result);
    return result;
}

function treeRight() {
    var result = false;
    if ("east" == actorDirection) {
        result = territoryContent[(actorRow + 1) % row][actorColumn].getTree();
    } else if ("north" == actorDirection) {
        result = territoryContent[actorRow][(actorColumn + 1) % column].getTree();
    } else if ("west" == actorDirection) {
        result = territoryContent[(actorRow + row - 1) % row][actorColumn].getTree();
    } else {
        result = territoryContent[actorRow][(actorColumn + column - 1) % column].getTree();
    }
    console.log("result: ", result);
    return result;
}

function mushroomFront() {
    var result = false;
    if ("south" == actorDirection) {
        result = territoryContent[(actorRow + 1) % row][actorColumn].getMushroom();
    } else if ("east" == actorDirection) {
        result = territoryContent[actorRow][(actorColumn + 1) % column].getMushroom();
    } else if ("north" == actorDirection) {
        result = territoryContent[(actorRow + row - 1) % row][actorColumn].getMushroom();
    } else {
        result = territoryContent[actorRow][(actorColumn + column - 1) % column].getMushroom();
    }
    console.log("result: ", result);
    return result;
}