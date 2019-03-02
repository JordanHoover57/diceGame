/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/********************************************************************************* 
******************************************************************************** 
************JAVA SCRIPT EVENT HANDLERS ***************************************** 
******************************************************************************** 
******************************************************************************** */

/*

*/

var scores, roundScore, activePlayer, dice;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

var totalScoreDOM = document.querySelector('#score-0');
var activeScoreDOM = document.getElementById('current-' + activePlayer);
//sets the dice image to invisible until game is started
document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function(){
    //dice roll via random number
    var diceNum = Math.floor(Math.random() * 6) + 1;

    //display the dice rolling
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + diceNum + '.png';

    //if you roll anything other than a 1 it adds to the current score
    //if you roll a 1 the current score gets set to 0
    //if the active player is 1 it becomes a 0 and vice versa
    //by settign 
    //round score get set to 0
    if(diceNum !== 1){
        roundScore += diceNum;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove("active");
        activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
        document.querySelector('.player-'+activePlayer+'-panel').classList.add("active");
        document.querySelector('.dice').style.display = 'none';
    }

});

document.querySelector('.btn-hold').addEventListener('click',function(){
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        whoWins();
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove("active");
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.add("active");
});
//issue is that when I run this function in the above eventHandler
//it is out of sync and the remove action is trumped by the add action later in the event response
function whoWins(){
    if(scores[activePlayer] >= 5){
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('#name-'+activePlayer).textContent = "Winner!!!";
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-0-panel').classList.remove("active");
        document.querySelector('.player-1-panel').classList.remove("active");
        
    }
};