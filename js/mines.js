'use strict'

function getRandMines(currI, currJ) {
    var minesCount = glevel.mines
    var size = glevel.size
    for (var i = 0; i < minesCount; i++) {
        var indexI = getRandomInt(0, size)
        var indexJ = getRandomInt(0, size)
        while (currI === indexI && currJ === indexJ) {
            indexI = getRandomInt(0, size)
            indexJ = getRandomInt(0, size)
        }
        while (gBoard[indexI][indexJ].isMine) {
            indexI = getRandomInt(0, size)
            indexJ = getRandomInt(0, size)
        }
        gBoard[indexI][indexJ].isMine = true
    }
    setMinesNegsCount()
}

function stepOnMine() {
    gGame.lifeCount--
    if (gGame.lifeCount > 0) oneLifeUsed()
    if (gGame.lifeCount === 0) {
        document.querySelector(".life").innerText = ``
        showAllMines()
        gameOver(SAD)
    }
}

function oneLifeUsed() {
    renderLifeCount()
    if (isVictory()) {
        gameOver(WIN)
        return
    }
    renderMood(SAD)
    setTimeout(renderMood, 1000, NORMAL)
}

function showAllMines() {
    for (var i = 0; i < glevel.size; i++) {
        for (var j = 0; j < glevel.size; j++) {
            if (gBoard[i][j].isMine === true) gBoard[i][j].isShown = true
        }
    }
    renderBoard(gBoard)
}





