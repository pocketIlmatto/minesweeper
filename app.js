function MineGame(lines, columns, numMines) {
	this.lines = lines;
    this.columns = columns;
	this.numMines = numMines;
	this.space = 2; //2D board
	this.mineList = [];
	this.mineField = [];

	this.createMines = function () {
		var locationArray = [];
        var i;
		for (i = 0; i < this.numMines; i++ ) {
			do {
				locationArray = getRandomLocation(this.lines, this.columns);
			} while (!isLocationEmpty(this.mineList, locationArray[0], locationArray[1]))			
			this.mineList.push(locationArray);
		}
	};	
	this.createMap = function (){
		var row = [];
		var nextItem = "";
		for (var i = 1; i <= this.lines; i++){
			row = [];
			for (var j = 1; j <= this.columns; j++){
				nextItem = "";
				if (!isLocationEmpty(this.mineList, i, j)){
					nextItem = "M";
				}
				else {
					countMines = numAdjacentMines(this.mineList, i, j);
					if (countMines === 0){
						nextItem = "-";
					}
					else {
						nextItem = countMines;
					}					
				}//end if check location
				row.push(nextItem);
			}//end loop across the columns
			this.mineField.push(row);		
		}//end loop down the rows
		return this.mineField;
	};
}

function getRandomCoordinate(dimension) {
	return Math.floor((Math.random() * dimension) + 1);
}

function getRandomLocation(lines, columns) {
	var locationArray = [];
	locationArray.push(getRandomCoordinate(lines));
	locationArray.push(getRandomCoordinate(columns));
	return locationArray;
}

function isLocationEmpty(mineList, x, y) {
	//console.log("Function called with "+x+", "+y);
	if (mineList.length === 0) {
		console.log("empty mine list");
		return true;
	}
	for(var i = 0; i < mineList.length; i++){
		//console.log("Checking if "+mineList[i][0]+" == "+x);
		//console.log("Checking if "+mineList[i][1]+" == "+y);

		if (mineList[i][0] === x && mineList[i][1] === y){
			return false;
		}		
	}
	return true;
}

function numAdjacentMines(mineList, x, y) {
	var countMines = 0;

	//topleft
	if (!isLocationEmpty(mineList, x-1, y-1)) {
		countMines ++;
	}
	//top
	if (!isLocationEmpty(mineList, x-1, y)) {
		countMines ++;
	}
	//topright
	if (!isLocationEmpty(mineList, x-1, y+1)) {
		countMines ++;
	}
	//left
	if (!isLocationEmpty(mineList, x, y-1)) {
		countMines ++;
	}
	//right
	if (!isLocationEmpty(mineList, x, y+1)) {
		countMines ++;
	}
	//bottomleft
	if (!isLocationEmpty(mineList, x+1, y-1)) {
		countMines ++;
	}
	//bottom
	if (!isLocationEmpty(mineList, x+1, y)) {
		countMines ++;
	}
	//bottomright
	if (!isLocationEmpty(mineList, x+1, y+1)) {
		countMines ++;
	}		
	return countMines;
}


//Unit Tests
/*
console.log("getRandomCoordinate w/ parameter 10:" + getRandomCoordinate(10));
console.log("getRandomLocation w/ parameters 2, 10:" + getRandomLocation(2, 10));
var testMineList = [new Mine(1,2), new Mine(3,4)];
if (isLocationEmpty(testMineList, 1, 2)){
	console.log("isLocationEmpty function failed");
}
else {
	console.log("isLocationEmpty function passed");
}
*/


var countClicks = 0;
var mineField = [];
function clickPiece(x, y) {
	countClicks ++;
    if (mineField[x][y] === "M"){
        $("#"+x+"_"+y).addClass("highlighted");
        for (var i = 0; i < mineField.length; i++) {
            for (var j = 0; j < mineField[i].length; j++) {
                if (mineField[i][j] === "M") {
                    $("#"+x+"_"+y).prop('value', 'B');
                    $("#"+x+"_"+y).css("background-color", "FF0000");
                }
                $("#"+x+"_"+y).attr('onclick', 'resetGame()');
            }
        }
        alert("You exploded!");
    }
    else {
        $("#"+x+"_"+y).addClass("highlighted");
        $("#"+x+"_"+y).attr('onclick', '');
        $("#"+x+"_"+y).prop('value', mineField[x][y]);
    }   
}

function resetGame() {
    /*$(document).bind("contextmenu", function (e) {
        return false;
    });*/
    $('#Mines').html('');
    var columns = $("[name='columns']").val();
    var lines = $("[name='lines']").val();    
    var numMines = $("[name='mines']").val();  

    var mineGame = new MineGame(lines, columns, numMines);
    mineGame.createMines();

    //mineGame.mineList.sort(function(a,b) { return parseFloat(a[0]) - parseFloat(b[0]) } );
    //console.log(mineGame.mineList);
    //console.log("Creating map");
    mineField = mineGame.createMap();
    $("#GameBoard").width(columns*20);
    $("#GameBoard").height(lines*20+10);
    for (var i = 0; i < mineField.length; i++){
        for (var j = 0; j < mineField[i].length; j++){
            $("#Mines").append("<input type='button' class='piece' id='"+i+"_"+j+"' value='' \
                               onclick='clickPiece("+i+","+j+")'/>");
        }

        $("#Mines").append("</br>");

    }
    countClicks = 0;
}


$(document).ready(function (){
	resetGame();
});
	

	
		

	








