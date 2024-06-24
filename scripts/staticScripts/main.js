var territory;
var row;
var column;
var actorImage = new Image();
var actorImageSrc;
var actorDirection;
var canvas;
var currentX;
var currentY;
var actorRow;
var actorColumn;
var isDraggable = false;
var maxColumn;
var maxRows = 20;
var workspace;
var territoryContent;
var currentDraggableToCanvas;

var tempCurrentX;
var tempCurrentY;
var tempActorRow;
var tempActorColumn;

function createCellContent() {
    territoryContent = new Array(row);
    for (var r = 0; r < row; r++) {
        territoryContent[r] = new Array(column);
    }
}

function updateTerritory() {
    var territoryContentNew = new Array(row);
    for (var r = 0; r < row; r++) {
        territoryContentNew[r] = new Array(column);
    }
    // fill Territory matrix
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < column; c++) {
            //console.log(territoryContent[r][c]);
            if (r < territoryContent.length && c < territoryContent[r].length) {
                territoryContentNew[r][c] = territoryContent[r][c];
            } else {
                territoryContentNew[r][c] = new CellContent();
            }
        }
    }
    territoryContent = territoryContentNew;
}


function returnActorToPreviousPosition() {
    currentX = cellWidth * actorColumn + (cellWidth / 2);
    currentY = cellHeight * actorRow + (cellHeight / 2);
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    currentDraggableToCanvas = event.target.id;
}

function touchEndFunc(event) {
    console.log("touchend called!");
    var canvasTouch = getTerritoryBoundingClientRect();
    var touchobj = event.changedTouches[0];
    // Place element where the finger is
    var touchX = touchobj.clientX;
    var touchY = touchobj.clientY;
    if (touchobj.clientX > canvasTouch.left &&
        touchobj.clientX < canvasTouch.right &&
        touchobj.clientY > canvasTouch.top &&
        touchobj.clientY < canvasTouch.bottom) {
        placeElement(Math.floor(touchX - canvasTouch.left), Math.floor(touchY - canvasTouch.top));
    }
}

function trashTouchEndFunc(event) {
    console.log("trash touchend called!");
    var canvasTouch = getTerritoryBoundingClientRect();
    var touchobj = event.changedTouches[0];
    // Place element where the finger is
    var touchX = touchobj.clientX;
    var touchY = touchobj.clientY;

    console.log("trash touchend canvasTouch.bottom: ", canvasTouch.bottom)
    console.log("trash touchend touchobj.clientX: ", touchobj.clientX)
    if (touchobj.clientX > canvasTouch.left &&
        touchobj.clientX < canvasTouch.right &&
        touchobj.clientY > canvasTouch.top &&
        touchobj.clientY < canvasTouch.bottom) {
        //if (currentDraggableToCanvas == "trashImage") {
        deleteElement(Math.floor(touchX - canvasTouch.left), Math.floor(touchY - canvasTouch.top));
    }
}

function getTerritoryBoundingClientRect() {
    return document.getElementById("territoryId").getBoundingClientRect();
}

function dragTouch(event) {
    console.log("dragTouch called!");
    currentDraggableToCanvas = event.target.id;
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    if (currentDraggableToCanvas == "trashImage") {
        deleteElement((event.pageX - canvas.offsetLeft), (event.pageY - canvas.offsetTop));
    } else {
        placeElement((event.pageX - canvas.offsetLeft), (event.pageY - canvas.offsetTop));
    }

    console.log("drop event.pageX: ", event.pageX);
    console.log("drop (event.clientX - canvas.offsetLeft): ", (event.clientX - canvas.offsetLeft));
}

function placeElement(positionX, positionY) {
    var c = Math.floor(positionX / cellWidth);
    console.log("placeElement column: ", c);
    var x = cellWidth * c + (cellWidth / 2);

    var r = Math.floor(positionY / cellHeight);
    console.log("placeElement row: ", r)
    var y = cellHeight * r + (cellHeight / 2);
    var position = [x, y];

    setCellContent(r, c, position);
}

function allowDrop(event) {
    event.preventDefault();
}
