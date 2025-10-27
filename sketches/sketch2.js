// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {

  p.preload = function(){
    mmaFont = p.loadFont('fonts/sternbach.otf'); // preload font
  }


  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };  


  //rgba(238, 238, 238, 1)
  p.draw = function () {
    p.background(220);

    p.textAlign(p.CENTER, p.CENTER); // center align all text

    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight/2;

    //step 1. middle square in the scorebug w/ time and logo

    // backdrop
    p.push()
    p.fill(37, 37, 37);

    // I split the square into 2 halves to create a stylistic split down the middle
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
    p.pop()
    
    // "AFC" logo
    p.textFont(mmaFont);
    p.textSize(80);
    p.fill(231, 189, 1);
    p.text("AFC", middleWidth - 150, middleHeight - 10);

    // time (static for now)
    p.textSize(80);
    p.textFont('monospace');
    p.fill(238, 238, 238);
    //p.textStyle(p.BOLD)
    p.text("5:00", middleWidth + 120, middleHeight + 5);
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
