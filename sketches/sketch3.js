// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let clockFont;
  p.preload = function() {
    clockFont = p.loadFont('../fonts/NBAGameClock.ttf');
  }
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  //rgba(39, 39, 39, 1)
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

    p.textFont(clockFont);

    p.textSize(185)
    p.noStroke()
    p.fill(39, 39, 39);
    p.text("00:00", middleWidth, middleHeight-180);

    p.textAlign(p.CENTER, p.CENTER);
    p.fill(255,191,0);
    p.text("12:00", middleWidth, middleHeight - 180);

    //step 3. draw the shot clock
      //step 3a. Add "outline"
    
    p.fill(39, 39, 39);
    p.textSize(380);
    p.text("00", middleWidth, middleHeight + 45);
    p.fill('red');
    p.text("24", middleWidth, middleHeight + 45);
    
  
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
