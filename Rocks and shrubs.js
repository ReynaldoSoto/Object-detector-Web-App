img="";
status = "";
objects = [];

function preload(){
    img = loadImage("Rocks and shrubs.jpg");
}

function setup(){
    canvas = createCanvas(750, 550);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
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
    image(img, 0, 0, 750, 550);

    if(status != ""){

      for(i = 0; i < objects.length; i++){
       fill("#00FF00");
       percent = floor(objects[i].confidence * 100);
       text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
       textSize(15);
       noFill();
       strokeWeight(2);
       textStyle(ITALIC);
       stroke("#00FF00");
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
}
