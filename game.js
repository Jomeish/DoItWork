var drawPile = [
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

cardOffset = 0;

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
    function moveDiv() {
      // Change the position on the first click
      cardOffset = cardOffset + 3;
      nextCardPos = cardOffset + 20;
      document.getElementById(newDiv.id).style.left = nextCardPos + '%';
      document.getElementById(newDiv.id).style.top = '75' + '%'; 
      // // Remove the event listener after the first click
      document.getElementById(newDiv.id).removeEventListener('click', moveDiv);
    }
    }

}


// ------------------------------------------------ move cards ------------------------------------
let draggedCard = null;
highestZIndex = 2;
let isDragging = false;
let cardSnapped = null;




document.addEventListener('click', function(event) {
  // Check if the clicked element has the class "card"
  if (event.target.classList.contains('card')) {
    // Dragging logic
    event.target.style.zIndex = highestZIndex;
    highestZIndex++;
    let isDragging = false;
    const card = event.target;
    const cardRect = card.getBoundingClientRect();
    const offsetX = cardRect.width / 2;
    const offsetY = cardRect.height / 2;
    // Your logic for handling the click on a "card" element
    console.log('Card clicked!', card.id);

    card.addEventListener('mousedown', (e) => {
      isDragging = true;
      card.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        
        // Constrain movement within the viewport
        x = Math.max(x, 0);
        y = Math.max(y, 0);
        x = Math.min(x, window.innerWidth - cardRect.width);
        y = Math.min(y, window.innerHeight - cardRect.height);

        card.style.left = `${x}px`;
        card.style.top = `${y}px`;

      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      card.style.cursor = 'grab';
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
        document.querySelector('.snap-area').style.backgroundColor = "#ff6868";
      } else {
        outputElement.textContent += ' - in div';
        document.querySelector('.snap-area').style.backgroundColor = "rgb(17, 163, 107)";
      }
    });
  }
  
  trackMouse();
  
