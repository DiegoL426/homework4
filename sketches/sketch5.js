// Example 2
registerSketch('sk5', function (p) {


  // Color schemes based on the team that the user chooses
  const teamColors = [
    {
      team:"Seahawks",
      background: 'rgb(0, 0, 0)',
      secondaryColor: 'rgb(0, 0, 0)'
    },
    {
      team:"Broncos",
      background: 'rgb(0, 0, 0)',
      secondaryColor: 'rgb(0, 0, 0)'
    },
    {
      team:"Steelers",
      background: 'rgb(0, 0, 0)',
      secondaryColor: 'rgb(0, 0, 0)'
    },
    {
      team:"Giants",
      background: 'rgb(0, 0, 0)',
      secondaryColor: 'rgb(0, 0, 0)'
    }
  ]

  const currentTeam = "Seahawks";

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(250);

    const middleWidth = p.windowWidth/2;
    const middleHeight = p.windowHeight/2;

    //STEP 1 Background Coloring------------------------

    //sets background and stroke colors to whatever the currently selected team is in teamColors
    p.background(teamColors.find(object => object.team === currentTeam).background); 

    //STEP 2 Set divides between both players-------------------



    // STEP 3 Data bars for each player



    // STEP 4 Contextual text





  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
