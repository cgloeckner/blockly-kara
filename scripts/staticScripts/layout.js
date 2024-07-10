var widthLeftBox = 0;
var widthRightBox = 0;
var heightLeftBox = 0;
var heightBlocklyBox = 0;
var windowHeight;
var blocklyWidthStyle = "";
var blocklyHeightStyle = "";
const minHeightLeftBox = 235;
const minHeightBlocklyBox = 195;
var isVerticalLayout = false;
var canvasMarginV = 10;
var canvasMarginH = 10;
var minMargin = 10;
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');

function resizeBlocklyFunc() {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    blocklyArea = document.getElementById('blocklyArea');
    blocklyDiv = document.getElementById('blocklyDiv');
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = (blocklyArea.offsetWidth) + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    console.log(blocklyArea.offsetWidth)
    console.log(blocklyArea.offsetHeight)
    console.log(x)
    console.log(y)
    Blockly.svgResize(workspace);
};

function onResizeFunc(e) {
    var windowWidth = getWindowWidth();
    setAreasWidth(windowWidth, false);
    setTitelWidth(windowWidth);
    setAreasHeight(getWindowHeight(), false);
    resizeBlocklyFunc();
    Blockly.svgResize(workspace);
    Blockly.svgResize(workspace);
    console.log("onResizeFunc called!");
}

function getWindowWidth() {
    return document.body.clientWidth;
}

function getWindowHeight() {
    return document.body.clientHeight;
}

function setTitelWidth(winWidth) {
    console.log("Window Width: ", winWidth);
    var titleWidth = 0;

    if (isVerticalLayout) {
        titleWidth = widthLeftBox;
    } else {
        titleWidth = winWidth;
    }

    // Resize the Titel Image...
    document.getElementById("titel").removeAttribute("style");
    var titelStyle = "border: 0px; height: 100%; width: " + (titleWidth).toString(10) + "px;";
    document.getElementById("titel").setAttribute("style", titelStyle);

    // Resize the Titel Div accordingly...
    document.getElementById("titelDiv").removeAttribute("style");
    var titelDivStyle = "border: 0px; margin: 0px 0px 10px 0px; box-shadow: 0 0 10px grey; width: " +
        document.getElementById("titel").width + "px; height: " +
        document.getElementById("titel").height + "px;";
    document.getElementById("titelDiv").setAttribute("style", titelDivStyle);
}

function setAreasHeight(winHeight, recalculateCanvas) {
    console.log("Window Height: ", winHeight);
    var allButtonsAndMargins = 135;
    var heightTopNav = 40;

    var wrapperStyle = document.getElementById("wrapper").getAttribute("style");
    var wrapperHeight = 0;
    wrapperHeight = Math.floor((winHeight - document.getElementById("titel").height - minMargin));
    wrapperStyle += " height: " + wrapperHeight + "px;";
    document.getElementById("wrapper").setAttribute("style", wrapperStyle);

    if (minHeightLeftBox > wrapperHeight) {
        console.log("Minimal Height Layout!");
        heightLeftBox = minHeightLeftBox;
    } else if (isVerticalLayout) {
        console.log("Vertical Layout!");
        heightLeftBox = Math.floor(wrapperHeight / 2);
    } else {
        console.log("Horizontal Layout!");
        //heightLeftBox = Math.floor((winHeight - document.getElementById("titel").height - minMargin));
        heightLeftBox = wrapperHeight;
    }

    if (recalculateCanvas) {
        row = Math.floor((heightLeftBox - allButtonsAndMargins - (canvasMarginV * 2)) / cellHeight);
        if (maxRows < row) {
            row = maxRows;
        }
        calculateCanvasSize();
    }

    document.getElementById("row").value = row;

    // Recalculate Left Box Height basing on Canvas Height...
    var tempHeightLeftBox = Math.floor((canvas.height + allButtonsAndMargins + (canvasMarginV * 2)));
    if (tempHeightLeftBox > heightLeftBox) {
        heightLeftBox = tempHeightLeftBox;
    }

    //console.log("heightLeftBox 2: ", heightLeftBox);
    //console.log("Calculated Height: ", (heightLeftBox + 10 + document.getElementById("titel").height));

    var leftBoxHeightStyle = " height: " + (heightLeftBox).toString(10) + "px;";
    var leftBoxStyles = document.getElementById("leftbox").getAttribute("style");
    leftBoxStyles += leftBoxHeightStyle;
    document.getElementById("leftbox").setAttribute("style", leftBoxStyles);

    if (isVerticalLayout) {
        var tempHeightBlocklyBox = Math.floor((wrapperHeight - heightLeftBox - heightTopNav));
        console.log("tempHeightBlocklyBox = ", tempHeightBlocklyBox);
        if (minHeightBlocklyBox > tempHeightBlocklyBox) {
            heightBlocklyBox = minHeightBlocklyBox;
        } else {
            heightBlocklyBox = tempHeightBlocklyBox;
        }
    } else {
        heightBlocklyBox = heightLeftBox - heightTopNav;
    }

    blocklyHeightStyle = "height: " + (heightBlocklyBox).toString(10) + "px;";
    var blocklyStyle = blocklyWidthStyle + " " + blocklyHeightStyle;
    document.getElementById("blocklyArea").setAttribute("style", blocklyStyle);

    //console.log("setAreasHeight: heightLeftBox = ", heightLeftBox);
    //console.log("setAreasHeight: heightBlocklyBox = ", heightBlocklyBox);
}

