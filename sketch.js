
//Serial communication variables
let port;
let lecture = 0;
let val = 0;
let connectBtn;
let diameter;
let myColor;
let colorB;
let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;
let p1x = 0;
let p1y = 0;


function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

// My Variables

/* --------- SETUP --------- */
function setup() {
  createCanvas(640, 480);
  
   
  // Create an off-screen graphics buffer for painting
  painting = createGraphics(640, 480);
  painting.clear();
  
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
//  video = createCapture(VIDEO);
//  video.hide();
//  video.style('transform', 'scale(-1,1)');

//  video = createCapture(VIDEO, { flipped: true });
//  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);
  
//  handPose = ml5.handpose(video, () => {
//  console.log("HandPose model loaded");
  port = createSerial();
  connectBtn = createButton("Connect Serial");
  connectBtn.position(290, 370);
  connectBtn.mousePressed(connectBtnClick);
  // My configuration
}

/*----------HAND---------------*/





/* --------- DRAW --------- */

function draw() {
  readingSerial();
  serialConnected();
  image(video, 0, 0);

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    let hand = hands[0];
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let pinky = hand.pinky_tip;

    // Compute midpoint between index finger and thumb
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;
    let x1 = (pinky.x + thumb.x) * 0.5;
    let y1 = (pinky.y + thumb.y) * 0.5;
      

    LINEWEIGHT= map(val, 200, 500,1, 30);
    
    MYCOLOR1= map(val, 200, 500,255, 0);
    MYCOLOR2= map(val, 200, 500,0, 255);
  
    
    // Draw only if fingers are close together
    let d = dist(index.x, index.y, thumb.x, thumb.y);
    if (d < 20) {
      
      if(val<=2){
        painting.stroke(MYCOLOR1, MYCOLOR2, 0);
        painting.strokeWeight(0);
      }
      else if (val>=10) {
        painting.stroke(MYCOLOR1, MYCOLOR2, 0);
        painting.strokeWeight(LINEWEIGHT); 
      }

      
      painting.line(px, py, x, y);
      
    }
    
    let d1 = dist(pinky.x, pinky.y, thumb.x, thumb.y);
    if (d < 20) {
      video.stop();
      videoStopped = true;
    }

    // Update previous position
    px = x;
    py = y;
    p1x = x1
    p2x = y1
    
    
  }

  // Overlay painting on top of the video
  image(painting, 0, 0);
}
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

/* These functions are related to the webSerial library
and are responsible for stabishing connection with your USB ports and the browser. We recommend not to modify them.*/

function serialConnected() {
  if (!port.opened()) {
    connectBtn.html("Connect Serial");
  } else {
    connectBtn.hide();
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open(9600);
  } else {
    port.close();
  }
}

function readingSerial() {
  if (port.available() > 0) {
    lecture = port.readUntil("\n");
    if (lecture) {
      lecture = int(lecture);
      console.log(val);
      val = lecture;
    }
  }
}

