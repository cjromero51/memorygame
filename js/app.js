let cards = document.getElementsByClassName("card");
const HTMLarray = document.querySelector(".deck");
let currentFaceupCards = 0;
let faceupArray = [];
const allCards = document.querySelectorAll(".card");
// move counter variables
let numberOfMoves = 0;
let moves = document.querySelector('#moves');
let plurality = "Moves";
let singularity = "Move";
let star = document.getElementsByClassName("fa fa-star");
// timer variables
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;

allCards.forEach(function(card) {
  card.addEventListener("click", function() {
    if (currentFaceupCards < 2) {
      if (
        (card.classList.contains("open") &&
          card.classList.contains("show") &&
          card.classList.contains("match")) == false
      ) {
        currentFaceupCards++;
        card.classList.add("open", "show");
        faceupArray.push(card);
        //if they Match or not
        if (currentFaceupCards === 2) {
          if (faceupArray[0] == faceupArray[1]) {
            faceupArray[0].classList.remove("open","show");
            faceupArray[1].classList.remove("open","show");
            faceupArray = [];
            currentFaceupCards = 0;
          }else if (
            (faceupArray[0].querySelector("i").classList.value ==
              faceupArray[1].querySelector("i").classList.value) ==
            false
          ) {
            faceupArray[0].classList.add("mismatch");
            faceupArray[1].classList.add("mismatch");
            numberOfMoves++
            moves.innerHTML = numberOfMoves;
            stars();
            plural();
            setTimeout(function() {
              faceupArray[0].classList.remove("show");
              faceupArray[0].classList.remove("open");
              faceupArray[0].classList.remove("mismatch");
              faceupArray[1].classList.remove("show");
              faceupArray[1].classList.remove("open");
              faceupArray[1].classList.remove("mismatch");
              faceupArray = [];
              currentFaceupCards = 0;
            }, 1000);
          } else {
            faceupArray[0].classList.remove("open");
            faceupArray[0].classList.remove("show");
            faceupArray[1].classList.remove("open");
            faceupArray[1].classList.remove("show");
            faceupArray[0].classList.add("complete");
            faceupArray[0].classList.add("match");
            faceupArray[1].classList.add("complete");
            faceupArray[1].classList.add("match");
            faceupArray = [];
            currentFaceupCards = 0;
            numberOfMoves++
            moves.innerHTML = numberOfMoves;
            stars();
            plural();
          }
        }
      }
      }
    })
  });

// timer


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
    for (var i = 0; i < 3; i++){
      star[i].style.color = 'black';
};
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
  if (numberOfMoves === 2) {
    star[2].style.color = '#ccc';
  }
  if (numberOfMoves === 20) {
    star[1].style.color = '#ccc';
  }
}
