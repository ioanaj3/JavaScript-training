// Generate Chess Table
// function generateChessTable(){
//     // Create parent div 
//     let chess_table = document.createElement('div');
//     document.getElementsByTagName('body')[0].appendChild(chess_table);
//     chess_table.classList.add("chess-table")

//     // Top container - create
//     let top_container = document.createElement('div');
//     document.getElementsByClassName('chess-table')[0].appendChild(top_container);
//     top_container.classList.add("top-container")

//     // Left container - create
//     let left_container = document.createElement('div');
//     document.getElementsByClassName('chess-table')[0].appendChild(left_container);
//     left_container.classList.add("left-container")

//     // Right container - create
//     let right_container = document.createElement('div');
//     document.getElementsByClassName('chess-table')[0].appendChild(right_container);
//     right_container.classList.add("right-container")

//     // Bottom container - create
//     let bottom_container = document.createElement('div');
//     document.getElementsByClassName('chess-table')[0].appendChild(bottom_container);
//     bottom_container.classList.add("bottom-container")

//     // Table container - create
//     let table_container = document.createElement('div');
//     // table_container.innerHTML = "terog"
//     document.getElementsByClassName('chess-table')[0].appendChild(table_container);
//     table_container.classList.add("table-container")


//     // Populate top, bottom, left and right columns
//     let top_columns = []
//     let bottom_columns = []
//     let left_rows = []
//     let right_rows = []
//     let letter = "A"
//     let number = 1
//     let top_parent = document.getElementsByClassName('top-container')[0]
//     let bottom_parent = document.getElementsByClassName('bottom-container')[0]
//     let left_parent = document.getElementsByClassName('left-container')[0]
//     let right_parent = document.getElementsByClassName('right-container')[0]
//     for (let i = 0; i < 8; i++) {
//         top_columns[i] = document.createElement('div');
//         bottom_columns[i] = document.createElement('div');
//         left_rows[i] = document.createElement('div')
//         right_rows[i] = document.createElement('div')

//         top_columns[i].innerHTML = letter
//         bottom_columns[i].innerHTML = letter
//         left_rows[i].innerHTML = number
//         right_rows[i].innerHTML = number

//         letter = String.fromCharCode(letter.charCodeAt(0) + 1)
//         number = number + 1

//         top_parent.appendChild(top_columns[i]);
//         bottom_parent.appendChild(bottom_columns[i]);
//         left_parent.appendChild(left_rows[i])
//         right_parent.appendChild(right_rows[i])

//         top_columns[i].classList.add("top-column")
//         bottom_columns[i].classList.add("bottom-column")
//         left_rows[i].classList.add("left-row")
//         right_rows[i].classList.add("right-row")
//     }

//     // Populate table with boxes
//     let table_parent = document.getElementsByClassName('table-container')[0]
//     let boxes = []

//     for (let i = 0; i<8; i++){
//         if (!boxes[i]) boxes[i] = []

//         for (let j = 0; j < 8; j++) {
            
//             boxes[i][j] = document.createElement('div');
        
//             table_parent.appendChild(boxes[i][j])
        
//             boxes[i][j].classList.add('box')
        
//             boxes[i][j].setAttribute('data-i', i);
//             boxes[i][j].setAttribute('data-j', j);
//             if(i % 2 == 0){
//                 if(j % 2 == 0){
//                     boxes[i][j].classList.add('dark-box')
//                 }
//                 else
//                     boxes[i][j].classList.add('light-box')
//             }
//             else{
//                 if(j % 2 == 0){
//                     boxes[i][j].classList.add('light-box')
//                 }
//                 else
//                     boxes[i][j].classList.add('dark-box')
//             }
//         }
//     }
//     return boxes;
// }

// // Import images
// function importPiecesImages(){

//     let whitePiecesImages = []
//     let blackPiecesImages = []

//     // White Pieces
//     whitePiecesImages[1] = document.createElement("img");
//     whitePiecesImages[1].src = "icons/rook_white.png";
//     whitePiecesImages[1].classList.add("icon");


//     whitePiecesImages[2] = document.createElement("img");
//     whitePiecesImages[2].src = "icons/knight_white.png";
//     whitePiecesImages[2].classList.add("icon");

//     whitePiecesImages[3] = document.createElement("img");
//     whitePiecesImages[3].src = "icons/bishop_white.png";
//     whitePiecesImages[3].classList.add("icon");

//     whitePiecesImages[4] = document.createElement("img");
//     whitePiecesImages[4].src = "icons/queen_white.png";
//     whitePiecesImages[4].classList.add("icon");

