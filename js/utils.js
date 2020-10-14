function getPosTop(i, j) {
  return 20 + 120 * i
}
function getPosLeft(i, j) {
  return 20 + 120 * j
}
function getNumberBackgroundColor(number) {
  switch (number) {
    case 2: return "#eee4da"; break;
    case 4: return "#ede0c8"; break;
    case 8: return "#f2b179"; break;
    case 16: return "#f59563"; break;
    case 32: return "#f67c5f"; break;
    case 64: return "#ef5e3b"; break;
    case 128: return "#edcf72"; break;
    case 256: return "#edcc61"; break;
    case 512: return "#9c0"; break;
    case 1024: return "#33b5e5"; break;
    case 2048: return "#09c"; break;
    case 4096: return "#a6e"; break;
    case 8192: return "#93c"; break;
  }
  return "black";
}
function getNumberColor(number) {
  if (number <= 4)
    return "green";

  return "#fff";
}
// 空间判断函数
function noSpace(board) {
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (board[i][j] == 0) {
        // 如果有0，说明还有空间
        return false
      } else {
        // 没有0，说明空间已经占满了
        return true
      }
}
// 判断是否可以向上移动
function canMoveUp(board) {
  for (let i = 1; i < 4; i++)
    for (let j = 0; j < 4; j++)
      // 如果该格子不是空的
      if (board[i][j] != 0)
        // 如果上方的格子为空或者上下两个数字相同则可以进行上移
        if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j])
          return true;
  return false;
}
// 判断是否可以向下移动
function canMoveDown(board) {
  for (let i = 2; i >= 0; i--)
    for (let j = 0; j < 4; j++)
      // 判断格子是否为空
      if (board[i][j] != 0)
        if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
          return true
  return false
}
// 判断是否可以向左移动
function canMoveLeft(board) {
  for (let i = 0; i < 4; i++)
    for (let j = 1; j < 4; j++)
      // 判断格子是否为空
      if (board[i][j] != 0)
        if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
          return true
  return false
}
// 判断是否可以向右移动
function canMoveRight(board) {
  for (let i = 0; i < 4; i++)
    for (let j = 2; j >= 0; j--)
      if (board[i][j] != 0)
        if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
          return true
  return false
}
// 判断竖直方向是否有障碍
function noBlockVertical(col, row1, row2, board) {
  for (let i = row1 + 1; i < row2; i++)
    if (board[i][col] != 0)
      // 存在障碍物
      return false;
  return true;
}
// 判断水平方向是否有 障碍
function noBlockHorizontal(row, col1, col2, board) {
  for (let i = col1 + 1; i < col2; i++)
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