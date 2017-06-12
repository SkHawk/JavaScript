var firework = [];;
var g;

function setup() {
	createCanvas(500,500);
	g = createVector(0,0.2);
	stroke(255);
	strokeWeight(4);
	background(0);
}

function draw() {
	background(0,25);
	if (random(1) < 0.01){
		firework.push(new Firework());
	}
	for (var i = firework.length -1; i >= 0; i--) {
		firework[i].update();
		firework[i].show();
		if (firework[i].done()) {
			firework.splice(i,1);
		}
	}
}

