// $.ajax({
//     method: "POST",
//     url: "https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game",
//     data:{name:"ioana-post-test-3"}
// }).done(
//     console.log("cool story bro")
// )

    // $.ajax({
    // method: "POST",
    // url: "https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game/137",
    // data:{reset:1}
            
    // }).done(
    // console.log("cool story bro")
    // )

        $.ajax({
    method: "POST",
    url: "https://chess.thrive-dev.bitstoneint.com/wp-json/chess-api/game/137" ,
    data:{move:{from: {x:6, y:2}, to:{x:4,y:2}}
            }
    }).done(
    console.log("cool story bro")
    )