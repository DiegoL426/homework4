// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {

  //SAMPLE DATA
  const data = [
  // NBA
  {
    league: 'NBA',
    team1: 'Lakers',
    team2: 'Warriors',
    timeAndPlace: '4:00 PM PT @ LA',
    storyText: 'LeBron James leads the Lakers into a high-profile matchup with the Warriors in Los Angeles.'
  },
  {
    league: 'NBA',
    team1: 'Celtics',
    team2: 'Magic',
    timeAndPlace: '7:00 PM PT @ BOS',
    storyText: 'The Celtics look to extend their home win streak as they host the upstart Orlando Magic.'
  },
  {
    league: 'NBA',
    team1: 'Kings',
    team2: 'Suns',
    timeAndPlace: '7:30 PM PT @ SAC',
    storyText: 'De’Aaron Fox and the Kings take on Kevin Durant’s Suns in a Western Conference battle.'
  },

  // NFL
  {
    league: 'NFL',
    team1: 'Packers',
    team2: 'Bears',
    timeAndPlace: '10:00 AM PT @ GB',
    storyText: 'Jordan Love and the Packers host Chicago in an early divisional matchup.'
  },
  {
    league: 'NFL',
    team1: 'Seahawks',
    team2: 'Rams',
    timeAndPlace: '1:25 PM PT @ SEA',
    storyText: 'Seattle faces a tough NFC West test at home against the Rams.'
  },
  {
    league: 'NFL',
    team1: 'Cowboys',
    team2: 'Chargers',
    timeAndPlace: '5:20 PM PT @ LAC',
    storyText: 'The Cowboys visit Los Angeles for a primetime duel with Justin Herbert and the Chargers.'
  },

  // MLB
  {
    league: 'MLB',
    team1: 'Yankees',
    team2: 'Blue Jays',
    timeAndPlace: '4:05 PM PT @ NY',
    storyText: 'The Yankees open a key home series against Toronto as playoff races heat up.'
  },
  {
    league: 'MLB',
    team1: 'Dodgers',
    team2: 'Rockies',
    timeAndPlace: '7:10 PM PT @ LA',
    storyText: 'Dodgers host the Rockies at Chavez Ravine looking to stay atop the NL West.'
  },
  {
    league: 'MLB',
    team1: 'Astros',
    team2: 'Mariners',
    timeAndPlace: '6:40 PM PT @ SEA',
    storyText: 'The Mariners meet the Astros in a crucial divisional matchup under the lights in Seattle.'
  }
  ];


  let timePerStoryMs = 5000; 
  const timePerStoryStandard = timePerStoryMs; // Time each story appears
  let fadeMs = 1000; //Fade in and fade out for this amount of ms
  let currentIndex = 0; // current index in the sample data

  let alpha = 255;
  let leagueAlpha = 255;

  p.preload = function() {
    huskyLogo = p.loadImage('custom_images/white_husky_logo.png');
  }


  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    let elapsedTime = p.millis();
    let storyElapsed = elapsedTime % timePerStoryStandard;


    // change stories after the set time per story is up
    if (elapsedTime >= timePerStoryMs){
      if (data[currentIndex + 1] != null){
        timePerStoryMs += timePerStoryStandard;
        currentIndex++;
      } else { // loop back to the beginning when out of stories
        timePerStoryMs += timePerStoryStandard;
        currentIndex = 0;
      }
    }

    // fade logic: fades alpha levels in and out proportional to how far storyElapsed is from fadeMs.
    if (storyElapsed < fadeMs){
      if (currentIndex == 0 || data[currentIndex].league != data[currentIndex - 1].league){
        leagueAlpha = p.map(storyElapsed, 0, fadeMs, 0, 255);
      } else {
        leagueAlpha = 255;
      }
      alpha = p.map(storyElapsed, 0, fadeMs, 0, 255);
    } else if (storyElapsed > timePerStoryStandard - fadeMs){
      if (data.length <= currentIndex + 1 || data[currentIndex].league != data[currentIndex + 1].league){
        leagueAlpha = p.map(storyElapsed, timePerStoryStandard - fadeMs,  timePerStoryStandard, 255, 0);
      } else {
        leagueAlpha = 255;
      }
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
    p.textSize(45);
    p.noStroke();
    p.push();
    p.fill(235, 235, 235, leagueAlpha);
    p.text(currentStory.league, middleWidth - 350, middleHeight + 3);
    p.pop();
    
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
