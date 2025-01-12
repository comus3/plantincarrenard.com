const startTime = new Date("2025-01-12T22:06:45Z");
const textElement = document.getElementById("animated-text");

// Final stages of the text
const finalText = "Plantin-Carrenard, Côme";
const finalDomain = "plantincarrenard.com";

let currentText = ""; // Current text being animated
let currentIndex = 0; // Index for the final text
const delayAfterFullName = 10; // second delay after full name is written
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
  // Step 1: Create the cursor element (no blinking yet) and make it visible
  const cursor = document.createElement('span');
  cursor.classList.add('cursor'); // Add the cursor class
  cursor.style.animation = 'blink 1s step-start infinite'; // Start blinking animation
  textElement.innerHTML = currentText + cursor.outerHTML;

  // Interrupt animation for 3 seconds
  setTimeout(() => {
    cursor.style.animation = 'none'; // Stop blinking animation
    cursor.style.display = 'inline-block'; // Keep the cursor visible without blinking
    textElement.innerHTML = currentText + cursor.outerHTML; // Update the text with the non-blinking cursor

    // Proceed with Step 2 after the cursor interruption
    setTimeout(() => {
      // Decapitalize "P" and "C"
      currentText = currentText.replace("P", "p").replace("C", "c").replace("C", "c");
      textElement.innerHTML = currentText + cursor.outerHTML;

      // Step 3: Continue with the other transformations...
      setTimeout(() => {
        currentText = currentText.replace("ô", "o"); // Remove accent on "ô"
        textElement.innerHTML = currentText + cursor.outerHTML;

        // Step 4: Fade out the final "e"
        setTimeout(() => {
          textElement.innerHTML = currentText.replace(
            /e(?!.*e)/,
            "<span class='fading'>e</span>"
          );
          textElement.innerHTML = currentText + cursor.outerHTML;

          // Step 5: Remove the final "e"
          setTimeout(() => {
            currentText = currentText.replace(/e(?!.*e)/, "");
            textElement.innerHTML = currentText + cursor.outerHTML;

            // Step 6: Transform the domain and update the text
            setTimeout(() => {
              currentText = currentText.replace("plantin-carrenard, ", "plantincarrenard,");
              textElement.innerHTML = currentText + cursor.outerHTML;

              // Re-enable the blinking cursor after final transformation
              setTimeout(() => {
                currentText = currentText.replace(",", "."); // Replace the comma with a dot
                textElement.innerHTML = currentText + cursor.outerHTML;
                setTimeout(() => {
                cursor.style.animation = 'blink 1s step-start infinite'; // Restart blinking
                textElement.innerHTML = currentText + cursor.outerHTML;
                }, 500); // Delay before final transformation
              }, 1300); // Delay before final transformation
            }, 800); // Delay after removing the final "e"
          }, 800); // Delay after fading out the final "e"
        }, 500); // Delay after removing accent
      }, 600); // Delay after decapitalizing letters
    }, 300); // Initial delay before starting transformations
  }, 3000); // 3-second interruption for cursor animation
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
