var board = new Array();
var score = 0;
// 记录已经发生过碰撞的格子
var hasConflicted = new Array()

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;



$(document).ready(function () {
  var start = document.getElementById("start")
  $("#newGame").on('click', function () {
    if (start != null)
      // 音频重新播放
      start.currentTime = 0
    start.play()
  })
  // 移动端尺寸

  prepareForMobile()
  newGame()
})

function prepareForMobile() {
  // 2048容器的宽度为500px，对设备的屏幕宽度进行判断，如果大于500px，无需进行尺寸适配
  if (documentWidth > 500) {
    gridContainerWidth = 500;
    cellSpace = 20;
    cellSiderLength = 100;
  }
  $(".grid-container").css("width", gridContainerWidth - 2 * cellSpace)
  $(".grid-container").css("height", gridContainerWidth - 2 * cellSpace)
  $(".grid-container").css("padding", cellSpace)
  $(".grid-container").css("border-radius", 0.02 * gridContainerWidth)

  $(".grid-cell").css("width", cellSiderLength)
  $(".grid-cell").css("height", cellSiderLength)
  $(".grid-cell").css("border-radius", 0.02 * cellSiderLength)
  $(".number-cell").css("font-size", 0.6 * cellSiderLength)
}
function newGame() {
  // 初始化棋盘

  init();
  // 在两个随机的格子生成两个数字
  generateOneNumber();
  generateOneNumber();
}
function init() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var gridCell = $("#grid-cell-" + i + "-" + j);
      gridCell.css("top", getPosTop(i, j))
      gridCell.css("left", getPosLeft(i, j))
    }
  }
  // 所有的格子数值初始化为零，但是不让它显示
  for (var i = 0; i < 4; i++) {
    // 生成二维数组
    board[i] = new Array();
    hasConflicted[i] = new Array()
    for (var j = 0; j < 4; j++) {
      board[i][j] = 0;
      // 初始化每个格子都没有发生过碰撞
      hasConflicted[i][j] = false;
    }
  }
  updateBoardView();
  // 对分数进行初始化
  score = 0;
}
function updateBoardView() {
  // 先清除格子上所有数据；
  $(".number-cell").remove()
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) {
      $(".grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
      var theNumberCell = $('#number-cell-' + i + '-' + j);
      if (board[i][j] == 0) {
        theNumberCell.css("width", "0px")
        theNumberCell.css("height", "0px")
        theNumberCell.css("top", getPosTop(i, j) + cellSiderLength * 0.5)
        theNumberCell.css("left", getPosLeft(i, j) + cellSiderLength * 0.5)
      } else {
        theNumberCell.css("width", cellSiderLength)
        theNumberCell.css("height", cellSiderLength)
        theNumberCell.css("top", getPosTop(i, j))
        theNumberCell.css("left", getPosLeft(i, j))
        theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]))
        theNumberCell.css("color", getNumberColor(board[i][j]))
        theNumberCell.css("font-size", getNumberSize(board[i][j]))
        theNumberCell.text(board[i][j])
      }
      hasConflicted[i][j] = false
    }
  $(".number-cell").css("line-height", cellSiderLength + "px")
}
// 初始化生成数字的位置
function generateOneNumber() {
  // 首先判断是否还有空间、、这里实际上不需要判断是否有空格，因为后面生成为之会进行判断是否有位置，否则出现bug
  // if (noSpace(board)) {
  //   return false
  // }
  // 生成随机数,组合成随机位置
  var randomX = parseInt(Math.floor(Math.random() * 4))
  var randomY = parseInt(Math.floor(Math.random() * 4))
  var times = 0
  while (times < 50) {
    // 判断位置是否可用
    if (board[randomX][randomY] == 0) {
      // 如果等于0，位置可用，break退出循环
      break;
    } else {
      //不等于零，重新生成随机数
      randomX = parseInt(Math.floor(Math.random() * 4))
      randomY = parseInt(Math.floor(Math.random() * 4))
    }
    times++
  }
  if (times == 50) {
    for (var i = 0; i < 4; i++)
      for (var j = 0; j < 4; j++)
        if (board[i][j] == 0) {
          randomX = i;
          randomY = j;
        }
  }
  //随机生成一个数字
  var randNum = Math.random() > 0.5 ? 2 : 4;
  // 在随机位置显示随机数
  board[randomX][randomY] = randNum;
  // 数字生成过程的动画效果
  showNumberAnimation(randomX, randomY, randNum);

}
// 添加触摸事件监听器
document.addEventListener("touchstart", function (e) {
  // 返回的是一个数组信息，多指触碰
  // console.log(e)
  startX = e.touches[0].pageX;
  startY = e.touches[0].pageY
})
// 阻止触摸事件的默认行为
// 通过传递 passive 为 false 来明确告诉浏览器：事件处理程序调用 preventDefault 来阻止默认滑动行为。防止在chrome运行时报错
document.addEventListener("touchmove",
  function (e) {

    e.preventDefault()
  },
  { passive: false }
)
// 添加触摸离开时事件监听器
document.addEventListener("touchend", function (e) {
  // var bgm = document.getElementById("bgm")
  // bgm.play()
  endX = e.changedTouches[0].pageX
  endY = e.changedTouches[0].pageY
  var deltayX = endX - startX
  var deltayY = endY - startY
  // 对deltayX和deltaY进行判断、防止误碰
  if (Math.abs(deltayX) < 0.1 * documentWidth && Math.abs(deltayY) < 0.1 * documentWidth) {
    return
  }

  if (Math.abs(deltayX) >= Math.abs(deltayY)) {
    // x轴滑动
    if (deltayX > 0) {
      // 向右滑动
      if (moveRight()) {
        setTimeout("generateOneNumber()", 250)
        setTimeout("isGameOver()", 300)
      }
    } else {
      // 向左滑动
      if (moveLeft()) {
        setTimeout("generateOneNumber()", 250)
        setTimeout("isGameOver()", 300)
      }
    }
  } else {
    // y轴滑动 
    if (deltayY > 0) {
      // 向下滑动
      if (moveDown()) {
        setTimeout("generateOneNumber()", 250)
        setTimeout("isGameOver()", 300)
      }
    } else {
      // 向上滑动
      if (moveUp()) {
        setTimeout("generateOneNumber()", 250)
        setTimeout("isGameOver()", 300)
      }
    }

  }
})



