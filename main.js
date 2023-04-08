var objects = [];
var status_1 = "";
function preload() {
    alarm = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(450, 350);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();


}

function draw() {
    image(webcam, 0, 0, 500, 500);
    noFill();
    if (status_1 != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        coco_ssd.detect(webcam, gotresults);
        for (i = 0; i < objects.length; i++) {
            stroke(r, g, b);;
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            confidence = floor(objects[i].confidence * 100) + "%";
            text(objects[i].label + "   " + confidence, objects[i].x + 20, objects[i].y + 20);
            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Status Baby detected";
                alarm.stop();
            }
            else {
                document.getElementById("status").innerHTML = "Status Baby is not detected";
                alarm.play();
            }
        }
        if(objects.length==0){
            document.getElementById("status").innerHTML = "Status Baby is not detected";
                alarm.play();
        }

    }
}

function modal_ready() {
    console.log("Modal Loaded");
    status_1 = true;

}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    }
    objects = results
}

function start_detection() {
    document.getElementById("status").innerHTML = "Status: Detecting Baby"
    coco_ssd = ml5.objectDetector("cocossd", modal_ready);
}