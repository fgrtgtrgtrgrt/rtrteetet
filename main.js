// Define variables
let gamePin = "";
let botCount = 0;
let isCooldown = false;
let cooldownTime = 600000; // 10 minutes in milliseconds
let nextUseTime = 0;

// Get DOM elements
const gamePinInput = document.getElementById("game-pin-input");
const botCountInput = document.getElementById("bot-count-input");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const submitButton = document.getElementById("submit-button");

// Function to check if game pin is valid
async function checkGamePin(pin) {
  // Use kahoot.js API to check if game pin is valid
  const kahootClient = new Kahoot();
  try {
    await kahootClient.join(pin, "Bot");
    kahootClient.leave();
    return true;
  } catch (error) {
    return false;
  }
}

// Function to send bots to lobby
async function sendBots(pin, count) {
  // Use kahoot.js API to send bots to lobby
  for (let i = 0; i < count; i++) {
    const kahootClient = new Kahoot();
    try {
      await kahootClient.join(pin, `Bot ${i+1}`);
    } catch (error) {
      console.error(`Error joining bot ${i+1}: ${error}`);
    }
  }
}

// Function to handle submit button click
async function handleSubmit(event) {
  event.preventDefault();

  // Get game pin and bot count inputs
  gamePin = gamePinInput.value;
  botCount = botCountInput.value;

  // Check if game pin is valid
  if (!await checkGamePin(gamePin)) {
    // Display error message
    errorMessage.innerHTML = "Invalid game pin.";
    successMessage.innerHTML = "";
    return;
  }

  // Check if bot count is valid
  if (botCount < 1 || botCount > 50) {
    // Display error message
    errorMessage.innerHTML = "Bot count must be between 1 and 50.";
    successMessage.innerHTML = "";
    return;
  }

  // Check if cooldown is active
  if (isCooldown) {
    // Calculate time remaining in cooldown
    let timeRemaining = nextUseTime - Date.now();

    // Display error message
    errorMessage.innerHTML = `You must wait ${Math.ceil(timeRemaining / 60000)} minutes before using again.`;
    successMessage.innerHTML = "";
    return;
  }

  // Send bots to lobby
  await sendBots(gamePin, botCount);

  // Set cooldown
  isCooldown = true;
  nextUseTime = Date.now() + cooldownTime;

  // Display success message
  successMessage.innerHTML = `Sending ${botCount} bots to ${gamePin} lobby.`;
  errorMessage.innerHTML = "";
}

// Attach event listener to submit button
submitButton.addEventListener("click", handleSubmit);
