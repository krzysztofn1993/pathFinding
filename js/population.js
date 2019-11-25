class Population {
    constructor(noOfUnits) {
        this.avgFitness;
        this.rockets = [];
        this.initializeRockets(noOfUnits);
        this.maxFitness;
        this.minFitness;
        this.mutationPossibility = 0.01;
        this.newPopulation = [];
        this.parents = [];
        this.rocketsFitness = [];
        this.target = createVector(width / 4, height / 5);
    }

    behave() {
        strokeWeight(10);
        point(this.target.x, this.target.y);
        strokeWeight(1);
        for (let iteration = 0; iteration < this.rockets.length; iteration++) {
            this.rockets[iteration].checkBoundaries();
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

        for (let index = 0; index < this.rockets.length; index++) {
            let amountOfParents = this.rocketsFitness[index] * 100;
            
            for (let iteration = 0; iteration < amountOfParents; iteration++) {
                this.parents.push(this.rockets[index]);
            }
            
        }
    }

    calculateFitnessOfPopulation() {
        for (let index = 0; index < this.rockets.length; index++) {
            this.rocketsFitness[index] = this.rockets[index].calculateDistance(this.target) + this.rockets[index].count;
            if(this.rockets[index].crashed) {
                this.rocketsFitness[index] *= 0.5;
            }

            if (this.rockets[index].found) {
                this.rocketsFitness[index] *= 10;
            }
        }

        this.maxFitness = Math.min(...this.rocketsFitness);
        
        for (let index = 0; index < this.rockets.length; index++) {
            this.rocketsFitness[index] /= this.maxFitness;
        }
        
        this.minFitness = Math.max(...this.rocketsFitness);
        this.avgFitness = this.rocketsFitness.reduce((a, b) => a += b) / this.rocketsFitness.length;
        this.maxFitness = Math.min(...this.rocketsFitness);
    }

    crossOver() {
        this.newPopulation = [];

        while (this.newPopulation.length !== this.rockets.length) {
            let randomParentNumberA = 0;
            let randomParentNumberB = 0;

            while (randomParentNumberA === randomParentNumberB) {
                randomParentNumberA = floor(random(0, this.parents.length));
                randomParentNumberB = floor(random(0, this.parents.length));
            }

            let randomParentA = this.parents[randomParentNumberA];
            let randomParentB = this.parents[randomParentNumberB];
            let mid = randomParentA.DNA.length / 2;
            let newDNA = [];

            for (let index = 0; index < randomParentA.DNA.length; index++) {
                if (index > mid) {
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
                let mutationCoefficient = random(1);
                if (mutationCoefficient < this.mutationPossibility) {
                    this.newPopulation[rocket].DNA[index] = p5.Vector.random2D();
                    this.newPopulation[rocket].DNA[index].setMag(maxForce);
                }
            }
        }
    }

    setNewPopulation() {
        this.rockets = this.newPopulation;
    }
}