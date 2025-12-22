const topics = {
  Muziek: ["Ordinary", "Echte Liefde Is Te Koop", "ZAAZAA", "Messy", "Lotje", "Beetje Van Mij", "Die With A Smile", "Ga Dan!", "Atlas", "Terug In De Tijd"],
  Bedrijven: ["ASML", "Prosus", "Airbus", "ING Groep", "NXP Semiconductors", "Adyen", "Universal Music Group", "Agrenx", "Heineken", "Ahold Delhaize"],
  Achternamen: ["De Jong", "De Vries", "Jansen", "Van de/den/der Berg", "Bakker", "Van Dijk", "Visser", "Janssen", "Smit", "Meijer"],
  Eilanden: ["Groenland", "Nieuw Guinea", "Borneo (Indonesië)", "Madagascar", "Baffin (Canada)", "Sumatra (Indonesië)", "Groot Brittanië", "Honshu (Japan)", "Victoria-eiland (Canada)", "Ellesmere (Canada)"],
  Attracties: ["Efteling", "Zaanse Schans", "Rijksmuseum Amsterdam", "Van Gogh Museum", "De Uithof", "Safaripark Beekse Bergen", "Diergaarde Blijdorp", "Keukenhof", "Duinrell", "Artis"],
};

let currentTopic = [];
let guessedItems = [];

function changeTopic() {
  const topicSelector = document.getElementById("topic-selector");
  const topic = topicSelector.value;
  document.getElementById("topic-title").innerText = `Top 10 ${topic.charAt(0).toUpperCase() + topic.slice(1)}`;
  
  currentTopic = topics[topic];
  guessedItems = []; // Reset de geraden items
  
  document.getElementById("feedback").innerText = "";
  document.getElementById("feedback").className = "feedback";

  // Reset de lijstweergave
  for (let i = 1; i <= 10; i++) {
    const listItem = document.getElementById(`item-${i}`);
    if (listItem) {
      listItem.innerText = `${i}. ...`;
      listItem.style.opacity = "0.5";
    }
  }

  topicSelector.blur();
}

function checkGuess() {
  const guessInput = document.getElementById("guess-input");
  const rawGuess = guessInput.value.trim();
  const guess = rawGuess.toLowerCase();
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

  // Zoek de index door de lijst-items 'schoon' te maken (zonder tekst tussen haakjes)
  const index = currentTopic.findIndex(item => {
    const cleanItem = item.replace(/\s*\(.*?\)\s*/g, "").trim().toLowerCase();
    return cleanItem === guess || item.toLowerCase() === guess;
  });

  if (index !== -1) {
    const originalName = currentTopic[index];

    // Controleer of dit specifieke item uit de lijst al geraden is
    if (guessedItems.includes(originalName)) {
      feedbackElement.innerText = `"${rawGuess}" is al geraden!`;
      feedbackElement.className = "feedback incorrect";
    } else {
      // Het is goed en nog niet geraden
      feedbackElement.innerText = `"${originalName}" is juist!`;
      feedbackElement.className = "feedback correct";
      guessedItems.push(originalName);

      const listItem = document.getElementById(`item-${index + 1}`);
      if (listItem) {
        listItem.innerText = `${index + 1}. ${originalName}`;
        listItem.style.opacity = "1";
        animateListItem(listItem);
      }
      
      // Feestelijk effect
      createFireworks();
      setTimeout(createFireworks, 500);
    }
  } else {
    feedbackElement.innerText = `"${rawGuess}" staat niet in de lijst.`;
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

// Event listener voor de Enter-toets
document.getElementById("guess-input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

// Vuurwerk functie
function createFireworks() {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00', '#00FFFF', '#FFD700'];
  const fireworksContainer = document.createElement('div');
  
  for (let i = 1; i <= 10; i++) {
    const firework = document.createElement('div');
    firework.className = `firework firework-${i}`;
    // Geef elk vuurwerkpijltje een willekeurige positie en kleur
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 100 + 'vh';
    firework.style.color = colors[Math.floor(Math.random() * colors.length)];
    fireworksContainer.appendChild(firework);
  }
  
  document.body.appendChild(fireworksContainer);
  
  setTimeout(() => {
    fireworksContainer.remove();
  }, 2000);
}

// Start het spel direct bij laden
window.onload = changeTopic;
