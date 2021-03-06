// VARIABLES
let count = 0;
let selectedPrimes = [];
const lookupPrimes = [ 2,  3,  5,  7, 11, 13, 17, 19,
    23, 29, 31, 37, 41, 43, 47, 53,
    59, 61, 67, 71, 73, 79, 83, 89, 97 ]


// BUTTONS & EVENTS
let playGame = document.getElementById("game");
let squares = document.querySelectorAll("td");
let clicks = document.getElementById('game-board')
let btn = document.getElementById("btnPlay");
btn.addEventListener("click", init);

const roundOne = {
    isPrimeSet: [],
    isNotPrimeSet: [],
    boardPrimes: [],
    boardNotPrimes: [],
    boardComplete: [],
    checkPrime: function(x) {
        for (i = 2; i < x; i++) {  
            if (x % i === 0) {  
                return false;
            } 
        }
        return true;
    },
    rOneGenerateNum: function() {
        for (let j = 2; j <= 25; j++) {
            if (this.checkPrime(j) === true) {
                this.isPrimeSet.push(j);
            } else {
                this.isNotPrimeSet.push(j);
            }
        }
    },
    assignNum: function() {
        for (let i = 0; i < 5; i++) {
            let x = Math.floor(Math.random() * this.isPrimeSet.length);
            this.boardPrimes.push(this.isPrimeSet[x]);
            this.isPrimeSet.splice(x, 1);
        }
        for (let j = 0; j < 11; j++) {
            let y = Math.floor(Math.random() * this.isNotPrimeSet.length);
            this.boardNotPrimes.push(this.isNotPrimeSet[y])
            this.isNotPrimeSet.splice(y, 1);
        }
        this.boardComplete = this.boardNotPrimes.concat(this.boardPrimes);
        this.boardComplete.sort(this.sortfunc);  
    },
    sortfunc: function(a, b) {
        return 0.5 - Math.random();
    },
    fillBoard: function() {
        for (let i = 0; i < 16; i++) {
            document.getElementById(`sq${i}`).innerText = this.boardComplete[i]; 
            document.getElementById(`sq${i}`).setAttribute('value', this.boardComplete[i]);
        }
    } 
}

const roundTwo = {
    isPrimeSet: [],
    isNotPrimeSet: [],
    boardPrimes: [],
    boardNotPrimes: [],
    boardComplete: [],
    checkPrime: function(x) {
        for (i = 2; i < x; i++) {  
            if (x % i === 0) {  
                return false;
            } 
        }
        return true;
    },
    generateNum: function() {   // different for each round
        for (let j = 2; j <= 50; j++) {
            if (this.checkPrime(j) === true) {
                this.isPrimeSet.push(j);
            } else {
                this.isNotPrimeSet.push(j);
            }
        }
    },
    assignNum: function() {   
        for (let i = 0; i < 6; i++) {
            let x = Math.floor(Math.random() * this.isPrimeSet.length);
            this.boardPrimes.push(this.isPrimeSet[x]);
            this.isPrimeSet.splice(x, 1);
        }
        for (let j = 0; j < 10; j++) {
            let y = Math.floor(Math.random() * this.isNotPrimeSet.length);
            this.boardNotPrimes.push(this.isNotPrimeSet[y])
            this.isNotPrimeSet.splice(y, 1);
        }
        this.boardComplete = this.boardNotPrimes.concat(this.boardPrimes);
        this.boardComplete.sort(this.sortfunc);  
    },
    sortfunc: function(a, b) {
        return 0.5 - Math.random();
    },
    fillBoard: function() {
        for (let i = 0; i < 16; i++) {
            document.getElementById(`sq${i}`).innerText = this.boardComplete[i]; 
            document.getElementById(`sq${i}`).setAttribute('value', `${this.boardComplete[i]}`);
        }
    }
}

const roundThree = {
    isPrimeSet: [],
    isNotPrimeSet: [],
    boardPrimes: [],
    boardNotPrimes: [],
    boardComplete: [],
    checkPrime: function(x) {
        for (i = 2; i < x; i++) {  
            if (x % i === 0) {  
                return false;
            } 
        }
        return true;
    },
    generateNum: function() {  // different for each round
        for (let j = 2; j <= 100; j++) {
            if (this.checkPrime(j) === true) {
                this.isPrimeSet.push(j);
            } else {
                this.isNotPrimeSet.push(j);
            }
        }
    },
    assignNum: function() {  
        for (let i = 0; i < 7; i++) {
            let x = Math.floor(Math.random() * this.isPrimeSet.length);
            this.boardPrimes.push(this.isPrimeSet[x]);
            this.isPrimeSet.splice(x, 1);
        }
        for (let j = 0; j < 9; j++) {
            let y = Math.floor(Math.random() * this.isNotPrimeSet.length);
            this.boardNotPrimes.push(this.isNotPrimeSet[y])
            this.isNotPrimeSet.splice(y, 1);
        }
        this.boardComplete = this.boardNotPrimes.concat(this.boardPrimes);
        this.boardComplete.sort(this.sortfunc);  
    },
    sortfunc: function(a, b) {
        return 0.5 - Math.random();
    },
    fillBoard: function() {
        for (let i = 0; i < 16; i++) {
            document.getElementById(`sq${i}`).innerText = this.boardComplete[i]; 
            document.getElementById(`sq${i}`).setAttribute('value', `${this.boardComplete[i]}`);
        }
    }
}

