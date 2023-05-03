const highScoresText = document.querySelector("#highscores");
let highScoresTag = '';

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i); // get the key at index i
    let highScoreData = JSON.parse(localStorage.getItem(key)); // get high score data
    console.log(highScoreData); // console log the high score data
    highScoresTag += '<div class="row"><div class="col-6">' + highScoreData.initials + " - " + highScoreData.score + '</div>';
};
  
  highScoresText.innerHTML = highScoresTag;