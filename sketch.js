let font1;
let font2;
let userInput;
let button;
let clearButton;
let userLine;
let response;

let hyro = [];

function preload() {
  font1 = loadFont('fonts/OffAncientEgyptian-rG7y.ttf');
  font2 = loadFont('fonts/egyptian-outline-font/EgyptianOutlineRegular-axy8o.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font1); 
  textSize(80); 
  textAlign(CENTER, CENTER); 
  textStyle(NORMAL); 

  // Calculate positions relative to the userInput
  let inputX = width / 2 - 150;
  let inputY = 100; // 100 pixels from the top
  
  userInput = createInput();
  userInput.position(inputX, inputY);
  
  let buttonX = userInput.x + userInput.width + 20;
  let buttonY = inputY;
  
  button = createButton('HYROGRLYPH');
  button.position(buttonX, buttonY);
  button.mousePressed(newLine);
  
  clearButton = createButton('start again');
  clearButton.position(buttonX + 130, buttonY);
  clearButton.mousePressed(clearHyro);
}

function draw() {
  background(165, 42, 42); 
  fill(255); 

  // Position "welcome" text at the center of the canvas
  let textToDisplay = 'welcome';
  textToDisplay = textToDisplay.toUpperCase(); 
  text(textToDisplay, width / 2, 50); // Positioned 50 pixels from the top
  
  writeHyro();
}

function newLine(){
  userLine = userInput.value();
  userInput.value('');
  hyro.push(userLine);

  let words = RiTa.tokenize(userLine);
  response = '';
  for (x = 0; x < words.length; x++){
    if(RiTa.isNoun(words[x])){
      response += RiTa.randomWord({pos: "nn"});
    } else {
      response += words[x];
    }
    response += ' ';
  }

  hyro.push(response);



}

function writeHyro(){
  for(let x = 0; x < hyro.length; x++){
    if (x % 2 === 0) {
      textFont(font1); // Set font to hieroglyphic for user's text
    } else {
      textFont(font2); // Set font to font2 for RiTa's response
    }
    text(hyro[x], width / 2 - 200, 200 + x * 70); // Adjusted y position to be higher up
  }
}


function clearHyro() {
  hyro = [];
}

function keyPressed() {
  if (keyCode === 13) {
    newLine();
  }
}
