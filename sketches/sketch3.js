// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  //rgba(0, 0, 0, 1)
  p.draw = function () {
    p.background(255);
    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight/2;


    // step 1. Draw the shot clock board
    p.stroke(0, 0, 0);
    p.fill(0, 0, 0);
    p.rectMode(p.CENTER);
    p.rect(middleWidth, middleHeight, 500, 500);
    
    // step 2. Draw the game time at the top of the board
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(140);
    p.fill(255,191,0);
    p.noStroke();
    p.text("12:00", middleWidth, middleHeight - 180);

    //step 2a. Draw the outline of 00:00's (wip)
    //p.fill()
    //p.text("00:00")

    //step 3. draw the shot clock
    p.textSize(300);
    p.fill('red');
    p.text("24", middleWidth, middleHeight + 50);
    
  
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
