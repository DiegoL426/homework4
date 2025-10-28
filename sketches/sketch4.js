// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {

  //SAMPLE DATA
  const data = [
    {
      league: 'NBA',
      team1: 'Mavericks',
      team2: 'Spurs',
      timeAndPlace: '12:00 PM PT @ DAL',
      storyText: 'NBA opening day game, first pro start for Cooper Flagg. Victor Wembenyama to make a statement?'
    },
    {
      league: 'NFL',
      team1: 'Jets',
      team2: 'Packers',
      timeAndPlace: '12:00 PM PT @ GB',
      storyText: 'Jets still winless on the season, going "defeated" a real possibility'
    }
  ]

  let timePerStoryMs = 5000;
  const timePerStoryStandard = timePerStoryMs;
  let fadeMs = 1000;
  let currentIndex = 0;

  let alpha = 255;

  p.preload = function() {
    huskyLogo = p.loadImage('custom_images/white_husky_logo.png');
  }


  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    let elapsedTime = p.millis();
    let storyElapsed = elapsedTime % timePerStoryStandard;


    if (elapsedTime >= timePerStoryMs){
      if (data[currentIndex + 1] != null){
        timePerStoryMs += timePerStoryStandard;
        currentIndex++;
      } else {
        timePerStoryMs += timePerStoryStandard;
        currentIndex = 0;
      }
    }

    // fade logic: fades alpha levels in and out proportional to how far storyElapsed is from fadeMs.
    if (storyElapsed < fadeMs){
      alpha = p.map(storyElapsed, 0, fadeMs, 0, 255);
    } else if (storyElapsed > timePerStoryStandard - fadeMs){
      alpha = p.map(storyElapsed, timePerStoryStandard - fadeMs,  timePerStoryStandard, 255, 0);
    } else {
      alpha = 255;
    }

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
    let gradient = p.drawingContext.createLinearGradient(
      middleWidth, middleHeight,
      barWidth, barHeight  
    );
    gradient.addColorStop(0, 'rgb(58, 58, 58)')
    gradient.addColorStop(1, 'rgba(99, 99, 99, 1)');
    p.drawingContext.fillStyle = gradient;

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

    let currentStory = data[currentIndex];

    //Sport type subsection
    p.fill(235, 235, 235, alpha);
    p.stroke(240);
    p.strokeWeight(2);
    p.strokeCap(p.SQUARE);
    p.line(middleWidth - 250, middleHeight - 45, middleWidth - 250, middleHeight + 45);
    p.textSize(40);
    p.noStroke();
    p.text(currentStory.league, middleWidth - 350, middleHeight + 3);

    p.textAlign(p.LEFT);
    //Matchup
    p.textSize(50);
    p.text(currentStory.team1 + " vs. " + currentStory.team2, middleWidth - 230, middleHeight - 10);

    //Time and place
    p.textSize(30);
    p.fill(220, 220, 220, alpha);
    p.text(currentStory.timeAndPlace, middleWidth + 380, middleHeight - 10);
    //Story
    p.push()
    p.textSize(18);
    p.textStyle(p.ITALIC);
    p.text(currentStory.storyText, middleWidth - 230, middleHeight + 30);
    p.pop();

  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
