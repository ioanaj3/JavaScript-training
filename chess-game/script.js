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

// Generate Chess Table
//  generateChessTable()

//  function generateChessTable(){
// Create parent div 
let chess_table = document.createElement('div');
document.getElementsByTagName('body')[0].appendChild(chess_table);
chess_table.classList.add("chess-table")

// Top container - create
let top_container = document.createElement('div');
document.getElementsByClassName('chess-table')[0].appendChild(top_container);
top_container.classList.add("top-container")

// Left container - create
let left_container = document.createElement('div');
document.getElementsByClassName('chess-table')[0].appendChild(left_container);
left_container.classList.add("left-container")

// Right container - create
let right_container = document.createElement('div');
document.getElementsByClassName('chess-table')[0].appendChild(right_container);
right_container.classList.add("right-container")

// Bottom container - create
let bottom_container = document.createElement('div');
document.getElementsByClassName('chess-table')[0].appendChild(bottom_container);
bottom_container.classList.add("bottom-container")

// Table container - create
let table_container = document.createElement('div');
// table_container.innerHTML = "terog"
document.getElementsByClassName('chess-table')[0].appendChild(table_container);
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
var boxes = []

for (let j = 1; j <= 64; j++) {
    boxes[j] = document.createElement('div');

    table_parent.appendChild(boxes[j])

    boxes[j].classList.add('box')

    boxes[j].setAttribute('data-i', Math.floor(j / 8));
    boxes[j].setAttribute('data-j', j % 8);

    if ((j >= 1 && j <= 8) || (j >= 17 && j <= 24) || (j >= 33 && j <= 40) || (j >= 49 && j <= 56)) {
        if (j % 2 == 0)
            boxes[j].classList.add('dark-box')
        else
            boxes[j].classList.add('light-box')
    }
    else {
        if (j % 2 != 0)
            boxes[j].classList.add('dark-box')
        else
            boxes[j].classList.add('light-box')
    }
}
// }




// Import images
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
whitePiecesImages[9].classList.add("white-pawn-9");

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



// Create black and white pieces
let whitePieces = []
let blackPieces = []
for (let i = 1; i <= 16; i++) {
    whitePieces[i] = new chessPiece(0, 0, whitePiecesImages[i], "white");
    blackPieces[i] = new chessPiece(0, 0, blackPiecesImages[i], "black");
}
whitePieces[9] = new Pawn(0, 0, whitePiecesImages[9], "white")


// Assign place for each chess piece, according to the user it has

let player_top, player_bottom, player_top_pieces, player_bottom_pieces
if (Math.random() * 10 % 2 == 0) {
    player_top = 1
    player_top_pieces = whitePieces;
    player_bottom = 2
    player_bottom_pieces = blackPieces.reverse();
}
else {
    player_top = 2
    player_top_pieces = blackPieces;
    player_bottom = 1
    player_bottom_pieces = whitePieces.reverse();

}

for (let i = 1; i <= 64; i++) {
    if (i <= 8) {
        player_top_pieces[i].row = 1;
        player_top_pieces[i].column = i;
        parent = boxes[(player_top_pieces[i].row - 1) * 8 + player_top_pieces[i].column]
        parent.appendChild(player_top_pieces[i].img)

    }
    else if (i <= 16) {
        player_top_pieces[i].row = 2;
        player_top_pieces[i].column = i - 8;
        parent = boxes[(player_top_pieces[i].row - 1) * 8 + player_top_pieces[i].column]
        parent.appendChild(player_top_pieces[i].img)
    }

    else if (i >= 49 && i < 57) {
        player_bottom_pieces[i - 49].row = 7;
        player_bottom_pieces[i - 49].column = i - 48;
        parent = boxes[(player_bottom_pieces[i - 49].row - 1) * 8 + player_bottom_pieces[i - 49].column]
        parent.appendChild(player_bottom_pieces[i - 49].img)
    }
    else if (i >= 57) {
        player_bottom_pieces[i - 49].row = 8;
        player_bottom_pieces[i - 49].column = i - 56
        parent = boxes[(player_bottom_pieces[i - 49].row - 1) * 8 + player_bottom_pieces[i - 49].column]
        parent.appendChild(player_bottom_pieces[i - 49].img)
    }
}

const initialState = [
    ['R', 'H', 'WB'],
    ['P', 'P'],
    ['', '', '', '']
];


// Possible moves

// let current_piece

let pawns = Array.from(document.getElementsByClassName("pawn"));
console.log(pawns)
pawns.forEach(element => {
    parent = element.parentElement;
    parent.addEventListener("click", function (event) {
        console.log(this.dataset.i)
        console.log(this.dataset.j)
        movePawns(element)
    }, true);
})

function movePawns(elem) {
    //     // let classes = pawn.classList
    //     // console.log(classes)
    //     //momentan, doar functionalitatea de move
    // //    genericPawn.number_of_moves ++;
    // //    console.log(genericPawn.number_of_moves)

    //     // for(let i=0; i<length(moves); i++){
    //     //     if(moves[i] == "top-2"){
    //     //         parent = 
    //     //         // if pozitie initiala
    //     //         // if niciun elem in fata
    //     //     }
    //     // }
    // console.log(elem)
    console.log("hai")
}







