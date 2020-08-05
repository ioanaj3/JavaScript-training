
class ChessTable{
    chess_matrix = []
    $boxes = []
    player_top_captures = []
    player_bottom_captures = []
    player_top = []
    player_bottom = []
    player_top_pieces = []
    player_bottom_pieces = []

    top_player_moves = 0
    bottom_player_moves = 0
    current_user = "white"
    $textMessage = ""

    constructor(){
        let matrix_collection = this.generateChessTable();
        this.$boxes = matrix_collection[0]
        this.player_top_captures = matrix_collection[1]
        this.player_bottom_captures = matrix_collection[2]

        let players_info  = this.populateChessTable()
        this.player_top = players_info[0]
        this.player_bottom = players_info[1]
        this.player_top_pieces = players_info[2]
        this.player_bottom_pieces = players_info[3]

        this.createMatrix(this.player_top_pieces, this.player_bottom_pieces, this.$boxes)

        this.$textMessage = $('<div/>');
        this.$textMessage.addClass("player-order")
        $("body").append(this.$textMessage)

        if(this.player_top == 1){
            this.$textMessage.html("It's player top's turn")
        }
        else{
            this.$textMessage.html("It's player bottom's turn")

        }

        $(".box").click(event => {this.pieceActionsOnClick(event)})

    }

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
                    boxes[i][j].append(this.chess_matrix[i][j].img)
                }
            }
        }
        $(".icon").draggable();
        $(".icon").draggable("disable");  
    }

    // What to do when a piece is clicked
    pieceActionsOnClick(event){
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
            // this.changePlayer();
        }
        else if (this.chess_matrix[i][j] !== null && this.canAttack(i, j)){
            this.attackPiece(i,j);
            // this.changePlayer();
        }
        // If a box with a piece is clicked, show possible moves
        else if(this.chess_matrix[i][j] != null && this.chess_matrix[i][j].color === this.current_user){
            this.showPossibleMoves(event.currentTarget);
        }

    } 

    changePlayer(){
        if(this.current_user === "white"){
            this.current_user = "black";
        }
        else{
            this.current_user = "white";
        }

        if((this.current_user === "black" && this.player_top ===2) || (this.current_user === "white" && this.player_top === 1))
            this.$textMessage.html("It's player top's turn")
        else if((this.current_user === "black" && this.player_bottom === 2) || (this.current_user === "white" && this.player_bottom === 1))
            this.$textMessage.html("It's player bottom's turn")
    }

    getCurrentPieceCoordinates(){
        let $current_box = $(".current-move")
    
        let $initial_i = $current_box.attr("data-i")
        let $initial_j = $current_box.attr("data-j")
        return [$initial_i, $initial_j]
    }
    // Move piece
    movePiece(final_i, final_j){
        let current_piece = this.getCurrentPieceCoordinates()
        let initial_i = current_piece[0];
        let initial_j = current_piece[1]

        this.chess_matrix[final_i][final_j] = this.chess_matrix[initial_i][initial_j]
        this.chess_matrix[initial_i][initial_j] = null

        this.$boxes[final_i][final_j].append(this.chess_matrix[final_i][final_j].img)

        this.chess_matrix[final_i][final_j].number_of_moves ++;

        this.$boxes[final_i][final_j].children().draggable("disable");
        this.clearBoxesBg();
        this.changePlayer();
    }

    attackPiece(final_i, final_j){
        let current_piece = this.getCurrentPieceCoordinates()
        let initial_i = current_piece[0];
        let initial_j = current_piece[1]

        $(this.chess_matrix[final_i][final_j].img).remove();

        let element_found = false;
        let player_table
        for(let i = 0; i <4 && !element_found; i++){
            for(let j = 0; j<4 && !element_found; j++){
                if((this.current_user === "black" && this.player_top ===2) || (this.current_user === "white" && this.player_top === 1)){
                    player_table = this.player_top_captures
                }
                else {
                    player_table = this.player_bottom_captures
                }
                if(player_table[i][j].children().length === 0){
                    player_table[i][j].append(this.chess_matrix[final_i][final_j].img)
                    element_found = true;
                }
            }
        }

        this.chess_matrix[final_i][final_j] = null
        this.chess_matrix[final_i][final_j] = this.chess_matrix[initial_i][initial_j]
        this.chess_matrix[initial_i][initial_j] = null
        this.$boxes[final_i][final_j].append(this.chess_matrix[final_i][final_j].img)
        this.chess_matrix[final_i][final_j].number_of_moves ++;
        this.$boxes[final_i][final_j].children().draggable("disable");
        this.clearBoxesBg();
        this.changePlayer();
    }

    // Clear possible moves and current clicked item
    clearBoxesBg(){
        let $possible_moves_boxes = $(".possible-move");
        let $possible_attacks_boxes = $(".possible-attack");
        let $current_box = $(".current-move")

    
        $possible_moves_boxes.each(function(){$(this).removeClass("possible-move")});
        $possible_attacks_boxes.each(function(){$(this).removeClass("possible-attack")});
        $current_box.each(function(){$(this).removeClass("current-move")})

        $(".box").droppable("disable")

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
        this.$boxes[i][j].addClass("current-move");
        this.$boxes[i][j].children().draggable("enable");
    }

    // Color possible attack or move
    colorPossibleMove(i, j, type){
        let added_class
        if(type === "move") added_class = "possible-move"
        else if (type === "attack") added_class = "possible-attack"
        this.$boxes[i][j].addClass(added_class)
        $(".possible-move, .possible-attack").droppable('enable');
    }
    // Verify if piece exists at certain place
    pieceExistsAt(i,j){
        return this.chess_matrix[i][j] 
    }

    isOpponentPiece(possible_attack_i, possible_attack_j){
        return !(this.chess_matrix[possible_attack_i][possible_attack_j].color === this.current_user)
    }

    showPossibleMoves(box){

        let i = parseInt(box.dataset.i)
        let j = parseInt(box.dataset.j)
    
        let $current_box = $(".current-move")
        if($current_box.length != 0){

            let $i = parseInt($current_box.attr("data-i"))
            let $j = parseInt($current_box.attr("data-j"))
            // If the same piece is clicked, disable all colors
            if(i === $i && j === $j){
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

    // Colors possible move, according to the possible moves of the class
    showPossibleMovesAttacks(i, j){
        this.clearBoxesBg();
        let element = this.chess_matrix[i][j]
        let possible_moves = element.possible_moves;
        let possible_attacks = element.possible_attacks;

        // Iterate through possible moves
        for(let k = 0; k < possible_moves.length; k++){
            let possible_move_i, possible_move_j, possible_move_i_2, possible_move_j_2
            let elem_found

            switch (possible_moves[k]) {
                case "front-2":
                    // Pawn is in initial position
                    if (element.number_of_moves === 0){

                        if(element.player === this.player_top){
                            possible_move_i = parseInt(i) + parseInt(1)
                            possible_move_j = parseInt(j) 
                            possible_move_i_2 = parseInt(i) + parseInt(2)
                            possible_move_j_2 = parseInt(j) 
                        }
                        else if(element.player === this.player_bottom){
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
                    break;
                case "front-1":
                    if(element.player === this.player_top){
                        possible_move_i = parseInt(i) + parseInt(1)
                        possible_move_j = parseInt(j)
                    }
                    else if(element.player === this.player_bottom){
                        possible_move_i = parseInt(i) - parseInt(1)
                        possible_move_j = parseInt(j)
                    }
                    // urmatoarul 1 element este gol
                    if (!this.pieceExistsAt(possible_move_i, possible_move_j)){
                        this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                        this.colorCurrentElement(i, j);
                    }
                    break;
                case "front-back-max":
                    elem_found = false
                    possible_move_j = parseInt(j)

                    for(let n = parseInt(i) + parseInt(1); n <8 && n>=0 && elem_found === false; n++){
                        possible_move_i = n;
                        if (!this.pieceExistsAt(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                            this.colorCurrentElement(i, j);
                        }
                        else {
                            elem_found = true;
                            if (this.isOpponentPiece(possible_move_i, possible_move_j)){
                                this.colorPossibleMove(possible_move_i, possible_move_j, "attack");
                                this.colorCurrentElement(i, j);
                            } 
                        }
                    }
                    elem_found = false
                    for(let n = parseInt(i) - parseInt(1); n <8 && n>=0 && elem_found === false; n--){
                        possible_move_i = n;
                        if (!this.pieceExistsAt(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                            this.colorCurrentElement(i, j);
                        }
                        else{
                            elem_found = true;
                            if (this.isOpponentPiece(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "attack");
                            this.colorCurrentElement(i, j);
                            
                        }}
                    }

                    break;  
                case "left-right-max":
                    elem_found = false
                    possible_move_i = parseInt(i)

                    for(let n = parseInt(j) + parseInt(1); n <8 && n>=0 && elem_found === false; n++){
                        possible_move_j = n;
                        if (!this.pieceExistsAt(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                            this.colorCurrentElement(i, j);
                        }
                        else{
                            elem_found = true;
                            if (this.isOpponentPiece(possible_move_i, possible_move_j)){
                                this.colorPossibleMove(possible_move_i, possible_move_j, "attack");
                                this.colorCurrentElement(i, j);
                            } 
                        } 
                    }

                    elem_found = false
                    for(let n = parseInt(j) - parseInt(1); n <8 && n>=0 && elem_found === false; n--){
                        possible_move_j = n;
                        if (!this.pieceExistsAt(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                            this.colorCurrentElement(i, j);
                        }
                        else {
                            elem_found = true;
                            if (this.isOpponentPiece(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "attack");
                            this.colorCurrentElement(i, j);
                        } }

                    }
                    break;
                case "leftdiag-rightdiag-max":
                    elem_found = false;
                    for(let possible_move_i = parseInt(i) + parseInt(1), possible_move_j = parseInt(j) + parseInt(1); possible_move_i <8 && possible_move_j<8 && possible_move_i>=0 && possible_move_j>=0 && elem_found === false; possible_move_i++, possible_move_j++){
                        if(!this.pieceExistsAt(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                            this.colorCurrentElement(i, j);
                        }
                        else {
                            elem_found = true;
                            if (this.isOpponentPiece(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "attack");
                            this.colorCurrentElement(i, j);
                        }}
                    }
                    
                    elem_found = false;

                    for(let possible_move_i = parseInt(i) - parseInt(1), possible_move_j = parseInt(j) - parseInt(1); possible_move_i <8 && possible_move_j<8 && possible_move_i>=0 && possible_move_j>=0 && elem_found === false; possible_move_i--, possible_move_j--){
                        if(!this.pieceExistsAt(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                            this.colorCurrentElement(i, j);
                        }
                        else {
                            elem_found = true;
                            if (this.isOpponentPiece(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "attack");
                            this.colorCurrentElement(i, j);
                        }}
                    }

                    elem_found = false;

                    for(let possible_move_i = parseInt(i) - parseInt(1), possible_move_j = parseInt(j) + parseInt(1); possible_move_i <8 && possible_move_j<8 && possible_move_i>=0 && possible_move_j>=0 && elem_found === false; possible_move_i--, possible_move_j++){
                        if(!this.pieceExistsAt(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                            this.colorCurrentElement(i, j);
                        }
                        else {
                            elem_found = true;
                            if (this.isOpponentPiece(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "attack");
                            this.colorCurrentElement(i, j);
                        }
                    }
                    }

                    elem_found = false;

                    for(let possible_move_i = parseInt(i) + parseInt(1), possible_move_j = parseInt(j) - parseInt(1); possible_move_i <8 && possible_move_j<8 && possible_move_i>=0 && possible_move_j>=0 && elem_found === false; possible_move_i++, possible_move_j--){
                        if(!this.pieceExistsAt(possible_move_i, possible_move_j)){
                            this.colorPossibleMove(possible_move_i, possible_move_j, "move");
                            this.colorCurrentElement(i, j);
                        }
                        else {
                            elem_found = true;
                            if (this.isOpponentPiece(possible_move_i, possible_move_j)){
                                this.colorPossibleMove(possible_move_i, possible_move_j, "attack");
                                this.colorCurrentElement(i, j);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }

        }

        // Iterate through possible attacks
        for(let k = 0; k < possible_attacks.length; k++){
            let possible_attack_i, possible_attack_j

            if(possible_attacks[k] === "leftdiag-1"){
                if(element.player === this.player_top){
                    possible_attack_i = parseInt(i) + parseInt(1)
                    possible_attack_j = parseInt(j) + parseInt(1)
                }
                else if(element.player === this.player_bottom){
                    possible_attack_i = parseInt(i) - parseInt(1)
                    possible_attack_j = parseInt(j) - parseInt(1)
                }
                if(this.pieceExistsAt(possible_attack_i, possible_attack_j) && this.isOpponentPiece(possible_attack_i, possible_attack_j)){
                    
                    this.colorPossibleMove(possible_attack_i, possible_attack_j, "attack")
                    this.colorCurrentElement(i, j);

                }
            }
            else if (possible_attacks[k] === "rightdiag-1"){
                if(element.player === this.player_top){
                    possible_attack_i = parseInt(i) + parseInt(1)
                    possible_attack_j = parseInt(j) - parseInt(1)
                }
                else if(element.player === this.player_bottom){
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
        let $images = this.importPiecesImages();
        let $whitePiecesImages = $images[0];
        let $blackPiecesImages = $images[1];

        let pieces = this.createPieces($whitePiecesImages, $blackPiecesImages);
        let $whitePieces = pieces[0];
        let $blackPieces = pieces[1];
        return this.assignColorToPlayers($whitePieces, $blackPieces)
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

    let $whitePiecesImages = []
    let $blackPiecesImages = []

    // White Pieces
    $whitePiecesImages[1] = $("<img/>");
    $whitePiecesImages[1].attr('src', "icons/rook_white.png");

    $whitePiecesImages[2] = $("<img/>");
    $whitePiecesImages[2].attr('src', "icons/knight_white.png");

    $whitePiecesImages[3] = $("<img/>");
    $whitePiecesImages[3].attr('src', "icons/bishop_white.png");

    $whitePiecesImages[4] = $("<img/>");
    $whitePiecesImages[4].attr('src', "icons/queen_white.png");

    $whitePiecesImages[5] = $("<img/>");
    $whitePiecesImages[5].attr('src', "icons/king_white.png");

    $whitePiecesImages[6] = $whitePiecesImages[3].clone();
    $whitePiecesImages[7] = $whitePiecesImages[2].clone();
    $whitePiecesImages[8] = $whitePiecesImages[1].clone();

    $whitePiecesImages[9] = $("<img/>");
    $whitePiecesImages[9].attr('src', "icons/pawn_white.png");

    for (let i = 10; i <= 16; i++) {
        $whitePiecesImages[i] = $whitePiecesImages[9].clone();
    }

    // Black Pieces
    $blackPiecesImages[1] = $("<img/>");
    $blackPiecesImages[1].attr('src', "icons/rook_black.png");

    $blackPiecesImages[2] = $("<img/>");
    $blackPiecesImages[2].attr('src', "icons/knight_black.png");

    $blackPiecesImages[3] = $("<img/>");
    $blackPiecesImages[3].attr('src', "icons/bishop_black.png");

    $blackPiecesImages[4] = $("<img/>");
    $blackPiecesImages[4].attr('src', "icons/queen_black.png");

    $blackPiecesImages[5] = $("<img/>");
    $blackPiecesImages[5].attr('src', "icons/king_black.png");

    $blackPiecesImages[6] = $blackPiecesImages[3].clone();

    $blackPiecesImages[7] = $blackPiecesImages[2].clone();    

    $blackPiecesImages[8] = $blackPiecesImages[1].clone();

    $blackPiecesImages[9] = $("<img/>");
    $blackPiecesImages[9].attr('src',"icons/pawn_black.png");

    for (let i = 10; i <= 16; i++) {
        $blackPiecesImages[i] = $blackPiecesImages[9].clone();

    }

    for (let i = 1; i <= 16; i++) {
        $blackPiecesImages[i].addClass("icon");
        $whitePiecesImages[i].addClass("icon");
        $blackPiecesImages[i].attr("data-id",`black-${i}`);
        $whitePiecesImages[i].attr("data-id",`white-${i}`);
    }

    return [$whitePiecesImages, $blackPiecesImages]
}

    // Generate general HTML structure of the page
    generateMainStructure(){
        let $player_top_container = $('<div/>');
        $("body").append($player_top_container);
        $player_top_container.addClass("player-top-container");

        let $player_top_text = $('<div/>')
        $player_top_text.html("Player-top's captures")
                       .appendTo($player_top_container)
                       .addClass("player-top-text")

        let $player_top_captures = []
        for(let i = 0; i<4; i++){
            if (!$player_top_captures[i]) $player_top_captures[i] = []
            for(let j = 0; j<4; j++){
                $player_top_captures[i][j] = $('<div/>');
            
                $player_top_container.append($player_top_captures[i][j])
            
                $player_top_captures[i][j].attr('data-i', i);
                $player_top_captures[i][j].attr('data-j', j);
            }
        }

        let $chess_table = $('<div/>');
        $("body").append($chess_table);
        $chess_table.addClass("chess-table");

        let $player_bottom_container = $('<div/>');
        $("body").append($player_bottom_container);
        $player_bottom_container.addClass("player-bottom-container");

        let $player_bottom_text = $('<div/>')
        $player_bottom_text.html("Player-bottom's captures");
        $player_bottom_text.appendTo($player_bottom_container);
        $player_bottom_text.addClass("player-bottom-text")

        let $player_bottom_captures = []
        for(let i = 0; i<4; i++){
            if (!$player_bottom_captures[i]) $player_bottom_captures[i] = []
            for(let j = 0; j<4; j++){
                $player_bottom_captures[i][j] = $('<div/>');
            
                $player_bottom_container.append($player_bottom_captures[i][j])
            
                $player_bottom_captures[i][j].attr('data-i', i);
                $player_bottom_captures[i][j].attr('data-j', j);
            }
        }

        let $chess_table_container = $('.chess-table')
    
        // Top container - create
        let $top_container = $('<div/>');
        $chess_table_container.append($top_container);
        $top_container.addClass("top-container")
    
        // Left container - create
        let $left_container = $('<div/>');
        $chess_table_container.append($left_container);
        $left_container.addClass("left-container")
    
        // Right container - create
        let $right_container = $('<div/>');
        $chess_table_container.append($right_container);
        $right_container.addClass("right-container")
    
        // Bottom container - create
        let $bottom_container = $('<div/>');
        $chess_table_container.append($bottom_container);
        $bottom_container.addClass("bottom-container")
    
        // Table container - create
        let $table_container = $('<div/>');
        $chess_table_container.append($table_container);
        $table_container.addClass("table-container")
        return [$player_top_captures, $player_bottom_captures]
    }

    // Populate top, bottom, left and right columns
    populateAdjacentColumns(){
        let $top_columns = []
        let $bottom_columns = []
        let $left_rows = []
        let $right_rows = []
        let letter = "A"
        let number = 1
        let $top_parent = $('.top-container')
        let $bottom_parent = $('.bottom-container')
        let $left_parent = $('.left-container')
        let $right_parent = $('.right-container')
        for (let i = 0; i < 8; i++) {
            $top_columns[i] = $('<div/>');
            $bottom_columns[i] = $('<div/>');
            $left_rows[i] = $('<div/>')
            $right_rows[i] = $('<div/>')
    
            $top_columns[i].html(letter)
            $bottom_columns[i].html(letter)
            $left_rows[i].html(number)
            $right_rows[i].html(number)
    
            letter = String.fromCharCode(letter.charCodeAt(0) + 1)
            number = number + 1
    
            $top_parent.append($top_columns[i]);
            $bottom_parent.append($bottom_columns[i]);
            $left_parent.append($left_rows[i])
            $right_parent.append($right_rows[i])
    
            $top_columns[i].addClass("top-column")
            $bottom_columns[i].addClass("bottom-column")
            $left_rows[i].addClass("left-row")
            $right_rows[i].addClass("right-row")
        }
    }

    // Populate boxes of chess table
    populateTableBoxes(){
        let $table_parent = $('.table-container')
        let $boxes = []
    
        for (let i = 0; i<8; i++){
            if (!$boxes[i]) $boxes[i] = []
    
            for (let j = 0; j < 8; j++) {
                
                $boxes[i][j] = $('<div/>');
            
                $table_parent.append($boxes[i][j])
            
                $boxes[i][j].addClass('box')
            
                $boxes[i][j].attr('data-i', i);
                $boxes[i][j].attr('data-j', j);
                if(i % 2 === 0){
                    if(j % 2 === 0){
                        $boxes[i][j].addClass('dark-box')
                    }
                    else
                        $boxes[i][j].addClass('light-box')
                }
                else{
                    if(j % 2 === 0){
                        $boxes[i][j].addClass('light-box')
                    }
                    else
                        $boxes[i][j].addClass('dark-box')
                }
            }
        }
        $(".box").droppable({
            drop: event => {
                let $final_i = $(event.target).attr("data-i")
                let $final_j = $(event.target).attr("data-j")
                if($(event.target).hasClass("possible-move")){
                    this.movePiece(parseInt($final_i), parseInt($final_j))
                }
                else if ($(event.target).hasClass("possible-attack")){
                    this.attackPiece($final_i, $final_j)
                }

                this.chess_matrix[$final_i][$final_j].img.attr('style', 'position: relative;')
            }
        })
        $(".box").droppable("disable")


    return $boxes;
    }
    // Generate the chess table (structure + populate)
    generateChessTable(){
        let captures = this.generateMainStructure();
        let $player_top_captures = captures[0];
        let $player_bottom_captures = captures[1];

        this.populateAdjacentColumns();

        let $boxes = this.populateTableBoxes();

        return [$boxes, $player_top_captures, $player_bottom_captures];
    }
    
}
 