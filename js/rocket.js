class Rocket {
    constructor(DNA = null) {
        this.width = 10;
        this.height = 5;
        this.DNA = DNA !== null ? DNA : this.generateGenes();
        this.distance = 0;
        this.acc = createVector();
        this.vel = createVector();
        this.found = false;
        this.pos = createVector(width / 2, height * 0.6);
        this.count = genes;
        this.crashed = false;
    }

    checkBoundaries() {
        if (this.pos.x > width || this.pos.x < 0 && !this.crashed) {
            this.crashed = true;
        }

        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true;
        }
    }

    inTarget(target) {
        if (p5.Vector.dist(this.pos, target) < 5 && !this.found && !this.crashed) {
            this.count = count;
            this.pos = target;
            this.found = true;
        }
    }

    generateGenes() {
        let DNA = [];
        for (let index = 0; index < genes; index++) {
            DNA.push(p5.Vector.random2D());
            DNA[index].setMag(maxForce);
        }

        return DNA;
    }

    update(index) {
        if (!this.found && !this.crashed) {
            this.acc.add(this.DNA[index]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.vel.limit(2);
            this.acc.mult(0);
        }
    }

    show() {
        push();
        rectMode(CENTER);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rect(0, 0, this.width, this.height);
        pop();
    }

    calculateDistance(target) {
        this.distance = p5.Vector.dist(this.pos, target);
        this.distance = map(this.distance, 0, height, height, 0);

        return this.distance;
    }

    checkObstacles(obstacles) {
        for (let index = 0; index < obstacles.length; index++) {
            if (this.pos.x > obstacles[index].pos.x
                && this.pos.x < obstacles[index].pos.x + obstacles[index].width
                && this.pos.y > obstacles[index].pos.y
                && this.pos.y < obstacles[index].pos.y + obstacles[index].height
            ) {
                this.crashed = true;
                return;
            }
        }
    }
}