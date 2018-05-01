var object_x = 0;
var object_y = 0;
function wait_(milliseconds, foo, arg0, argx, argy, argdir){
  setTimeout(function () {
  foo(arg0, argx, argy, argdir); // will be executed after the specified time
  }, milliseconds);
}

function move(img, original_x, original_y, dir){  // this function redraws the c object every frame (FPS)
  console.log("move begin");
  var next_x = original_x;
  var next_y = original_y;
  if(dir == 0)  //up
  {
    next_y --;
    if(object_y == 0)
      return;
    var p = ctx.getImageData(original_x * 50 + 25, (original_y-1) * 50 + 25, 1, 1).data;
    if(p[0]!=0)
      return;
    console.log(p);
    ctx.clearRect(original_x * 50 + 7, original_y * 50 + 7, 45, 45); // clear the canvas
    object_y = object_y-1;
    drawImageCell(img, object_x, object_y)
  }
  else if( dir == 1)  //down
  {
    next_y++;
    if((next_x == 6) && (next_y==6))
    {
      ctx.clearRect(original_x * 50 + 7, original_y * 50 + 7, 45, 45); // clear the canvas
      object_y = object_y+ 1;
      drawImageCell(img, object_x, object_y)
      alert("bang");
    }
    if(object_y == 6)
      return;
    var p = ctx.getImageData(original_x * 50 + 25, (original_y+1) * 50 + 25, 1, 1).data;
    if(p[0]!=0)
      return;

    ctx.clearRect(original_x * 50 + 7, original_y * 50 + 7, 45, 45); // clear the canvas
    object_y = object_y+ 1;
    drawImageCell(img, object_x, object_y)
  }
  else if(dir == 2) //left
  {
    next_x --;
    if(object_x == 0)
      return;
    var p = ctx.getImageData((original_x-1)* 50 + 25, (original_y) * 50 + 25, 1, 1).data;
    if(p[0]!=0)
      return;

    ctx.clearRect(original_x * 50 + 7, original_y * 50 + 7, 45, 45); // clear the canvas
    object_x = object_x- 1;
    drawImageCell(img, object_x, object_y)
  }
  else if(dir == 3) //right
  {
    next_x++;
    if(object_x == 6)
      return;
    var p = ctx.getImageData((original_x+1) * 50 + 25, (original_y) * 50 + 25, 1, 1).data;
    if(p[0]!=0)
      return;
    ctx.clearRect(original_x * 50 + 7, original_y * 50 + 7, 45, 45); // clear the canvas
    object_x = object_x+ 1;
    drawImageCell(img, object_x, object_y)
  }
    //requestAnimationFrame(redraw);//schedule this function to be run on the next frame
}

