let score = JSON.parse(localStorage.getItem('score')) || {
  wins: '',
  losses: '',
  ties: ''
};

let result;
//Keeping the score showing even after the reload
updateScoreElement();
//Auto Play Button
document.querySelector('.js-auto-play')
  .addEventListener('click', () => {
    autoPlay();
  });
//Auto Playing
let isAutoPlaying = false;
let intervalID; 
function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play').textContent = `Stop`;
    document.querySelector('.js-reset').textContent = 'Reset Score';
    document.querySelector('.js-auto-play').classList.add('show-stop');
    document.querySelector('.js-reset').classList.add('show-reset');
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play').textContent = `Auto Play`;
    document.querySelector('.js-auto-play').classList.remove('show-stop'); 
  }
}
//document.querySelector('.js-rock-button')
//  .addEventListener('click', playGame('Rock')); // This will notwork as function, we need to create one.
// Move buttons
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
    document.querySelector('.js-reset').classList.add('show-reset'); 
    document.querySelector('.js-reset').textContent = `Reset Score`;
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
    document.querySelector('.js-reset').classList.add('show-reset'); 
    document.querySelector('.js-reset').textContent = `Reset Score`;
  });
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissors');
    document.querySelector('.js-reset').classList.add('show-reset'); 
    document.querySelector('.js-reset').textContent = `Reset Score`;
  });
// Adding event listeners to the body by the keydown event
// Special object returned by the event is called 'event'
// We can use event.key to get the key pressed by the user
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r' || event.key === 'R') {
    playGame('Rock');
    document.querySelector('.js-reset').classList.add('show-reset'); 
    document.querySelector('.js-reset').textContent = `Reset Score`;
  } else if(event.key === 'p' || event.key === 'P') {
    playGame('Paper');
    document.querySelector('.js-reset').classList.add('show-reset'); 
    document.querySelector('.js-reset').textContent = `Reset Score`;
  } else if(event.key === 's' || event.key === 'S') {
    playGame('Scissors');
    document.querySelector('.js-reset').classList.add('show-reset'); 
    document.querySelector('.js-reset').textContent = `Reset Score`;
  } else if(event.key === 'a' || event.key === 'A') {
    autoPlay();
  } else if(event.key === 'Backspace' || event.key === 'Delete' || event.key === 'c' || event.key === 'C') {
    console.log('Backspace pressed');
    if (score.wins > 0 || score.losses > 0 || score.ties > 0) {
      // Do we need this if condition?
      score.wins = '';
      score.losses = '';
      score.ties = '';
      localStorage.removeItem('score');
      updateScoreElement();
      console.log(`Wins: ${score.wins}  /  Losses: ${score.losses}  /  Ties: ${score.ties}`);
        if(isAutoPlaying) {
          clearInterval(intervalID);
          isAutoPlaying = false;
          document.querySelector('.auto-play-button').textContent = `Auto Play`;
          document.querySelector('.js-auto-play').classList.remove('show-stop');
        }

        document.querySelector('.js-reset').classList.remove('show-reset'); 
        document.querySelector('.js-reset').textContent = 'Done';
    }
  }
});

//Playing the Game
function playGame(playerMove){
  const computerMove = pickComputerMove();
  if(playerMove === 'Rock') {
    if(computerMove === 'Rock') {
      result = 'Tie.'
    } else if(computerMove === 'Paper'){
      result = 'You lose.'
    } else {
      result = 'You win.'
    }
  } else if(playerMove === 'Paper'){
      if(computerMove === 'Rock') {
        result = 'You win.'
      } else if(computerMove === 'Paper'){
        result = 'Tie.'
      } else {
        result = 'You lose.'
      }
    } else{
      if(computerMove === 'Rock') {
          result = 'You lose.'
        } else if(computerMove === 'Paper'){
          result = 'You win.'
        } else {
          result = 'Tie.'
        }
     }
  
  //Calculating the score
  if(result === 'You win.') {
    score.wins++;
  } else if(result === 'You lose.') {
    score.losses++;
  } else if(result === 'Tie.') {
    score.ties++;
  }
  localStorage.setItem('score', JSON.stringify(score));
  
  //Calling to Update after each playing
  updateResultElement();
  updateMoveElement(playerMove, computerMove);
  updateScoreElement();
  console.log(`${result}
{playerMove}, Computer: ${computerMove}.
${score.wins}  /  Losses: ${score.losses}  /  Ties: ${score.ties}`);
}
//Finding Computer Move
function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';
  if(randomNumber <= 1/3){
    computerMove = 'Rock';
  } else if(randomNumber <= 2/3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }
  return computerMove;
}
//Updates result into HTML
function updateResultElement() {
  document.querySelector('.js-result')
  .innerHTML = result;
}
//Updates moves into HTML
function updateMoveElement(playerMove, computerMove) {
  document.querySelector('.js-moves')
    .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer.`;
}
if (score.wins > 0 || score.losses > 0 || score.ties > 0) {
  document.querySelector('.js-reset').classList.add('show-reset'); 
} else {
  document.querySelector('.js-reset').classList.remove('show-reset');
  document.querySelector('.js-reset').textContent = 'No scores yet!';
}
// Reset button
document.querySelector('.js-reset')
  .addEventListener('click', () => {
    if (score.wins > 0 || score.losses > 0 || score.ties > 0) {
      document.querySelector('.js-moves').innerHTML = ``;
      document.querySelector('.js-result').innerHTML = ``;

      // Do we need this if condition?
      score.wins = '';
      score.losses = '';
      score.ties = '';
      localStorage.removeItem('score');
      updateScoreElement();
      console.log(`Wins: ${score.wins}  /  Losses: ${score.losses}  /  Ties: ${score.ties}`);
        if(isAutoPlaying) {
          clearInterval(intervalID);
          isAutoPlaying = false;
          document.querySelector('.auto-play-button').textContent = `Auto Play`;
          document.querySelector('.js-auto-play').classList.remove('show-stop');
        }

        document.querySelector('.js-reset').classList.remove('show-reset'); 
        document.querySelector('.js-reset').textContent = 'Done';
    }
  });
  
//Updates score into HTML
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}  /  Losses: ${score.losses}  /  Ties: ${score.ties}`;
}