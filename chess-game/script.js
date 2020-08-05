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

$.ajax({
    method: "POST",
    url: "https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game",
    data:{name:"ioana-post-2"}
}).done(
    console.log("cool story bro")
)



