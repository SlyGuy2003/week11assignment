// build an array with arrays that hold all of the winning sequences that loops through every time to identify if was a win to which player or a draw



const playerX = 'X' //constant variables for both players
const playerO = 'O'
const winConditions = [ //array with all win conditions 
	[0, 1, 2], 
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const cellElementCollection = document.getElementsByClassName('cell') //gathers an HTML collection of all the divs
const cellElementArray = Array.from(cellElementCollection) //changes collection to array
const board = document.getElementById('board') // grabs board element
const restartButton = document.getElementById('restartbttn') //restartbutton
const turnText = document.getElementById('turnText')//turn message text
let isPlayerOTurn = false// boolean that holds whose turn it is


startGame()

restartButton.addEventListener('click', startGame)//adds event listener that restarts the game on button press

function startGame() {
    turnText.innerText = "Player X goes first!"
	isPlayerOTurn = false //resets turn
	cellElementArray.forEach(cell => {// for each cell removes any data
		cell.innerText = "" //removes any text from the center
        cell.classList.remove(playerX) //removes data from classlist
		cell.classList.remove(playerO)
		cell.addEventListener('click', handleCellClick, { once: true })
	})

}
function handleCellClick(e) { // function that detects which cell is being clicked on and checks to see if the game has been won or was a draw
	const cell = e.target
	const currentTurn = isPlayerOTurn ? playerO : playerX
	placeMark(cell, currentTurn)
	if (checkWin(currentTurn)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
	}
}

function checkWin(currentTurn) { //function that checks to see if the game has been won
	return winConditions.some(combination => {
		return combination.every(index => {
			return cellElementArray[index].classList.contains(currentTurn)
		})
	})
}

function placeMark(cell, currentTurn) { //function that makes an x or an O in the game board and adds the current turn the the class list
	cell.classList.add(currentTurn)
    cell.innerText = currentTurn
}

function swapTurns() { // swaps turns and changes the text box
    isPlayerOTurn = !isPlayerOTurn

    if (isPlayerOTurn === true) {
        turnText.innerText = "It's Player O's turn!"
    }
    else if (isPlayerOTurn === false) {
        turnText.innerText = "It's Player X's turn!"
    }
    
}

function isDraw() { // function that finds if the game was a draw or not
	return [...cellElementArray].every(cell => {
		return cell.classList.contains(playerX) || cell.classList.contains(playerO)
	})
}

function endGame(draw) { //function that changes the text box based on who won
	if (draw) {
		turnText.innerText = "It's a draw!";
	} else {
		turnText.innerText = `Player with ${isPlayerOTurn ? "O's" : "X's"} wins!`
	}

}


