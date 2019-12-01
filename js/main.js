let population;
let noOfRockets = 150;
let count = 0;
let generations = 0;
let genes = 200;
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
    for (let index = 0; index < 1; index++) {
        background(255);
        drawTarget();
        drawObstacles();

        if (mouseIsPressed) {
            moveObstacles();
        } else {
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
                minP.html('min: ' + 1 / population.minFitness);
                avgP.html('avg: ' + 1 / population.avgFitness);
                maxP.html('max: ' + 1 / population.maxFitness);
                generationCount.html('generation number: ' + generations);
            }
            count++
        }
    }
}

function moveObstacles() {
    for (let index = 0; index < population.obstacles.length; index++) {
        if (population.obstacles[index].selected) {
            population.obstacles[index].pos.x = mouseX - population.obstacles[index].width / 2;
            population.obstacles[index].pos.y = mouseY - population.obstacles[index].height / 2;
        } else if (mouseX > population.obstacles[index].pos.x
            && mouseX < population.obstacles[index].pos.x + population.obstacles[index].width
            && mouseY > population.obstacles[index].pos.y
            && mouseY < population.obstacles[index].pos.y + population.obstacles[index].height
        ) {
            population.obstacles[index].selected = true;
        }
    }
}

function mouseReleased() {
    for (let index = 0; index < population.obstacles.length; index++) {
        population.obstacles[index].selected = false;
    }
}

function drawTarget() {
    strokeWeight(10);
    point(population.target.x, population.target.y);
    strokeWeight(1);
}

function drawObstacles() {
    for (let index = 0; index < population.obstacles.length; index++) {
        rectMode(CORNER);
        if (population.obstacles[index].selected) {
            fill(100);
        } else {
            fill(255);
        }
        rect(population.obstacles[index].pos.x, population.obstacles[index].pos.y, population.obstacles[index].width, population.obstacles[index].height);
        fill(255);
    }
}