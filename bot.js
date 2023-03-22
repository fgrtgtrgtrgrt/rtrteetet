function startBots() {
    var botAmount = document.getElementById("botAmount").value;
    if (botAmount < 1 || botAmount > 50 || isNaN(botAmount)) {
      alert("Invalid number of bots. Please enter a number between 1 and 50.");
      return false;
    }
    
    // create a new Kahoot client instance
    var client = new Kahoot();
  
    // connect to the game with the given game pin
    var gamePin = document.getElementById("gamePin").value;
    
    if (!/^[0-9]{6}$/.test(gamePin)) {
      alert("Invalid game pin. Please enter a 6-digit number.");
      return false;
    }
    
    client.join(gamePin, "Bot 1");
  
    // send additional bots
    for (var i = 2; i <= botAmount; i++) {
      setTimeout(function() {
        var newBot = new Kahoot();
        newBot.join(gamePin, "Bot " + i);
      }, i * 500); // add a delay between each bot to prevent overwhelming the server
    }
  
    alert("Starting " + botAmount + " bots...");
    setTimeout(function() {
      alert(botAmount + " bots have joined the game. Please wait 10 minutes before starting more bots.");
    }, 600000);
    return true;
  }
  