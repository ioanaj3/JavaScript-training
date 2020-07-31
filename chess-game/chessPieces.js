class chessPiece{
    constructor(row, column, img, color){
        this.row = row;
        this.column = column;
        this.img = img;
        this.color = color;
    }
    number_of_moves = 0
    player = ""
    get row(){
        return this._row;
    }
    set row(new_row){
        this._row = new_row;
    }

    get column(){
        return this._column;
    }
    set column(new_column){
        this._column = new_column;
    }

    get color(){
        return this._color;
    }
    set color(new_color){
        this._color = new_color;
    }
    get img(){
        return this._img;
    }
    set img(new_img){
        this._img = new_img;
    }
}

class Pawn extends chessPiece{
    possible_moves = ["front-2", "front-1"]
    possible_attacks = ["leftdiag-1", "rightdiag-2"]

}

class Rook extends chessPiece{
    possible_moves = []
    possible_attacks = []

}

class Knight extends chessPiece{
    possible_moves = []
    possible_attacks = []

}
class Bishop extends chessPiece{
    possible_moves = []
    possible_attacks = []

}
class Queen extends chessPiece{
    possible_moves = []
    possible_attacks = []

}
class King extends chessPiece{
    possible_moves = []
    possible_attacks = []

}