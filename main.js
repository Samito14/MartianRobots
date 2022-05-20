const fs = require('fs');

class Map{
    constructor (width, height){
        this.width=width
        this.height=height
        this.map = this.createMap(this.width,this.height)
        this.martian = [-1,-1,"Nil"]
    }
    createMap(x,y){
        var map = [];
        for (let i=0; i<y; i++){
            map.push([]);
            for (let j=0; j<x; j++){
                map[i].push("-")
            }
        }
        return map;
    }
    printMap(){
        console.log("\n====MAP====  ")
        for (let i=0;i<this.map.length; i++){
            let temp = ""
            for (let j=0;j<this.map[i].length; j++){
                if (i==this.martian[1] && j==this.martian[0]){
                    temp += " "+this.martian[2]+" "
                }else {
                    temp += " - "
                }
            }
            console.log(temp)
        }
    }
    addMartian(x,y, direction){
        this.martian = [x,this.height-y-1,direction]
    }
    printMartian(fell){
        if (fell==true){
            console.log(this.martian[0], this.height - this.martian[1] - 1, this.martian[2], "LOST")
        }else{
            console.log(this.martian[0], this.height - this.martian[1] - 1, this.martian[2])
        }
        
    }
    rotateRight(){
        if (this.martian[2]=="E"){
            this.martian[2]="S"
        }else if (this.martian[2]=="S"){
            this.martian[2]="W"
        }else if (this.martian[2]=="W"){
            this.martian[2]="N"
        }
        else{
            this.martian[2]="E"
        }
    }
    rotateLeft(){
        if (this.martian[2]=="E"){
            this.martian[2]="N"
        }else if (this.martian[2]=="N"){
            this.martian[2]="W"
        }else if (this.martian[2]=="W"){
            this.martian[2]="S"
        }
        else{
            this.martian[2]="E"
        }
    }
    moveMartian(){
        if (this.martian[2]=="E"){
            this.martian[0] += 1
        }else if (this.martian[2]=="N"){
            this.martian[1] -= 1
        }else if (this.martian[2]=="W"){
            this.martian[0] -= 1
        }
        else{
            this.martian[1] += 1
        }
        if (this.martian[0]>=this.width || (this.height - this.martian[1] - 1)>=this.height){
            return true
        }
        return false
    }

}

function run(data){
    var map = new Map(data[0]+1,data[1]+1);
    martians = data[2]
    while (martians.length>0){
        map.addMartian(martians[0][0],martians[0][1],martians[0][2])
        let x = martians[0][3]
        moves = x.split("");
        var fell = false
        while (moves.length>0){
            move = moves[0]

            if (move=="R"){
                map.rotateRight()
            }
            else if (move=="L"){
                map.rotateLeft()
            }
            else if (move=="F"){
                if (fell==false){
                    fell = map.moveMartian()
                }else{
                    map.moveMartian()
                }
            }
            moves.shift();
        }
        map.printMartian(fell);
        martians.shift();
    }
}

function readArguments(){
    var file = ""
    process.argv.forEach(function (val, index, array) {
        if (index==2){
            file = val
        }
    });
    return file
}

function readFile(file){
    return fs.readFileSync('./'+file, 'utf8')
}

function parseFile(data){
    var r_data = [0,0,[]]
    let lines = data.split('\n')
    r_data[0] = parseInt(lines[0].split(" ")[0])
    r_data[1] = parseInt(lines[0].split(" ")[1])
    if (r_data[0]>50 || r_data[1]>50){
        throw new Error('Map coordinates have a higher value than 50');
    }
    lines.shift()
    while (lines.length>0){
        let arr = lines[0].split(" ")
        arr.push(lines[1])
        arr[0]=parseInt(arr[0])
        arr[1]=parseInt(arr[1])
        r_data[2].push(arr)
        if (arr[0]>50 || arr[1]>50){
            throw new Error('Martian coordinates have a higher value than 50');
        }
        if (lines[1].length>100){
            throw new Error('Martian moves must be a maximum of 100');
        }
        lines.shift()
        lines.shift()
    }
    return (r_data)
}


run(parseFile(readFile(readArguments())));