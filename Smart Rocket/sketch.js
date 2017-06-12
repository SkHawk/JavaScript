var popula;
var totalfogs = 25;
var vida = 200;
var count = 0;
var target;

function setup() {
	createCanvas(500,500);
	fog = new rocket();
	popula = new total();
	target = createVector(width/2,50);
}

function draw() {
	background(51);
	popula.run();
	count++;
	if (count == vida) {
		//popula = new total();
		popula.nextGen();
		popula.randomselection();
		count = 0;
	}
	ellipse(target.x,target.y,16,16);
	console.log(count);
}


function total(){
	this.fogs = [];
	this.totalsize = totalfogs;
	this.parents = [];
	for (var i = 0; i < this.totalsize; i++) {
		this.fogs [i] = new rocket();
	}
	this.nextGen = function(){
		var maxfit = 0;
		for (var i = 0; i < this.totalsize; i++) {
			this.fogs[i].newfitness();
			if (this.fogs[i].fitness > maxfit) {
				maxfit = this.fogs[i].fitness;
			}
		}
		for (var i = 0; i < this.totalsize; i++) {
			this.fogs[i].fitness /= maxfit;
		}

		this.parents = [];
		for (var i = 0; i < this.totalsize; i++) {
			var n = this.fogs[i].fitness * 100;
			for (j = 0; j < n; j++){
				this.parents.push(this.fogs[i]);
			}
		}
	}

	this.randomselection = function(){
		var newfogs = [];
		for (var i = 0; i < this.fogs.length; i++){
			var parentA = random(this.parents).brain;
			var parentB = random(this.parents).brain;
			var childneural = parentA.crossover(parentB);
			newfogs[i] = new rocket(childneural);
		}
		this.fogs = newfogs;
	}

	this.run = function(){
		for (var i = 0; i < this.totalsize; i++) {
			this.fogs[i].update();
			this.fogs[i].show();
		}
	}
}

function neural(genes){
	this.genes = [];
	if (genes) {
		this.genes = genes;
	} else {
		this.genes = [];
		for (var i = 0; i < vida; i++) {
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(0.5);
		}
	}
	this.crossover = function(partner) {
		var newgenes = [];
		var mid = floor(random(this.genes.length));
		for (var i = 0; i < this.genes.length;i++) {
			if (i > mid) {
				newgenes[i] = this.genes[i];
			} else {
				newgenes[i] = partner.genes[i];
			}
		}
		return new neural(newgenes);
	}
}

function rocket(neuralnovo){
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	if (neuralnovo) {
		this.brain = neuralnovo;
	} else {
		this.brain = new neural();
	}
	this.count = 0;
	this.fitness = 1;
	this.applyAcc = function(force) {
		this.acc.add(force);
	}
	this.update = function() {
		this.applyAcc(this.brain.genes[count]);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	this.show = function(){
		push();
		noStroke();
		fill(255,150);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0,0,25,5);
		pop();
	}
	this.newfitness = function(){
		var d = dist(this.pos.x,this.pos.y,target.x,target.y);
		this.fitness = map(d,0,width,width,0);
	}
}