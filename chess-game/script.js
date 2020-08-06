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

// $.ajax({
//     method: "POST",
//     url: "https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game",
//     data:{name:"ioana-post-2"}
// }).done(
//     console.log("cool story bro")
// )

// function makeMove(game_ID, from_x, from_y, to_x, to_y){

//     $.ajax({
//     method: "POST",
//     url: "https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game/" + game_ID,
//     data:{move:{from: {x:from_x, y:from_y}, to:{x:to_x,y:to_y}}
//             }
//     }).done(
//     console.log("cool story bro")
//     )

// }

// function getMoves(game_ID){
//     $.ajax({
//         method: "GET",
//         url: "https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game/" + game_ID,
//         }).done( response => {
//             console.log(response.moves.length)
//             response.moves.forEach(move => {
//                 console.log("move from x " + move.from.x)
//                 console.log("move from y " + move.from.y)
//                 console.log("move to x " + move.to.x)
//                 console.log("move to y " + move.to.y)
//             });
//         })
//     }


// getMoves(54)

