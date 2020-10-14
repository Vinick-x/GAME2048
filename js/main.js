let board = new Array();
let score = 0;

$(document).ready(function () {
  newGame()
})
function newGame() {
  // 初始化棋盘
  init();
  // 在两个随机的格子生成两个数字
  generateOneNumber();
  generateOneNumber();
}
function init() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let gridCell = $("#grid-cell-" + i + "-" + j);
      gridCell.css("top", getPosTop(i, j))
      gridCell.css("left", getPosLeft(i, j))
    }
  }
  // 所有的格子数值初始化为零，但是不让它显示
  for (let i = 0; i < 4; i++) {
    board[i] = new Array();
    for (let j = 0; j < 4; j++)
      board[i][j] = 0;

  }
  updateBoardView()
}
function updateBoardView() {
  // 先清除格子上所有数据；
  $(".number-cell").remove()
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      $(".grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
      let theNumberCell = $('#number-cell-' + i + '-' + j);
      if (board[i][j] == 0) {
        theNumberCell.css("width", "0px")
        theNumberCell.css("height", "0px")
        theNumberCell.css("top", getPosTop(i, j) + 50)
        theNumberCell.css("left", getPosLeft(i, j) + 50)
      } else {
        theNumberCell.css("width", "100px")
        theNumberCell.css("height", "100px")
        theNumberCell.css("top", getPosTop(i, j))
        theNumberCell.css("left", getPosLeft(i, j))
        theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]))
        theNumberCell.css("color", getNumberColor(board[i][j]))
        theNumberCell.text(board[i][j])
      }
    }
}
// 初始化生成数字的位置
function generateOneNumber() {
  // 首先判断是否还有空间
  if (noSpace(board)) {
    return false
  }
  // 生成随机数,组合成随机位置
  let randomX = parseInt(Math.floor(Math.random() * 4))
  let randomY = parseInt(Math.floor(Math.random() * 4))
  while (true) {
    // 判断位置是否可用
    if (board[randomX][randomY] == 0)
      // 如果等于0，位置可用，break退出循环
      break;
    //不等于零，重新生成随机数
    randomX = parseInt(Math.floor(Math.random() * 4))
    randomY = parseInt(Math.floor(Math.random() * 4))
  }
  //随机生成一个数字
  let randNum = Math.random() > 0.5 ? 2 : 4;
  // 在随机位置显示随机数
  board[randomX][randomY] = randNum;
  // 数字生成过程的动画效果
  showNumberAnimation(randomX, randomY, randNum);

}

// 监听键盘事件
$(document).keydown(function (e) {
  switch (e.keyCode) {
    case 38: //向上w
      // 判断是否可以向左移动
      if (moveUp()) {
        setTimeout("generateOneNumber()", 260)
        setTimeout("isGameOver()", 350)
      }
      break;
    case 40: //向下s
      if (moveDown()) {
        setTimeout("generateOneNumber()", 260)
        setTimeout("isGameOver()", 350)
      }
      break;
    case 37: //向←a
      if (moveLeft()) {
        setTimeout("generateOneNumber()", 260)
        setTimeout("isGameOver()", 350)
      }
      break;
    case 39: //向→d
      if (moveRight()) {
        setTimeout("generateOneNumber()", 260)
        setTimeout("isGameOver()", 350)
      }
      break;
    default:
      break;
  }
})
function moveUp() {
  if (!canMoveUp(board)) {
    return false;
  }
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++)
      if (board[i][j] != 0)
        // 对i的上一个格子进行判断
        for (let k = 0; k < i; k++) {
          // 落脚点[k][j]为0，并且第j列 ，从i行到k行没有障碍物
          if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
            // move
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j]
            board[i][j] = 0
            continue;

          } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)) {
            // move
            showMoveAnimation(i, j, k, j);
            // add
            board[k][j] *= 2
            board[i][j] = 0
            continue;
          }
        }
  }
  // 动画执行需要时间，故延迟视图更新
  setTimeout("updateBoardView()", 200)
  return true;
}
function moveDown() {
  if (!canMoveDown(board)) {
    return false
  }
  for (let i = 2; i >= 0; i--)
    for (let j = 0; j < 4; j++)
      if (board[i][j] != 0) {
        for (let k = 3; k > i; k--) {
          if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
            // move
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j]
            board[i][j] = 0
            continue;
          } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
            // move
            showMoveAnimation(i, j, k, j);
            // add
            board[k][j] *= 2
            board[i][j] = 0
            continue;
          }
        }
      }
  setTimeout("updateBoardView()", 200)
  return true;
}
function moveLeft() {
  if (!canMoveLeft(board)) {
    return false
  }
  for (let i = 0; i < 4; i++)
    for (let j = 1; j < 4; j++)
      if (board[i][j] != 0) {
        // 判断是否可以向左移动
        for (let k = 0; k < j; k++) {
          if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
            // move
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j]
            board[i][j] = 0
            continue
          } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
            // move
            showMoveAnimation(i, j, i, k);
            board[i][k] *= 2
            board[i][j] = 0;
            continue;
          }
        }
      }
  setTimeout("updateBoardView()", 200)
  return true;
}
function moveRight() {
  if (!canMoveRight(board)) {
    return false
  }
  for (let i = 0; i < 4; i++)
    for (let j = 2; j >= 0; j--)
      if (board[i][j] != 0) {
        for (let k = 3; k > j; k--) {
          if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
            // move
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j]
            board[i][j] = 0
            continue
          } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] *= 2
            board[i][j] = 0
            continue
          }
        }
      }
  setTimeout("updateBoardView()", 200)
  return true;
}

function isGameOver() {
  if (noSpace(board) && noMove(board)) {
    gameOver()
  }
}
function gameOver() {
  alert("游戏结束")
}