//     whitePiecesImages[5] = document.createElement("img");
//     whitePiecesImages[5].src = "icons/king_white.png";
//     whitePiecesImages[5].classList.add("icon");

//     whitePiecesImages[6] = whitePiecesImages[3].cloneNode();
//     whitePiecesImages[7] = whitePiecesImages[2].cloneNode();
//     whitePiecesImages[8] = whitePiecesImages[1].cloneNode();


//     whitePiecesImages[9] = document.createElement("img");
//     whitePiecesImages[9].src = "icons/pawn_white.png";
//     whitePiecesImages[9].classList.add("icon");
//     whitePiecesImages[9].classList.add("pawn");

//     for (let i = 10; i <= 16; i++) {
//         whitePiecesImages[i] = whitePiecesImages[9].cloneNode();
//     }


//     // Black Pieces
//     blackPiecesImages[1] = document.createElement("img");
//     blackPiecesImages[1].src = "icons/rook_black.png";
//     blackPiecesImages[1].classList.add("icon");


//     blackPiecesImages[2] = document.createElement("img");
//     blackPiecesImages[2].src = "icons/knight_black.png";
//     blackPiecesImages[2].classList.add("icon");

//     blackPiecesImages[3] = document.createElement("img");
//     blackPiecesImages[3].src = "icons/bishop_black.png";
//     blackPiecesImages[3].classList.add("icon");

//     blackPiecesImages[4] = document.createElement("img");
//     blackPiecesImages[4].src = "icons/queen_black.png";
//     blackPiecesImages[4].classList.add("icon");

//     blackPiecesImages[5] = document.createElement("img");
//     blackPiecesImages[5].src = "icons/king_black.png";
//     blackPiecesImages[5].classList.add("icon");

//     blackPiecesImages[6] = blackPiecesImages[3].cloneNode();
//     blackPiecesImages[7] = blackPiecesImages[2].cloneNode();
//     blackPiecesImages[8] = blackPiecesImages[1].cloneNode();

//     blackPiecesImages[9] = document.createElement("img");
//     blackPiecesImages[9].src = "icons/pawn_black.png";
//     blackPiecesImages[9].classList.add("icon");
//     blackPiecesImages[9].classList.add("pawn");


//     for (let i = 10; i <= 16; i++) {
//         blackPiecesImages[i] = blackPiecesImages[9].cloneNode();
//     }
//     return [whitePiecesImages, blackPiecesImages]
// }

// function populateChessTable(){
//             let images = this.importPiecesImages();
//             let whitePiecesImages = images[0];
//             let blackPiecesImages = images[1];
    
//             let pieces = this.createPieces(whitePiecesImages, blackPiecesImages);
//             let whitePieces = pieces[0];
//             let blackPieces = pieces[1];
//             return this.assignColorToPlayers(whitePieces, blackPieces)
    
//         }

// // Create black and white pieces
// function createPieces(){
//     let whitePieces = []
//     let blackPieces = []
//     for (let i = 1; i <= 16; i++) {
//         if(i == 1 || i == 8)
//         {
//             whitePieces[i] = new Rook(0, 0, whitePiecesImages[i], "white");
//             blackPieces[i] = new Rook(0, 0, blackPiecesImages[i], "black");
//         }
//         else if(i == 2 || i == 7){
//             whitePieces[i] = new Knight(0, 0, whitePiecesImages[i], "white");
//             blackPieces[i] = new Knight(0, 0, blackPiecesImages[i], "black");
//         }
//         else if(i == 3 || i == 6){
//             whitePieces[i] = new Bishop(0, 0, whitePiecesImages[i], "white");
//             blackPieces[i] = new Bishop(0, 0, blackPiecesImages[i], "black");
//         }
//         else if(i == 4){
//             whitePieces[i] = new Queen(0, 0, whitePiecesImages[i], "white");
//             blackPieces[i] = new Queen(0, 0, blackPiecesImages[i], "black");
//         }
//         else if(i == 5){
//             whitePieces[i] = new King(0, 0, whitePiecesImages[i], "white");
//             blackPieces[i] = new King(0, 0, blackPiecesImages[i], "black");
//         }
//         else if(i > 8){
//             whitePieces[i] = new Pawn(0, 0, whitePiecesImages[i], "white");
//             blackPieces[i] = new Pawn(0, 0, blackPiecesImages[i], "black");
//         }
//     }
//     return [whitePieces, blackPieces]
// }

