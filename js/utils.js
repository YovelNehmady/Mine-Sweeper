'use strict'

function setMinesNegsCount() {
  for (var i = 0; i < glevel.size; i++) {
    for (var j = 0; j < glevel.size; j++) {
      gBoard[i][j].minesAroundCount = negsCount(i, j)
    }
  }
}

function negsCount(cellI, cellJ) {
  var mineNegsCount = null
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

function renderMood(mood) {
  document.querySelector('.mood').innerText = mood
}

function renderBoard(board) {
  var cell
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j]
      ////check if switch can work here 
      if (currCell.isShown) {
        cell = (currCell.isMine) ? MINE : currCell.minesAroundCount
        if (!cell) cell = EMPTY
      } else cell = EMPTY

      var classList = currCell.isShown && cell === EMPTY ? 'isShow' : ''
      if (currCell.isSafe) classList = 'safe'
      if (currCell.isMarked) cell = FLAG
      strHTML += `<td class="cell ${classList}" oncontextmenu="onCellMarked(this,${i}, ${j})" onclick="onCellClicked(this,${i}, ${j})">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function negsRevealed(cellI, cellJ, shown) {
  console.log(shown)
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= glevel.size) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= glevel.size) continue
      gBoard[i][j].isShown = (shown) ? true : false
    }
  }
  renderBoard(gBoard)
}

function renderLifeCount() {
  var str = ``
  for (var i = 0; i < gGame.lifeCount; i++) {
    str += `❤️`
  }
  document.querySelector(".life").innerText = `${str}`
}

function renderHintCount() {
  var str = ''
  for (var i = 0; i < gGame.hintCount; i++) {
    str += '💡'
  }
  document.querySelector('.hint').innerText = str
}


function renderSafeCount() {
  var str = ''
  for (var i = 0; i < gGame.safeCount; i++) {
    str += '🛟'
  }
  document.querySelector('.safeBtn').innerText = str
}

function getRandSafeCell() {
  var cleearCells = []
  for (var i = 0; i < glevel.size; i++) {
    for (var j = 0; j < glevel.size; j++) {
      if (gBoard[i][j].isShown) continue
      if (!gBoard[i][j].isMine) cleearCells.push(gBoard[i][j])
    }
  }
  return cleearCells[getRandomInt(0, cleearCells.length)]
}

////to add renders for shown and markd
function renderPageMsg() {
  renderHintCount()
  renderMood(NORMAL)
  renderLifeCount()
  renderSafeCount()
}






/////timer

const watch = document.querySelector(".timer")
var millisecound = 0
var timer

function timeStart() {

  clearInterval(timer)
  timer = setInterval(() => {
    millisecound += 10;

    let dateTimer = new Date(millisecound);

    watch.innerHTML =
      ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
      ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
      ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);


  }, 10);
}

function setTimerAgain() {
  millisecound = 0
  watch.innerHTML = "00:00:00"
  clearInterval(timer)
}

function timePaused() {
  clearInterval(timer)
}

