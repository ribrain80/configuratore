
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.rawgit.com/konvajs/konva/1.4.0/konva.min.js"></script>
    <script
            src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
            crossorigin="anonymous"></script>
    <meta charset="utf-8">
    <title>Konva  Drag and Drop Demo</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #FFF;
        }
        #container {
            background: #F0F0F0;
            border: 1px solid #000;
        }
    </style>
</head>
<body>
<h2 style="width: 100%;text-align: center">TEST KONVA PER GIOCARE COI QUADRATI!!</h2>
<div id="container"></div>
<br><hr><br>
<button id="test">stampa json scena</button>
<div style="width: 100%" id="texta"></div>

<script>
    var width = window.innerWidth;
    var height = window.innerHeight/2;

    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });

    var layer = new Konva.Layer();
    var rectX = stage.getWidth()/2;
    var rectY = stage.getHeight()/2 ;

    var box = new Konva.Rect({
        x: rectX,
        y: rectY,
        width: 100,
        height: 100,
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true
    });

    var box1 = new Konva.Rect({
        x: rectX-150,
        y: rectY-150,
        width: 100,
        height: 100,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true
    });

    // add cursor styling
    box.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    box.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });

    // add cursor styling
    box1.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    box1.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });

    layer.add(box);
    layer.add(box1);
    stage.add(layer);

    $('#texta').html(stage.toJSON());
    $('#test').on('click', function () {
        $('#texta').html(stage.toJSON())
    });
</script>

</body>
</html>