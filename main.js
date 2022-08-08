video="";
Status="";
objects=[];
function setup(){
    canvas=createCanvas(500, 450);
    canvas.center();
}
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model loaded!");
    Status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
    image(video, 0, 0, 500, 450);
    if(Status!=""){
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Objects Detected!";
            document.getElementById("number_of_objects").innerHTML="Number of objects: "+objects.length;
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%"+objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}