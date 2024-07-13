var tempActorDirection;
var tempActorImageSrc;
var tempTerritoryContent;

function saveFile(saveTarget) {
    var content = "";

    let fileName = prompt("Gib einen Dateinamen ein: ")
    if (fileName === null || fileName == '') {
        console.log('Canceled by user ')
        return
    }
    console.log(`Picked filename is "${fileName}" for ${saveTarget}`)

    switch (saveTarget) {
        case "code":
            content = saveCode();
            content = Base64.encode(content)
            fileName += ".karacode";
            break;
        case "territory":
            content = saveTerritory();
            fileName += ".world";
            break;
        default:
            alert("Fehler beim Speichern der Datei!");
    }

    if (content !== "" && fileName !== "") {
        const blob = new Blob([content], {type: 'text/plain'})

        var element = document.createElement('a')
        element.href = window.URL.createObjectURL(blob)
        element.download = fileName
        element.style.display = "none"
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)

        console.log(`Saved ${saveTarget} to "${fileName}"`)
    } else {
        alert("Fehler beim Speichern der Datei!");
    }
}

// Export the entire cell to a single ASCII character
function dumpCell(cell) {
    if (cell.tree) {
        return 'B'
    }

    if (cell.leaf) {
        if (cell.mushroom) {
            return 'R'
        }
        return 'K'
    }

    if (cell.mushroom) {
        return 'P'
    }

    if (cell.actor) {
        const mapping = {
            "west": "W",
            "east": "O",
            "north": "N",
            "south": "S"
        }
        return mapping[actorDirection]
    }

    return '.'
}

function populateCell(x, y, raw) {
    let cell = new CellContent()

    if (raw == ".") {
        return cell
    }

    if (raw == "B") {
        cell.setTree(true)
        return cell
    }

    if (raw == "K") {
        cell.setLeaf(true)
        return cell
    }

    if (raw == "P") {
        cell.setMushroom(true)
        return cell
    }

    if (raw == "R") {
        cell.setLeaf(true)
        cell.setMushroom(true)
        return cell
    }

    cell.setActor(true)

    // place actor
    actorColumn = x
    actorRow = y
    currentX = actorColumn * cellWidth + 30
    currentY = actorRow * cellHeight + 30

    // set direction
    const mapping = {
        "W": "west",
        "O": "east",
        "N": "north",
        "S": "south"
    }
    actorDirection = mapping[raw]
    
    // set up sprite
    const img_src = {
        "W": "left",
        "O": "right",
        "N": "top",
        "S": "bottom"
    }
    actorImage.src = `./images/kara_${img_src[raw]}.png`

    return cell 
}

// Dump entire world to a multiline string
function saveTerritory() {
    let raw = ''
    for (let y = 0; y < row; ++y) {
        for (let x = 0; x < column; ++x) {
            raw += dumpCell(territoryContent[y][x])
        }
        raw += '\n'
    }

    return raw
}

// Parse entire woirld from a multiline string
function loadTerritory(raw) {
    const tmp = raw.split('\n')
    const new_row = tmp.length - 1 // NOTE: skip line after last '\n'
    const new_column = tmp[0].length

    stopCode()
    document.getElementById("row").value = new_row
    document.getElementById("column").value = new_column
    resizeTerritory()
    createCellContent()

    for (let y = 0; y < row; ++y) {
        for (let x = 0; x < column; ++x) {
            territoryContent[y][x] = populateCell(x, y, tmp[y][x])
        }
    }

    drawBasicTerritory()
    drawTerritoryContent()
}

function copyTerritory() {
    for (let y = 0; y < row; y++) {
        for (let x = 0; x < column; x++) {
            territoryContent[y][x] = new CellContent();
            territoryContent[y][x].setActor(initialTerritoryContent[y][x].actor);
            territoryContent[y][x].setTree(initialTerritoryContent[y][x].tree);
            territoryContent[y][x].setLeaf(initialTerritoryContent[y][x].leaf);
            territoryContent[y][x].setMushroom(initialTerritoryContent[y][x].mushroom);
        }
    }
}

function saveInitialTerritory() {
    initialActorDirection = actorDirection;
    initialActorImageSrc = actorImageSrc;
    initialTerritoryContent = JSON.parse(JSON.stringify(territoryContent));

    initialCurrentX = currentX;
    initialCurrentY = currentY;
    initialActorRow = actorRow;
    initialActorColumn = actorColumn;
}

function loadInitialTerritory() {
    actorDirection = initialActorDirection;
    actorImageSrc = initialActorImageSrc;
    copyTerritory();
    //console.log(initialTerritoryContent);

    currentX = initialCurrentX;
    currentY = initialCurrentY;
    actorRow = initialActorRow;
    actorColumn = initialActorColumn;
    drawBasicTerritory();
    drawTerritoryContent();
    actorImage.src = actorImageSrc;
}
