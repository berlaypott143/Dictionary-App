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
          ${
            data[0].meanings[0].definitions[0].example ||
            "Sorry, Couldn't produce example of the word you entered"
          }
      </p>`;

    // Iterate through phonetics array and find the first non-empty audio URL
    let audioSrc = "";
    for (let i = 0; i < data[0].phonetics.length; i++) {
      if (data[0].phonetics[i].audio) {
        audioSrc = data[0].phonetics[i].audio;
        break;
      }
    }

    //Check if one element has value and if the audio is available , functioning but have an error if the audio is an open string
    /*if (data[0].phonetics.length > 0) {
      audioSrc = data[0].phonetics[0].audio || "";
      if (!audioSrc && data[0].phonetics.length > 1) {
        audioSrc = data[0].phonetics[1].audio || "";
      }
    }*/

    if (audioSrc) {
      sound.setAttribute("src", audioSrc);
    } else {
      sound.removeAttribute("src");
    }

    console.log(sound);
  } catch (error) {
    result.innerHTML = `<h2 class="error">Sorry pal, I couldn't find definitions for the word you were looking for.
    You can try the search again at later time or head to the web instead.
</h2>`;
    console.log(error);
  }
});

function playSound() {
  sound.play();
}
