const startTime = new Date("2025-01-11T23:14:14Z");
const textElement = document.getElementById("animated-text");

// Final stages of the text
const finalText = "Plantin-Carrenard Côme";
const finalDomain = "plantincarrenard.com";

let currentText = ""; // Current text being animated
let currentIndex = 0; // Index for the final text
const delayAfterFullName = 800; // 2-second delay after full name is written
const matrixSpeed = 15; // Speed for random character effect

/**
 * Matrix-style random character effect for a single character.
 * Stops at the correct character from `finalText`.
 */
function animateMatrixCharacter(targetChar, callback) {
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let iterations = 0;

  const interval = setInterval(() => {
    // Display random characters before reaching the target character
    textElement.textContent = currentText + randomChars[Math.floor(Math.random() * randomChars.length)];
    iterations++;

    // Stop once enough random characters have been shown
    if (iterations > 5) {
      clearInterval(interval);
      currentText += targetChar;
      textElement.textContent = currentText;
      if (callback) callback(); // Proceed to the next character
    }
  }, matrixSpeed);
}

/**
 * Writes the text character by character with the matrix effect.
 */
function writeTextMatrixStyle() {
  if (currentIndex < finalText.length) {
    animateMatrixCharacter(finalText[currentIndex], () => {
      currentIndex++;
      writeTextMatrixStyle(); // Continue to the next character
    });
  } else {
    // Add delay after the full name is written
    setTimeout(transformText, delayAfterFullName);
  }
}

/**
 * Transforms the text step by step:
 * - Decapitalizes "P" and "C".
 * - Removes the accent on "ô".
 * - Fades out the final "e".
 * - Converts spaces and completes domain name transformation.
 */
function transformText() {
    // Decapitalize "P" and "C"
    currentText = currentText.replace("P", "p").replace("C", "c").replace("C", "c");
    textElement.textContent = currentText;
  
    setTimeout(() => {
      // Remove the accent on "ô"
      currentText = currentText.replace("ô", "o");
      textElement.textContent = currentText;
  
      setTimeout(() => {
        // Fade out the final "e"
        textElement.innerHTML = currentText.replace(
          /e(?!.*e)/,
          "<span class='fading'>e</span>"
        );
        setTimeout(() => {
          // Remove the final "e" completely
          currentText = currentText.replace(/e(?!.*e)/, "");
          textElement.textContent = currentText;
  
          setTimeout(() => {
            currentText = currentText
              .replace("plantin-carrenard ", "plantincarrenard.")
            textElement.textContent = currentText;
          }, 1400); // Delay before showing domain name
        }, 800); // Delay for fading animation
      }, 500); // Delay after removing the accent
    }, 300); // Delay after decapitalizing letters
  }
  
// Start the animation
writeTextMatrixStyle();


// Set start time (you can set it to a specific date/time)
  // Example start time
const timeDiffElement = document.getElementById('time-difference');

// Function to calculate the time difference
function updateTimeDifference() {
  const now = new Date();
  const diff = now - startTime; // Time difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Update the element with the calculated time
  timeDiffElement.textContent = `${days} days, ${hours % 24} hours, ${minutes % 60} minutes`;
}

// Call the function initially and set an interval to update every minute
updateTimeDifference();
setInterval(updateTimeDifference, 60000); // Updates every 60 seconds
