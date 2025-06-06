const startTime = new Date("2025-01-14T19:34:58Z");
const textElement = document.getElementById("animated-text");

// Final stages of the text
const finalText = "Plantin-Carrenard, Côme";
const finalDomain = "plantincarrenard.com";

let currentText = ""; // Current text being animated
let currentIndex = 0; // Index for the final text
const delayAfterFullName = 10; // second delay after full name is written
const matrixSpeed = 15; // Speed for random character effect

/****************
 * 
 * 
 *  Below are the functions to manipul;ate the rectangle that will
 *  hide the text and make the 
 *  crt tuning on effect with blur and opacity
 * 
 * 
 * 
 ******************/


// Function to create the black rectangle and display it above everything
function showRectangle() {
  // Check if the rectangle already exists
  if (document.getElementById('black-rectangle')) return;
  // Ensure `#animated-text` is visible
  const animatedText = document.getElementById('animated-text');
  if (animatedText) {
    animatedText.style.position = 'relative';
    animatedText.style.zIndex = '10000'; // Bring it above the rectangle
    console.log('Element with ID "animated-text" found.');
  }
  else {
    console.log('Element with ID "animated-text" not found.');
  }
    
  // Create the rectangle element
  const rectangle = document.createElement('div');
  rectangle.id = 'black-rectangle';
  rectangle.style.position = 'fixed';
  rectangle.style.top = '0';
  rectangle.style.left = '0';
  rectangle.style.width = '100vw';
  rectangle.style.height = '100vh';
  rectangle.style.backgroundColor = 'black';
  rectangle.style.opacity = '1'; // Full visibility
  rectangle.style.zIndex = '9999'; // On top of everything
  rectangle.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
  rectangle.style.filter = 'none';

  document.body.appendChild(rectangle);
}

// Function to manipulate the opacity and blur of the rectangle
function manipulateRectangle({ opacity = 1, blur = 0 }) {
  const rectangle = document.getElementById('black-rectangle');
  if (!rectangle) return;

  rectangle.style.opacity = opacity; // Set the opacity
  rectangle.style.filter = `blur(${blur}px)`; // Set the blur effect
}

// Function to hide/remove the rectangle
function hideRectangle() {
  console.log('Hiding the rectangle...');
  const rectangle = document.getElementById('black-rectangle');
  if (rectangle) {
    rectangle.style.opacity = '0'; // Fade out

    // Wait for the transition to complete, then remove the element
    setTimeout(() => {
      if (rectangle.parentElement) rectangle.parentElement.removeChild(rectangle);
    }, 500);
  }
  else {
    console.log('Rectangle not found.');
  }
}

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
                hideRectangle(); // Hide the rectangle
                }, 500); // Delay before final transformation
              }, 1300); // Delay before final transformation
            }, 800); // Delay after removing the final "e"
          }, 800); // Delay after fading out the final "e"
        }, 500); // Delay after removing accent
      }, 600); // Delay after decapitalizing letters
    }, 300); // Initial delay before starting transformations
  }, 2000); // 3-second interruption for cursor animation
}

showRectangle();
  
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
