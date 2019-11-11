class CellularAutomata {
    constructor(label, gridWidth, gridHeight, limit, col, colorger) {
        //the name of the CellularAutomata, e.g. the Region in the Amazonas
        this.label = label;
        this.limit = limit;
        this.color = col;
        this.colorGer = colorger;

        //number of cells in the x and y direction
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;

        //a two dimensional array to hold the states of all cells
        this.grid = this.create2DArray(this.gridWidth, this.gridHeight);

        //a grid representing the next generation
        this.newGrid = [];

        //calculate the width and height of rectangles based on the canvas width and height
        this.rectWidth = width / gridWidth;
        this.rectHeight = height / gridHeight;
        
        console.log(this.grid);
    }

    //draw the cellular automata
    draw() {
        for (let i = 0; i < this.gridWidth; i++) {
            for (let j = 0; j < this.gridHeight; j++) {
                let x = i * this.rectWidth;
                let y = j * this.rectHeight;

                var cellState = this.grid[i][j];
                if (cellState > 0) {
                    stroke('black');

                    //je nach wert der Zelle 
                    //die eine oder andere Farbe setzen
                    if(cellState == 1){
                        fill(this.colorGer);
                    }
                    else if(cellState == 0.5){
                        fill(this.color)
                    }
                    rect(x, y, this.rectWidth, this.rectHeight);
                }
               
            }
        }

    }

    update() {
   
        //limit simualtion to a limit number of cells
        var n =  this.nrActiveCells();
        if(n>=this.limit){
            console.log('limit reached: ' , this.limit, n);
            return;
        }
        //create a two dimensional array for calculating the next generation
        var nextGen = this.create2DArray(this.gridWidth, this.gridHeight);
       // console.log('nextGen');
       // console.log(nextGen);
        //calculate the new states for each grid cell
        //omit border cells to keep code simple
        for (var i = 1; i < this.gridWidth - 1; i++) {
            for (var j = 1; j < this.gridHeight - 1; j++) {
                //get the states of the neigbouring cells
                var topLeft = this.grid[i - 1][j - 1];
                var top = this.grid[i][j - 1];
                var topRight = this.grid[i + 1][j - 1];
                var left = this.grid[i - 1][j];
                var right = this.grid[i + 1][j];
                var bottomLeft = this.grid[i - 1][j + 1];
                var bottom = this.grid[i][j + 1];
                var bottomRight = this.grid[i + 1][j + 1];

                //the value of the current cell
                let self = this.grid[i][j];

                nextGen[i][j] = this.rules(self, topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight);
            }
        }

        //copy the new generation to the actual grid
        this.grid = nextGen;

    }

    nrActiveCells(){
        //counts the nr of cells which have a value of 1
        var count = 0;
        for (let i = 0; i < this.gridWidth; i++) {
            for (let j = 0; j < this.gridHeight; j++) {
               if(this.grid[i][j] > 0){
                   count++;
               }
            }
        }
        return count;
    }

    //diese function müsst ihr so verändern, dass das gewünschte verhalten daraus resultiert
    rules (self, topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight) {
        //here you can set the rules which should apply to an individual cell


        if (self == 1) {
        
            return 0.5;
        }

        if (self == 0.5) {
            
            return 0.5;
        }



        //example rule
        //if there is a neighbour to the direct top, left, right or bottom side,
        //then return 1 with a certain probability, otherwise return 0 
         //rule
         if (right > 0 || left > 0 || bottom > 0 || bottomLeft > 0 || bottomRight > 1 ) {
     
            if (random(0, 1) > 0.7) {
                return 1;
            }
            else return 0
        }
        else return 0;
    }

    

      
    

    mousePressed(mx,my){
        console.log('mouse pressed in ' +  this.label);
        let xindex = floor(mx / this.rectWidth);
        let yindex = floor(my / this.rectHeight);
    
        console.log(xindex, yindex);
        this.grid[xindex][yindex] = 1;

    }

    create2DArray (w, h) {
        var arr = new Array(w);
        for (var i = 0; i < w; i++) {
            arr[i] = new Array(h);
        }

        //initialize the grid cells with 0
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                arr[i][j] = 0;
            }
        }
        return arr;
    }
}
