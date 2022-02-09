const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable button
const toggleButton = function () {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = function (joke) {
  VoiceRSS.speech({
    key: 'd009cc41099a4de785efee92f2e2980b',
    src: joke,
    hl: 'en-us',
    v: 'Julia',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
  console.log(joke);
};

// Get Jokes from Joke API
const getJokes = async function () {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ..... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // Text to Speech
    tellMe(joke);

    // Disable button
    toggleButton();
  } catch (error) {
    console.error('Opps!!', error);
  }
};

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
