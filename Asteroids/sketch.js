var ship;
var asteroids = [];
var lasers = [];

function setup() {
	createCanvas(500,500);
	ship = new Ship();
	for (var i = 0; i < 10; i++) {
		asteroids.push(new Asteriod());
	}
}

function draw() {
	background(0);
	for (var i = asteroids.length - 1; i >= 0; i--) {
		if (ship.hittest(asteroids[i])) {
			console.log('died');
			background(255,0,0);
			noLoop();
		}
		asteroids[i].show();
		asteroids[i].update();
		asteroids[i].edges();
	}
	for (var i = lasers.length - 1; i >= 0; i--) {
		lasers[i].show();
		lasers[i].update();
		if (lasers[i].offscreen()) {
			lasers.splice(i,1);
		} else {
			for (var j = asteroids.length - 1; j >= 0; j--) {
				if (lasers[i].hittest(asteroids[j])) {
					if ( asteroids[j].r > 10) {
						var newAsteriod = asteroids[j].breakup();
						asteroids = asteroids.concat(newAsteriod);
					}
					asteroids.splice(j,1);
					lasers.splice(i,1);
					break;
				}
			}
		}
		console.log(lasers.length);
	}
	ship.show();
	ship.turn();
	ship.update();
	ship.edges();
}

function keyPressed() {
	if (keyCode == RIGHT_ARROW) {
		ship.setRotation(0.1);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-0.1);
	} else if (keyCode == UP_ARROW) {
		ship.accelerateing(true);
	} else if (key = ' ') {
		if (lasers.length < 3) {
			lasers.push(new Laser(ship.pos,ship.head))
		}
	}
}

function keyReleased() {
	if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
		ship.setRotation(0);
	} else if (keyCode == UP_ARROW) {
		ship.accelerateing(false);
	}
}
