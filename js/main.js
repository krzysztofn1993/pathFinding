let population;
let noOfRockets = 50;
let count = 0;
let generations = 0;
let genes = 150;
let minP;
let avgP;
let maxP;
let generationCount;

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
        minP.html('min: ' + population.minFitness);
        avgP.html('avg: ' + population.avgFitness);
        maxP.html('max: ' + population.maxFitness);
        generationCount.html('generation number: ' + generations);
    }
    count++
}