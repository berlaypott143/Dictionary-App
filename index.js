// API URL
const dictionaryUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
console.log(dictionaryUrl);

let result = document.getElementById("result");
let sound = document.getElementById("sound");
let btn = document.getElementById("search-btn");

btn.addEventListener("click", async () => {
  try {
    let inpWord = document.getElementById("input-word").value;
    console.log(inpWord);
    const response = await fetch(`${dictionaryUrl}${inpWord}`);

    const data = await response.json();

    console.log(data);

    result.innerHTML = `
      <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound()">
              <i class="fas fa-volume-up"></i>
          </button>
      </div>
      <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}/</p>
      </div>
      <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
      </p>
      <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || ""}
      </p>`;

    // Check if phonetics array has at least one element and if the audio is available
    let audioSrc = "";
    if (data[0].phonetics.length > 0) {
      audioSrc = data[0].phonetics[0].audio || "";
      if (!audioSrc && data[0].phonetics.length > 1) {
        audioSrc = data[0].phonetics[1].audio || "";
      }
    }

    if (audioSrc) {
      sound.setAttribute("src", audioSrc);
    } else {
      sound.removeAttribute("src");
    }

    console.log(sound);
  } catch (error) {
    result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    console.log(error);
  }
});

function playSound() {
  sound.play();
}
