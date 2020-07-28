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
// //         // else{
// //         //     document.getElementsByTagName('body')[0].removeChild(countdown_number)
// //         //     generateChessTable();
// //         // }
// //  }
// setTimeout(countdown,1000)

// Generate Chess Table
 generateChessTable()
//  generateChessTableSquares()
function generateChessTable(){
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

    
    // Populate top columns
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
    for(let i=0; i<8; i++){
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

    let table_parent = document.getElementsByClassName('table-container')[0]
    var boxes = []

    for(let j=1; j<=64;j++){
        boxes[j] = document.createElement('div');

        // boxes[j].innerHTML = "piesa"

        table_parent.appendChild(boxes[j])

        boxes[j].classList.add('box')

        if((j>=1 && j<=8) || (j>=17 && j<=24) || (j>=33 && j<=40) || (j>=49 && j<=56)){
            if (j%2 == 0)
                boxes[j].classList.add('dark-box')
            else
                boxes[j].classList.add('light-box')
        }
        else{
            if (j%2 != 0)
                boxes[j].classList.add('dark-box')
            else
                boxes[j].classList.add('light-box')
        }
    }
}





