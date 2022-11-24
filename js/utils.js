


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


/////timer

const watch = document.querySelector(".timer")
var millisecound = 0
var timer

function timeStart() {

  // watch.style.display = "block"
  // watch.style.color = "black"
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

function timeReset() {
  // watch.style.color = "black";
  setInterval(timer)
  millisecound = 0;
  watch.innerHTML = "00:00:00";
}

function timePaused() {
  clearInterval(timer)
}

