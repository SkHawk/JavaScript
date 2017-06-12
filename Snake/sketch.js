var s;
var tam = 500;
var scl = (tam/(tam/10));
var food;

function setup() {
	createCanvas(tam,tam);
	s = new snake();
	foodloc();
	frameRate(15);
}


function draw() {
	background(51);
	s.end();
	s.update();
	s.show();
	if (s.eat(food)) {
		foodloc();
		s.total += 1;
	}
	fill(255,0,0);
	rect(food.x,food.y,scl,scl);
	//console.log(scl);
}

function keyPressed(){
	if (keyCode === UP_ARROW && s.ys != 1) {
	/*	s.ys = -1;
		s.xs = 0;*/ 
		s.dir(0, -1);
	} else if (keyCode === DOWN_ARROW && s.ys != -1) {
	/*	s.ys = 1;
		s.xs = 0;*/
		s.dir(0,1);
	} else if (keyCode === LEFT_ARROW && s.xs != 1) {
	/*	s.ys = 1;
		s.xs = 0;*/
		s.dir(-1,0);
	} else if (keyCode === RIGHT_ARROW && s.xs != -1) {
	/*	s.ys = 1;
		s.xs = 0;*/
		s.dir(1,0);
	}
}

function snake() {
	this.x = 0;
	this.y = 0;
	this.xs = 1;
	this.ys = 0;
	this.total = 0;
	this.rest = [];
	this.update = function(){
		for (var i = 0; i < this.rest.length -1;i++){
			this.rest[i] = this.rest[i+1];
		}
		this.rest[this.total-1] = createVector(this.x,this.y);
		this.x = this.x + this.xs*(scl);
		this.y = this.y + this.ys*(scl);
		if (this.x > tam-scl) {
			this.x = 0;
		} else if (this.x < -1){
			this.x = tam;
		} else if (this.y > height-scl){
			this.y = 0;
		} else if (this.y < 0){
			this.y = tam;
		}

/*		this.y = constrain(this.y, 0, tam-scl-1);
		this.x = constrain(this.x, 0, tam-scl-1);*/
	}
	this.show = function(){
		fill(255);
		for (var i = 0; i < this.rest.length;i++){
			rect(this.rest[i].x,this.rest[i].y,scl,scl);
		}
		stroke(0);
		fill(0,0,255);;
		rect(this.x,this.y,scl,scl);
	}
	this.dir = function(x,y){
		this.xs = x;
		this.ys = y;
	}
	this.eat = function(pos){
		var d = dist(this.x,this.y,pos.x,pos.y);
		if (d < scl) {
			return true;
		} else {
			return false;
		}
	}
	this.end = function(){
		for (var i = 0; i< this.rest.length;i++){
			var pos = this.rest[i];
			var d = dist(this.x,this.y,pos.x,pos.y);
			if (d < scl) {
				this.total = 0;
				this.rest = [];
			}
		}
	}
}

function foodloc (){
	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(floor(random(cols)),floor(random(rows)));
	food.mult(scl);
}
