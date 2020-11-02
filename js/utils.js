// 定义相对尺寸
documentWidth = window.screen.availWidth
// 容器的宽度
gridContainerWidth = 0.92 * documentWidth
// 格子的宽高
cellSiderLength = 0.18 * documentWidth
// 格子之间的间隔
cellSpace = 0.04 * documentWidth

function getPosTop(i, j) {
  return cellSpace + (cellSpace + cellSiderLength) * i
}
function getPosLeft(i, j) {
  return cellSpace + (cellSpace + cellSiderLength) * j
}
function getNumberBackgroundColor(number) {
  switch (number) {
    case 2: return "#fff"; break;
    case 4: return "rgba(251, 247, 218)"; break;
    case 8: return "rgba(169, 218, 244)"; break;
    case 16: return "rgba(114, 194, 238)"; break;
    case 32: return "rgba(153, 204, 204)"; break;
    case 64: return "rgba(60, 231, 205)"; break;
    case 128: return "rgba(51, 153, 153)"; break;
    case 256: return "rgba(51, 153, 204)"; break;
    case 512: return "rgba(51, 102, 153)"; break;
    case 1024: return "rgba(120, 60, 231)"; break;
    case 2048: return "rgba(205, 60, 231)"; break;
    case 4096: return "rgba(231, 60, 171)"; break;
    case 8192: return "rgba(231, 60, 85)"; break;
  }
  return "black";
}
function getNumberColor(number) {
  if (number <= 4)
    return "rgba(27, 148, 218)";

  return "#fff";
}
function getNumberSize(number) {
  if (number.toString().length > 3) {
    return 0.45 * cellSiderLength + "px";
  } else {
    return 0.60 * cellSiderLength + "px";
  }
}
// 空间判断函数
function noSpace(board) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        // 如果有0，说明还有空间
        return false
      } else {
        // 没有0，说明空间已经占满了
        return true
      }
    }
  }
}
// 判断是否可以向上移动
function canMoveUp(board) {
  for (var i = 1; i < 4; i++)
    for (var j = 0; j < 4; j++)
      // 如果该格子不是空的
      if (board[i][j] != 0)
        // 如果上方的格子为空或者上下两个数字相同则可以进行上移
        if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
          return true;
  return false;
}
// 判断是否可以向下移动
function canMoveDown(board) {
  for (var i = 2; i >= 0; i--)
    for (var j = 0; j < 4; j++)
      // 判断格子是否为空
      if (board[i][j] != 0)
        if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
          return true
  return false
}
// 判断是否可以向左移动
function canMoveLeft(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 1; j < 4; j++)
      // 判断格子是否为空
      if (board[i][j] != 0)
        if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
          return true
  return false
}
// 判断是否可以向右移动
function canMoveRight(board) {
  for (var i = 0; i < 4; i++)
    for (var j = 2; j >= 0; j--)
      if (board[i][j] != 0)
        if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
          return true
  return false
}
// 判断竖直方向是否有障碍
function noBlockVertical(col, row1, row2, board) {
  for (var i = row1 + 1; i < row2; i++)
    if (board[i][col] != 0)
      // 存在障碍物
      return false;
  return true;
}
// 判断水平方向是否有 障碍
function noBlockHorizontal(row, col1, col2, board) {
  for (var i = col1 + 1; i < col2; i++)
    if (board[row][i] != 0)
      return false
  return true
}
function noMove(board) {
  if (canMoveDown(board) ||
    canMoveLeft(board) ||
    canMoveUp(board) ||
    canMoveRight(board)
  )
    return false;
  return true;
}