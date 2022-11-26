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
    isDarkMode : false,
    // isManual: false,
    hintCount: 0,
    // shownCount: 0,
    // markedCount: 0,
    lifeCount: 0,
    safeCount: 0

}
var glevel = {
    size: 4,
    mines: 2
}
var gBoard


function onInitGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    gGame.lifeCount = (glevel.mines === 2) ? 2 : 3
    gGame.hintCount = 3
    gGame.safeCount = 3
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
                isMarked: false,
                isSafe: false
            }
        }
    }
    return board
}

function onReset() {
    setTimerAgain()
    gGame.isFirstCkick = true
    gGame.isTimerOn = false
    onInitGame()
    // document.querySelector('.modalMsg').innerText = ''

}

function onChangeLevel(size, mines) {
    setTimerAgain()
    glevel.size = size
    glevel.mines = mines
    gGame.isFirstCkick = true
    gGame.isTimerOn = false
    onInitGame()
}

function onHintMode() {
    if (gGame.hintCount <= 0) return
    gGame.isHint = true
}

function onSafeClick() {
    if (gGame.safeCount <= 0) return
    gGame.safeCount--
    var randCell = getRandSafeCell()
    randCell.isSafe = true
    renderBoard(gBoard)
    randCell.isSafe = false
    setTimeout(renderBoard, 1500, gBoard)
    renderSafeCount()
}

function hintMode(currI, currJ) {
    gGame.hintCount--
    negsRevealed(currI, currJ, true)
    setTimeout(negsRevealed, 1000, currI, currJ, false)
    gGame.isHint = false
    renderHintCount()
}

function gameOver(pos) {
    gGame.isOn = false
    timePaused()
    var msg = (pos === SAD) ? `Maybe next time...` : `Good job, you revealed them all!!`
    document.querySelector('.modalMsg').innerText = msg
    renderMood(pos)

}

function onDarkMode() {
    gGame.isDarkMode = !gGame.isDarkMode 
    document.querySelector('body').classList.toggle('dark')
    document.querySelector('.btn1').classList.toggle('dark')
    document.querySelector('.btn2').classList.toggle('dark')
    document.querySelector('.btn3').classList.toggle('dark')
    document.querySelector('.hint').classList.toggle('dark')
    document.querySelector('.mood').classList.toggle('dark')
    document.querySelector('.safeBtn').classList.toggle('dark')
    document.querySelector('.darkBtn').classList.toggle('dark')
    var str = (!gGame.isDarkMode) ? `Dark mode` : `Light mode`
    document.querySelector('.darkBtn').innerText = str
}

















