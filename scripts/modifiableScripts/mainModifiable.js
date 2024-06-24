var cellHeight;
var cellWidth;
var treeImage = new Image();
var leafImage = new Image();
var mushroomImage = new Image();
const minWidthLeftBox = 675;
const minWidthRightBox = 320;

function loadPage() {
    row = 9;
    //column = 10;
    cellHeight = 50;
    cellWidth = 60;
    currentX = 30;
    currentY = 25;
    actorRow = 0;
    actorColumn = 0;
    actorDirection = "south";
    actorImageSrc = "./images/kara_bottom.png";
    actorImage.src = actorImageSrc;
    actorImage.onload = function() {
        actorMouseEvents();
        drawActor();
    }
    treeImage.src = "./images/stump_2.png";
    leafImage.src = "./images/clover.png";
    mushroomImage.src = "./images/fungus.png";
    canvas = document.getElementById("territoryId");

    var windowWidth = getWindowWidth();
    setAreasWidth(windowWidth, true);
    setTitelWidth(windowWidth);
    setAreasHeight(getWindowHeight(), true);

    console.log("rows: ", row, ", columns: ", column);
    initTerritory();

    if (canvas.getContext) {
        territory = canvas.getContext("2d");
        drawBasicTerritory();

    } else {
        alert("Es werden Safari oder Firefox 1.5+ benötigt.");
    }

    document.getElementById("playButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("pauseButton").disabled = true;

    Blockly.Themes.Hamster = Blockly.Theme.defineTheme("hamster", {
        'base': Blockly.Themes.Classic,
        'componentStyles': {
            'workspaceBackgroundColour': "rgb(255,245,235)",
            'toolboxBackgroundColour': "rgb(235,209,182)",
            'toolboxForegroundColour': "rgb(139, 69, 19)",
            'flyoutBackgroundColour': "rgb(230,190,138)",
            'flyoutForegroundColour': '#ccc',
            'flyoutOpacity': 1,
            'scrollbarColour': "rgb(235,209,182)",
            'insertionMarkerColour': '#fff',
            'insertionMarkerOpacity': 0.3,
            'scrollbarOpacity': 0.0,
            'cursorColour': '#d0d0d0',
            'blackBackground': '#333'
        }
    });

    workspace = Blockly.inject('blocklyDiv', { toolbox: document.getElementById('toolbox'), theme: Blockly.Themes.Hamster, });
    resizeBlocklyFunc();
    Blockly.svgResize(workspace);
    window.addEventListener('resize', onResizeFunc, false);

    // Touch Event Listeners...
    document.getElementById("tree").addEventListener("touchend", touchEndFunc, false);
    document.getElementById("clover").addEventListener("touchend", touchEndFunc, false);
    document.getElementById("mushroom").addEventListener("touchend", touchEndFunc, false);
    document.getElementById("trash").addEventListener("touchend", trashTouchEndFunc, false);
}

function drawBasicTerritory() {
    territory.fillStyle = "rgb(144,238,144)";
    territory.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < canvas.width; i += cellWidth) {
        for (var j = 0; j < canvas.height; j += cellHeight) {
            territory.beginPath();
            territory.strokeStyle = "rgb(139, 69, 19)";
            territory.strokeRect(i, j, cellWidth, cellHeight);
        }
    }
}

function initTerritory() {
    createCellContent();
    // fill Territory matrix
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < column; c++) {
            territoryContent[r][c] = new CellContent();
        }
    }

    territoryContent[actorRow][actorColumn].setActor(true);
}

function placeActor() {
    if (currentX >= canvas.width) {
        currentX = cellWidth * column - (cellWidth / 2);

    } else if (currentX <= 0) {
        currentX = cellWidth / 2;
    } else {
        var c = Math.floor(currentX / cellWidth);
        currentX = cellWidth * c + (cellWidth / 2);
    }
    if (currentY >= canvas.height) {
        currentY = cellHeight * row - (cellHeight / 2);

    } else if (currentY <= 0) {
        currentY = cellHeight / 2;
    } else {
        var r = Math.floor(currentY / cellHeight);
        currentY = cellHeight * r + (cellHeight / 2);
    }

    // update Hamster position in Territory Content
    territoryContent[actorRow][actorColumn].setActor(false);
    actorRow = Math.floor(currentY / cellHeight);
    actorColumn = Math.floor(currentX / cellWidth);
    territoryContent[actorRow][actorColumn].setActor(true);
}

function drawActor() {
    territory.drawImage(actorImage, currentX - (actorImage.width / 2), currentY - (actorImage.height / 2));
}

function returnActorOnCanvas() {
    if (canvas.width < currentX || canvas.height < currentY) {
        currentX = 30;
        currentY = 25;
        actorRow = 0;
        actorColumn = 0;
        territoryContent[actorRow][actorColumn].setTree(false);
        territoryContent[actorRow][actorColumn].setMushroom(false);
        territoryContent[actorRow][actorColumn].setActor(true);
    }
}

