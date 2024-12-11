const topics = {
  films: ["Inception", "Titanic", "Avatar", "The Godfather", "Pulp Fiction", "The Dark Knight", "Forrest Gump", "The Matrix", "Interstellar", "Gladiator"],
  liedjes: ["Imagine", "Hey Jude", "Bohemian Rhapsody", "Billie Jean", "Stairway to Heaven", "Let It Be", "Hotel California", "Smells Like Teen Spirit", "Like a Rolling Stone", "Wonderwall"],
  steden: ["New York", "London", "Paris", "Tokyo", "Dubai", "Singapore", "Los Angeles", "Rome", "Barcelona", "Sydney"]
};

let currentTopic = [];
let guessedItems = [];

function changeTopic() {
  const topicSelector = document.getElementById("topic-selector");
  const topic = topicSelector.value;
  document.getElementById("topic-title").innerText = `Top 10 ${topic.charAt(0).toUpperCase() + topic.slice(1)}`;
  currentTopic = topics[topic];
  guessedItems = [];
  document.getElementById("feedback").innerText = "";
  document.getElementById("feedback").className = "feedback";

  for (let i = 1; i <= 10; i++) {
    const listItem = document.getElementById(`item-${i}`);
    listItem.innerText = `${i}. ...`;
    listItem.style.opacity = "0.5";
  }

  topicSelector.blur();
}

function checkGuess() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value.trim();
  const feedbackElement = document.getElementById("feedback");
  
  if (!currentTopic.length) {
    feedbackElement.innerText = "Kies eerst een onderwerp!";
    feedbackElement.className = "feedback incorrect";
    return;
  }

  if (guess === "") {
    feedbackElement.innerText = "Voer een gok in!";
    feedbackElement.className = "feedback incorrect";
    return;
  }

  if (guessedItems.includes(guess)) {
    feedbackElement.innerText = `"${guess}" is al geraden!`;
    feedbackElement.className = "feedback incorrect";
    guessInput.value = "";
    return;
  }

  const index = currentTopic.findIndex(item => item.toLowerCase() === guess.toLowerCase());
  if (index !== -1) {
    feedbackElement.innerText = `"${currentTopic[index]}" is juist!`;
    feedbackElement.className = "feedback correct";
    guessedItems.push(currentTopic[index]);

    const listItem = document.getElementById(`item-${index + 1}`);
    listItem.innerText = `${index + 1}. ${currentTopic[index]}`;
    listItem.style.opacity = "1";
    animateListItem(listItem);
    
    // Create two sets of fireworks with a slight delay
    createFireworks();
    setTimeout(createFireworks, 500);
  } else {
    feedbackElement.innerText = `"${guess}" staat niet in de lijst.`;
    feedbackElement.className = "feedback incorrect";
  }

  guessInput.value = "";
  guessInput.focus();
}

function animateListItem(element) {
  element.style.animation = 'none';
  element.offsetHeight; // Trigger reflow
  element.style.animation = 'fadeIn 0.5s ease-out';
}

document.getElementById("guess-input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

// Initialize the game
changeTopic();

function createFireworks() {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF', '#FFD700'];
  const fireworksContainer = document.createElement('div');
  
  // Create 10 fireworks at once
  for (let i = 1; i <= 10; i++) {
    const firework = document.createElement('div');
    firework.className = `firework firework-${i}`;
    firework.style.color = colors[Math.floor(Math.random() * colors.length)];
    fireworksContainer.appendChild(firework);
  }
  
  document.body.appendChild(fireworksContainer);
  
  // Clean up after animations complete
  setTimeout(() => {
    fireworksContainer.remove();
  }, 2000);
}
