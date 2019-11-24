class Rocket {
    constructor(DNA = null) {
        this.width = 10;
        this.height = 5;
        this.DNA = DNA !== null ? DNA : this.generateGenes();
        this.distance = 0;
        this.acc = createVector();
        this.vel = createVector();
        this.found = false;
        this.vel.mult(0);
        this.pos = createVector(width / 2, height * 0.8);
        this.count = genes;
    }

    inTarget(target) {
        if (p5.Vector.dist(this.pos, target) < 5 && !this.found) {
            this.count = count;
            this.pos = target;
            this.found = true;
        }
    }

    generateGenes() {
        let DNA = [];
        for (let index = 0; index < genes; index++) {
            DNA.push(p5.Vector.random2D());
            DNA[index].limit(2);
        }

        return DNA;
    }

    update(index) {
        if (!this.found) {
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

        return this.distance;
    }
}