// 监听键盘事件
$(document).keydown(function (e) {
  // var bgm = document.getElementById("bgm")
  // bgm.play()
  // playMusic()
  switch (e.keyCode) {
    case 38: //向上w
      // 阻止事件的默认行为，视图过大产生滚动条，窗口会发生移动
      e.preventDefault()
      // 判断是否可以向上移动
      if (moveUp()) {
        setTimeout("generateOneNumber()", 250)
        setTimeout("isGameOver()", 300)
      }
      break;
    case 40: //向下s
      e.preventDefault()
      if (moveDown()) {
        setTimeout("generateOneNumber()", 250)
        setTimeout("isGameOver()", 300)
      }
      break;
    case 37: //向←a
      e.preventDefault()
      if (moveLeft()) {
        setTimeout("generateOneNumber()", 250)
        setTimeout("isGameOver()", 300)
      }
      break;
    case 39: //向→d
      e.preventDefault()
      if (moveRight()) {
        setTimeout("generateOneNumber()", 250)
        setTimeout("isGameOver()", 300)
      }
      break;
    default:
      break;
  }
})

function moveLeft() {
  var moveAudio = document.getElementById("stone")
  var conflictAudio = document.getElementById("ice")
  var nomove = document.getElementById("nomove")
  if (!canMoveLeft(board)) {
    nomove.play()
    return false
  }
  for (var i = 0; i < 4; i++)
    for (var j = 1; j < 4; j++)
      if (board[i][j] != 0) {
        for (var k = 0; k < j; k++) {
          if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
            // move
            moveAudio.currentTime = 0
            moveAudio.play()
            showMoveAnimation(i, j, i, k)
            board[i][k] = board[i][j]
            board[i][j] = 0
            continue
          } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
            conflictAudio.currentTime = 0
            conflictAudio.play()
            showMoveAnimation(i, j, i, k)
            board[i][k] *= 2;
            board[i][j] = 0
            score += board[i][k]
            updateScore(score)
            hasConflicted[i][k] = true
            continue
          }
        }
      }
  setTimeout("updateBoardView()", 200)
  return true;
}
function moveUp() {
  var moveAudio = document.getElementById("stone")
  var conflictAudio = document.getElementById("ice")
  var nomove = document.getElementById("nomove")
  if (!canMoveUp(board)) {
    nomove.currentTime = 0
    nomove.play()
    return false;
  }
  for (var i = 1; i < 4; i++)
    for (var j = 0; j < 4; j++)
      if (board[i][j] != 0) {
        // 对i的上一个格子进行判断
        for (var k = 0; k < i; k++) {
          // 落脚点[k][j]为0，并且第j列 ，从i行到k行没有障碍物
          if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
            // move
            moveAudio.currentTime = 0
            moveAudio.play()
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j]
            board[i][j] = 0
            continue;

          } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
            // move
            conflictAudio.currentTime = 0
            conflictAudio.play()
            showMoveAnimation(i, j, k, j);
            // add
            board[k][j] *= 2
            board[i][j] = 0
            score += board[k][j]
            updateScore(score)
            hasConflicted[k][j] = true
            continue;
          }
        }
      }
  setTimeout("updateBoardView()", 200)
  return true
  // 动画执行需要时间，故延迟视图更新
}
function moveDown() {
  var moveAudio = document.getElementById("stone")
  var conflictAudio = document.getElementById("ice")
  var nomove = document.getElementById("nomove")
  if (!canMoveDown(board)) {
    nomove.currentTime = 0
    nomove.play()
    return false
  }
  for (var i = 2; i >= 0; i--)
    for (var j = 0; j < 4; j++)
      if (board[i][j] != 0) {
        for (var k = 3; k > i; k--) {
          if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
            // move
            moveAudio.currentTime = 0
            moveAudio.play()
            showMoveAnimation(i, j, k, j);
            board[k][j] = board[i][j]
            board[i][j] = 0
            continue;
          } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
            // move
            conflictAudio.currentTime = 0
            conflictAudio.play()
            showMoveAnimation(i, j, k, j);
            // add
            board[k][j] *= 2
            board[i][j] = 0
            score += board[k][j]
            updateScore(score)
            hasConflicted[k][j] = true
            continue;
          }
        }
      }
  setTimeout("updateBoardView()", 200)
  return true;
}

