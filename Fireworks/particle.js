function Particle(x, y, original) {
	this.life = 120;
	this.pos = createVector(x,y);
	if (original) {
		this.vel = createVector(0,random(-13,-8));
	} else {
		this.vel = p5.Vector.random2D();
		this.vel.mult(random(1,6));
	}
	this.acc = createVector(0,0);
	this.addForce = function (force) {
		this.acc.add(force)
	}
	this.update = function() {
		if (!original) {
			this.vel.mult(0.85);
			this.life -= 5;
		}
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	this.show = function () {
		if (!original){
			stroke(255, this.life);
			strokeWeight(2);
		} else {
			stroke(255);
			strokeWeight(4);
		}
		point(this.pos.x,this.pos.y);

	}
	this.done = function() {
		if (this.life <= 0) {
			return true;
		}
	}
}