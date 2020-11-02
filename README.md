# GAME2048
一个在线2048小游戏
###遇到的问题：
1、数字字体大小定义为60px，当超过三位数后文字会超出格子范围
```
function getNumberSize(number) {
  if (number.toString().length > 3)
    return 0.45*cellSiderLength + "px";
  return 0.60*cellSiderLength + "px";
}
```
###修复移动端字体问题

###加入上下左右键盘及滑动音效，newGame游戏音效、无法滑动时音效、格子发生碰撞音效及游戏结束音效、游戏胜利音效。

###增加游戏失败，游戏到达2048弹窗。