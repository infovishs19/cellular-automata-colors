
var rondonia;
var mattogrosso;
var para;
var maranhao;

var regions = [];
var regionIndex = 0;

let img;
function preload() {
  img = loadImage('Amazonas_Illustartion_3_Linien_1.png');
}

//ignore first and last cells
//make ruleset function
function setup () {
    createCanvas(7680, 1080);
    
    //create a cellular autoamta for rondonia
    //gridWidth = 60
    //gridHeight = 40
    //limit = 100 (the maximum number of activated cells)
    //color = '#ff0000'
    rondonia = new CellularAutomata("Rondonia", 760, 108, 125, 'grey', 'red');
    mattogrosso = new CellularAutomata("Matto Grosso", 760, 108, 329, 'grey','red');
    para = new CellularAutomata("Para", 760, 108, 405, 'grey','red');
    maranhao = new CellularAutomata("Maranhao", 760, 108, 141, 'grey','red');

    //make a list of all regions
    regions.push(rondonia);
    regions.push(mattogrosso);
    regions.push(para);
    regions.push(maranhao);
    frameRate(10);
}

function draw () {
    background(0);
 // Top-left corner of the img is at (0, 0)
        // Width and height are the img's original width and height
        image(img, 0, 0);

    //update and draw all regions
    for (var i = 0; i < regions.length; i++) {
        regions[i].update();
        regions[i].draw();
    }

}

// mouse press to change the value of a grid cell
function mousePressed () {

    //each mouse click activates another region
    if (regionIndex < regions.length) {
        regions[regionIndex].mousePressed(mouseX, mouseY);
        regionIndex++;
    }

}

