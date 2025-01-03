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

// Add event listeners
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