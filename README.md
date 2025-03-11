# Drawing with pressure 
In this project we have create a tool to draw with the camera, with using the detection of our hands and pressure sensors.

# Concept 
The idea of the project was to create a tool to draw on screen using gestures that can control colour and stroke weights, using P5.js and ML5. We imagined the applications of this as a way of mapping movements and gestures that create art, be it drawing, painting or sculpting. Mapping the process in real time would be a great way of mapping the process of creating artwork. 

# Approach 1 
![1](https://github.com/user-attachments/assets/5911edee-0dc7-441a-82d8-2384b7567600)

The first approach we took was making a drawing pad with six pressure sensors, where the user could use their fingers like a stylus and make gestures over the drawing pad. But quickly, we realised that it would be difficult to sense gestures between the two sensors. So in theory, it would only be possible to draw straight lines from point A to point B. 

# Approach 2 
![4](https://github.com/user-attachments/assets/46f86839-eb8c-41f1-89b6-981029341dd2)

As a second iteration, we tried making a wearable sensor using a glove, by addding a pressure sensors at the fingerips. We used an ML5 hand gesture recognition model as a base of the code. The model by itself was able to detect hand gestures and use them to activate certain commands. However, when tried incorporating the glove with the sensors, it stopped recognizing the hand since the glove was blue in colour. We tried using different colours to check if we had better results, but of no use. So at this point, we had two components working independently but had trouble combining them due to a detection error, so we had to improvise 

![10](https://github.com/user-attachments/assets/f4e250e3-0ae4-44e8-8f93-7c20efb30c17)


# Approach 3 
![11](https://github.com/user-attachments/assets/5885bcb5-b957-4ca2-ad96-8e351c1a012e)

As the final iteration, we resorted to making my hand the sensor by adding the sensor directly to my finger. We tested if the detection was still working as we added more components, and attached components so they werent visible on camera. Velostat was attached to the fore finger and the conductive tape was attached to the thumb, so when a 'pinch' gesture was made, the sensor reading was based on the pressure applied. The readings were then associated with with colours and line weights which could be controlled using the pressure in the gesture. We used P5.js to visualise the drawing and combine the ML5 code with the sensor data.

# Link to the video 

https://github.com/user-attachments/assets/c4e4a000-4204-47e5-ad63-8d6004efbcc8


# Code

[Uploading sket/*
Example for H(n)MI Workshop
MDEF IAAC class 2025.
With this example, we are going to learn how receive
 data from our sensors using the Web Serial library for serial communication.
Documentation: https://github.com/gohai/p5.webserial
 For this exercise you will need to have already working your soft sensor connected to a microcontroller.

 */

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

    // Compute midpoint between index finger and thumb
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;

    LINEWEIGHT= map(val, 200, 500,1, 30);
    
    MYCOLOR1= map(val, 200, 500,255, 0);
    MYCOLOR2= map(val, 200, 500,0, 255);
  
    
    // Draw only if fingers are close together
    let d = dist(index.x, index.y, thumb.x, thumb.y);
    if (d < 20) {
      
      if(val<=2){
        painting.stroke(0,0,0);
        painting.strokeWeight(0);
        
      }
      else if (val>=10) {
        painting.stroke(MYCOLOR1, MYCOLOR2, 0);
        painting.strokeWeight(LINEWEIGHT); 
        painting.line(px, py, x, y);
      }
      

      
      
    }

    // Update previous position
    px = x;
    py = y;
    
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

ch.js…]()





