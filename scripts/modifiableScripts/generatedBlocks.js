Blockly.Blocks['forward'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("bewegen");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
        this.setTooltip("einen Schritt vorwärts machen");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['left'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("links drehen");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
        this.setTooltip("auf dem aktuellen Feld um 90° nach links drehen");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['right'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("rechts drehen");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
        this.setTooltip("auf dem aktuellen Feld um 90° nach rechts drehen");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['put'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Blatt ablegen");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
        this.setTooltip("ein Kleeblatt ablegen");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['take'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Blatt nehmen");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
        this.setTooltip("ein Kleeblatt nehmen");
        this.setHelpUrl("");
    }
};
//Test-Befehle
Blockly.Blocks['onLeaf'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("auf Blatt");
        this.setOutput(true, null);
        this.setColour(330);
        this.setTooltip("Wahr, wenn ein Kleeblatt auf dem Feld liegt");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['treeFront'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Baum voraus");
        this.setOutput(true, null);
        this.setColour(330);
        this.setTooltip("Wahr, wenn vor Kara ein Baumstumpf ist");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['treeLeft'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Baum links");
        this.setOutput(true, null);
        this.setColour(330);
        this.setTooltip("Wahr, wenn links von Kara ein Baumstumpf ist");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['treeRight'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Baum rechts");
        this.setOutput(true, null);
        this.setColour(330);
        this.setTooltip("Wahr, wenn rechts von Kara ein Baumstumpf ist");
        this.setHelpUrl("");
    }
};
Blockly.Blocks['mushroomFront'] = {
    init: function() {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("Pilz voraus");
        this.setOutput(true, null);
        this.setColour(330);
        this.setTooltip("Wahr, wenn vor Kara ein Pilz ist");
        this.setHelpUrl("");
    }
};

// *** GENERATOR STUB *** //

// Generator stub: Kara actions
Blockly.JavaScript['forward'] = function(block) {
    var code = 'move();\n';
    return code;
};
Blockly.Python['forward'] = function(block) {
    var code = 'move()';
    return code;
};

Blockly.JavaScript['left'] = function(block) {
    var code = 'turnLeft();\n';
    return code;
};
Blockly.Python['left'] = function(block) {
    var code = 'turnLeft()\n';
    return code;
};

Blockly.JavaScript['right'] = function(block) {
    var code = 'turnRight();\n';
    return code;
};
Blockly.Python['right'] = function(block) {
    var code = 'turnRight()\n';
    return code;
};

Blockly.JavaScript['put'] = function(block) {
    var code = 'putLeaf();\n';
    return code;
};
Blockly.Python['put'] = function(block) {
    var code = 'putLeaf()\n';
    return code;
};

Blockly.JavaScript['take'] = function(block) {
    var code = 'takeLeaf();\n';
    return code;
};
Blockly.Python['take'] = function(block) {
    var code = 'removeLeaf()\n';
    return code;
};

// Generator stub: Kara tests

Blockly.JavaScript['onLeaf'] = function(block) {
    var code = 'onLeaf()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.Python['onLeaf'] = function(block) {
    var code = 'onLeaf()\n';
    return code;
};

Blockly.JavaScript['treeFront'] = function(block) {
    var code = 'treeFront()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.Python['treeFront'] = function(block) {
    var code = 'treeFront()\n';
    return code;
};

Blockly.JavaScript['treeLeft'] = function(block) {
    var code = 'treeLeft()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.Python['treeLeft'] = function(block) {
    var code = 'treeLeft()\n';
    return code;
};

Blockly.JavaScript['treeRight'] = function(block) {
    var code = 'treeRight()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.Python['treeRight'] = function(block) {
    var code = 'treeRight()\n';
    return code;
};

Blockly.JavaScript['mushroomFront'] = function(block) {
    var code = 'mushroomFront()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.Python['mushroomFront'] = function(block) {
    var code = 'mushroomFront()\n';
    return code;
};


// *** END OF GENERATOR STUB *** //

// JavaScript Interpreter

function initApi(interpreter, scope) {

    var wrapperTurnLeft = function(text) {
        text = text ? text.toString() : '';
        return turnLeft();
    };
    interpreter.setProperty(scope, 'turnLeft', interpreter.createNativeFunction(wrapperTurnLeft));

    var wrapperTurnRight = function(text) {
        text = text ? text.toString() : '';
        return turnRight();
    };
    interpreter.setProperty(scope, 'turnRight', interpreter.createNativeFunction(wrapperTurnRight));

    var wrapperMove = function(text) {
        text = text ? text.toString() : '';
        return move();
    };
    interpreter.setProperty(scope, 'move', interpreter.createNativeFunction(wrapperMove));

    var wrapperTakeLeaf = function(text) {
        text = text ? text.toString() : '';
        return takeLeaf();
    };
    interpreter.setProperty(scope, 'takeLeaf', interpreter.createNativeFunction(wrapperTakeLeaf));

    var wrapperPutLeaf = function(text) {
        text = text ? text.toString() : '';
        return putLeaf();
    };
    interpreter.setProperty(scope, 'putLeaf', interpreter.createNativeFunction(wrapperPutLeaf));

    var wrapperOnLeaf = function(text) {
        text = text ? text.toString() : '';
        return onLeaf();
    };
    interpreter.setProperty(scope, 'onLeaf', interpreter.createNativeFunction(wrapperOnLeaf));

    var wrapperTreeFront = function(text) {
        text = text ? text.toString() : '';
        return treeFront();
    };
    interpreter.setProperty(scope, 'treeFront', interpreter.createNativeFunction(wrapperTreeFront));

    var wrapperTreeLeft = function(text) {
        text = text ? text.toString() : '';
        return treeLeft();
    };
    interpreter.setProperty(scope, 'treeLeft', interpreter.createNativeFunction(wrapperTreeLeft));

    var wrapperTreeRight = function(text) {
        text = text ? text.toString() : '';
        return treeRight();
    };
    interpreter.setProperty(scope, 'treeRight', interpreter.createNativeFunction(wrapperTreeRight));

    var wrapperMushroomFront = function(text) {
        text = text ? text.toString() : '';
        return mushroomFront();
    };
    interpreter.setProperty(scope, 'mushroomFront', interpreter.createNativeFunction(wrapperMushroomFront));
}
