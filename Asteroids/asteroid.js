function Asteriod(pos,r) {
	if (pos) {
		this.pos = pos.copy();
	} else {
		this.pos = createVector(random(width), random(height));
	}
	if (r) {
		this.r = r/2
	} else {
		this.r = floor(random(15,40));
	}
	this.vel = p5.Vector.random2D();
	this.points = floor(random(5,15));
	this.offset = [];
	for (var i = 0; i < this.points; i++) {
		this.offset[i] = floor(random(-this.r*0.5,this.r*0.5));
	}
	this.show = function () {
		push();
		stroke(255);
		noFill();
		translate(this.pos.x,this.pos.y);
		//ellipse(0,0,this.r *2);
		beginShape();
		for (var i = 0; i < this.points; i++) {
			var angle = map(i,0,this.points,0,TWO_PI);
			var r = this.r + this.offset[i];
			var x = r*cos(angle);
			var y = r*sin(angle);
			vertex(x,y);
		}
		endShape(CLOSE);
		pop();
	}
	this.update = function() {
		this.pos.add(this.vel);
	}
	this.edges = function() {
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if (this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		}
		if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		} else if (this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}
	this.breakup = function () {
		var newA = [];
		newA[0] = new Asteriod(this.pos, this.r);
		newA[1] = new Asteriod(this.pos, this.r);
		return newA;
	}
}