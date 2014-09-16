<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="style.css"/>
        <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/smoothness/jquery-ui.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
        <script type = "text/javascript" src="app.js"></script>
    </head>
    <body>
        <div id="Options">Mines:
            <input type="number" name="mines" value="10">Columns:
            <input type="number" name="columns" value="8">&nbsp;Lines:
            <input type="number" name="lines" value="8">
        </div>
        <div id="GameBoard">      
            <div id="Mines"></div>
        </div>
        <div>
        <button onclick="resetGame()">Restart</button>
        </div>

    </body>
</html>