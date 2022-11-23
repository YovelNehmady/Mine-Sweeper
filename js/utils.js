
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
      if (gBoard[i][j].isMine) mineNegsCount++ // if (mat[i][j]) negsCount++
    }
  }
  return mineNegsCount
}


function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j]
      var classList = (currCell.isMine) ? ` mine` : ``
      var cell = (currCell.isMine) ? MINE : `${currCell.minesAroundCount}`
      strHTML += `<td class="cell ${classList}" onclick="onCellClicked(this,${i}, ${j})"><span hidden = "hidden" > ${cell} </span></td>`
    }
    strHTML += '</tr>'
  }
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
}

















//* GETS AN EMPTY GLOBAL VAR OF GNUMS AND BUILDS IT ACCORDING TO THE GNUMSRANGE LENGTH

function resetNums() {
  gNums = []
  for (var i = 0; i < gNumsRange; i++) {
    gNums.push(i + 1)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* DRAWS A RANDOM NUMBER FROM GNUMS ARRAY AND SPLICES THAT NUM SO IT WONT REPEAT ITSELF

function drawNum() {
  var randIdx = getRandomInt(0, gNums.length)
  var num = gNums[randIdx]
  gNums.splice(randIdx, 1)
  return num
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* GET RANDOM INT EXLUCIVE

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

//* GET RANDOM INT INCLUSIVE

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* CREATES BOARD ACCORDING TO GLOBAL SIZE VAR


///////////////////////////////////////////////////////////////////////////////////////////////

//* GETS A BOARD FROM CREATEBOARD AND RENDERING IT TO THE DOM



///////////////////////////////////////////////////////////////////////////////////////////////

//* INCASE WE NEED TO WORK/RENDER ON NEW MATRIX

function copyMat(mat) {
  var newMat = []
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j]
    }
  }
  return newMat
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* CREATE ANY ITEM 

function createBalloons(count) {
  var balloons = []
  for (var i = 0; i < count; i++) {
    var balloon = createBalloon(i)
    balloons.push(balloon)
  }
  return balloons
}

///////////////////////////////////////////////////////////////////////////////////////////////

function shuffle(items) {
  var randIdx, keep, i;
  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* RENDER ONLY CELL TO DOM
// location is an object like this - { i: 2, j: 7 }

function renderCell(location, value) {
  // Select the elCell and set the value
  const cellSelector = '.' + getClassName(location) // cell-i-j
  const elCell = document.querySelector(cellSelector)
  elCell.innerHTML = value
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* GET RANDOM COLOR
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* SHOW / HIDE ELEMENT

function showElement(selector) {
  const el = document.querySelector(selector)
  el.classList.remove('hidden')
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* GET ANY CELL TO AN ARRAY

function getEmptyCell(board) {
  const emptyCells = []
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var currCell = board[i][j]
      if (currCell.gameElement === null && currCell.type !== WALL)
        emptyCells.push({ i: i, j: j })
    }
  }

  //* CHOOSE A RANDOM INDEX FROM THAT ARRAY AND RETURN THE CELL ON THAT INDEX

  const randomIdx = getRandomInt(0, emptyCells.length - 1)
  return emptyCells[randomIdx]
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* COUNT NEIGHBORS



///////////////////////////////////////////////////////////////////////////////////////////////

//* RETURNS A CLASS NAME FOR A SPECIFIC CELL

function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* GET EMPTY CELL

function getEmptyCells() {
  var emptyCells = []
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (gBoard[i][j] === EMPTY) {
        emptyCells.push({ i: i, j: j })
      }
    }
  }
  return emptyCells
}

///////////////////////////////////////////////////////////////////////////////////////////////

//* CREATE TIMER

function startTimer() {
  gStartTime = Date.now()
  gInterval = setInterval(() => {
    const seconds = (Date.now() - gStartTime) / 1000
    var elSpan = document.querySelector('.time span')
    elSpan.innerText = seconds.toFixed(3)
  }, 1)
}