var drawPile = [
    "0.",
    "1.",
    "2.",
    "3.",
    "4."
    // Add more texts as needed
];

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
    newDiv.style.left = "50px";
    newDiv.style.top = "50px";
    newDiv.innerHTML = draw();
    document.body.appendChild(newDiv);
    makeElementDraggable(newDiv);
    }

}

highestZIndex = 2;

function makeElementDraggable(element) {
    var isDragging = false;
    var offsetX, offsetY;

    // Event listener for mouse down
    element.addEventListener("mousedown", function (e) {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.cursor = "grabbing";
        element.style.zIndex = highestZIndex;
        highestZIndex++;

    });

    // Event listener for mouse up
    element.addEventListener("mouseup", function () {
        isDragging = false;
        element.style.cursor = "grab";
    });

    // Event listener for mouse move
    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            element.style.left = e.clientX - offsetX + "px";
            element.style.top = e.clientY - offsetY + "px";
        }
    });
}



document.getElementById("drawButtonID").addEventListener("click", drawButton);



