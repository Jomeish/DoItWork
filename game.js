var drawPile = [
    "0.",
    "1.",
    "2.",
    "3.",
    "4."
    // Add more texts as needed
];

const outputElement = document.getElementById('output');

function draw() {
    if (drawPile.length === 0) {
        return "no cards :("; // Return null or handle the case when the array is empty
      }

      const drawnCardIndex = Math.floor(Math.random() * drawPile.length);
      const drawnCard = drawPile[drawnCardIndex];

    //removes the selected card
    drawPile.splice(drawnCardIndex, 1);

      return drawnCard;
}

function drawButton() {

    if (drawPile.length !== 0) {

    var newDiv = document.createElement("div");
    newDiv.className = "card ";
    newDiv.id = draw();
    newDiv.style.left = "50px";
    newDiv.style.top = "50px";
    newDiv.innerHTML = newDiv.id;
    document.body.appendChild(newDiv);
    newDiv.addEventListener('click', moveDiv);
    // makeElementDraggable(newDiv);
    }

}


// ------------------------------------------------ move cards ------------------------------------
let draggedCard = null;
highestZIndex = 2;
let isDragging = false;
let cardSnapped = null;

function moveDiv() {
    // Change the position on the first click
    document.getElementById('movableDiv').style.left = '200px';
    document.getElementById('movableDiv').style.top = '200px';
    
    // Remove the event listener after the first click
    document.getElementById('movableDiv').removeEventListener('click', moveDiv);
  }


document.addEventListener('click', function(event) {
    // Check if the clicked element has the class "card"
    if (event.target.classList.contains('card')) {
      // Dragging logic
      event.target.style.zIndex = highestZIndex;
      highestZIndex++;
      let isDragging = false;
      const card = event.target;
      // Your logic for handling the click on a "card" element
      console.log('Card clicked!', card.id);

      card.addEventListener('mousedown', (e) => {
        isDragging = true;
        card.style.cursor = 'grabbing';
      });

      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
          const x = e.clientX - card.clientWidth / 2;
          const y = e.clientY - card.clientHeight / 2;
          card.style.left = `${x}px`;
          card.style.top = `${y}px`;
        }
      });

      document.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          card.style.cursor = 'grab';

          const cardRect = card.getBoundingClientRect();
          const snapAreaRect = document.querySelector('.snap-area').getBoundingClientRect();

          // Check if the card is within the snap area
          if (
            cardRect.left >= snapAreaRect.left &&
            cardRect.right <= snapAreaRect.right &&
            cardRect.top >= snapAreaRect.top &&
            cardRect.bottom <= snapAreaRect.bottom &&
            cardSnapped == null
          ) {
            // Snap the card into place
            card.style.left = `${snapAreaRect.left + 15}px`;
            card.style.top = `${snapAreaRect.top + 18}px`;
            console.log("snapped " + card.id);
            cardSnapped = card.id;
            document.querySelector('.snap-area').style.backgroundColor = "#3ded97";
            outputElement.textContent += '-  ' + cardSnapped + ' is locked in'

          }
        }


      });
    }
  });



document.getElementById("drawButtonID").addEventListener("click", drawButton);
const snapAreaRect = document.querySelector('.snap-area').getBoundingClientRect();

function trackMouse() {
  
    document.addEventListener('mouseup', function(event) {
      // Update the text content of the p element with mouse coordinates
      outputElement.textContent = `Mouse Position: (${event.clientX}, ${event.clientY})`;
  
      // Check if mouse is to the right of the div and update the p element
      if (event.clientX > snapAreaRect.right ||
      event.clientX < snapAreaRect.left ||
      event.clientY < snapAreaRect.top ||
      event.clientY > snapAreaRect.bottom
       ) {
        outputElement.textContent += ' - out of div';
        if (cardSnapped === event.target.id){
            outputElement.textContent += ' - ' + cardSnapped + ' is released';
            cardSnapped = null;
            document.querySelector('.snap-area').style.backgroundColor = "#ff6868";
        }
      } else {
        outputElement.textContent += ' - in div';
      }
    });
  }
  
  trackMouse();
  
