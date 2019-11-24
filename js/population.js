class Population {
    constructor(noOfUnits) {
        this.avgFitness;
        this.rockets = [];
        this.initializeRockets(noOfUnits);
        this.maxFitness;
        this.minFitness;
        this.mutationPossibility = 0.15;
        this.newPopulation = [];
        this.parents = [];
        this.rocketsFitness = [];
        this.target = createVector(width / 2, height / 5);
    }

    behave() {
        strokeWeight(10);
        point(this.target.x, this.target.y);
        strokeWeight(1);
        for (let iteration = 0; iteration < this.rockets.length; iteration++) {
            this.rockets[iteration].inTarget(this.target);
            this.rockets[iteration].update(count);
            this.rockets[iteration].show();

        }
    }

    initializeRockets(noOfUnits = 1) {
        for (let index = 0; index < noOfUnits; index++) {
            this.rockets.push(new Rocket());
        }
    }

    selectParents() {
        this.parents = [];
        let allowedFitness = (this.minFitness + this.avgFitness) * 0.5;
        console.log(allowedFitness);

        let counter = 0;

        while (this.parents.length !== this.rockets.length) {
            if (counter >= this.rockets.length) {
                counter = 0;
            }
            if (this.rocketsFitness[counter] <= allowedFitness) {
                this.parents.push(this.rockets[counter]);
            }
            counter++;
        }
    }

    calculateFitnessOfPopulation() {
        for (let index = 0; index < this.rockets.length; index++) {
            this.rocketsFitness[index] = this.rockets[index].calculateDistance(this.target);
        }
        this.minFitness = Math.max(...this.rocketsFitness);
        this.avgFitness = this.rocketsFitness.reduce((a, b) => a += b) / this.rocketsFitness.length;

        this.maxFitness = Math.min(...this.rocketsFitness);

        // for (let index = 0; index < this.rockets.length; index++) {
        //     this.rocketsFitness[index] /= this.maxFitness;
        // }

        // this.maxFitness = Math.min(...this.rocketsFitness);
    }

    crossOver() {
        this.newPopulation = [];

        while (this.newPopulation.length !== this.rockets.length) {
            let randomParentNumberA = 0;
            let randomParentNumberB = 0;

            while (randomParentNumberA === randomParentNumberB) {
                randomParentNumberA = floor(random(0, this.rockets.length));
                randomParentNumberB = floor(random(0, this.rockets.length));
            }

            let randomParentA = this.parents[randomParentNumberA];
            let randomParentB = this.parents[randomParentNumberB];
            let mid = random(0, randomParentA.DNA.length);
            let newDNA = [];

            for (let index = 0; index < randomParentA.DNA.length; index++) {
                if (index < mid) {
                    newDNA.push(randomParentA.DNA[index]);
                } else {
                    newDNA.push(randomParentB.DNA[index]);
                }
            }

            this.newPopulation.push(new Rocket(newDNA));
        }
    }

    mutate() {
        for (let rocket = 0; rocket < this.newPopulation.length; rocket++) {
            for (let index = 0; index < this.newPopulation[rocket].DNA.length; index++) {
                let mutationCoefficient = random();
                if (mutationCoefficient > 1 - this.mutationPossibility) {
                    this.newPopulation[rocket].DNA[index].set(p5.Vector.random2D());
                    this.newPopulation[rocket].DNA[index].limit(2);
                }
            }
        }
    }

    setNewPopulation() {
        this.rockets = this.newPopulation;
    }
}