
let $countdown_number = $('<span/>');
$countdown_number.text("5")
                 .attr('id', "counter-number")
                 .appendTo($("body"))


let newNumber = parseInt($countdown_number.text())
function countdown(){   
        newNumber = newNumber - 1;
        $countdown_number.text(newNumber);
        if (newNumber > 0) 
            setTimeout(countdown,500);
        else{
            $countdown_number.remove()
            let base_table = new ChessTable()

        }
 }
setTimeout(countdown,500)

