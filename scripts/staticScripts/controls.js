var myInterpreter;
var speed = 80;
var stopped = true;
var run = false;
var paused = false;

function setSpeed(value) {
    speed = 100 - value;
    document.getElementById("slider").title = value;
    console.log(speed);
}

function runCode() {
    console.log("Begin of runCode() run: ", run);
    console.log("Begin of runCode() stopped: ", stopped);
    console.log("Begin of runCode() paused: ", paused);

    if (!run) {
        if (!paused) {
            //saveTemporaryTerritory();
            var code = Blockly.JavaScript.workspaceToCode(workspace);
            myInterpreter = new Interpreter(code, initApi);
            stopped = false;
            run = true;
            document.getElementById("playButton").disabled = true;
            document.getElementById("stopButton").disabled = false;
            document.getElementById("pauseButton").disabled = false;
            nextStep();
        } else {
            run = true;
            paused = false;
            document.getElementById("playButton").disabled = true;
            document.getElementById("stopButton").disabled = false;
            document.getElementById("pauseButton").disabled = false;
            nextStep();
        }
    }
    console.log("End of runCode() run: ", run);
    console.log("End of runCode() stopped: ", stopped);
    console.log("End of runCode() pause: ", paused);
}

function nextStep() {
    if (!stopped && !paused) {
        if (myInterpreter.step()) {
            window.setTimeout(nextStep, speed);
        } else {
            run = false;
            document.getElementById("playButton").disabled = false;
            document.getElementById("stopButton").disabled = true;
            document.getElementById("pauseButton").disabled = true;
        }
    }
}

function stopCode() {
    console.log("Begin of stopCode() run: ", run);
    console.log("Begin of stopCode() stopped: ", stopped);
    console.log("Begin of stopCode() pause: ", paused);

    stopped = true;
    run = false;
    paused = false;
    document.getElementById("playButton").disabled = false;
    document.getElementById("stopButton").disabled = true;
    document.getElementById("pauseButton").disabled = true;

    console.log("End of stopCode() run: ", run);
    console.log("End of stopCode() stopped: ", stopped);
    console.log("End of stopCode() pause: ", paused);
}

function pause() {
    console.log("Begin of pause() run: ", run);
    console.log("Begin of pause() stopped: ", stopped);
    console.log("Begin of pause() pause: ", paused);
    if (run) {
        run = false;
        paused = true;
        document.getElementById("playButton").disabled = false;
        document.getElementById("stopButton").disabled = false;
        document.getElementById("pauseButton").disabled = true;
    }

    console.log("End of pause() run: ", run);
    console.log("End of pause() stopped: ", stopped);
    console.log("End of pause() pause: ", paused);
}

function reset() {
    stopCode();
    loadTemporaryTerritory();
}