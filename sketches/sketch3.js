// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let clockFont; // font 

  //setup shot and game clock ms
  const shotClockMs = 24000;
  const gameClockMs = 720000;
  let timeElapsed;

  p.preload = function() {
    clockFont = p.loadFont('../fonts/NBAGameClock.ttf'); // preload font
  }
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    //timeElapsed = p.millis(); 
  }

  //rgba(39, 39, 39, 1)
  p.draw = function () {
    timeElapsed = p.millis(); 

    p.background(78, 78 ,78);

    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight/2;
    const { mm, ss } = msToMMSS(gameClockMs - timeElapsed);
    const { mm: mmShot, ss: ssShot } = msToMMSS(shotClockMs - timeElapsed);

    // step 1. Draw the shot clock board
    p.strokeWeight(5);
    p.stroke(255);
    p.fill(0, 0, 0);
    p.rectMode(p.CENTER);
    p.rect(middleWidth, middleHeight, 500, 500);
    
    // step 2. Draw the game time at the top of the board
      //2a. add "outline"
    
    p.textAlign(p.CENTER, p.CENTER); // center all following text
    p.noStroke(); // no stroke for texts
    p.textFont(clockFont); //set text font to clockFont

    p.textSize(185)
    p.fill(39, 39, 39);
    p.text("00:00", middleWidth, middleHeight-180); //outline
    p.fill(255,191,0);
    p.text(mm + ":" + ss, middleWidth, middleHeight-180);

    //step 3. draw the shot clock
      //step 3a. Add "outline"
    
    p.fill(39, 39, 39);
    p.textSize(380);
    p.text("00", middleWidth, middleHeight + 45); //outline
    p.fill('red');
    p.text(ssShot, middleWidth, middleHeight + 45);
    
  
  };

  // this function takes in some milliseconds, and returns the MINUTES and SECONDS associated with it.
  // Credit: msToMMSS function from example 8
  function msToMMSS(ms) {
    const total = p.max(0, p.round(ms / 1000));
    const m = p.floor(total / 60);
    const s = total % 60;
    return { mm: p.nf(m, 2), ss: p.nf(s, 2) };
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
