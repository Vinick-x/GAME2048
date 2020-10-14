function showNumberAnimation(i, j, num) {
  // 通过id获得生成数字的div
  let numberCell = $('#number-cell-' + i + '-' + j)
  numberCell.css("background-color", getNumberBackgroundColor(num))
  numberCell.css("color", getNumberColor(num))
  numberCell.text( num )
  // jquery动画
  numberCell.animate({
    width: "100px",
    height: "100px",
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