function setAreasWidth(winWidth, recalculateCanvas) {
    console.log("Window Width: ", winWidth);
    var boxesStyle = "background-color: rgb(255, 245, 235);";
    var wrapperStyle = "background-color: #fff; box-shadow: 0 0 10px grey; display: flex; width: " + (winWidth).toString(10) + "px;";
    var leftBoxStyle = "";
    var rightBoxStyle = "";
    var canvasBorder = 3; // real value of Canvas Border is 2.4
    var tempWidthLeftBox = 0;

    document.getElementById("wrapper").removeAttribute("style");
    document.getElementById("leftbox").removeAttribute("style");
    document.getElementById("rightbox").removeAttribute("style");

    // Precalculate the Left Box width for checking the Layout type...
    if (!recalculateCanvas) {
        tempWidthLeftBox = canvas.width + ((minMargin + canvasBorder) * 2);
    }

    // Vertical Layout...
    if (((minWidthLeftBox + minWidthRightBox) > winWidth) ||
        (!recalculateCanvas && (tempWidthLeftBox + minWidthRightBox) > winWidth)) {
        console.log("Vertical Layout!");
        isVerticalLayout = true;
        widthLeftBox = winWidth;

        // The Left Box should not be narrower than the Button Bar...
        if (minWidthLeftBox > widthLeftBox) {
            widthLeftBox = minWidthLeftBox;
        }

        if (recalculateCanvas) { // Calculating the initial Layout...
            column = Math.floor((widthLeftBox - ((minMargin + canvasBorder) * 2)) / cellWidth);
            calculateCanvasSize();
            // Calculate the Width of the Left Box back from the Canvas Width...
            tempWidthLeftBox = canvas.width + ((minMargin + canvasBorder) * 2);
            // Decrease numbed of columns to fit the Width of the Left Box...
            if (tempWidthLeftBox > widthLeftBox) {
                column--;
                calculateCanvasSize();
            }
            // Calculate real Margin of the Canvas basing on the new Width of the Left Box...
            canvasMarginH = Math.floor((widthLeftBox - canvas.width - (canvasBorder * 2)) / 2);
        } else {
            // Calculate the Width of the Left Box back from the Canvas Width...
            tempWidthLeftBox = canvas.width + ((minMargin + canvasBorder) * 2);
            // Resize the Left Box according to Canvas size
            if (tempWidthLeftBox > widthLeftBox) {
                widthLeftBox = tempWidthLeftBox;
                canvasMarginH = minMargin;
            } else {
                // Calculate real Margin of the Canvas basing on the new Width of the Left Box...
                canvasMarginH = Math.floor((widthLeftBox - canvas.width - (canvasBorder * 2)) / 2);
            }
        }

        widthRightBox = widthLeftBox;
        wrapperStyle += " flex-wrap: wrap;";
        boxesStyle += " clear: both;";

    } else { // Horizontal Layout...
        console.log("Horizontal Layout!");
        isVerticalLayout = false;
        widthLeftBox = Math.floor(winWidth / 2);

        // The Left Box should not be narrower than the Button Bar...
        if (minWidthLeftBox > widthLeftBox) {
            widthLeftBox = minWidthLeftBox;
        }

        if (recalculateCanvas) { // Calculating the initial Layout...
            column = Math.floor((widthLeftBox - ((minMargin + canvasBorder) * 2)) / cellWidth);
            calculateCanvasSize();
            // Calculate the Width of the Left Box back from the Canvas Width...
            tempWidthLeftBox = canvas.width + ((minMargin + canvasBorder) * 2);
            // Decrease numbed of columns to fit the Width of the Left Box...
            if (tempWidthLeftBox > widthLeftBox) {
                column--;
                calculateCanvasSize();
            }
            // Calculate real Margin of the Canvas basing on the new Width of the Left Box...
            canvasMarginH = Math.floor((widthLeftBox - canvas.width - (canvasBorder * 2)) / 2);
        } else {
            // Calculate the Width of the Left Box back from the Canvas Width...
            tempWidthLeftBox = canvas.width + ((minMargin + canvasBorder) * 2);
            // Resize the Left Box according to Canvas size
            if (tempWidthLeftBox > widthLeftBox) {
                widthLeftBox = tempWidthLeftBox;
                canvasMarginH = minMargin;
            } else {
                // Calculate real Margin of the Canvas basing on the new Width of the Left Box...
                canvasMarginH = Math.floor((widthLeftBox - canvas.width - (canvasBorder * 2)) / 2);
            }
        }

        widthRightBox = winWidth - widthLeftBox;
        wrapperStyle += " flex-wrap: nowrap;";
    }
    console.log("setAreasWidth: widthLeftBox = ", widthLeftBox);
    console.log("setAreasWidth: widthRightBox = ", widthRightBox);
    //console.log("margin: ", margin);

    // Set the Canvas Margin (top/bottom = canvasMarginV, left/right = calculated canvasMarginH)
    var territoryMargin = " " + (canvasMarginV).toString(10) + "px " + (canvasMarginH).toString(10) + "px";
    canvas.style.margin = territoryMargin;

    leftBoxStyle = boxesStyle + " width: " + (widthLeftBox).toString(10) + "px;";
    rightBoxStyle = boxesStyle + " width: " + (widthRightBox).toString(10) + "px;";
    blocklyWidthStyle = "width: " + (widthRightBox).toString(10) + "px;";

    var blocklyStyle = blocklyWidthStyle + " " + blocklyHeightStyle;
    document.getElementById("blocklyArea").setAttribute("style", blocklyStyle);

    document.getElementById("wrapper").setAttribute("style", wrapperStyle);
    document.getElementById("leftbox").setAttribute("style", leftBoxStyle);
    document.getElementById("rightbox").setAttribute("style", rightBoxStyle);

    maxColumn = Math.floor((widthLeftBox - ((minMargin + canvasBorder) * 2)) / cellWidth);
    document.getElementById("column").value = column;
    document.getElementById("column").max = maxColumn;
}

function calculateCanvasSize() {
    canvas.width = column * cellWidth;
    canvas.height = row * cellHeight;
}

function resizeTerritory() {
    var rowValue = parseInt(document.getElementById("row").value);
    var columnValue = parseInt(document.getElementById("column").value);
    if (2 <= rowValue && (rowValue < (maxRows + 1)) && 2 <= columnValue && columnValue < (maxColumn + 1)) {
        var windowHeightupdate = document.getElementsByTagName("body")[0].clientHeight;
        console.log("windowHeightupdate:", windowHeightupdate);

        row = rowValue;
        column = columnValue;
        calculateCanvasSize();
        setAreasWidth(getWindowWidth(), false);
        setAreasHeight(getWindowHeight(), false);
        updateTerritory();
        returnActorOnCanvas();
        drawBasicTerritory();
        drawTerritoryContent();
        drawActor();
        resizeBlocklyFunc();
        resizeBlocklyFunc(); // second recalculation to resize Width after disappearance of the Vertical Scroll
        Blockly.svgResize(workspace);
    }
    document.getElementById("row").value = row;
    document.getElementById("column").value = column;
}
