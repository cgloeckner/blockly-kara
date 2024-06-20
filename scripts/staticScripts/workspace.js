var loadTarget = "";
var fileExtension = "";

function loadFile(ldTarget) {
    loadTarget = ldTarget;
    var fileInputId = "file-input-" + loadTarget;
    var fileUpload = document.getElementById(fileInputId);
    fileUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        var reader = new FileReader();
        reader.addEventListener("loadend", function() {
            var fileContent = reader.result;
            console.log("Load Target: ", loadTarget);
            //if (loadTarget === fileExtension) {
            switch (loadTarget) {
                case "code":
                    loadCode(fileContent);
                    break;
                case "territory":
                    loadTerritory(fileContent);
                    break;
                default:
                    alert("Fehler beim Laden der Datei!");
            }
            /*} else {
                 alert("Falscher Dateityp: ." + fileExtension);
             }*/
        });
        if (file) { // to prevent exception: Failed to execute 'readAsText' on 'FileReader': parameter 1 is not of type 'Blob'.
            reader.readAsText(file);
            fileExtension = file.name.split(".").pop();
            console.log('Load File Extension: ', fileExtension);
        }
        event.target.value = ""; // reset the value to enable the next trigger of "change" event
    });
    fileUpload.click();
}

function saveCode() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToText(xml);
    return xmlText;
}

function loadCode(fileContent) {
    var text = Base64.decode(fileContent);
    try {
        var dom = Blockly.Xml.textToDom(text);
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(dom, Blockly.mainWorkspace);
    } catch (e) {
        alert("Fehler beim Laden xml-Datei");
        console.log(e);
    }
}