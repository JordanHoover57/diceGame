/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

//***********************************************
//******GLOBAL VARIABLES*************************
//***********************************************
var scores, gamePlaying, roundScore, activePlayer, dice;

//setTimeout(function(){ alert("Hello"); }, 3000);

//***********************************************
//******INITIAL GAME SETTINGS********************
//***********************************************

init();

//***********************************************
//******EVENT HANDLERS***************************
//***********************************************

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){

    //dice roll via random number
    var diceNum = Math.floor(Math.random() * 6) + 1;

    //display the dice rolling
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + diceNum + '.png';
    
    //Dice consequences
    if(diceNum !== 1){
        roundScore += diceNum;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
       nextPlayer();
    }
    }
});


document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){  
    scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if(scores[activePlayer] >= 50){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click',init);

document.querySelector('.btn-rules').addEventListener('click',function(){

});

//***********************************************
//******HELPER FUNCTIONS*************************
//***********************************************

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

};

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');



};

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.querySelector('.btn-rules');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}