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

let matrix_collection = base_table.generateChessTable();

let boxes = matrix_collection[0]
let player_top_captures = matrix_collection[1]
let player_bottom_captures = matrix_collection[2]

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

let textMessage = $('<div/>');
textMessage.addClass("player-order")
$("body").append(textMessage)

if(player_top == 1){
    textMessage.html("It's player top's turn")
}
else{
    textMessage.html("It's player bottom's turn")

}


// // Possible moves

let allBoxes = Array.from($(".dark-box")).concat(Array.from($(".light-box")))

allBoxes.forEach(pieceParent => 
    {pieceParent.addEventListener("click", 
                                    function(event){base_table.pieceActionsOnClick(event, player_top, player_bottom, current_user)}
                                    , true)})


