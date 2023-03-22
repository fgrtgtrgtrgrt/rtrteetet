// Get elements from the HTML document
const botForm = document.getElementById("bot-form");
const botInput = document.getElementById("bot-input");
const botSubmit = document.getElementById("bot-submit");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");

// Add event listener to the form submission
botForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Get the game pin and bot count from the form input
  const gamePin = window.location.search.substr(1);
  const botCount = parseInt(botInput.value);

  // Validate the bot count
  if (botCount < 1 || botCount > 50 || isNaN(botCount)) {
    errorMessage.textContent = "Invalid amount. Must be between 1 and 50.";
    successMessage.textContent = "";
    return;
  }
  
  // Send the bots to the game
  errorMessage.textContent = "";
  successMessage.textContent = `Sending ${botCount} bots to game pin ${gamePin}...`;
  const kahootClient = new Kahoot();
  for (let i = 0; i < botCount; i++) {
    kahootClient.join(gamePin, `Bot ${i + 1}`);
  }

  // Disable the form for 10 minutes
  botInput.disabled = true;
  botSubmit.disabled = true;
  setTimeout(() => {
    botInput.disabled = false;
    botSubmit.disabled = false;
    successMessage.textContent = "";
  }, 600000);
});
