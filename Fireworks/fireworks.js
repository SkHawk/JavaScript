function Firework() {
	this.particle = [];
	this.firework = new Particle(random(width),height, true);
	this.exploded = false;
	this.update = function() {
		if (!this.exploded) {
			this.firework.addForce(g);
			this.firework.update();
			if (this.firework.vel.y >= 0) {
				this.exploded = true;
				this.explode();
			}
		}
		for (var i = this.particle.length -1; i >= 0; i--) {
			this.particle[i].addForce(g);
			this.particle[i].update();
			if (this.particle[i].done()) {
				this.particle.splice(i,1);
			}
		}

	}
	this.show = function() {
		if (!this.exploded) {
			this.firework.show();
		} else {
			for (var i = 0; i < this.particle.length; i++) {
				this.particle[i].show();
			}
		}
	}
	this.explode = function() {
		for (var i = 0; i < 100; i++) {
			var p = new Particle(this.firework.pos.x,this.firework.pos.y);
			this.particle.push(p);
		}
	}
	this.done = function(){
		if (this.exploded && this.particle.length === 0) {
			return true;
		} else {
			return false;
		}
	}
}
