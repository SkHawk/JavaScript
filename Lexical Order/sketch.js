var stuff = [0, 1, 2];
var count = 0;

function setup() {
	createCanvas(500,500);
}

function draw() {
	background(51);
	console.log(stuff);
	var largestI = -1;
	for (var i = 0; i < stuff.length -1; i++) {
		if (stuff[i] < stuff[i +1]) {
			largestI = i;
		}
	}
	if (largestI == -1) {
		noLoop();
	}
	var largestJ = -1;
	for (var j = 0;j < stuff.length; j++){
		if (stuff[largestI] < stuff[j]) {
			largestJ = j;
		}
	}
	swap(stuff,largestI,largestJ);
	var endstuff = stuff.splice(largestI +1);
	endstuff.reverse();
	stuff = stuff.concat(endstuff);
	textSize(64);
	var s = '';
	for (var i = 0; i < stuff.length;i++) {
		s += stuff[i];
	}
	fill(255);
	text(s,20,height/2);
	count += 1;
	fill(255,0,255);
	text(count,20,height);
}

function swap(cities, i, j) {
	var aux = cities[i];
	cities[i] = cities[j];
	cities[j] = aux;
}