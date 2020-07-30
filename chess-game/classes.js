class ChessTable{
    chess_matrix =[]

    createMatrix(player_top_pieces, player_bottom_pieces, boxes){
        this.chess_matrix = [
            [player_top_pieces[1], player_top_pieces[2], player_top_pieces[3], player_top_pieces[4], player_top_pieces[5], player_top_pieces[6], player_top_pieces[7], player_top_pieces[8]], 
            [player_top_pieces[9], player_top_pieces[10], player_top_pieces[11], player_top_pieces[12], player_top_pieces[13], player_top_pieces[14], player_top_pieces[15], player_top_pieces[16]],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null], 
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [player_bottom_pieces[9], player_bottom_pieces[10], player_bottom_pieces[11], player_bottom_pieces[12], player_bottom_pieces[13], player_bottom_pieces[14], player_bottom_pieces[15], player_bottom_pieces[16]], 
            [player_bottom_pieces[1], player_bottom_pieces[2], player_bottom_pieces[3], player_bottom_pieces[4], player_bottom_pieces[5], player_bottom_pieces[6], player_bottom_pieces[7], player_bottom_pieces[8]],
        ];
        for(let i = 0; i<8 ; i++){
            for(let j = 0; j<=8; j++){
                if(this.chess_matrix[i][j] != null){
                    boxes[i][j].appendChild(this.chess_matrix[i][j].img)
                }
            }
        }  
    }

    moveElementInMatrix(intial_i, initial_j, final_i,final_j){

        this.chess_matrix[final_i][final_j] = this.chess_matrix[intial_i][initial_j]
        this.chess_matrix[intial_i][initial_j] = null
        boxes[final_i][final_j].appendChild(this.chess_matrix[final_i][final_j].img)
        this.chess_matrix[final_i][final_j].number_of_moves ++;
    
    }

    movePiece(final_i, final_j){
        // Get current clicked element
        let current_box = Array.from(document.getElementsByClassName("current-move"))
    
        let initial_i = current_box[0].dataset.i;
        let initial_j = current_box[0].dataset.j;
    
        base_table.moveElementInMatrix(initial_i, initial_j, final_i, final_j)
        this.clearBoxesBg();
    }

    clearBoxesBg(){
        let possible_moves_boxes = Array.from(document.getElementsByClassName("possible-move"));
        let current_box = Array.from(document.getElementsByClassName("current-move"))
    
        possible_moves_boxes.forEach(element => {element.classList.remove("possible-move")})
        current_box.forEach(element => {element.classList.remove("current-move")})
    }

    canMoveTo(i,j) {
        return document.querySelector(`[data-i="${i}"][data-j="${j}"].possible-move`) !== null
    }

    colorCurrentElement(i, j){
        boxes[i][j].classList.add("current-move")
    }

    colorPossibleMove(steps, element, i, j, direction){
        if(element.player == player_top){
            if(direction == "front"){
                boxes[parseInt(i) + parseInt(steps)][j].classList.add("possible-move");
            }
        }
        else{
            if(direction == "front"){
                boxes[parseInt(i) - parseInt(steps)][j].classList.add("possible-move");
            }
        }
    }

    
    verifyFrontElement(steps,element,i,j){
        if(element.player == player_top){
            return (matrix[parseInt(i) + parseInt(steps)][j])
        }
        else{
            return (matrix[parseInt(i) - parseInt(steps)][j])
        }
    }

    showPossibleMoves(box){

        let i = box.dataset.i
        let j = box.dataset.j
    
        let current_box = Array.from(document.getElementsByClassName("current-move"))
        if(current_box[0] != null){
            let ii = current_box[0].dataset.i
            let jj = current_box[0].dataset.j
    
            // If the same piece is clicked
            if(i == ii && j == jj){
                base_table.clearBoxesBg();
            }
            else{
                colorElem();
            }
        }
        
        else{
            colorElem();
        }
        function colorElem(){
            base_table.clearBoxesBg();
            let element = matrix[i][j]
            let possible_moves = element.possible_moves;
            for(let k = 0; k < possible_moves.length; k++){
    
                if(possible_moves[k] == "front-2"){
    
                    // este in pozitia initiala
                    if (element.number_of_moves == 0){
    
                        // urmatoarele 2 elemente sunt goale
                        if (base_table.verifyFrontElement(1, element, i, j) == null && base_table.verifyFrontElement(2, element, i, j) == null){
                            base_table.colorPossibleMove(1, element, i, j, "front");
                            base_table.colorPossibleMove(2, element, i, j, "front");
                            base_table.colorCurrentElement(i, j);
                        }
    
                    }
                }
                else if(possible_moves[k] == "front-1"){
                    // urmatoarul 1 element este gol
                    if (base_table.verifyFrontElement(1, element, i, j) == null ){
                        base_table.colorPossibleMove(1, element, i, j, "front");
                        base_table.colorCurrentElement(i, j);
                    }
                }
            }
        }
    }

    pieceActionsOnClick(event){
        // console.log(event.currentTarget)
        let i = event.currentTarget.dataset.i
        let j = event.currentTarget.dataset.j
    
        // If a box with no property is clicked, clear all colors
        if(matrix[i][j] == null && !base_table.canMoveTo(i,j)){
            base_table.clearBoxesBg();
        }
        // If a possible-move box is clicked, move current element
        else if (matrix[i][j] == null && base_table.canMoveTo(i,j)){
            base_table.movePiece(i,j)
        }
        // If a box with a piece is clicked, show possible moves
        else if(matrix[i][j] != null){
            
            base_table.showPossibleMoves(event.currentTarget)}
    }    
    
}

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
