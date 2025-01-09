// List of construction sounds
const sounds = [
    "assets/sound1.mp3",
    "assets/sound2.mp3",
    "assets/sound3.mp3"
  ];
  
  // Play a random sound on page load
  window.addEventListener("load", () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.play();
  });
  
  // Optional: Play a sound when clicking the page
  document.body.addEventListener("click", () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.play();
  });
  