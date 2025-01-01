document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const wordInput = document.getElementById("wordInput");
  const synonymResults = document.getElementById("synonymResults");
  const synonymList = document.getElementById("synonymList");

  // Initial GSAP animations for input and button
  gsap.from("h1", {
    duration: 1.5,
    opacity: 0,
    y: -50,
    ease: "power2.out"
  });

  gsap.from("#wordInput", {
    duration: 1.2,
    opacity: 0,
    x: -100,
    ease: "power2.out",
    delay: 0.5
  });

  gsap.from("#searchBtn", {
    duration: 1.2,
    opacity: 0,
    x: 100,
    ease: "power2.out",
    delay: 1
  });

  // Function to fetch synonyms using the Datamuse API
  function fetchSynonyms(word) {
    const apiUrl = `https://api.datamuse.com/words?rel_syn=${word}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        displaySynonyms(data);
      })
      .catch((error) => {
        alert("Error fetching synonyms. Please try again.");
      });
  }

  // Display synonyms in the list
  function displaySynonyms(synonyms) {
    if (synonyms.length === 0) {
      synonymList.innerHTML = "<li>No synonyms found!</li>";
    } else {
      synonymList.innerHTML = "";
      synonyms.forEach((synonym) => {
        const listItem = document.createElement("li");
        listItem.textContent = synonym.word;
        synonymList.appendChild(listItem);
      });
    }

    // Animate synonym results using GSAP
    gsap.fromTo(
      synonymResults,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    synonymResults.style.display = "block";
  }

  // Handle search button click
  searchBtn.addEventListener("click", () => {
    const word = wordInput.value.trim();
    if (word) {
      synonymResults.style.display = "none"; // Hide results before new search
      gsap.to(synonymResults, { opacity: 0, y: -50, duration: 0.5 }); // Animate out old results
      fetchSynonyms(word);
    } else {
      alert("Please enter a word!");
    }
  });

  // Optional: Handle pressing Enter key to trigger search
  wordInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchBtn.click();
    }
  });
});
