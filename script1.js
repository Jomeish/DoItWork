i = 0;
typeTime = 40;
const text = ["                                                                    ", 
              "hey, you wanna go to art club today?", 
              "nah, I'm good", "oh, okay", 
              "a door shuts in the distance", 
              "...", 
              "...", 
              "You should kill yourself", 
              "...", 
              "no like seriously think about it", 
              "Shut up", 
              "you serve no purpose in life",
              "you've already given up on your dreams,",
              "theres nothing left for you",
              "...", 
              "nobody likes you anywyas so whats the harm", 
              "...", 
              "...", 
              "I mean like-", 
              "SHUT UP", // 20
              "DO IT", 
              "STOP", 
              "DO IT", 
              "NO", 
              "NO",
              "", //flash of red 26
              "A bit of blood dribbles down your left arm", 
              "staining the blade of a pair of scissors held in your right hand", 
              "shut..",
              "shut up",
              "                                                                    ", //scene change 31
              "you realize you are surrounded by tall dark trees",
              "\"how do we get out of here?\"",
              "you had finally looked up over the walls of your room",
              "a pale light from the moon shines down from the sky",
              "\"I've always loved the forest though\"",
              "a fox comes out of the bushes. Shaking leaves off her dark red fur",
              "\"I heard your looking for a way out?\"",
              "\"how'd you know?\"",
              "\"a snake told me\"",
              "you look to your left shoulder where it ususally resides and the snake is gone",
              "\"I can help you\"",
              "\"I know the way out\"",
              "\"follow me\" she says then starts walking deeper into the forest",
              "and you follow ",
              "        ", //scen change room
              "She told me to let myself feel my emotions",
              "but whenever I do it gets so much worse",
              "its like thers a hole in my chest that nothing fills",
              "and no matter what I do nothings works",
              "I wish",
              "I wish something was wrong with me",
              "then I would have a reason to feel this way",
              "       ", //scene change forest
              "you see a small brown cat wandering around",
              "it walks twards you, ",
              "\"are you lost too?\"",
              "\"oh a yeah I am.\" you respond",
              "\"well here, lets look for a way out.\"",
              "you follow the cat, leaving the fox behind",
              "         ", //scene change truck?
              "hey dad I've been feeling better,", 
              "I dont think I'll be going back to see Brandi",
              "alright",
              "...",
              "I want you to help Izzy be her true self",
              "not be what moddern media forces her to be",
              "yeah I can do that,", 
              "I can kill Izzy",
              "good",
              "          ", //scene change forest
              "you are holding a pair of scissors.",
              "in front of you stands a small cat with shaggy brown fur",
              "Cut him",
              "he is looking away and you were told do it",
              "stab him with the scissors",
              "stab him and run away, you'll kill him but he belongs in the forest",
              "he helped you leave but he still belongs in the forest",
              "it's a cat not a human, it doesnt deserve it",
              "kill it",
              "kill it",
              "kill it" //flash of red 
              ];
const display = document.getElementById("displayArea");
const output = document.getElementById("output");

function makeInvisible() {
  var button = document.getElementById("myButton");
  button.classList.add("invisible");
  setTimeout(function() {
    button.classList.remove("invisible");
  }, (text[i-1].length*typeTime)+3);
}

function triggerFlash() {
  display.classList.add('flash');
  setTimeout(() => {
    display.classList.remove('flash');
  }, 1000); // Duration of the flashing animation in milliseconds
}

function manageBackgrounds(){    
    function removeBg(){
        display.classList.remove("bg0");
        display.classList.remove("bg1");
        display.classList.remove("bg2");
        display.classList.remove("bg3");
        display.classList.remove("bg4");
        display.classList.remove("bg5");
        display.classList.remove("bg6");
        display.classList.remove("bg7");
        display.classList.remove("bg8");
        display.classList.remove("bg9");
        display.classList.remove("bg10");
    }
    switch (i) {
        case 1:
            display.classList.add("bg1"); // start
            break;
        // case 7:
        //     removeBg();
        //     display.classList.add("bg3"); // snake apprears
        //     break;
        case 20:
            output.classList.add("shakeInfinate"); //SHUT UP
            break;
        case 26:
            output.classList.remove("shakeInfinate"); // flash as you stab your arm
            triggerFlash();
            removeBg();
            break;
        case 31:
            display.classList.add("bg3"); 
            break;
        case 46:
            removeBg();
            display.classList.add("bg1"); 
            break;
        case 54:
            removeBg();
            display.classList.add("bg3"); 
            break;
        case 61:
            removeBg();
            display.classList.add("bg1"); 
            break;
        case 71:
            removeBg();
            display.classList.add("bg3"); 
            break;
        case 83:
            output.classList.remove("shakeInfinate"); // flash as you stab your arm
            triggerFlash();
            removeBg();
            break;
        default:
            // Default case if none of the above conditions match
            break;
    }
}



//typewriter start

function typewriterEffect(text) {
    i += 1;
    manageBackgrounds();
    let index = 0;
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = ''; // Clear any existing content

    function type() {
        if (index < text.length) {
            outputElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, typeTime); // Adjust the delay to control the typing speed
        }
    }
    makeInvisible()
    type();
}




//typewriter end



