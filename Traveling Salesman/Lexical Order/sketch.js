var cities = [];
var ncities = 9;
var posibilidades = 1;
var bestdist = -1;
var bestway =[];
var order = [];
var count = 0;


function setup() {
	createCanvas(400,400);
	for (var i = 0; i < ncities; i++) {
		cities[i] = createVector(random(width), random(height/3));
		order[i] = i;
	}
	bestdist = Cdist(order,cities);
	bestway = order.slice();
	for (var i = ncities;i > 0; i--){
		posibilidades *= i;
	}
}

function draw() {
	background(51);
	fill(255);
	noStroke();
	for (var i = 0; i < ncities; i++) {
		ellipse(cities[i].x,cities[i].y,8,8);
	}
	//console.log(order);
	/*textSize(64);
	var s = '';
	for (var i = 0; i < stuff.length;i++) {
		s += stuff[i];
	}
	fill(255);
	text(s,20,height/2);*/
	stroke(255);
	strokeWeight(1);
	noFill();
	beginShape();
	for (var i = 0; i < ncities; i++) {
		var n = order[i];
		vertex(cities[n].x,cities[n].y);
	}
	endShape();
	translate(0,height/2);
	fill(255);
	noStroke();
	for (var i = 0; i < ncities; i++) {
		ellipse(cities[i].x,cities[i].y,8,8);
	}
	stroke(255,0,225);
	strokeWeight(3);
	noFill();
	beginShape();
	for (var i = 0; i < ncities; i++) {
		var n = bestway[i]
		vertex(cities[n].x,cities[n].y);
	}
	endShape();
	//swap(cities ,floor(random(ncities)), floor(random(ncities)))
	var largestI = -1;
	for (var i = 0; i < order.length -1; i++) {
		if (order[i] < order[i +1]) {
			largestI = i;
		}
	}
	if (largestI == -1) {
		noLoop();
	}
	var largestJ = -1;
	for (var j = 0;j < order.length; j++){
		if (order[largestI] < order[j]) {
			largestJ = j;
		}
	}
	swap(order,largestI,largestJ);
	var endstuff = order.splice(largestI +1);
	endstuff.reverse();
	order = order.concat(endstuff);
	var d = Cdist(order,cities);
	if (d < bestdist) {
		bestdist = d;
		bestway = order.slice();
		console.log(bestdist);
	}
	textSize(20);
	fill(255);
	noStroke();
	var per = 100 * (count/posibilidades);
	text(nf(per,0,2) + '%',20,height -210);
	count += 1;
}



function swap(cities, i, j) {
	var aux = cities[i];
	cities[i] = cities[j];
	cities[j] = aux;
}


function Cdist(order,points) {
	var sum = 0;
	for (var i = 0; i < ncities -1; i++) {
		var a = points[order[i]];
		var b = points[order[i +1]];
		var d = dist(a.x,a.y,b.x,b.y);
		sum += d;
	}
	return sum;
}