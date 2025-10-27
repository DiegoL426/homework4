// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {

  let roundTimeMs = 300000;
  let timeElapsed;
  let round = 1;

  //display constants
  const fighter1Surname = "NURMAGOMEDOV";
  const fighter2Surname = "GAETHJE";
  const fighter1Color = 'red';
  const fighter2Color = 'blue';
  const fightTitle = 'LIGHTWEIGHT BOUT';

  const roundBarWidth = 400; //used in step 3 for logic and drawing
  

  p.preload = function(){
    logoFont = p.loadFont('fonts/sternbach.otf'); // preload font
    tickerFont = p.loadFont('fonts/Tomorrow-Regular.ttf');
    tickerFontItalics = p.loadFont('fonts/Tomorrow-LightItalic.ttf');
  }
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };  
  //rgba(22, 22, 22, 1)
  p.draw = function () {
    timeElapsed = p.millis();

    p.background(220);

    p.textAlign(p.CENTER, p.CENTER); // center align all text

    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight/2;

    //STEP 1. dark gray middle graphic w/ time and logo-----------------
    p.fill(37, 37, 37);
    // I split the square into 2 polygons to create a cool diagonal split down the middle
    //left half
    p.beginShape();
    p.vertex(middleWidth - 500/2, middleHeight - 90/2); // top-left
    p.vertex(middleWidth - 20, middleHeight - 90/2);       // top right
    p.vertex(middleWidth - 50, middleHeight + 90/2);       // bottom right
    p.vertex(middleWidth - 500/2, middleHeight + 90/2); // bottom-left
    p.endShape(p.CLOSE);
    //right half
    p.beginShape();
    p.vertex(middleWidth + 500/2, middleHeight - 90/2); // top right
    p.vertex(middleWidth + 10, middleHeight - 90/2); // top left
    p.vertex(middleWidth - 20, middleHeight + 90/2); // bottom left
    p.vertex(middleWidth + 500/2, middleHeight + 90/2); //bottom right
    p.endShape(p.CLOSE);
    
    // "AFC" logo (my fake MMA promotion)
    p.textFont(logoFont);
    p.textSize(80);
    p.fill(231, 189, 1);
    p.text("AFC", middleWidth - 150, middleHeight - 10);

    // Time ticker
    p.textFont(tickerFont); 
    p.push();
    const { mm, ss } = msToMMSS(roundTimeMs - timeElapsed);
    p.textSize(70);
    p.fill(238, 238, 238);
    p.text(mm + ":" + ss, middleWidth + 120, middleHeight - 8 );
    p.pop();

    //STEP 2. Additional fight info graphics-----------------

    p.noStroke();
    p.fill(37, 37, 37, 200);
    p.rectMode(p.CENTER);

    p.rect(middleWidth - 500, middleHeight, 500, 90);
    p.rect(middleWidth + 500, middleHeight, 500, 90);
    p.fill(238, 238, 238);
    p.textSize(50);
    p.text(fighter1Surname, middleWidth - 500, middleHeight - 5);
    p.text(fighter2Surname, middleWidth + 500, middleHeight - 5)
      //step 2a. Add fight descriptor at bottom of ticker while we're at it
    p.fill(37, 37, 37, 150)
    p.rect(middleWidth, middleHeight + 80, 500, 30)
    p.textSize(25);
    p.fill(250);
    p.text(fightTitle, middleWidth, middleHeight + 77)

    //STEP 3. Bars that fill up per round (the hard part)----------------

    p.push()
    p.fill(250, 250, 250, 190);
    p.rect(middleWidth - 500, middleHeight - 80, roundBarWidth, 30);
    p.rect(middleWidth + 500, middleHeight - 80, roundBarWidth, 30);
    p.rect(middleWidth, middleHeight - 80, roundBarWidth, 30);
    p.pop();
    
    // round text over bars depending on what round it is
    p.textSize(30);
    p.fill(231, 189, 1);
    let barProgress = timeElapsed/roundTimeMs;
    p.rectMode(p.CORNER);
    p.textFont(tickerFontItalics);
    if (round == 1){
      p.text("Round 1", middleWidth - 500, middleHeight - 120);
      p.rect((middleWidth - 500) - roundBarWidth/2, middleHeight - 95, roundBarWidth * barProgress, 30);
    } else if (round == 2){
      p.text("Round 2", middleWidth, middleHeight - 120);
      p.rect(middleWidth, middleHeight - 80, 400, 30);
    } else {
      p.rect(middleWidth + 500, middleHeight - 80, roundBarWidth, 30);
      p.text("Round 3", middleWidth + 500, middleHeight - 120);
    }

    barProgress = timeElapsed / roundTimeMs;
    


  };

  //Styling functions

  function msToMMSS(ms) {
    const total = p.max(0, p.round(ms / 1000));
    const m = p.floor(total / 60);
    const s = total % 60;
    return { mm: p.nf(m, 2), ss: p.nf(s, 2) };
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
