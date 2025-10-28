// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {

  p.preload = function() {
    huskyLogo = p.loadImage('custom_images/white_husky_logo.png');
  }


  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(190);

    p.textAlign(p.CENTER, p.CENTER); // center align all text
    p.textFont('Trebuchet MS');
    p.textStyle(p.NORMAL);

    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight * 2/2.5;
    const barWidth = 1500;
    const barHeight = 100;

    

    //rgba(39, 39, 39, 1)
    //STEP 1. draw overlay rectangle -------------------
    p.fill(58, 58, 58);
    p.noStroke();

    p.rectMode(p.CENTER);

    p.rect(middleWidth, middleHeight, barWidth, barHeight);

    //STEP 2. Add subsections ---------------------------

    //logo subsection
    p.push()
    p.fill(39, 39, 39);
    p.rectMode(p.CORNER);
    p.rect(middleWidth - (barWidth/2), middleHeight - (barHeight/2), 300, barHeight);
    huskyLogo.resize(115, 115);
    p.image(huskyLogo, middleWidth- 710, middleHeight - 60);
    p.textSize(28);
    p.fill(255);
    p.textStyle(p.BOLDITALIC);
    p.text("WASH", middleWidth - 530, middleHeight - 20);
    p.text("REPORT", middleWidth - 530, middleHeight + 20);
    p.pop();

    //Sport type subsection
    p.fill(235);
    p.stroke(240);
    p.strokeWeight(2);
    p.strokeCap(p.SQUARE);
    p.line(middleWidth - 250, middleHeight - 45, middleWidth - 250, middleHeight + 45);
    p.textSize(40);
    p.noStroke();
    p.text("NBA", middleWidth - 350, middleHeight + 5);

    //Matchup
    p.textSize(50);
    p.text("Mavericks" + " vs. " + "Spurs", middleWidth - 5, middleHeight - 10);

    //Time and place
    p.textSize(30);
    p.fill(220);
    p.text("12:00 PM PT" + " @ " + "DAL", middleWidth + 380, middleHeight - 10);
    //Story
    p.push()
    p.textAlign(p.LEFT);
    p.textSize(18);
    p.textStyle(p.ITALIC);
    p.text("NBA opening day game, first pro start for Cooper Flagg. Victor Wembenyama to make a statement?", middleWidth - 230, middleHeight + 30);
    p.pop();

  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
