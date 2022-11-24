'use strict'

const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''
const NORMAL = '😃'
const SAD = '🤯'
const WIN = '😎'

var gGame = {
    isOn: false,
    isFirstCkick: true,
    isTimerOn: false,
    isHint: false,
    hintCount: 0,
    shownCount: 0,
    markedCount: 0,
    lifeCount: 0

}
var glevel = {
    size: 4,
    mines: 2
}
var gBoard


function onInitGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    gGame.lifeCount = 3
    gGame.hintCount = 3
    renderPageMsg()
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

function onReset(){
    setTimerAgain()
    gGame.isFirstCkick = true
    gGame.isTimerOn = false
    onInitGame()
    document.querySelector('.modalMsg').innerText = ''
    
}

function onChangeLevel(size, mines) {
    setTimerAgain()
    glevel.size = size
    glevel.mines = mines
    gGame.isFirstCkick = true
    gGame.isTimerOn = false
    onInitGame()
    document.querySelector('.modalMsg').innerText = ''
}

function onHintMode() {
    gGame.isHint = true
}

function hintMode(currI, currJ) {
    // console.log('isHint')
    gGame.hintCount--
    negsRevealed(currI, currJ, true)
    setTimeout(negsRevealed, 1000, currI, currJ, false)
    gGame.isHint = false
    renderHintCount()
}

function gameOver(pos) {
    gGame.isOn = false
    timePaused()
    var msg = (pos === SAD) ? `maybe next time...` : `you won!!`
    document.querySelector('.modalMsg').innerText = msg
    renderMood(pos)

}



















