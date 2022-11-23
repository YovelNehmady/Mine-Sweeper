'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ``
var gBoard
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var glevel = {
    size: 4,
    mines: 2
}

function onInitGame() {
    gBoard = buildBoard()
    console.log('gBoard', gBoard)
    renderBoard(gBoard)
}

function buildBoard() {
    var size = glevel.size
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}


function getRandMines() { // check for a possible bug that the same indexes or the same index as the one I clicked will be drawn
    var minesCount = glevel.mines
    var size = glevel.size
    for (var i = 0; i < minesCount; i++) {
        var indexI = getRandomInt(0, size)
        var indexJ = getRandomInt(0, size)
        gBoard[indexI][indexJ].isMine = true
    }
    setMinesNegsCount()
}

function timer() {
    timeStart()

}
function onFirstClick() {
    getRandMines()
    // timer()
}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) onFirstClick()
    if (gBoard[i][j].isShown) return
    if (gBoard[i][j].isMine) stepOnMine()
    gGame.isOn = true
    gBoard[i][j].isShown = true
    renderBoard(gBoard)
}

function stepOnMine() {
    showAllMines()
    gameOver('lose')
}

function gameOver(pos) {
    !gGame.isOn
}

function showAllMines() {
    for (var i = 0; i < glevel.size; i++) {
        for (var j = 0; j < glevel.size; j++) {
            if (gBoard[i][j].isMine) gBoard[i][j].isShown
        }
    }
    renderBoard(gBoard)
}

function onCellMarked(elCell, i, j) {
    if (!gGame.isOn) return
    if (gBoard[i][j].isMarked) {
        unMarkedCell(elCell, i, j)
        return
    }
    gBoard[i][j].isMarked = true
    elCell.innerText = FLAG
}

function unMarkedCell(elCell, i, j) {
    gBoard[i][j].isMarked = false
    elCell.innerText = EMPTY
}










