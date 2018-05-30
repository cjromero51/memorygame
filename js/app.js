let array = Array.from(document.getElementsByClassName('card'));
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let cards = document.getElementsByClassName('card');
let numberOfMoves = 0;
let plurality = 'Moves';
let singularity = 'Move';

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
    if (targetElement[0].classList.contains('match')) {
      numberOfMoves += 1;
      targetElement[0].classList.remove('open');
      targetElement[0].classList.remove('open');
    }
    if (document.getElementsByClassName('open').length > 2 || document.getElementsByClassName('mismatch').length > 2) {
      let holdingArray = Array.from(document.getElementsByClassName('open'));
      for (each of holdingArray) {
        each.classList.remove('show');
        each.classList.remove('open');
      }
    };
    // updates to either 'move' or 'moves' depending on plurality
    document.getElementById('moves').innerHTML = numberOfMoves;
    if (numberOfMoves === 1){
      document.getElementById('plurality').innerHTML = singularity;
    } else {
      document.getElementById('plurality').innerHTML = plurality;
    };
  }});

// if two cards are clicked that don't match
document.addEventListener('click', function(e) {
  let targetElement = document.getElementsByClassName('open');
  function waitFunction() {
    targetElement[0].classList.remove('show');
    targetElement[1].classList.remove('show');
    targetElement[0].classList.remove('mismatch');
    targetElement[1].classList.remove('mismatch');
    targetElement[0].classList.remove('open');
    targetElement[0].classList.remove('open');
  }
  if (targetElement.length === 2  && targetElement[0].childNodes[1].isEqualNode(targetElement[1].childNodes[1]) == false){
    setTimeout(waitFunction, 2000);
    targetElement[0].classList.add('show');
    targetElement[1].classList.add('show');
    targetElement[0].classList.add('mismatch');
    targetElement[1].classList.add('mismatch');
  }
  if (document.getElementsByClassName('open').length > 2 || document.getElementsByClassName('mismatch').length > 2) {
    let holdingArray = Array.from(document.getElementsByClassName('open'));
    for (each of holdingArray) {
      each.classList.remove('show');
      each.classList.remove('mismatch');
      each.classList.remove('open');
    }
  };
  // updates to either 'move' or 'moves' depending on plurality again
  if (targetElement.length === 2  && targetElement[0].childNodes[1].isEqualNode(targetElement[1].childNodes[1]) == false && targetElement[0].classList.contains('mismatch')) {
    numberOfMoves += 1;
    document.getElementById('moves').innerHTML = numberOfMoves;
    if (numberOfMoves === 1){
      document.getElementById('plurality').innerHTML = singularity;
    } else {
      document.getElementById('plurality').innerHTML = plurality;
    };
  }});

// game completed alert function and event listener
function youDidIt() {
  alert('You did it in ' + numberOfMoves + ' moves!');
};

document.addEventListener('click', function(e) {
  if (document.getElementsByClassName('match').length === 16) {
    setTimeout(youDidIt, 1000);
  }});
// if (document.getElementsByClassName('open').length > 2 || document.getElementsByClassName('mismatch').length > 2) {
//   let holdingArray = Array.from(document.getElementsByClassName('open'));
//   for (each of holdingArray) {
//     each.classList.remove('open');
//     each.classList.remove('mismatch');
//   }
// };
