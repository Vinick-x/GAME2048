function showNumberAnimation(i, j, num) {
  // 通过id获得生成数字的div
  var numberCell = $('#number-cell-' + i + '-' + j)
  numberCell.css("background-color", getNumberBackgroundColor(num))
  numberCell.css("color", getNumberColor(num))
  numberCell.text( num )
  // 修复移动端生成新数字字体大小问题
  numberCell.css("font-size", 0.6*cellSiderLength)
  
  // jquery动画
  numberCell.animate({
    width: cellSiderLength,
    height: cellSiderLength,
    top: getPosTop(i, j),
    left: getPosLeft(i, j)
  }, 50)
}
function showMoveAnimation(fromX, fromY, ToX, ToY){
  var numberCell = $("#number-cell-"+fromX+"-"+fromY)
  numberCell.animate({
    top: getPosTop(ToX, ToY),
    left: getPosLeft(ToX, ToY)
  },200)
}
function updateScore(score) {
  $("#score").text(score);
}