// Select all cells
const cells = document.querySelectorAll('[data-cell]');
const resetGame = document.getElementById('btn');
const msg = document.getElementById('msg');
const gameOverMusic = new Audio('Gameover.mp3');
const changeTurnMusic = new Audio('changeTurn.mp3');
const DrawMusic = new Audio('Item1.mp3');

let turn = 'o';
let xClass = 'x';
let oClass = 'o';
const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

startGame();

resetGame.addEventListener('click', startGame);


function startGame() {
    cells.forEach(cell=>{
        // click listener
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, {once: true});    
        });
  }

function handleClick(e){
    // placemark
    let cell = e.target;
    let curClass = turn === 'o' ? oClass : xClass;
    placeClass(cell, curClass);
    // switch turns
    turn = switchTurn();
    if(checkWin(curClass) && turn === 'o'){
        msg.innerText ='X Wins!';
        btn.innerText = 'Play Again!'
        endGame(false);
        gameOverMusic.play();
        resetTheGame(curClass);
    }
    else if(checkWin(curClass) && turn === 'x'){
        msg.innerText = 'O Wins!';
        btn.innerText = 'Play Again!'
        endGame(false);
        gameOverMusic.play();
        resetTheGame(curClass);
    }
    else if(isDraw()){
        endGame(true);
        DrawMusic.play();
        btn.innerText = 'Play Again!'
    }
    else{
        msg.innerText = 'Turn for ' + turn;
        changeTurnMusic.play();
    }
    
}

function switchTurn(){
    return turn === 'o' ? 'x' : 'o';
}

function placeClass(cell, curClass){
    cell.classList.add(curClass);
}

// Function to check wins
function checkWin(curClass){
    return winningComb.some(combination => {
        return combination.every(index => {
          return cells[index].classList.contains(curClass);
        })
      })
}

// Function for Draw
function isDraw() {
    return [...cells].every(cell => {
      return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
  }

// function to End Game
function endGame(draw) {
    if (draw) {
      msg.innerText = 'Draw!'
    } 
  }

// function to reset the game
function resetTheGame(curClass) {
    cells.forEach(element => {
        // console.log(element);
        element.classList.remove('x');
        element.classList.remove('o');
    })
    }



