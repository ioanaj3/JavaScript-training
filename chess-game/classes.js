class ChessTable{
    chess_matrix =[]

    // Creates base matrix
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

    // What to do when a piece is clicked
    pieceActionsOnClick(event, player_top_value, player_bottom_value){
        let i = event.currentTarget.dataset.i
        let j = event.currentTarget.dataset.j
        
        // if element is clickable aka corresponds to the current user

        // If a box with no property is clicked, clear all colors
        if(this.chess_matrix[i][j] === null && !this.canMoveTo(i,j)){
            this.clearBoxesBg();
        }
        // If a possible-move box is clicked, move current element
        else if (this.chess_matrix[i][j] === null && this.canMoveTo(i,j)){
            this.movePiece(i,j);
            this.changePlayer();
        }
        else if (this.chess_matrix[i][j] !== null && this.canAttack(i, j)){
            this.attackPiece(i,j);
            this.changePlayer();
        }
        // If a box with a piece is clicked, show possible moves
        else if(this.chess_matrix[i][j] != null && this.chess_matrix[i][j].color === current_user){
            this.showPossibleMoves(event.currentTarget);
            this.showPossibleAttacks(event.currentTarget)}

    } 

    changePlayer(){
        if(current_user === "white"){
            current_user = "black";
        }
        else{
            current_user = "white";
        }

        if((current_user === "black" && player_top ===2) || (current_user === "white" && player_top === 1))
            textMessage.innerHTML="It's player top's turn"
        else if((current_user === "black" && player_bottom === 2) || (current_user === "white" && player_bottom === 1))
            textMessage.innerHTML="It's player bottom's turn"
    }


    // Move piece
    movePiece(final_i, final_j){
        // Get current clicked element
        let current_box = Array.from(document.getElementsByClassName("current-move"))
    
        let initial_i = current_box[0].dataset.i;
        let initial_j = current_box[0].dataset.j;

        this.chess_matrix[final_i][final_j] = this.chess_matrix[initial_i][initial_j]
        this.chess_matrix[initial_i][initial_j] = null

        boxes[final_i][final_j].appendChild(this.chess_matrix[final_i][final_j].img)

        this.chess_matrix[final_i][final_j].number_of_moves ++;
    
        this.clearBoxesBg();
    }

    attackPiece(final_i, final_j){
        // Get current clicked element
        let current_box = Array.from(document.getElementsByClassName("current-move"))
        
        let initial_i = current_box[0].dataset.i;
        let initial_j = current_box[0].dataset.j;

        boxes[final_i][final_j].removeChild(this.chess_matrix[final_i][final_j].img)
        this.chess_matrix[final_i][final_j] = this.chess_matrix[initial_i][initial_j]
        this.chess_matrix[initial_i][initial_j] = null
        boxes[final_i][final_j].appendChild(this.chess_matrix[final_i][final_j].img)

        this.chess_matrix[final_i][final_j].number_of_moves ++;

        this.clearBoxesBg();
    }

    // Clear possible moves and current clicked item
    clearBoxesBg(){
        let possible_moves_boxes = Array.from(document.getElementsByClassName("possible-move"));
        let possible_attacks_boxes = Array.from(document.getElementsByClassName("possible-attack"));
        let current_box = Array.from(document.getElementsByClassName("current-move"))
    
        possible_moves_boxes.forEach(element => {element.classList.remove("possible-move")})
        possible_attacks_boxes.forEach(element =>{element.classList.remove("possible-attack")})
        current_box.forEach(element => {element.classList.remove("current-move")})
    }

    // Check if box is labeled as possible move
    canMoveTo(i,j) {
        return document.querySelector(`[data-i="${i}"][data-j="${j}"].possible-move`) !== null
    }
    canAttack(i,j){
        return document.querySelector(`[data-i="${i}"][data-j="${j}"].possible-attack`) !== null

    }
    // Color current clicked element
    colorCurrentElement(i, j){
        boxes[i][j].classList.add("current-move")
    }

    // Color possible attack or move
    colorPossibleMove( i, j, type){
        let added_class
        if(type === "move") added_class = "possible-move"
        else if (type === "attack") added_class = "possible-attack"
        boxes[i][j].classList.add(added_class)
    }
    // Verify if piece exists at certain place
    pieceExistsAt(i,j){
        return matrix[i][j] 
    }

    isOpponentPiece(possible_attack_i, possible_attack_j){
        return !(this.chess_matrix[possible_attack_i][possible_attack_j].color === current_user)
    }

    showPossibleMoves(box){

        let i = parseInt(box.dataset.i)
        let j = parseInt(box.dataset.j)
    
        let current_box = Array.from(document.getElementsByClassName("current-move"))
        if(current_box[0] != null){
            let ii = parseInt(current_box[0].dataset.i)
            let jj = parseInt(current_box[0].dataset.j)

            // If the same piece is clicked, disable all colors
            if(i === ii && j === jj){
                this.clearBoxesBg();
            }
            // Color the piece's possible moves
            else{
                this.showPossibleMovesAttacks(i, j);
            }
        }
        // Color the piece's possible moves
        else{
            this.showPossibleMovesAttacks(i, j);
        }  
    }

    showPossibleAttacks(box){
        let i = box.dataset.i
        let j = box.dataset.j
    
        this.showPossibleMovesAttacks(i,j)
    }

    // Colors possible move, according to the possible moves of the class
    showPossibleMovesAttacks(i, j){
        this.clearBoxesBg();
        let element = this.chess_matrix[i][j]
        let possible_moves = element.possible_moves;
        let possible_attacks = element.possible_attacks;

        // Iterate through possible moves
        for(let k = 0; k < possible_moves.length; k++){
            let possible_move_i, possible_move_j, possible_move_i_2, possible_move_j_2


            if(possible_moves[k] === "front-2"){

                // Pawn is in initial position
                if (element.number_of_moves === 0){

                    if(element.player === player_top){
                        possible_move_i = parseInt(i) + parseInt(1)
                        possible_move_j = parseInt(j) 
                        possible_move_i_2 = parseInt(i) + parseInt(2)
                        possible_move_j_2 = parseInt(j) 
                    }
                    else if(element.player === player_bottom){
                        possible_move_i = parseInt(i) - parseInt(1)
                        possible_move_j = parseInt(j) 
                        possible_move_i_2 = parseInt(i) - parseInt(2)
                        possible_move_j_2 = parseInt(j) 
                    }

                    // Next 2 elements in front are null
                    if (this.pieceExistsAt(possible_move_i, possible_move_j) === null && this.pieceExistsAt(possible_move_i_2, possible_move_j_2) === null ){
                 
                                this.colorPossibleMove(possible_move_i, possible_move_j,"move");
                                this.colorPossibleMove(possible_move_i_2, possible_move_j_2,"move");
                                this.colorCurrentElement(i, j);   
                    }
                }
            }

            else if(possible_moves[k] === "front-1"){

                if(element.player === player_top){
                    possible_move_i = parseInt(i) + parseInt(1)
                    possible_move_j = parseInt(j)
                }
                else if(element.player === player_bottom){
                    possible_move_i = parseInt(i) - parseInt(1)
                    possible_move_j = parseInt(j)
                }
                // urmatoarul 1 element este gol
                if (!this.pieceExistsAt(possible_move_i, possible_move_j)){
                    this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                    this.colorCurrentElement(i, j);
                }
            }
        }

        // Iterate through possible attacks
        for(let k = 0; k < possible_attacks.length; k++){
            let possible_attack_i, possible_attack_j

            if(possible_attacks[k] === "leftdiag-1"){
                if(element.player === player_top){
                    possible_attack_i = parseInt(i) + parseInt(1)
                    possible_attack_j = parseInt(j) + parseInt(1)
                }
                else if(element.player === player_bottom){
                    possible_attack_i = parseInt(i) - parseInt(1)
                    possible_attack_j = parseInt(j) - parseInt(1)
                }
                // If there is a piece at that place
                if(this.pieceExistsAt(possible_attack_i, possible_attack_j) && this.isOpponentPiece(possible_attack_i, possible_attack_j)){
                    //If the piece is from the opponent
                    // if(this.pieceFromOpponent(i,j,))
                    
                    this.colorPossibleMove(possible_attack_i, possible_attack_j, "attack")
                    this.colorCurrentElement(i, j);

                }
            }
            else if (possible_attacks[k] === "rightdiag-1"){
                if(element.player === player_top){
                    possible_attack_i = parseInt(i) + parseInt(1)
                    possible_attack_j = parseInt(j) - parseInt(1)
                }
                else if(element.player === player_bottom){
                    possible_attack_i = parseInt(i) - parseInt(1)
                    possible_attack_j = parseInt(j) + parseInt(1)
                }
                if(this.pieceExistsAt(possible_attack_i, possible_attack_j) && this.isOpponentPiece(possible_attack_i, possible_attack_j)){
                    this.colorPossibleMove(possible_attack_i, possible_attack_j, "attack")
                    this.colorCurrentElement(i, j);

                }
            }
        }
    }
    // Assign color to top/bottom player
    assignColorToPlayers(whitePieces, blackPieces){
        let player_top, player_bottom
    
        let player_top_pieces, player_bottom_pieces
    
        if (Math.floor(Math.random() *100) % 2 === 0) {
            player_top = 1
            whitePieces.forEach(whitePiece => whitePiece.player = player_top)
            player_top_pieces = whitePieces;
            player_bottom = 2
            blackPieces.forEach(blackPiece => blackPiece.player = player_bottom)
            player_bottom_pieces = blackPieces;
        }
        else {
            player_top = 2
            blackPieces.forEach(blackPiece => blackPiece.player = player_top)
            player_top_pieces = blackPieces;
    
            player_bottom = 1
            whitePieces.forEach(whitePiece => whitePiece.player = player_bottom)
            player_bottom_pieces = whitePieces;
        }
    
        return [player_top, player_bottom, player_top_pieces, player_bottom_pieces]
    }

    // Populate with chess pieces, assign each player a color
    populateChessTable(){
        let images = this.importPiecesImages();
        let whitePiecesImages = images[0];
        let blackPiecesImages = images[1];

        let pieces = this.createPieces(whitePiecesImages, blackPiecesImages);
        let whitePieces = pieces[0];
        let blackPieces = pieces[1];
        return this.assignColorToPlayers(whitePieces, blackPieces)
    }

    // Create black and white pieces
    createPieces(whitePiecesImages, blackPiecesImages){
    let whitePieces = []
    let blackPieces = []
    for (let i = 1; i <= 16; i++) {
        if(i === 1 || i === 8)
        {
            whitePieces[i] = new Rook(0, 0, whitePiecesImages[i], "white");
            blackPieces[i] = new Rook(0, 0, blackPiecesImages[i], "black");
        }
        else if(i === 2 || i === 7){
            whitePieces[i] = new Knight(0, 0, whitePiecesImages[i], "white");
            blackPieces[i] = new Knight(0, 0, blackPiecesImages[i], "black");
        }
        else if(i === 3 || i === 6){
            whitePieces[i] = new Bishop(0, 0, whitePiecesImages[i], "white");
            blackPieces[i] = new Bishop(0, 0, blackPiecesImages[i], "black");
        }
        else if(i === 4){
            whitePieces[i] = new Queen(0, 0, whitePiecesImages[i], "white");
            blackPieces[i] = new Queen(0, 0, blackPiecesImages[i], "black");
        }
        else if(i === 5){
            whitePieces[i] = new King(0, 0, whitePiecesImages[i], "white");
            blackPieces[i] = new King(0, 0, blackPiecesImages[i], "black");
        }
        else if(i > 8){
            whitePieces[i] = new Pawn(0, 0, whitePiecesImages[i], "white");
            blackPieces[i] = new Pawn(0, 0, blackPiecesImages[i], "black");
        }
    }
    return [whitePieces, blackPieces]
}
    // Import images
    importPiecesImages(){

    let whitePiecesImages = []
    let blackPiecesImages = []

    // White Pieces
    whitePiecesImages[1] = document.createElement("img");
    whitePiecesImages[1].src = "icons/rook_white.png";
    whitePiecesImages[1].classList.add("icon");


    whitePiecesImages[2] = document.createElement("img");
    whitePiecesImages[2].src = "icons/knight_white.png";
    whitePiecesImages[2].classList.add("icon");

    whitePiecesImages[3] = document.createElement("img");
    whitePiecesImages[3].src = "icons/bishop_white.png";
    whitePiecesImages[3].classList.add("icon");

    whitePiecesImages[4] = document.createElement("img");
    whitePiecesImages[4].src = "icons/queen_white.png";
    whitePiecesImages[4].classList.add("icon");

    whitePiecesImages[5] = document.createElement("img");
    whitePiecesImages[5].src = "icons/king_white.png";
    whitePiecesImages[5].classList.add("icon");

    whitePiecesImages[6] = whitePiecesImages[3].cloneNode();
    whitePiecesImages[7] = whitePiecesImages[2].cloneNode();
    whitePiecesImages[8] = whitePiecesImages[1].cloneNode();


    whitePiecesImages[9] = document.createElement("img");
    whitePiecesImages[9].src = "icons/pawn_white.png";
    whitePiecesImages[9].classList.add("icon");
    whitePiecesImages[9].classList.add("pawn");

    for (let i = 10; i <= 16; i++) {
        whitePiecesImages[i] = whitePiecesImages[9].cloneNode();
    }


    // Black Pieces
    blackPiecesImages[1] = document.createElement("img");
    blackPiecesImages[1].src = "icons/rook_black.png";
    blackPiecesImages[1].classList.add("icon");


    blackPiecesImages[2] = document.createElement("img");
    blackPiecesImages[2].src = "icons/knight_black.png";
    blackPiecesImages[2].classList.add("icon");

    blackPiecesImages[3] = document.createElement("img");
    blackPiecesImages[3].src = "icons/bishop_black.png";
    blackPiecesImages[3].classList.add("icon");

    blackPiecesImages[4] = document.createElement("img");
    blackPiecesImages[4].src = "icons/queen_black.png";
    blackPiecesImages[4].classList.add("icon");

    blackPiecesImages[5] = document.createElement("img");
    blackPiecesImages[5].src = "icons/king_black.png";
    blackPiecesImages[5].classList.add("icon");

    blackPiecesImages[6] = blackPiecesImages[3].cloneNode();
    blackPiecesImages[7] = blackPiecesImages[2].cloneNode();
    blackPiecesImages[8] = blackPiecesImages[1].cloneNode();

    blackPiecesImages[9] = document.createElement("img");
    blackPiecesImages[9].src = "icons/pawn_black.png";
    blackPiecesImages[9].classList.add("icon");
    blackPiecesImages[9].classList.add("pawn");


    for (let i = 10; i <= 16; i++) {
        blackPiecesImages[i] = blackPiecesImages[9].cloneNode();
    }
    return [whitePiecesImages, blackPiecesImages]
}
    // Generate the html + css part of the table
    generateChessTable(){
        // Create parent div 

        let player_top_container = document.createElement('div');
        document.getElementsByTagName('body')[0].appendChild(player_top_container);
        player_top_container.innerHTML = "hei"
        player_top_container.classList.add("player-top-container");

        let chess_table = document.createElement('div');
        document.getElementsByTagName('body')[0].appendChild(chess_table);
        chess_table.classList.add("chess-table");

        let player_bottom_container = document.createElement('div');
        document.getElementsByTagName('body')[0].appendChild(player_bottom_container);
        player_bottom_container.innerHTML = "hej"
        player_bottom_container.classList.add("player-bottom-container");

        let chess_table_container = document.getElementsByClassName('chess-table')[0]
    
        // Top container - create
        let top_container = document.createElement('div');
        chess_table_container.appendChild(top_container);
        top_container.classList.add("top-container")
    
        // Left container - create
        let left_container = document.createElement('div');
        chess_table_container.appendChild(left_container);
        left_container.classList.add("left-container")
    
        // Right container - create
        let right_container = document.createElement('div');
        chess_table_container.appendChild(right_container);
        right_container.classList.add("right-container")
    
        // Bottom container - create
        let bottom_container = document.createElement('div');
        chess_table_container.appendChild(bottom_container);
        bottom_container.classList.add("bottom-container")
    
        // Table container - create
        let table_container = document.createElement('div');
        // table_container.innerHTML = "terog"
        chess_table_container.appendChild(table_container);
        table_container.classList.add("table-container")
    
    
        // Populate top, bottom, left and right columns
        let top_columns = []
        let bottom_columns = []
        let left_rows = []
        let right_rows = []
        let letter = "A"
        let number = 1
        let top_parent = document.getElementsByClassName('top-container')[0]
        let bottom_parent = document.getElementsByClassName('bottom-container')[0]
        let left_parent = document.getElementsByClassName('left-container')[0]
        let right_parent = document.getElementsByClassName('right-container')[0]
        for (let i = 0; i < 8; i++) {
            top_columns[i] = document.createElement('div');
            bottom_columns[i] = document.createElement('div');
            left_rows[i] = document.createElement('div')
            right_rows[i] = document.createElement('div')
    
            top_columns[i].innerHTML = letter
            bottom_columns[i].innerHTML = letter
            left_rows[i].innerHTML = number
            right_rows[i].innerHTML = number
    
            letter = String.fromCharCode(letter.charCodeAt(0) + 1)
            number = number + 1
    
            top_parent.appendChild(top_columns[i]);
            bottom_parent.appendChild(bottom_columns[i]);
            left_parent.appendChild(left_rows[i])
            right_parent.appendChild(right_rows[i])
    
            top_columns[i].classList.add("top-column")
            bottom_columns[i].classList.add("bottom-column")
            left_rows[i].classList.add("left-row")
            right_rows[i].classList.add("right-row")
        }
    
        // Populate table with boxes
        let table_parent = document.getElementsByClassName('table-container')[0]
        let boxes = []
    
        for (let i = 0; i<8; i++){
            if (!boxes[i]) boxes[i] = []
    
            for (let j = 0; j < 8; j++) {
                
                boxes[i][j] = document.createElement('div');
            
                table_parent.appendChild(boxes[i][j])
            
                boxes[i][j].classList.add('box')
            
                boxes[i][j].setAttribute('data-i', i);
                boxes[i][j].setAttribute('data-j', j);
                if(i % 2 === 0){
                    if(j % 2 === 0){
                        boxes[i][j].classList.add('dark-box')
                    }
                    else
                        boxes[i][j].classList.add('light-box')
                }
                else{
                    if(j % 2 === 0){
                        boxes[i][j].classList.add('light-box')
                    }
                    else
                        boxes[i][j].classList.add('dark-box')
                }
            }
        }
        return boxes;
    }
    
}
 