// ---------->   RUN FULL GAME HERE   <-----------

function init() {   //must select 5 primes to continue
    playGame.style.display = (playGame.dataset.toggled ^= 1) ? "block" : "none";;
    document.getElementById("page0").remove();
    roundOne.rOneGenerateNum();
    roundOne.assignNum();
    roundOne.fillBoard();
    checkForPrime();
}

function nxtRound() {  //must select all 6 primes to continue
    resetBoard();
    roundTwo.generateNum();
    roundTwo.assignNum();
    roundTwo.fillBoard();
}

function finalRound() {   //must select all 7 primes to continue
    resetBoard();
    roundThree.generateNum();
    roundThree.assignNum();
    roundThree.fillBoard();
}

// FUNCTIONS
function checkForPrime() {
    clicks.addEventListener('click', function (event){
        // console.log(event.target)
        // console.log(event.target.getAttribute('value'))
        if (!selectedPrimes.includes(event.target.getAttribute('value'))) {
            if(lookupPrimes.includes(parseInt(event.target.getAttribute('value')))) {
                selectedPrimes.push(event.target.getAttribute('value'));
                console.log(selectedPrimes);
                count++ ; 
                event.target.style.background = "lightgrey";
                event.target.style.cursor = 'not-allowed';
                win();
            } else {
                    alert("You selected a number that is not prime. Game over!")
                    location.reload();
            }  
        }  
        
    })
}

function win() {
    if (count === 5) {
        alert("Nice! Click OK to move on to the next round.");
        selectedPrimes = [];
        // document.querySelector('td').style.background = "azure";
        nxtRound();
    } else if (count === 11) {
        alert("Awesome! Moving on to the final round!")
        selectedPrimes = [];
        finalRound();
    } else if (count === 18) {
        alert("Congrats! You've won!")
        location.reload()
    }
}

function resetBoard() {
   let tableEls = document.querySelectorAll('td');
   console.log(tableEls);
   for (let i = 0; i < tableEls.length; i++) {
       tableEls[i].style.background = 'azure';
       tableEls[i].style.cursor = "pointer";
   }
}


//BLOCKERS:
// 1.. how to make this DRY?  == weekend project?

// const game = {
//     isPrimeSet: [],
//     isNotPrimeSet: [],
//     boardPrimes: [],
//     boardNotPrimes: [],
//     boardComplete: [],
//     checkPrime: function(x) {
//         for (i = 2; i < x; i++) {  
//             if (x % i === 0) {  
//                 return false;
//             } 
//         }
//         return true;
//     },
//     assignNum: function() { 
//         for (let i = 0; i < 5; i++) {
//             let x = Math.floor(Math.random() * this.isPrimeSet.length);
//             this.boardPrimes.push(this.isPrimeSet[x]);
//             this.isPrimeSet.splice(x, 1);
//         }
//         for (let j = 0; j < 11; j++) {
//             let y = Math.floor(Math.random() * this.isNotPrimeSet.length);
//             this.boardNotPrimes.push(this.isNotPrimeSet[y])
//             this.isNotPrimeSet.splice(y, 1);
//         }
//         this.boardComplete = this.boardNotPrimes.concat(this.boardPrimes);
//         this.boardComplete.sort(this.sortfunc);  
//     },
//     sortfunc: function(a, b) {
//         return 0.5 - Math.random();
//     },
//     fillBoard: function() {
//         for (let i = 0; i < 16; i++) {
//             document.getElementById(`sq${i}`).innerText = this.boardComplete[i]; 
//             document.getElementById(`sq${i}`).setAttribute('value', this.boardComplete[i]);
//         }
//     }, 
//     startPlay: function (num) {
//         if (num === 0) {
//             roundOne.rOneGenerateNum();
//             this.assignNum();
//             this.fillBoard();
//             checkForPrime();
//         } else if (num === 1) {
//             roundTwo.generateNum();
//             this.assignNum();
//             this.fillBoard();
//         } else {
//             roundThree.assignNum();
//             this.assignNum();
//             this.fillBoard();
//         };
//     },

// }
// game.startPlay(0);
// ????????????????????????????????????????????????????????????????????????????????????????????