function drawImageCell(img, i, j)
{
  var size = 45;
  ctx.drawImage(img, 50*i + 7 , 50*j + 7, size, size);
}
function wait_and_move_n(n)
{
  setTimeout(function(){
    move(rabbit_img,object_x, object_y, 1);
    if(n!=0)
      wait_and_move_n(n-1);
  },1000);
}
var rabbit_img = new Image();
rabbit_img.src = '/imgs/rabbit';
rabbit_img.onload= function()
{
  console.log("begin");
  //ctx.drawImage(rabbit_img,12,12,45,45);
  drawImageCell(rabbit_img, object_x, object_y);
  //wait_and_move_n(1);
  //resolveAfter2Seconds(x);
  //resolveAfter2Seconds(x);
  //wait_(1000, move, rabbit_img, object_x, object_y, 1);
  //await wait_async(1000);
  //drawImageCell(rabbit_img, object_x, ++object_y);
  //drawImageCell(rabbit_img, object_x, object_y+3);
  //console.log("after 1 s");
  //await wait_async(1000);
  //console.log("after 2 s");
  //move(rabbit_img, object_x, object_y, 1);
  //wait(1000, move, rabbit_img, object_x, object_y, 1);
  //wait(1000, move, rabbit_img, object_x, object_y, 1);
}
var rightPressed =false;
var leftPressed=false;
var upPressed=false;
var downPressed=false;
document.addEventListener("keypress", keyPressHandler);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyPressHandler(e) {
  console.log("hey");
}
function keyDownHandler(e) {
  if((e.keyCode == 40)) {
    e.preventDefault();
    downPressed = true;
  }
  if((e.keyCode == 39)) {
    e.preventDefault();
    rightPressed = true;
  }
  if((e.keyCode == 38)) {
    e.preventDefault();
    upPressed = true;
  }

  if((e.keyCode == 37)) {
    e.preventDefault();
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if((e.keyCode == 40) && downPressed) {
    move(rabbit_img, object_x, object_y, 1);
    downPressed = false;
  }
  if((e.keyCode == 39) && rightPressed) {
    move(rabbit_img, object_x, object_y, 3);
    rightPressed = false;
  }
  if((e.keyCode == 38) && upPressed) {
    move(rabbit_img, object_x, object_y, 0);
    upPressed = false;
  }

  if((e.keyCode == 37) && leftPressed) {
    move(rabbit_img, object_x, object_y, 2);
    leftPressed = false;
  }
}
//wait_and_move_n(2);
//move(rabbit_img, object_x, object_y,1);

var trees_img = new Image();
trees_img.src = '/imgs/trees';
trees_img.onload=function()
{
  drawImageCell(trees_img, 1, 0);
  drawImageCell(trees_img, 1, 1);
  drawImageCell(trees_img, 1, 2);
  drawImageCell(trees_img, 1, 3);
  drawImageCell(trees_img, 1, 5);
  drawImageCell(trees_img, 1, 6);

  drawImageCell(trees_img, 2, 3);
  drawImageCell(trees_img, 3, 3);
  drawImageCell(trees_img, 4, 3);
  drawImageCell(trees_img, 5, 3);
  drawImageCell(trees_img, 6, 2);

  drawImageCell(trees_img, 2, 5);
  drawImageCell(trees_img, 3, 5);
  drawImageCell(trees_img, 4, 5);
  drawImageCell(trees_img, 5, 5);
  drawImageCell(trees_img, 5, 6);
}
var lion_img = new Image();
lion_img.src = '/imgs/lion';
lion_img.onload=function()
{
  drawImageCell(lion_img, 6, 6);
}



var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function draw_line(x, y, x_, y_, margin)
{
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.moveTo(x + margin, y+ margin);
  ctx.lineTo(x_ + margin,y_ + margin);
  ctx.stroke();
}
function draw()
{
  for(var i = 0; i < 6; i++)
  {
    draw_line(0, 100*i, 600, 100*i);
  }
};
var margin = 5;
draw_line(0, 0,350, 0,5);
draw_line(0,50,350,50,5);
draw_line(0,100,350,100,5);
draw_line(0,150,350,150,5);
draw_line(0,200,350,200,5);
draw_line(0,250,350,250,5);
draw_line(0,300,350,300,5);
draw_line(0,350,350,350,5);

draw_line(0,0,0,350,5);
draw_line(50,0,50,350,5);
draw_line(100,0,100,350,5);
draw_line(150,0,150,350,5);
draw_line(200,0,200,350,5);
draw_line(250,0,250,350,5);
draw_line(300,0,300,350,5);
draw_line(350,0,350,350,5);

//draw();
//ctx.beginPath();
//ctx.strokeStyle="black";
//ctx.moveTo(0, 600);
//ctx.lineTo(600,600);
//ctx.stroke();
//ctx.beginPath();
//ctx.strokeStyle="black";
//ctx.moveTo(0, 0);
//ctx.lineTo(600,0);
//ctx.stroke();

//ctx.beginPath();
//ctx.strokeStyle="black";
//ctx.moveTo(0, 0);
//ctx.lineTo(0,600);
//ctx.stroke();
/*
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
*/
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

function drawBall() {
      ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI*2);
              ctx.fillStyle = "#0095DD";
                  ctx.fill();
                      ctx.closePath();
}

function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawBall();
              x += dx;
                  y += dy;
}

//setInterval(draw, 10);
