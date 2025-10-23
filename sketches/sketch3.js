// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  //rgba(43, 43, 43, 1)
  p.draw = function () {
    p.background(78, 78 ,78);
    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight/2;


    // step 1. Draw the shot clock board
    p.strokeWeight(5);
    p.stroke(255);
    p.fill(0, 0, 0);
    p.rectMode(p.CENTER);
    p.rect(middleWidth, middleHeight, 500, 500);
    
    // step 2. Draw the game time at the top of the board
      //2a. add "outline"
      
    p.textSize(140)
    p.noStroke()
    p.fill(43, 43, 43);
    p.text("00:00", middleWidth, middleHeight-160);

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(140);
    p.fill(255,191,0);
    p.text("12:00", middleWidth, middleHeight - 160);

    //step 3. draw the shot clock
      //step 3a. Add "outline"
    
    p.fill(43, 43, 43);
    p.textSize(300);
    p.text("00", middleWidth, middleHeight + 80);
    p.fill('red');
    p.text("24", middleWidth, middleHeight + 80);
    
  
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
