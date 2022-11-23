
function buildBoard() {
  var size = glevel.size
  const board = []
  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: true
      }
    }
  }
  board[2][1].isMine = board[0][2].isMine = true
  // board[2][1].isShown = board[0][2].isShown = true
  return board
}

function setMinesNegsCount() {
  for (var i = 0; i < glevel.size; i++) {
    for (var j = 0; j < glevel.size; j++) {
      gBoard[i][j].minesAroundCount = negsCount(i, j)
    }
  }
}

function negsCount(cellI, cellJ) {
  var mineNegsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= glevel.size) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= glevel.size) continue
      if (gBoard[i][j].isMine) mineNegsCount++
    }
  }
  return mineNegsCount
}


function renderBoard(board) {
  var cell
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j]
if(gBoard[i][j].isShown){
  cell = (currCell.isMine) ? MINE : `${currCell.minesAroundCount}`
} else cell = ''
      strHTML += `<td class="cell" onclick="onCellClicked(this,${i}, ${j})">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}




