function Laser(where,angle) {
	this.pos = createVector(where.x,where.y);
	this.vel = p5.Vector.fromAngle(angle);
	this.vel.mult(10);
	this.update = function() {
		this.pos.add(this.vel);
	}
	this.show = function() {
		push()
		stroke(255);
		strokeWeight(4);
		point(this.pos.x,this.pos.y);
		pop();
	}
	this.hittest = function(asteriod) {
		var d = dist(this.pos.x,this.pos.y,asteriod.pos.x,asteriod.pos.y);
		if (d < asteriod.r) {
			//console.log('hit');
			return true;
		} else {
			return false;
		}
	}
	this.offscreen = function() {
		if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
			return true;
		}
		return false;
	}

}