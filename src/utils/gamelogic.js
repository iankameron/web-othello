const makePlay = (playRow, playColumn, Game) => {
  //   // function to be assigned to various cells in the playing grid
	// //Get location of the click.
  // let validPlayEvaluation = false;
	// let flip = 0, flipRow = 0, flipColumn = 0;
	// let splitIdString = elem.id.split("_");
  // console.log(splitIdString)
	// let playRow = Number(splitIdString[0]);
  // let playColumn = Number(splitIdString[1]);

	//console.log(elem.id, playRow, playColumn);
	//Evaluate whether square is empty or if other pieces make it valid
	validPlayEvaluation = evaluateSpace(playRow, playColumn, Game);
	//based on evaluation, update board and gameStatus
  if (validPlayEvaluation.length > 0) {
    let flips = [playRow, playColumn, ...validPlayEvaluation];
    let flipPairCount = flips.length / 2;
    for (let flip = 0; flip < flipPairCount; flip++) {
      let flipRow = flips[flip*2];
      let flipColumn = flips[flip*2+1];
      Game.board[flipRow][flipColumn] = Game.turn;
    }
    Game.turn = !Game.turn;
    if (Game.playerSockets.indexOf(Game.currentPlayer) === 0) {
      Game.currentPlayer = Game.playerSockets[1];
    } else {
      Game.currentPlayer = Game.playerSockets[0];
    }
    // console.log(Game.board, Game.turn)
  }
};

// Function will return array. If array is empty, it's not a legal play.
// If legal, the array will contain  coordinates of tiles that can be flipped.
function evaluateSpace (playRow, playColumn, Game) {
	//console.log("enteringEvalSpace", playRow, playColumn);

	var directionCounter, checkRow, checkColumn, checkCellStatus, continueDirection = true, tempPairs = [], flipResultsPairs = [];
  //xx    var checkString = "";
	//Check if clicked cell is empty. if not, then forbid play.
	if (Game.board[playRow][playColumn] !== null) {return [];}
    
	//var numRows = gameStatus.numRows, numColumns = gameStatus.numColumns;
	// 8 possible check directions. starting from right and going CCW.
	var directionIncrements = [[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1]];

	for (directionCounter = 0; directionCounter < 8; directionCounter++) {
		//initialize variables for direction check and first checkCell
        	continueDirection = true;
		tempPairs = [];
		checkRow = playRow + directionIncrements[directionCounter][0];
		checkColumn = playColumn + directionIncrements[directionCounter][1];
    // console.log("Before entering loop", directionCounter, checkRow, checkColumn);
    
    // an index call on an undefined results in an error, so avoid when board[checkRow] is empty
		if (Game.board[checkRow]) {
			checkCellStatus = Game.board[checkRow][checkColumn];
		} else {continueDirection = false;}

		//Check first if the neighboring space is the different color.
		if (checkCellStatus === !Game.turn) {
			//console.log(checkCellStatus);
			while (continueDirection === true) { 
        // (checkCellStatus != undefined || checkCellStatus === null)) {
        // The next cell has been confirmed to be different, if it comes
        // back to same color, then pieces can be flipped with the play.
        // Therefore, tempPairs can be added to flipResultsPairs
        if (checkCellStatus === Game.turn) {
          // console.log("ending loop");
          flipResultsPairs = flipResultsPairs.concat(tempPairs);
            continueDirection = false;
        } else if (checkCellStatus === !Game.turn) {
          //if status is not same color, add to temp list of flippables
          // console.log("before adding to temp:", checkRow, checkColumn);
          tempPairs.push(checkRow, checkColumn);
          // console.log("Temp Results: ", tempPairs.toString());
        } else {
          //If status is null or undefined, stop searching
            continueDirection = false;
        }

        checkRow += directionIncrements[directionCounter][0];
        checkColumn += directionIncrements[directionCounter][1];
        // console.log("Direction: ",directionCounter, ". changing to ", checkRow, checkColumn);
        if (Game.board[checkRow]) {
          checkCellStatus = Game.board[checkRow][checkColumn];
        } else {
          continueDirection = false;
        }
        //console.log(checkCellStatus, "end of while");
      }
    }
		// NO ELSE: If the next cell is same color or null, then direction should be false
	}
  // console.log("Final Results: ", flipResultsPairs.toString());
	return flipResultsPairs;
}

module.exports = {makePlay};