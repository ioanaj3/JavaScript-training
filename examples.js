// Exercise 1 a
let a = function(a,b,c){
    let prod = a*b*c
    if (a>0 && b>0 && c>0 ) console.log("PLUS")
    else console.log("MINUS");
}
// Exercise 1 b
let a = function (weight){
    switch(weight){
        case 10: console.log("Surpise! It's a pen!"); break;
        case 200: console.log("Surpise! It's a cat!"); break;
        case 3000: console.log("Surpise! It's a dog!"); break;
        case 40000: console.log("Surpise! It's a horse!"); break;
        case 5000000: console.log("Surpise! It's a car!"); break;
        default: console.log("Surprise! It's a truckload of bunnies!"); break;
    }
}
// Exercise 2 a

let a = function(n){
    let sum = 0
    for(let i = 0 ; i<=n; i++){
        sum = sum + i
    }
    console.log("The sum of the first " + n + " numbers is " + sum)
}

// Exercise 2 b
function a(number){
    while(number < 10000){
        number = number * Math.random() * 10;
        console.log(number)
    }
}

// Exercise 3 a
let arr = []
for (let i=1; i<=50; i++){
    arr[i-1] = i
}
arr.push(89, 99, 120, 412, 124)

// Exercise 3 b
let removed = arr.pop()

// Exercise 4 a
let person = {age: 22, firstName:"Ioana", lastName:"Jitariu"}

// Exercise 5 a
// already done at 1 a

// Exercise 5 b
let arr = []
for (let i=1; i<=50; i++){
    arr[i-1] = i
}
arr.push(89, 99, 120, 412, 124)

for(let item in arr){
    if(item % 3 === 0) ;
    else 
        console.log(item)
}

// Exercise 6 a

class Human{
    constructor(fullName){
        this.fullName = fullName;
    }

    sayHello(){
        console.log("Hi, I'm " + this.fullName)
    }
}

let u = new Human("Ioana")
u.sayHello()
