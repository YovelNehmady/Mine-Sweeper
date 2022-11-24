'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ``
var gLife = ''
var gBoard

var gGame = {
    isOn: false,
    isFirstCkick: true,
    isTimerOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var glevel = {
    size: 4,
    mines: 2
}

function onChangeLevel(size, mines) {
    setTimerAgain()
    glevel.size = size
    glevel.mines = mines
    gGame.isFirstCkick = true
    gGame.isTimerOn = false
    onInitGame()
}

function onInitGame() {
    gBoard = buildBoard()
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

function getRandMines(currI, currJ) {
    var minesCount = glevel.mines
    var size = glevel.size
    for (var i = 0; i < minesCount; i++) {
        var indexI = getRandomInt(0, size)
        var indexJ = getRandomInt(0, size)
        ///////
        if (currI === indexI && currJ === indexJ) {
            indexJ = getRandomInt(0, size)
            indexI = getRandomInt(0, size)
        }
        else if (gBoard[indexI][indexJ].isMine) {
            indexI = getRandomInt(0, size)
            indexJ = getRandomInt(0, size)
        }
        gBoard[indexI][indexJ].isMine = true
    }
    setMinesNegsCount()
}

function onFirstClick(cueeI, currJ) {
    getRandMines(cueeI, currJ)
    if (gGame.isTimerOn === false) {
        timeStart()
        gGame.isTimerOn = true
    }
    gGame.isOn = true
    gGame.isFirstCkick = false
}

function onCellClicked(elCell, i, j) {
    if (gGame.isFirstCkick) onFirstClick(i, j)
    if (gGame.isOn === false) return
    if (gBoard[i][j].isMarked) return
    if (gBoard[i][j].isShown) return
    gBoard[i][j].isShown = true
    if (!gBoard[i][j].minesAroundCount) expandShown(i, j)
    renderBoard(gBoard)
    if (isVictory()) gameOver('won')
    if (gBoard[i][j].isMine) stepOnMine()
}

function stepOnMine() {
    showAllMines()
    gameOver('lose')
}

function isVictory() {
    for (var i = 0; i < glevel.size; i++) {
        for (var j = 0; j < glevel.size; j++) {
            if (gBoard[i][j].isMarked && gBoard[i][j].isMine) continue
            else if (!gBoard[i][j].isShown) return false
        }
    }
    return true
}
//////////
function gameOver(pos) {
    gGame.isOn = false
    timePaused()
    var msg = (pos === 'lose') ? `maybe next time...` : `you won!!`
    console.log(msg)

}

function showAllMines() {
    for (var i = 0; i < glevel.size; i++) {
        for (var j = 0; j < glevel.size; j++) {
            if (gBoard[i][j].isMine === true) gBoard[i][j].isShown = true
        }
    }
    renderBoard(gBoard)
}

function onCellMarked(elCell, i, j) {
    if (!gGame.isOn) return
    if (gGame.isTimerOn === false) {
        timeStart()
        gGame.isTimerOn = true
    }
    if (gBoard[i][j].isShown) return
    if (gBoard[i][j].isMarked) {
        unMarkedCell(elCell, i, j)
        return
    }
    gBoard[i][j].isMarked = true
    elCell.innerText = FLAG
    if (isVictory()) gameOver('won')
}

function unMarkedCell(elCell, i, j) {
    gBoard[i][j].isMarked = false
    elCell.innerText = EMPTY
}

function expandShown(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= glevel.size) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= glevel.size) continue
            if (gBoard[i][j].isShown) continue
            if (!gBoard[i][j].isMine) {
                if (gBoard[i][j].minesAroundCount) gBoard[i][j].isShown = true
                if (!gBoard[i][j].minesAroundCount) {
                    gBoard[i][j].isShown = true
                    expandShown(i, j)
                }

            } else continue
        }
    }
}










