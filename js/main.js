'use strict'

const MINE = '💣'
var gBoard
var glevel = {
    size: 4,
    mines: 2
}
var gSize = 4



function onInitGame() {
    gBoard = buildBoard()
    setMinesNegsCount()
    console.log('gBoard', gBoard)
    renderBoard(gBoard)
}




function onCellClicked(elCell, i, j) {
    gBoard[i][j].isShown = true


console.log(elCell.querySelector('span').hidden);
elCell.querySelector('span').hidden = 'false'
console.log(elCell.querySelector('span').hidden);

    renderBoard(gBoard)
    // console.log(elCell.innerText)
}