function moveRight() {
  var moveAudio = document.getElementById("stone")
  var conflictAudio = document.getElementById("ice")
  var nomove = document.getElementById("nomove")
  if (!canMoveRight(board)) {
    nomove.currentTime = 0
    nomove.play()
    return false
  }
  for (var i = 0; i < 4; i++)
    for (var j = 2; j >= 0; j--)
      if (board[i][j] != 0) {
        for (var k = 3; k > j; k--) {
          if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
            // move
            moveAudio.currentTime = 0
            moveAudio.play()
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j]
            board[i][j] = 0
            continue
          } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
            conflictAudio.currentTime = 0
            conflictAudio.play()
            showMoveAnimation(i, j, i, k);
            board[i][k] *= 2
            board[i][j] = 0
            score += board[i][k]
            updateScore(score)
            hasConflicted[i][k] = true
            continue
          }
        }
      }
  setTimeout("updateBoardView()", 200)
  return true;
}

function isGameOver() {
  var gamelose = document.getElementById("gameover")
  if (noSpace(board) && noMove(board)) {
    gamelose.play()
    gameOver()
  }
}
function gameOver() {
  $(".modal").css("display", "block")
}
// 点击离开关闭弹窗，注意window.onload才能执行该函数
window.onload = function () {
  document.getElementById("leave").addEventListener("click", function () {
    $(".modal").css("display", "none")
  });
  // 点击再来一局关闭弹窗，游戏重新开始
  document.getElementById("again").addEventListener("click", function () {
    $(".modal").css("display", "none")
    newGame()
  })
}