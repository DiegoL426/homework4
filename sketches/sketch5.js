// Example 2
registerSketch('sk5', function (p) {


  // Color schemes based on the team that the user chooses
  const teamColors = [
    {
      team:"Seahawks",
      background: 'rgb(0, 34, 68)',
      secondaryColor: 'rgb(105, 190, 40)'
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

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.preload = function () {
    //career passing data for all 4 relevant qb's (Russel Wilson, and the 3 people that have replaced him);

    const russData = p.loadTable('data_sets/homework5/RusselWilson.csv');
    const nixData = p.loadTable('data_sets/homework5/BoNix.csv');
    const fieldsData = p.loadTable('data_sets/homework5/JustinFields.csv');
    const genoData = p.loadTable('data_sets/homework5/genoData.csv');
    const dartData = p.loadTable('data_sets/homework5/genoData.csv');

    normalFont = p.loadFont('fonts/Tomorrow-Regular.ttf');
    boldFont = p.loadFont('fonts/Tomorrow-SemiBoldItalic.ttf');
  }

  p.draw = function () {
    p.background(250);

    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight/2;

    //STEP 1 Background Coloring------------------------

    //sets background and stroke colors to whatever the currently selected team is in teamColors
    p.background(teamColors.find(object => object.team === currentTeam).background); 

    //STEP 2 Set divides between both players-------------------

    p.stroke(255);
    p.strokeWeight(3);
    p.strokeCap(p.SQUARE);
    p.line(middleWidth, middleHeight - 400, middleWidth, middleHeight + 400);

    // STEP 3 Data bars for each player

    p.noStroke();
    p.textFont(normalFont);
    p.fill(255);
    p.textSize(25);
    p.textAlign(p.CENTER);
    p.text("QBR", middleWidth, middleHeight - 150);
    p.text("Completion%", middleWidth, middleHeight - 50);
    p.text()
    p.text("Yards per", middleWidth, middleHeight + 170);
      p.text("Attempt", middleWidth, middleHeight + 140);


    // STEP 4 Contextual text


  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
