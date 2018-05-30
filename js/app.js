let array = document.querySelectorAll('.card')
let cards = document.getElementsByClassName('card');
let numberOfMoves = 0;
let plurality = 'Moves';
let singularity = 'Move';
let HTMLarray = document.querySelector('.deck');
let star = document.getElementsByClassName('fa fa-star')

//timer
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;

HTMLarray.addEventListener('click', function() {
  setInterval(setTime, 1000);
  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

  function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
}, {once:true});
// shuffle function
function shuffle(HTMLarray) {
for (i = HTMLarray.children.length; i >= 0; i--) {
    HTMLarray.appendChild(HTMLarray.children[Math.random() * i | 0]);
  };
}

// applies addEventListener to all cards and adds classes when clicked
for (let x = 0; x < 16; x++) {
  let revealedCards = cards[x]
  revealedCards.addEventListener('click', function(event) {
    revealedCards.classList.add('open');
    revealedCards.classList.add('show');
  })};
// if two cards are clicked that match
document.addEventListener('click', function(e) {
  let targetElement = document.getElementsByClassName('open');
  if (targetElement.length === 2  && targetElement[0].childNodes[1].isEqualNode(targetElement[1].childNodes[1])){
    targetElement[0].classList.add('match');
    targetElement[1].classList.add('match');
    numberOfMoves += 1;
    stars();
    if (targetElement[0].classList.contains('match')) {
      targetElement[0].classList.remove('open');
      targetElement[0].classList.remove('open');
    }
    // if more than 2 cards are selected, prevent flipping and turn all unmatched cards facedown
    if (document.getElementsByClassName('open').length > 2 || document.getElementsByClassName('mismatch').length > 2) {
      let holdingArray = Array.from(document.getElementsByClassName('open'));
      for (each of holdingArray) {
        each.classList.remove('show');
        each.classList.remove('open');
      }
    };
    plural();
  }});

// if two cards are clicked that don't match
document.addEventListener('click', function(e) {
  let targetElement = document.getElementsByClassName('open');
  function waitFunction() {
    targetElement[0].className = 'card';
    targetElement[0].className = 'card';
  }
  if (targetElement.length === 2  && targetElement[0].childNodes[1].isEqualNode(targetElement[1].childNodes[1]) == false){
    setTimeout(waitFunction, 1000);
    targetElement[0].classList.add('show');
    targetElement[1].classList.add('show');
    targetElement[0].classList.add('mismatch');
    targetElement[1].classList.add('mismatch');
  }
  if (document.getElementsByClassName('open').length > 2 || document.getElementsByClassName('mismatch').length > 2) {
    let holdingArray = Array.from(document.getElementsByClassName('open'));
    for (each of holdingArray) {
      each.className = 'card';
    }
  };
  // updates to either 'move' or 'moves' depending on plurality again
  if (targetElement.length === 2  && targetElement[0].childNodes[1].isEqualNode(targetElement[1].childNodes[1]) == false && targetElement[0].classList.contains('mismatch')) {
    numberOfMoves += 1;
    plural();
    stars();
  }});

// game completed alert function and event listener
function youDidIt() {
  alert('You did it in ' + numberOfMoves + ' moves!');
};

document.addEventListener('click', function(e) {
  if (document.getElementsByClassName('match').length === 16) {
    setTimeout(youDidIt, 1000);
  }});

// resets the grid & stars
document.getElementById('restartButton').addEventListener('click', function(e) {
  let holdingArray = Array.from(document.getElementsByClassName('card'));
  for (each of holdingArray) {
    each.className = 'card';
  }
  numberOfMoves = 0;
  plural();
  shuffle(HTMLarray);
  while (star.length < 3) {
    document.querySelector('.fa-star').insertAdjacentHTML('afterend', ' <li><i class="fa fa-star"></i></li>');
  }
});
// changes 'moves' to 'move' when the numberOfMoves === 1
function plural() {
  document.getElementById('moves').innerHTML = numberOfMoves;
  if (numberOfMoves === 1){
    document.getElementById('plurality').innerHTML = singularity;
  } else {
    document.getElementById('plurality').innerHTML = plurality;
  }
};
//removes stars based on numberOfMoves
function stars() {
  if (numberOfMoves === 14) {
    star[0].remove();
  }
  if (numberOfMoves === 20) {
    star[0].remove();
  }
}
