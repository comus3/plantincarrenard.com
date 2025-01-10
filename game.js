let jokeElements = {};  // This will hold the joke elements from the JSON file
let weatherAttempts = 0;  // Track how many times the user has called 'weather'

// Function to fetch the jokes from the JSON file
async function fetchJokes() {
  try {
    const response = await fetch('assets/jokes.json');  // Fetch the jokes.json file
    const data = await response.json();  // Parse the JSON response
    jokeElements = data;  // Store the joke elements in the global variable
  } catch (error) {
    console.error('Error loading jokes:', error);  // Log error if the fetch fails
  }
}

// Function to generate a random joke
function generateJoke() {
  if (!jokeElements.subjects) return "Erreur: Les données du jeu ne sont pas encore chargées.";

  const subject = jokeElements.subjects[Math.floor(Math.random() * jokeElements.subjects.length)];
  const context = jokeElements.contexts[Math.floor(Math.random() * jokeElements.contexts.length)];
  const action = jokeElements.actions[Math.floor(Math.random() * jokeElements.actions.length)];
  const reaction = jokeElements.reactions[Math.floor(Math.random() * jokeElements.reactions.length)];
  const conclusion = jokeElements.conclusions[Math.floor(Math.random() * jokeElements.conclusions.length)];

  return `${subject} ${context} ${action} and ${reaction} ${conclusion}`;
}

// Function to generate the help message
function generateHelpMessage() {
  return `
    Available commands:
    - 'joke': Get a random joke.
    - 'fortune': Get a random fortune or motivational quote.
    - 'flip': Flip a coin (heads or tails).
    - 'echo <message>': Repeat the text you type.
    - 'rand': Generate a random number in weird units.
    - 'weather': Get a weather forecast.
    - 'magic8': Ask the Magic 8 Ball a question.
    - 'help': Display this help message.
  `;
}

// Function to generate a random number in weird units
function generateRandomNumber() {
  const units = [
    "quarks",
    "spaghetti noodles",
    "gallons of water",
    "centipedes",
    "pizza slices",
    "neutron stars",
    "moons of Jupiter",
    "sand grains",
    "toaster strudels"
  ];
  const number = Math.floor(Math.random() * 1000);
  const unit = units[Math.floor(Math.random() * units.length)];
  return `${number} ${unit}`;
}

// Function for weather with NPC dialogue
function generateWeather() {
  weatherAttempts++;
  if (weatherAttempts === 1) {
    return "Uh, bro... I don’t know... The weather's probably fine. Go outside.";
  }
  
  // NPC continues talking after the second attempt
  const rants = [
    "Seriously? You're asking me about the weather again? You know I don't have a meteorology degree, right?",
    "Look, I just checked the weather, and it said... 'Don't ask me!' Is that clear enough for you?",
    "Dude, please stop asking. I'm not a weather app, I’m just a terminal. Go ask a cloud or something.",
    "Alright, alright, I get it. It’s probably raining spaghetti out there. Happy now?",
    "Can you hear the wind outside? Yeah, that’s about all I can tell you. The weather? Who knows. Who even cares?"
  ];

  return rants[weatherAttempts % rants.length];
}

// Function for Magic 8 Ball
function magic8Ball() {
  const answers = [
    "Yes.",
    "No.",
    "Maybe.",
    "Ask again later.",
    "Definitely not.",
    "It is certain."
  ];
  return answers[Math.floor(Math.random() * answers.length)];
}

// Handle user input in the terminal
const inputField = document.getElementById('input');
const outputDiv = document.getElementById('output');

// Load jokes on page load
window.addEventListener('load', fetchJokes);

inputField.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const userInput = inputField.value.trim().toLowerCase();  // Convert input to lowercase
    const prompt = 'root@plantincarrenard:~$ ';

    // Display the command typed by the user
    outputDiv.innerHTML += `<div>${prompt}${inputField.value.trim()}</div>`;  // Show exactly what user typed

    // Check if the command is "joke" and respond
    if (userInput === 'joke') {
      const joke = generateJoke();
      outputDiv.innerHTML += `<div>> ${joke}</div>`;
    } 
    // Check if the command is "help" and respond
    else if (userInput === 'help') {
      const helpMessage = generateHelpMessage();
      outputDiv.innerHTML += `<div>> ${helpMessage}</div>`;
    }
    // Check if the command is "fortune" and respond
    else if (userInput === 'fortune') {
      const fortune = "You will have a pleasant surprise today!";
      outputDiv.innerHTML += `<div>> ${fortune}</div>`;
    }
    // Check if the command is "flip" and respond
    else if (userInput === 'flip') {
      const coinFlip = Math.random() < 0.5 ? "Heads" : "Tails";
      outputDiv.innerHTML += `<div>> ${coinFlip}</div>`;
    }
    // Check if the command is "echo" and repeat the user's message
    else if (userInput.startsWith('echo ')) {
      const message = userInput.slice(5);  // Remove 'echo ' from the input
      outputDiv.innerHTML += `<div>> ${message}</div>`;
    }
    // Check if the command is "rand" and respond with a random number in weird units
    else if (userInput === 'rand') {
      const randomNumber = generateRandomNumber();
      outputDiv.innerHTML += `<div>> ${randomNumber}</div>`;
    }
    // Check if the command is "weather" and respond with a funny rant
    else if (userInput === 'weather') {
      const weatherResponse = generateWeather();
      outputDiv.innerHTML += `<div>> ${weatherResponse}</div>`;
    }
    // Check if the command is "magic8" and respond
    else if (userInput === 'magic8') {
      const magicAnswer = magic8Ball();
      outputDiv.innerHTML += `<div>> ${magicAnswer}</div>`;
    } 
    // Handle unknown commands
    else {
      outputDiv.innerHTML += `<div>> Command not recognized. Type 'help' for a list of commands.</div>`;
    }

    // Clear the input field for the next command
    inputField.value = '';
    outputDiv.scrollTop = outputDiv.scrollHeight; // Auto scroll to the bottom
  }
});
