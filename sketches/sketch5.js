// Example 2
registerSketch('sk5', function (p) {


  // Color schemes based on the team that the user chooses
  const teamColors = [
    {
      team:"Seahawks",
      background: 'rgb(0, 34, 68)',
      secondaryColor: 'rgb(105, 190, 40)',
      russText: "Wilson left the Seahawks after 2021",
      russType: "R. Wilson (2021)",
      otherType: "G. Smith (2022)",
      otherText: "Geno Smith became the starting Seattle QB in 2022"
    },
    {
      team:"Broncos",
      background: 'rgb(0, 34, 68)',
      secondaryColor: 'rgb(251, 79, 20)',
      russText: "Wilson left the Broncos after 2023",
      russType: "R. Wilson (2023)",
      otherType: "B. Nix (2024)",
      otherText: "Bo Nix was drafted by Denver in 2024"
    },
    {
      team:"Steelers",
      background: 'rgb(16, 16, 16)',
      secondaryColor: 'rgb(255, 182, 18)',
      russText: "Wilson did not start the first few games of 2024-2025 due to an injury",
      russType: "R. Wilson (2024)",
      otherType: "J. Fields (2024)",
      otherText: "Justin Fields played the first 6 games for Pittsburgh over Wilson"
    },
    {
      team:"Giants",
      background: 'rgb(1, 35, 82)',
      secondaryColor: 'rgb(163, 13, 45)',
      russText: "Wilson was benched by the Giants after 3 straight losses",
      russType: "R. Wilson (2025)",
      otherType: "J. Dart (2025)",
      otherText: "Jaxson Dart replaced Wilson as the starting NY QB this season"
    }
  ]

  let currentTeam = "Seahawks"; // current team selected 
  let russDataRow = 9;
  let otherDataRow = 10;

  //russ SEA: 9
  //russ DEN: 11
  //russ PIT: 12
  //russ NYG: 13

  //geno: 10
  //bonix: 0
  //fields: 3
  //dart: 0


  p.preload = function () {
    normalFont = p.loadFont('fonts/Tomorrow-Regular.ttf');
    boldFont = p.loadFont('fonts/Tomorrow-SemiBoldItalic.ttf');

    //career passing data for all 4 relevant qb's (Russel Wilson, and the 3 people that have replaced him);
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

    
    // Map to help get the relevant data for the current team selected
    let playerTeamMap = new Map();
    playerTeamMap.set("Seahawks", genoData);
    playerTeamMap.set("Broncos", nixData);
    playerTeamMap.set("Steelers", fieldsData);
    playerTeamMap.set("Giants", dartData);

    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight/2;

    //STEP 1. Background Coloring------------------------
    let mainColor = teamColors.find(object => object.team === currentTeam).background;
    let secondaryColor = teamColors.find(object => object.team === currentTeam).secondaryColor;
    //sets background and stroke colors to whatever the currently selected team is in teamColors
    p.background(mainColor); 

    //STEP 2. Set divides between both players-------------------

    p.stroke(255);
    p.strokeWeight(5);
    p.strokeCap(p.SQUARE);
    p.line(middleWidth, middleHeight - 350, middleWidth, middleHeight + 350);

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

    // STEP 3. Data bars for each player------------------------------

    p.rectMode(p.CORNER);
    p.fill(secondaryColor);

    // STEP 3A. GRAB THE DATA ------------------------------------------
    let maxBarLength = 400;
    let otherData = playerTeamMap.get(currentTeam);

    let russQBR = p.float(russData.getString(russDataRow, "QBR"));
    let russComp = p.float(russData.getString(russDataRow, "Cmp%"));
    let russTD = p.float(russData.getString(russDataRow, "TD"));
    let russYdsPer = p.float(russData.getString(russDataRow, "Y/A"));

    let otherQBR = p.float(otherData.getString(otherDataRow, "QBR"));
    let otherComp = p.float(otherData.getString(otherDataRow, "Cmp%"));
    let otherTD = p.float(otherData.getString(otherDataRow, "TD"));
    let otherYdsPer = p.float(otherData.getString(otherDataRow, "Y/A"));

    console.log("Other QBR:" + otherQBR);
    // ---------------- QBR ----------------
    let russWidth = p.map(russQBR, 0, 100, 0, maxBarLength); 
    let otherWidth = p.map(otherQBR, 0, 100, 0, maxBarLength);

    p.push();
    if (russQBR > otherQBR) p.fill(255, 255, 255, 100);
    p.rect(middleWidth + 95, middleHeight - 265, otherWidth, 30);
    p.fill(255);
    p.text(otherQBR, middleWidth + 130, middleHeight - 240);
    p.pop();

    p.push();
    if (russQBR < otherQBR) p.fill(255, 255, 255, 100);
    p.rect(middleWidth - 95 - russWidth, middleHeight - 265, russWidth, 30);
    p.fill(255);
    p.text(russQBR, middleWidth - 130, middleHeight - 240);
    p.pop();

    // ---------------- Completion % ----------------
    russWidth = p.map(russComp, 0, 100, 0, maxBarLength);
    otherWidth = p.map(otherComp, 0, 100, 0, maxBarLength);

    p.push();
    if (russComp > otherComp) p.fill(255, 255, 255, 100);
    p.rect(middleWidth + 95, middleHeight - 105, otherWidth, 30);
    p.fill(255);
    p.text(otherComp, middleWidth + 130, middleHeight - 80);
    p.pop();

    p.push();
    if (russComp < otherComp) p.fill(255, 255, 255, 100);
    p.rect(middleWidth - 95 - russWidth, middleHeight - 105, russWidth, 30);
    p.fill(255);
    p.text(russComp, middleWidth - 130, middleHeight - 80);
    p.pop();

    // ---------------- Touchdowns ----------------
    russWidth = p.map(russTD, 0, 40, 0, maxBarLength); // assume max 40 TDs
    otherWidth = p.map(otherTD, 0, 40, 0, maxBarLength);

    p.push();
    if (russTD > otherTD) p.fill(255, 255, 255, 100);
    p.rect(middleWidth + 95, middleHeight + 55, otherWidth, 30);
    p.fill(255);
    p.text(otherTD, middleWidth + 120, middleHeight + 80);
    p.pop();

    p.push();
    if (russTD < otherTD) p.fill(255, 255, 255, 100);
    p.rect(middleWidth - 95 - russWidth, middleHeight + 55, russWidth, 30);
    p.fill(255);
    p.text(russTD, middleWidth - 120, middleHeight + 80);
    p.pop();

    // ---------------- Yards per Attempt ----------------
    russWidth = p.map(russYdsPer, 0, 12, 0, maxBarLength); // assume max 12 Y/A
    otherWidth = p.map(otherYdsPer, 0, 12, 0, maxBarLength);

    p.push();
    if (russYdsPer > otherYdsPer) p.fill(255, 255, 255, 100);
    p.rect(middleWidth + 95, middleHeight + 230, otherWidth, 30);
    p.fill(255);
    p.text(otherYdsPer, middleWidth + 120, middleHeight + 255);
    p.pop();

    p.push();
    if (russYdsPer < otherYdsPer) p.fill(255, 255, 255, 100);
    p.rect(middleWidth - 95 - russWidth, middleHeight + 230, russWidth, 30);
    p.fill(255);
    p.text(russYdsPer, middleWidth - 120, middleHeight + 255);
    p.pop();


    // STEP 4. Contextual text---------------------------------------------------
    p.push()
    p.textSize(40);
    p.textFont(boldFont);
    p.text("Russel Wilson's stats vs. every QB that has immediately replaced him.", middleWidth, middleHeight - 400);


    // STEP 4A. Grab text data depending on the team selected
    let russType = teamColors.find(object => object.team === currentTeam).russType;
    let russText = teamColors.find(object => object.team === currentTeam).russText;
    let otherType = teamColors.find(object => object.team === currentTeam).otherType;
    let otherText = teamColors.find(object => object.team === currentTeam).otherText;

    let russGamesPlayed = russData.getString(russDataRow, "GS");
    let otherGamesPlayed = otherData.getString(otherDataRow, "GS");
    // Player names
    p.textFont(boldFont);
    p.textSize(70);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(russType, middleWidth - 700, middleHeight + 390);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text(otherType, middleWidth + 700, middleHeight + 390);

    //Supporting text
    p.textSize(18);
    p.text(otherText, middleWidth + 700, middleHeight + 330);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(russText, middleWidth - 700, middleHeight + 330);

    //Games played
    p.textSize(25);
    p.textAlign(p.LEFT);
    p.textFont(normalFont);
    p.text("Games Started:", middleWidth + 450, middleHeight - 300);
    p.text("Games Started:", middleWidth - 600, middleHeight - 300)
    p.textSize(50);
    p.text(russGamesPlayed, middleWidth + 520, middleHeight - 250);
    p.text(otherGamesPlayed, middleWidth - 530, middleHeight - 250);


    p.stroke(255);
    p.strokeWeight(3);
    p.line(middleWidth + 450, middleHeight - 275, middleWidth + 635, middleHeight - 275);
    p.line(middleWidth - 600, middleHeight - 275, middleWidth - 415, middleHeight - 275);
    p.pop();

  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };

});
