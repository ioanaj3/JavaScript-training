// Countdown
// let countdown_number = document.createElement('span');
// countdown_number.innerHTML = "5";
// countdown_number.classList.add("counter-number")
// document.getElementsByTagName('body')[0].appendChild(countdown_number);

// let newNumber = countdown_number.innerHTML
// function countdown(){   
//         newNumber = newNumber - 1;
//         console.log(newNumber);
//         countdown_number.innerHTML = newNumber;
//         if (newNumber >0) 
//             setTimeout(countdown,1000);
//         else{
//             document.getElementsByTagName('body')[0].removeChild(countdown_number)
//             generateChessTable();
//         }
//  }
// setTimeout(countdown,1000)

// let game = new ChessGame();
// game.startGame();

// Generate chess table visually
let base_table = new ChessTable()

let boxes = base_table.generateChessTable();

// // Import icons for chess pieces
// let images = importPiecesImages();
// let whitePiecesImages = images[0];
// let blackPiecesImages = images[1];



// // Create black and white pieces
// let pieces = createPieces();
// let whitePieces = pieces[0];
// let blackPieces = pieces[1];



// Assign place for each chess piece, according to the user it has
// function assignColorToPlayers(){
//     let player_top, player_bottom

//     let player_top_pieces, player_bottom_pieces

//     if (Math.floor(Math.random() *100) % 2 == 0) {
//         player_top = 1
//         whitePieces.forEach(whitePiece => whitePiece.player = player_top)
//         player_top_pieces = whitePieces;
//         player_bottom = 2
//         blackPieces.forEach(blackPiece => blackPiece.player = player_bottom)
//         player_bottom_pieces = blackPieces;
//     }
//     else {
//         player_top = 2
//         blackPieces.forEach(blackPiece => blackPiece.player = player_top)
//         player_top_pieces = blackPieces;

//         player_bottom = 1
//         whitePieces.forEach(whitePiece => whitePiece.player = player_bottom)
//         player_bottom_pieces = whitePieces;
//     }

//     return [player_top, player_bottom, player_top_pieces, player_bottom_pieces]
// }

players_info  = base_table.populateChessTable()
let player_top = players_info[0]
let player_bottom = players_info[1]
let player_top_pieces = players_info[2]
let player_bottom_pieces = players_info[3]




// // Create the base table
base_table.createMatrix(player_top_pieces, player_bottom_pieces, boxes)
let matrix = base_table.chess_matrix;

let top_player_moves = 0
let bottom_player_moves = 0
let current_user = "white"

let textMessage = document.createElement('div');
// textMessage.innerHTML="Hello World"
textMessage.classList.add("player-order")
document.getElementsByTagName('body')[0].appendChild(textMessage)

if(player_top == 1){
    textMessage.innerHTML="It's player top's turn"
}
else{
    textMessage.innerHTML="It's player bottom's turn"

}


// // Possible moves

let allBoxes = Array.from(document.getElementsByClassName("dark-box")).concat(Array.from(document.getElementsByClassName("light-box")))

allBoxes.forEach(pieceParent => 
    {pieceParent.addEventListener("click", 
                                    function(event){base_table.pieceActionsOnClick(event, player_top, player_bottom, current_user)}
                                    , true)})


