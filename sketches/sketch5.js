// Example 2
registerSketch('sk5', function (p) {


  // Color schemes based on the team that the user chooses
  const teamColors = [
    {
      team:"Seahawks",
      background: 'rgb(0, 34, 68)',
      secondaryColor: 'rgb(105, 190, 40)',
      russLeaveText: "Wilson left the Seahawks after 2021",
      replacementText: "Smith started as QB for Seattle starting 2022",
      russLastAppearance: "2021"
    },
    {
      team:"Broncos",
      background: 'rgb(0, 34, 68)',
      secondaryColor: 'rgb(251, 79, 20)'
    },
    {
      team:"Steelers",
      background: 'rgb(16, 16, 16)',
      secondaryColor: 'rgb(255, 182, 18)'
    },
    {
      team:"Giants",
      background: 'rgb(1, 35, 82)',
      secondaryColor: 'rgb(163, 13, 45)'
    }
  ]

  const currentTeam = "Seahawks";

  p.preload = function () {
    //career passing data for all 4 relevant qb's (Russel Wilson, and the 3 people that have replaced him);
    normalFont = p.loadFont('fonts/Tomorrow-Regular.ttf');
    boldFont = p.loadFont('fonts/Tomorrow-SemiBoldItalic.ttf');

    russData = p.loadTable('data_sets/homework5/RusselWilson.csv', 'csv', 'header');
    nixData = p.loadTable('data_sets/homework5/BoNix.csv', 'csv', 'header');
    fieldsData = p.loadTable('data_sets/homework5/JustinFields.csv', 'csv', 'header');
    genoData = p.loadTable('data_sets/homework5/GenoSmith.csv', 'csv', 'header');
    dartData = p.loadTable('data_sets/homework5/JaxsonDart.csv', 'csv', 'header');
  }

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {

    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight/2;

    //STEP 1 Background Coloring------------------------
    let mainColor = teamColors.find(object => object.team === currentTeam).background;
    let secondaryColor = teamColors.find(object => object.team === currentTeam).secondaryColor;
    //sets background and stroke colors to whatever the currently selected team is in teamColors
    p.background(mainColor); 

    //STEP 2 Set divides between both players-------------------

    p.stroke(255);
    p.strokeWeight(5);
    p.strokeCap(p.SQUARE);
    p.line(middleWidth, middleHeight - 400, middleWidth, middleHeight + 400);

    // STEP 3 Data bars for each player

    p.noStroke();
    p.textFont(normalFont);
    p.fill(255);
    p.textSize(28);
    p.textAlign(p.CENTER);

 

    // add gaps in the center line
    p.fill(mainColor);
    p.rectMode(p.CENTER);
    p.rect(middleWidth, middleHeight - 250, 10, 70);
    p.rect(middleWidth, middleHeight + 245, 10, 70);
    p.rect(middleWidth, middleHeight - 90, 10, 70);
    p.rect(middleWidth, middleHeight + 70, 10, 70);
    p.fill(255);

    // stat text
    p.text("QBR", middleWidth, middleHeight - 240);
    p.textSize(24)
    p.text("Completion%", middleWidth, middleHeight - 80);
    p.text("Touchdowns", middleWidth, middleHeight + 80);
    p.text("Yards per", middleWidth, middleHeight + 240);
      p.text("Attempt", middleWidth, middleHeight + 270);


    p.rectMode(p.CORNER);
    p.fill(secondaryColor);

    //QBR
    p.rect(middleWidth + 95, middleHeight - 265, 250, 30);
    p.rect(middleWidth - 95 - 250, middleHeight - 265, 250, 30);

    //Comp%
    p.rect(middleWidth + 95, middleHeight - 105, 250, 30);
    p.rect(middleWidth - 95 - 250, middleHeight - 105, 250, 30);

    //Touchdowns
    p.rect(middleWidth + 95, middleHeight + 55, 250, 30);
    p.rect(middleWidth - 95 - 250, middleHeight + 55, 250, 30);

    //Yards per Attempt
    p.rect(middleWidth + 95, middleHeight + 230, 250, 30);
    p.rect(middleWidth - 95 - 250, middleHeight + 230, 250, 30);


    // STEP 4 Contextual text

    p.textSize(70);
    p.text("Russel Wilson", middleWidth - 670, middleHeight - 360);
    p.text("Geno Smith", middleWidth + 670, middleHeight - 360);


  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
