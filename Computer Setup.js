img="";
status = "";
objects = [];

function preload(){
    img = loadImage("Setup.jpg");
}

function setup(){
    canvas = createCanvas(650, 450);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
     console.log(error);
    }
   console.log(results); 
   objects = results;
}

function draw(){
    image(img, 0, 0, 650, 450);

    r = random(255);
    b = random(255);
    g = random(255);

    if(status != ""){

      for(i = 0; i < objects.length; i++){
       document.getElementById("status").innerHTML = "Status: Objects Detected";
       document.getElementById("number_of_objects").innerHTML = "Number of objects : " + objects.length;
       fill(r, g, b);
       percent = floor(objects[i].confidence * 100);
       text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 40);
       textSize(25);
       noFill();
       strokeWeight(2);
       textStyle(ITALIC);
       stroke(r, g, b);
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
}
