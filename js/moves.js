'use strict'

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
    if (gGame.isHint) hintMode(i, j) /////
    gBoard[i][j].isShown = true
    if (!gBoard[i][j].minesAroundCount) expandShown(i, j)
    renderBoard(gBoard)
    if (isVictory()) gameOver(WIN)
    if (gBoard[i][j].isMine) stepOnMine()
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

function isVictory() {
    for (var i = 0; i < glevel.size; i++) {
        for (var j = 0; j < glevel.size; j++) {
            if (gBoard[i][j].isMarked && gBoard[i][j].isMine) continue
            else if (!gBoard[i][j].isShown) return false
        }
    }
    return true
}