function actorMouseEvents() {
    console.log("actorMouseEvents called!");
    canvas.addEventListener("touchmove", function(event) {
        console.log("actorMouseEvents touchmove called!");
        var touch = event.targetTouches[0];
        //console.log("hier");
        // Place element where the finger is
        var touchX = touch.pageX - this.offsetLeft;
        var touchY = touch.pageY - this.offsetTop;
        if (touchX >= (currentX - actorImage.width / 2) &&
            touchX <= (currentX + actorImage.width / 2) &&
            touchY >= (currentY - actorImage.height / 2) &&
            touchY <= (currentY + actorImage.height / 2)) {
            currentX = touch.pageX - this.offsetLeft;
            currentY = touch.pageY - this.offsetTop;
            drawBasicTerritory();
            drawTerritoryContent();
            drawActor();
            event.preventDefault();
        }
    }, false);
    canvas.addEventListener("touchend", function(event) {
        console.log("actorMouseEvents touchend called!");
        var c = Math.floor(currentX / cellWidth);
        var r = Math.floor(currentY / cellHeight);
        console.log("actorMouseEvents touchend canvas.width: ", canvas.width)
        console.log("actorMouseEvents touchend currentX: ", currentX)
        if (currentX > canvas.width || currentY > canvas.height || currentX < 0 || currentY < 0 || true == territoryContent[r][c].getTree()) {
            returnActorToPreviousPosition();
        } else {
            placeActor();
        }
        // document.getElementById("territoryId").style.cursor = "default";
        drawBasicTerritory();
        drawTerritoryContent();
        drawActor();
        event.preventDefault();

    }, false);
    canvas.onmousedown = function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        if (mouseX >= (currentX - actorImage.width / 2) &&
            mouseX <= (currentX + actorImage.width / 2) &&
            mouseY >= (currentY - actorImage.height / 2) &&
            mouseY <= (currentY + actorImage.height / 2)) {
            isDraggable = true;
            document.getElementById("territoryId").style.cursor = "move";
        }
        //console.log("mouseX: ", mouseX, " mouseY: ", mouseY);
    };
    canvas.onmousemove = function(e) {
        if (isDraggable) {
            currentX = e.pageX - this.offsetLeft;
            currentY = e.pageY - this.offsetTop;
            var c = Math.floor(currentX / cellWidth);
            var r = Math.floor(currentY / cellHeight);
            if (true == territoryContent[r][c].getTree() || true == territoryContent[r][c].getMushroom()) {
                document.getElementById("territoryId").style.cursor = "no-drop";
            } else {
                document.getElementById("territoryId").style.cursor = "move";
            }
            drawBasicTerritory();
            drawTerritoryContent();
            drawActor();
        }
    };
    canvas.onmouseup = function(e) {
        if (isDraggable) {
            var c = Math.floor(currentX / cellWidth);
            var r = Math.floor(currentY / cellHeight);
            if (true == territoryContent[r][c].getTree() || true == territoryContent[r][c].getMushroom()) {
                returnActorToPreviousPosition();
            } else {
                placeActor();
            }
            document.getElementById("territoryId").style.cursor = "default";
            drawBasicTerritory();
            drawTerritoryContent();
            drawActor();
        }
        isDraggable = false;
    };
    canvas.onmouseout = function(e) {
        if (isDraggable) {
            document.getElementById("territoryId").style.cursor = "default";
            returnActorToPreviousPosition();
            drawBasicTerritory();
            drawTerritoryContent();
            drawActor();
        }
        isDraggable = false;
    };
}

function setCellContent(r, c, position) {
    if (currentDraggableToCanvas == "treeImage") {
        console.log("setCellContent isEmpty: ", territoryContent[r][c].isEmpty())
        if (territoryContent[r][c].isEmpty()) {
            territoryContent[r][c].setTree(true);
            territory.drawImage(treeImage, position[0] - (treeImage.width / 2), position[1] - (treeImage.height / 2));
        }
    } else if (currentDraggableToCanvas == "leafImage") {
        console.log(!territoryContent[r][c].getTree())
        if (!territoryContent[r][c].getTree() && !territoryContent[r][c].getLeaf()) {
            console.log("leaf:", territoryContent[r][c].getLeaf())
            territoryContent[r][c].setLeaf(true);
            territory.drawImage(leafImage, position[0] - (leafImage.width / 2), position[1] - (leafImage.height / 2));
            if (territoryContent[r][c].getActor()) {
                drawActor();
            } else if (territoryContent[r][c].getMushroom()) {
                drawBasicTerritory();
                drawTerritoryContent();
                drawActor();
            }
        }
    } else if (currentDraggableToCanvas == "mushroomImage") {
        if (!territoryContent[r][c].getTree() && !territoryContent[r][c].getMushroom() && !territoryContent[r][c].getActor()) {
            console.log("leaf:", territoryContent[r][c].getLeaf())
            territoryContent[r][c].setMushroom(true);
            territory.drawImage(mushroomImage, position[0] - (mushroomImage.width / 2), position[1] - (mushroomImage.height / 2));
        }
    }
    currentDraggableToCanvas = " ";
    //console.log(territoryContent);
}

function drawTerritoryContent() {
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < column; c++) {
            var x = cellWidth * c + (cellWidth / 2);
            var y = cellHeight * r + (cellHeight / 2);
            if (territoryContent[r][c].getTree()) {
                territory.drawImage(treeImage, x - (treeImage.width / 2), y - (treeImage.height / 2));
            } else {
                if (territoryContent[r][c].getLeaf()) {
                    territory.drawImage(leafImage, x - (leafImage.width / 2), y - (leafImage.height / 2));
                }
                if (territoryContent[r][c].getMushroom()) {
                    territory.drawImage(mushroomImage, x - (mushroomImage.width / 2), y - (mushroomImage.height / 2));
                }
            }
        }
    }
}

function deleteElement(positionX, positionY) {
    var c = Math.floor(positionX / cellWidth);
    var r = Math.floor(positionY / cellHeight);

    territoryContent[r][c].setTree(false);
    territoryContent[r][c].setLeaf(false);
    territoryContent[r][c].setMushroom(false);
    drawBasicTerritory();
    drawTerritoryContent();
    drawActor();

    currentDraggableToCanvas = " ";
}