function automateFlow(mode) {
  function clickRadios(mode) {
    if (mode === "Setuju") {
      document.querySelectorAll('[role="radio"]').forEach((radio) => {
        if (radio.getAttribute('aria-label') === "Setuju") {
          radio.click();
        }
      });
    } else if (mode === "Random") {
      document.querySelectorAll('[role="radiogroup"]').forEach((group) => {
        const radios = Array.from(group.querySelectorAll('[role="radio"]'))
              .filter(radio => radio.getAttribute('aria-label') !== "Sangat Tidak Setuju");
        
        const adjustedRadios = radios.flatMap(radio => {
          const label = radio.getAttribute('aria-label');
          return label === "Tidak Setuju" ? [radio] : [radio, radio];
        });
        if (adjustedRadios.length > 0) {
          const randomIndex = Math.floor(Math.random() * adjustedRadios.length);
          adjustedRadios[randomIndex].click();
        }
      });
    } else if (mode.startsWith("star")) {
      const rating = parseInt(mode.slice(4));
      document.querySelectorAll('[role="radiogroup"]').forEach((group) => {
        const radios = Array.from(group.querySelectorAll('[role="radio"]'));
        const labels = ["Sangat Tidak Setuju", "Tidak Setuju", "Setuju", "Sangat Setuju"];
        
        let weights;
        switch(rating) {
          case 1: // ⭐
            weights = [0.7, 0.3, 0, 0];
            break;
          case 2: // ⭐⭐
            weights = [0.3, 0.7, 0, 0];
            break;
          case 3: // ⭐⭐⭐
            weights = [0, 0.4, 0.6, 0];
            break;
          case 4: // ⭐⭐⭐⭐
            weights = [0, 0, 0.7, 0.3];
            break;
          case 5: // ⭐⭐⭐⭐⭐
            weights = [0, 0, 0.3, 0.7];
            break;
        }
        
        const random = Math.random();
        let sum = 0;
        let selectedIndex = 0;
        for (let i = 0; i < weights.length; i++) {
          sum += weights[i];
          if (random < sum) {
            selectedIndex = i;
            break;
          }
        }
        
        const selectedLabel = labels[selectedIndex];
        const radio = radios.find(r => r.getAttribute('aria-label') === selectedLabel);
        if (radio) radio.click();
      });
    } else {
      document.querySelectorAll('[role="radiogroup"]').forEach((group) => {
        const radios = Array.from(group.querySelectorAll('[role="radio"]'));
        if (radios.length > 0) {
          const randomIndex = Math.floor(Math.random() * radios.length);
          radios[randomIndex].click();
        }
      });
    }
  }

  function clickNextButton() {
    const buttons = document.querySelectorAll('button.q-btn.bg-blue-6.text-white');
    buttons.forEach(button => {
      const spanContent = button.querySelector('.block');
      if (spanContent && spanContent.textContent === "SELANJUTNYA") {
        button.click();
        setTimeout(() => {
          clickRadios(mode);
          setTimeout(() => {
            const saveButtons = document.querySelectorAll('button.q-btn.bg-blue-6.text-white');
            saveButtons.forEach(saveButton => {
              const saveSpan = saveButton.querySelector('.block');
              if (saveSpan && saveSpan.textContent === "SIMPAN") {
                saveButton.click();
              }
            });
          }, 500);
        }, 500);
      }
    });
  }
  clickRadios(mode);
  setTimeout(clickNextButton, 500);
}

// All event listeners in one place
document.addEventListener('DOMContentLoaded', () => {
  // Event listeners for star rating buttons
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`star${i}`).addEventListener('click', () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: automateFlow,
          args: [`star${i}`]
        });
      });
    });
  }

  // Original button event listeners
  document.getElementById('setuju').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: automateFlow,
        args: ["Setuju"]
      });
    });
  });

  document.getElementById('random').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: automateFlow,
        args: ["Random"]
      });
    });
  });

  document.getElementById('fullRandom').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: automateFlow,
        args: ["FullRandom"]
      });
    });
  });
});
