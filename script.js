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
  guessedItems = [];
  
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.innerText = "";
  feedbackElement.className = "feedback";

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
  
  if (!currentTopic.length || guess === "") {
    feedbackElement.innerText = currentTopic.length ? "Voer een gok in!" : "Kies eerst een onderwerp!";
    feedbackElement.className = "feedback incorrect";
    return;
  }

  const index = currentTopic.findIndex(item => {
    // 1. Maak een versie zonder haakjes (voor eilanden)
    const cleanItem = item.replace(/\s*\(.*?\)\s*/g, "").trim().toLowerCase();
    
    // 2. Maak een versie waarbij slashes worden omgezet naar een zoekpatroon (voor achternamen)
    // Dit zorgt ervoor dat "Van de/den/der Berg" gematcht kan worden door "Van de Berg"
    const parts = item.split('/');
    if (parts.length > 1) {
        return parts.some(part => guess.includes(part.toLowerCase().trim())) && guess.includes(parts[parts.length-1].split(' ').pop().toLowerCase());
    }

    return cleanItem === guess || item.toLowerCase() === guess;
  });

  if (index !== -1) {
    const originalName = currentTopic[index];

    if (guessedItems.includes(originalName)) {
      feedbackElement.innerText = `"${rawGuess}" is al geraden!`;
      feedbackElement.className = "feedback incorrect";
    } else {
      feedbackElement.innerText = `"${originalName}" is juist!`;
      feedbackElement.className = "feedback correct";
      guessedItems.push(originalName);

      const listItem = document.getElementById(`item-${index + 1}`);
      if (listItem) {
        listItem.innerText = `${index + 1}. ${originalName}`;
        listItem.style.opacity = "1";
        animateListItem(listItem);
      }
      
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

function showAll() {
  const feedbackElement = document.getElementById("feedback");

  if (!currentTopic.length) {
    feedbackElement.innerText = "Kies eerst een onderwerp!";
    feedbackElement.className = "feedback incorrect";
    return;
  }

  currentTopic.forEach((item, index) => {
    const listItem = document.getElementById(`item-${index + 1}`);
    if (!listItem) return;

    listItem.innerText = `${index + 1}. ${item}`;
    listItem.style.opacity = "1";

    // Optioneel: markeer items die nog niet geraden waren
    if (!guessedItems.includes(item)) {
      listItem.style.fontStyle = "italic";
      listItem.style.background = "lightgray";
      listItem.style.color = "black";
    }
  });

  feedbackElement.innerText = "Alle antwoorden zijn nu zichtbaar.";
  feedbackElement.className = "feedback correct";
}

function animateListItem(element) {
  element.style.animation = 'none';
  element.offsetHeight; 
  element.style.animation = 'fadeIn 0.5s ease-out';
}

document.getElementById("guess-input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

function createFireworks() {
  const colors = ['#ff0043', '#14fc56', '#1e90ff', '#ffae00', '#ff00ff', '#00ffff'];
  const burstCount = 3; // aantal explosies

  for (let b = 0; b < burstCount; b++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.6;

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 4;

        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed;

        document.body.appendChild(particle);

        animateParticle(particle);
      }
    }, b * 300);
  }
}

function animateParticle(particle) {
  let opacity = 1;
  let gravity = 0.15;

  function frame() {
    particle.vy += gravity;
    particle.style.left = particle.offsetLeft + particle.vx + 'px';
    particle.style.top = particle.offsetTop + particle.vy + 'px';
    opacity -= 0.02;
    particle.style.opacity = opacity;

    if (opacity > 0) {
      requestAnimationFrame(frame);
    } else {
      particle.remove();
    }
  }

  requestAnimationFrame(frame);
}

window.onload = changeTopic;
