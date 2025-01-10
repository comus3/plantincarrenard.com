let jokeElements = {};  // This will hold the joke elements from the JSON file

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
    } else {
      outputDiv.innerHTML += `<div>> Command not recognized. Type 'joke' to hear a joke.</div>`;
    }

    // Clear the input field for the next command
    inputField.value = '';
    outputDiv.scrollTop = outputDiv.scrollHeight; // Auto scroll to the bottom
  }
});
