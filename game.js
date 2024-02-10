const cardValues = []; // Array to store card values and IDs
const subArray = [];

// drawPileModule.js ---------------------------------------------------------------------------------------------
const drawPileModule = (function() {
  const drawPile = [
    "0.",
    "1.",
    "2.",
    "3.",
    "4.",
    "5.",
    "6.",
    "7.",
    "8.",
    "9.",
    "10."
    // Add more texts as needed
  ];

  function draw() {
    if (drawPile.length === 0) {
      return "no cards :("; // Return a message when the draw pile is empty
    }

    const drawnCardIndex = Math.floor(Math.random() * drawPile.length);
    const drawnCard = drawPile.splice(drawnCardIndex, 1)[0];

    return drawnCard; // Return the drawn card
  }

  return {
    draw,
    drawPile // Expose drawPile array
  };
})();
 
// cardCreationModule.js ----------------------------------------------------------------------------------------
const cardCreationModule = (function(drawPileModule) {
  let cardOffset = 0;
  const outputElement2 = document.getElementById('output2');

  function createCard() {
    if (drawPileModule.drawPile.length === 0) return;

    const newDiv = document.createElement("div");
    const drawnCard = drawPileModule.draw();
    newDiv.className = "card";
    newDiv.id = drawnCard;
    newDiv.style.left = "50px";
    newDiv.style.top = "50px";
    newDiv.innerHTML = drawnCard;
    cardOffset += 5;
    document.body.appendChild(newDiv);

    let newSubArray = [...subArray]; // or subArray.slice();
    newSubArray.push(newDiv.id, 20 + cardOffset); // Push the new card ID into the new subArray
    cardValues.push(newSubArray); // Push the new subArray into cardValues

    outputElement2.textContent = 'Array: ' + cardValues.join(' | ');
  }




  return {
    createCard
  };
})(drawPileModule);

// cardDraggingModule.js ----------------------------------------------------------------------------------------
const cardDraggingModule = (function() {
  let highestZIndex = 2;

  function handleMouseDown(event) {
    if (!event.target.classList.contains('card')) return;

    const card = event.target;
    card.style.zIndex = highestZIndex++;
    card.style.cursor = 'grabbing';

    const cardRect = card.getBoundingClientRect();
    const offsetX = cardRect.width / 2;
    const offsetY = cardRect.height / 2;

    function handleMouseMove(e) {
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      x = Math.max(x, 0);
      y = Math.max(y, 0);
      x = Math.min(x, window.innerWidth - cardRect.width);
      y = Math.min(y, window.innerHeight - cardRect.height);

      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      document.querySelector('.snap-area').style.backgroundColor = "#ecee7f";
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      card.style.cursor = 'grab';

      const cards = document.querySelectorAll('.card');
      const snapAreaRect = document.querySelector('.snap-area').getBoundingClientRect();

      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const isNotWithinX = cardRect.left >= snapAreaRect.right || cardRect.right <= snapAreaRect.left;
        const isNotWithinY = cardRect.top >= snapAreaRect.bottom || cardRect.bottom <= snapAreaRect.top;
        if (isNotWithinX || isNotWithinY) {
          isCardInSnapArea = false;
          console.log('return card:', card.id);

        }
      });

    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  return {
    handleMouseDown
  };
})();

// snapModule.js -------------------------------------------------------------------------------------------------
const snapModule = (function() {
  const outputElement = document.getElementById('output');

  function trackMouse() {
    const snapAreaRect = document.querySelector('.snap-area').getBoundingClientRect();
    document.addEventListener('mouseup', function(event) {
      outputElement.textContent = `Mouse Position: (${event.clientX}, ${event.clientY})`;
      const cards = document.querySelectorAll('.card');

      let isCardInSnapArea = false;
      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const isWithinX = cardRect.left >= snapAreaRect.left && cardRect.right <= snapAreaRect.right;
        const isWithinY = cardRect.top >= snapAreaRect.top && cardRect.bottom <= snapAreaRect.bottom;
        if (isWithinX && isWithinY) {
          isCardInSnapArea = true;
          console.log('Played Card:', card.id);
        }
      });
      const card = event.target;
      if (isCardInSnapArea) {
        outputElement.textContent += ' - in div';
        document.querySelector('.snap-area').style.backgroundColor = "rgb(17, 163, 107)";
      } else {
        outputElement.textContent += ' - out of div';
        document.querySelector('.snap-area').style.backgroundColor = "#ff6868";

        function findNumberById() {
          // Iterate through the arrayOfArrays to find the matching id
          for (let i = 0; i < cardValues.length; i++) {
              // Check if the id in the current sub-array matches the given id
              if (cardValues[i][0] === card.id) {
                  // Return the corresponding number
                  return cardValues[i][1];
              }
          }
          // If id is not found, return null or any appropriate value
          return null; // or any other default value you prefer
      }

        card.style.left = `${findNumberById()}%`;
        card.style.top = '75%';
        console.log(findNumberById());
      }
    });
  }

  return {
    trackMouse
  };
})();

document.getElementById("drawButtonID").addEventListener("click", cardCreationModule.createCard);
document.addEventListener('mousedown', cardDraggingModule.handleMouseDown);
snapModule.trackMouse();
