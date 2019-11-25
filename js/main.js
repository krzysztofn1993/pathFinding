let population;
let noOfRockets = 100;
let count = 0;
let generations = 0;
let genes = 160;
let minP;
let avgP;
let maxP;
let generationCount;
let maxForce = 0.3;

function setup() {
    createCanvas(640, 480);
    rectMode(CENTER);
    population = new Population(noOfRockets);
    minP = createP();
    avgP = createP();
    maxP = createP();
    generationCount = createP();
}

function draw() {
    background(255);
    population.behave();
    if (count == population.rockets[0].DNA.length) {
        population.calculateFitnessOfPopulation();
        population.selectParents();
        population.crossOver();
        population.mutate();
        population.setNewPopulation();
        if (generations === 20000) {
            noLoop();
        }
        count = 0;
        generations++;
        minP.html('min: ' + 1/population.minFitness);
        avgP.html('avg: ' + 1/population.avgFitness);
        maxP.html('max: ' + 1/population.maxFitness);
        generationCount.html('generation number: ' + generations);
    }
    count++
}