var cities = [];
var ncities = 5;
var bestdist = -1;
var bestway =[];

function setup() {
	createCanvas(400,400);
	for (var i = 0; i < ncities; i++) {
		cities[i] = createVector(random(width), random(height));
	}
	bestdist = Cdist(cities);
	bestway = cities.slice();
}

function draw() {
	background(51);
	fill(255);
	for (var i = 0; i < ncities; i++) {
		ellipse(cities[i].x,cities[i].y,8,8);
	}
	stroke(255);
	strokeWeight(1);
	noFill();
	beginShape();
	for (var i = 0; i < ncities; i++) {
		vertex(cities[i].x,cities[i].y);
	}
	endShape();
	stroke(255,0,225);
	strokeWeight(3);
	noFill();
	beginShape();
	for (var i = 0; i < ncities; i++) {
		vertex(bestway[i].x,bestway[i].y);
	}
	endShape();
	swap(cities ,floor(random(ncities)), floor(random(ncities)))
	var d = Cdist(cities);
	if (d < bestdist) {
		bestdist = d;
		bestway = cities.slice();
		console.log(bestdist);
	}
}



function swap(cities, i, j) {
	var aux = cities[i];
	cities[i] = cities[j];
	cities[j] = aux;
}


function Cdist(points) {
	var sum = 0;
	for (var i = 0; i < ncities -1; i++) {
		var d = dist(points[i].x,points[i].y,points[i+1].x,points[i+1].y)
		sum += d;
	}
	return sum;
}