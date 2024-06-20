# Roadmap

## Welt-Datei kompatibel zu Automaten-Kara
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<XmlWorld sizex="9" sizey="9" version="KaraX 1.0 kara">
    <XmlWallPoints>
        <XmlPoint x="6" y="2"/>
        <XmlPoint x="3" y="1"/>
    </XmlWallPoints>
    <XmlObstaclePoints>
        <XmlPoint x="5" y="4"/>
        <XmlPoint x="6" y="6"/>
    </XmlObstaclePoints>
    <XmlPaintedfieldPoints>
        <XmlPoint type="0" x="4" y="6"/>
        <XmlPoint type="0" x="1" y="8"/>
    </XmlPaintedfieldPoints>
    <XmlKaraList>
        <XmlKara direction="3" name="Kara" x="2" y="5"/>
    </XmlKaraList>
    <XmlStreetList/>
</XmlWorld>
```
bzw. zu Python-Kara
```xml
<XmlWorld sizex="9" sizey="9" version="KaraX 1.0 pythonkara">
```

## Programm-Datei kompatibel zu PythonKara
```py
while not kara.treeFront():
  kara.move()
```
siehe [export-py Branch](https://github.com/cgloeckner/blockly-kara/tree/export-py) (WIP, import broken)
