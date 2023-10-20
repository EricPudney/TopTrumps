//creates 32 cards in an array (the deck)
const deck = [
    { name: "wolfman", str: 78, ff: 68, kp: 73, hr: 70 },
    { name: "the-beast", str: 78, ff: 77, kp: 82, hr: 98 },
    { name: "colossus", str: 78, ff: 80, kp: 87, hr: 71 },
    { name: "thor", str: 78, ff: 90, kp: 97, hr: 68 },
    { name: "slime-creature", str: 78, ff: 61, kp: 68, hr: 86 },
    { name: "living-skull", str: 78, ff: 58, kp: 63, hr: 89 },
    { name: "miss-vampire", str: 78, ff: 60, kp: 65, hr: 87 },
    { name: "frankenstein", str: 78, ff: 75, kp: 82, hr: 75 },
    { name: "alien", str: 78, ff: 58, kp: 65, hr: 97 },
    { name: "fire-demon", str: 78, ff: 61, kp: 66, hr: 77 },
    { name: "creature-lagoon", str: 77, ff: 66, kp: 73, hr: 79 },
    { name: "cyclops", str: 78, ff: 74, kp: 79, hr: 74 },
    { name: "zetan-priest", str: 78, ff: 84, kp: 91, hr: 95 },
    { name: "death", str: 78, ff: 89, kp: 95, hr: 100 },
    { name: "jailer", str: 78, ff: 59, kp: 66, hr: 69 },
    { name: "devil-priest", str: 78, ff: 82, kp: 89, hr: 92 },
    { name: "killer-rat", str: 78, ff: 60, kp: 67, hr: 79 },
    { name: "zoltan", str: 78, ff: 72, kp: 77, hr: 84 },
    { name: "lizard-man", str: 78, ff: 73, kp: 80, hr: 81 },
    { name: "martian-warrior", str: 78, ff: 70, kp: 75, hr: 72 },
    { name: "terror-of-the-deep", str: 78, ff: 67, kp: 72, hr: 77 },
    { name: "venusian-death-cell", str: 78, ff: 69, kp: 74, hr: 98 },
    { name: "the-mummy", str: 78, ff: 76, kp: 81, hr: 80 },
    { name: "the-fiend", str: 78, ff: 71, kp: 78, hr: 80 },
    { name: "talon", str: 78, ff: 62, kp: 67, hr: 76 },
    { name: "dr-syn", str: 78, ff: 63, kp: 68, hr: 73 },
    { name: "living-gargoyle", str: 77, ff: 62, kp: 69, hr: 85 },
    { name: "the-sorceror", str: 78, ff: 65, kp: 72, hr: 83 },
    { name: "diablo", str: 78, ff: 64, kp: 69, hr: 78 },
    { name: "hunchback-notre-dame", str: 78, ff: 65, kp: 72, hr: 68 },
    { name: "high-priestess-zoltan", str: 78, ff: 59, kp: 66, hr: 82 },
    { name: "creature-outer-space", str: 78, ff: 69, kp: 76, hr: 78 },
]

//shuffles the deck: Fisher Yates method, copied from W3 schools
for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = deck[i];
    deck[i] = deck[j];
    deck[j] = k;
}

//creates (empty) hands for up to 4 players, strings for names, default no of active players = 2
const player1Hand = [];
const player2Hand = [];
const player3Hand = [];
const player4Hand = [];
let player1 = "";
let player2 = "";
let player3 = "";
let player4 = "";
let p1isOut = false;
let p2isOut = false;
let p3isOut = true;
let p4isOut = true;

/*sets player 1 to start, creates array to be used for cards in play and 
'rollover' cards in case of a draw; sets default isDraw value to false */
let activePlayer = player1Hand;
const activeCards = [];
const rolloverCards = [];
let isDraw = false;
let winningPlayer = 0;
let noOfPlayers = 0;
let playersOut = 0;

//requests number of players when start button clicked
function initiate() {
    /*js code for form and button approach, if used later
    document.getElementById("players").style.display = "block";
    document.getElementById("lbl").style.display = "block";
    document.getElementById("confirm").style.display = "block"; */
    noOfPlayers = parseInt(prompt("How many players (2, 3 or 4)?"));
    //checks valid number of players entered and records player names
    if (noOfPlayers > 1 && noOfPlayers < 5) {
        document.getElementById("start").style.display = "none";
        player1 = prompt("Enter name of player 1");
        player2 = prompt("Enter name of player 2");
        if (noOfPlayers > 2) {
            player3 = prompt("Enter name of player 3");
            p3isOut = false;
        }
        if (noOfPlayers > 3) {
            player4 = prompt("Enter name of player 4");
            p4isOut = false;
        }
        //deals the cards to 2-4 players
        while (deck.length > 0) {
            player1Hand.push(deck.pop());
            if (deck.length === 0) { break; }
            player2Hand.push(deck.pop());
            if (deck.length === 0) { break; }
            if (noOfPlayers === 2) { continue; }
            player3Hand.push(deck.pop());
            if (deck.length === 0) { break; }
            if (noOfPlayers === 3) { continue; }
            player4Hand.push(deck.pop());
        };
        //starts the game
        document.getElementById("head").innerHTML = player1 + " to start! Choose a category.";
        document.getElementById("cardDisplay").setAttribute("src", "/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
        document.getElementById("ps").style.display = "block";
        document.getElementById("ff").style.display = "block";
        document.getElementById("kp").style.display = "block";
        document.getElementById("hr").style.display = "block";
    }
    else if (noOfPlayers !== null) {
        alert("Please enter a numeral from 2-4.");
        initiate();
    }
}

//deals with a draw following compare () function
function draw() {
    isDraw = true;
    cardPile();
    while (activeCards.length > 0) {
        rolloverCards.push(activeCards.pop());
    }
    switch (activePlayer) {
        case player1Hand:
            winningPlayer = 1;
            break;
        case player2Hand:
            winningPlayer = 2;
            break;
        case player3Hand:
            winningPlayer = 3;
            break;
        case player4Hand:
            winningPlayer = 4;
            break;
    }
    checkDefeat();
    nextTurn();
}

//compares value of cards, pushes all cards to winner
function compare(a, b, c, d) {
    console.log(a, b, c, d);
    const array = [a, b, c, d];
    array.sort(function (a, b) { return b - a });
    if (array[0] === array[1]) {
        draw();
    }
    else if (a > b && a > c && a > d) {
        winningPlayer = 1;
        alert(player1 + " wins!");
    }
    else if (b > a && b > c && b > d) {
        winningPlayer = 2;
        alert(player2 + " wins!");
    }
    else if (c > a && c > b && c > d) {
        winningPlayer = 3;
        alert(player3 + " wins!");
    }
    else if (d > a && d > b && d > c) {
        winningPlayer = 4;
        alert(player4 + " wins!");
    }
    else { console.log("Error in comparing values") }
}

/*fixes number of players once 'confirm' is clicked
function confirm() {
   const players = document.getElementById("players").value;
    return players;
}*/

//start new turn
function nextTurn() {
    if (winningPlayer === 1) {
        activePlayer = player1Hand;
        winningPlayer = 0;
        document.getElementById("head").innerHTML = player1 + "'s turn: choose a category.";
    }
    else if (winningPlayer === 2) {
        activePlayer = player2Hand;
        winningPlayer = 0;
        document.getElementById("head").innerHTML = player2 + "'s turn: choose a category.";
    }
    else if (winningPlayer === 3) {
        activePlayer = player3Hand;
        winningPlayer = 0;
        document.getElementById("head").innerHTML = player3 + "'s turn: choose a category.";
    }
    else if (winningPlayer === 4) {
        activePlayer = player4Hand;
        winningPlayer = 0;
        document.getElementById("head").innerHTML = player4 + "'s turn: choose a category.";
    }
    display();
}

// changes image - possibly expand later
function display() {
    document.getElementById("cardDisplay").setAttribute("src", "/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
}

//identifies active cards, removes them from player hands
function cardPile() {
    if (!p1isOut) {
        activeCards.push(player1Hand[0])
        player1Hand.splice(0, 1);
    }
    if (!p2isOut) {
        activeCards.push(player2Hand[0])
        player2Hand.splice(0, 1);
    }
    if (!p3isOut) {
        activeCards.push(player3Hand[0])
        player3Hand.splice(0, 1);
    }
    if (!p4isOut) {
        activeCards.push(player4Hand[0])
        player4Hand.splice(0, 1);
    }
    console.log(activeCards);
}

// pushes activeCards to winner 
function redistributeCards() {
    while (rolloverCards.length > 0) {
        activeCards.push(rolloverCards.pop());
    }

    if (winningPlayer === 1) {
        while (activeCards.length > 0) {
            player1Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else if (winningPlayer === 2) {
        while (activeCards.length > 0) {
            player2Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else if (winningPlayer === 3) {
        while (activeCards.length > 0) {
            player3Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else if (winningPlayer === 4) {
        while (activeCards.length > 0) {
            player4Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else { console.log("error - winning player value not 1-4.") }
}

//ends the game
function endGame(winner) {
    alert("The game is over. " + winner + " wins!");
    document.getElementById("head").style.display = "none";
    document.getElementById("cardDisplay").style.display = "none";
    document.getElementById("ps").style.display = "none";
    document.getElementById("ff").style.display = "none";
    document.getElementById("kp").style.display = "none";
    document.getElementById("hr").style.display = "none";
}

//check to see if any player is down to 0 cards / the game is over
function checkDefeat() {
    switch (noOfPlayers) {
        case 2:
            if (player1Hand.length === 0) {
                endGame(player2);
            }
            else if (player2Hand.length === 0) {
                endGame(player1);
            }
            break;
        case 3:
            if (player1Hand.length === 0 && p1isOut === false) {
                p1isOut = true;
                playersOut += 1;
                alert(player1 + " is out!");
            }
            if (player2Hand.length === 0 && p2isOut === false) {
                p2isOut = true;
                playersOut += 1;
                alert(player2 + " is out!");
            }
            if (player3Hand.length === 0 && p3isOut === false) {
                p3isOut = true;
                playersOut += 1;
                alert(player3 + " is out!");
            }
            if (playersOut === 2) {
                if (p1isOut === false) { endGame(player1); }
                else if (p2isOut === false) { endGame(player2); }
                else if (p3isOut === false) { endGame(player3); }
                else { console.log("Error in determining winner."); }
            }
            break;
        case 4:
            if (player1Hand.length === 0 && p1isOut === false) {
                p1isOut = true;
                playersOut += 1;
                alert(player1 + " is out!");
            }
            if (player2Hand.length === 0 && p2isOut === false) {
                p2isOut = true;
                playersOut += 1;
                alert(player2 + " is out!");

            }
            if (player3Hand.length === 0 && p3isOut === false) {
                p3isOut = true;
                playersOut += 1;
                alert(player3 + " is out!");

            }
            if (player4Hand.length === 0 && p4isOut === false) {
                p4isOut = true;
                playersOut += 1;
                alert(player4 + " is out!");

            }
            if (playersOut === 3) {
                if (p1isOut === false) { endGame(player1); }
                else if (p2isOut === false) { endGame(player2); }
                else if (p3isOut === false) { endGame(player3); }
                else if (p4isOut === false) { endGame(player4); }
                else { console.log("Error in determining winner."); }
            }
            break;
        default:
            console.log("Error - noOfPlayers issue");

    }

}

//makes buttons work
function psChosen() {
    getpsValues();
    completeTurn();
}

function ffChosen() {
    getffValues();
    completeTurn();
}

function kpChosen() {
    getkpValues();
    completeTurn();
}

function hrChosen() {
    gethrValues();
    completeTurn();
}

//cycles through remaining turn events
function completeTurn() {
    compare(val1, val2, val3, val4);
    if (isDraw === true) {
        isDraw = false;
        alert("It's a draw! Choose again.");
        return;
    }
    cardPile();
    redistributeCards();
    checkDefeat();
    nextTurn();
}

//click to start
document.getElementById("start").addEventListener("click", initiate);

//retrives values (HR) for compare function
function gethrValues() {
    const p1 = (player1Hand.length > 0) ? player1Hand[0].hr : 0;
    const p2 = (player2Hand.length > 0) ? player2Hand[0].hr : 0;
    const p3 = (player3Hand.length > 0) ? player3Hand[0].hr : 0;
    const p4 = (player4Hand.length > 0) ? player4Hand[0].hr : 0;
    console.log(p1, p2, p3, p4);
    val1 = p1;
    val2 = p2;
    val3 = p3;
    val4 = p4;
    console.log(val1, val2, val3, val4);
}

//retrives values (FF) for compare function
function getffValues() {
    const p1 = (player1Hand.length > 0) ? player1Hand[0].ff : 0;
    const p2 = (player2Hand.length > 0) ? player2Hand[0].ff : 0;
    const p3 = (player3Hand.length > 0) ? player3Hand[0].ff : 0;
    const p4 = (player4Hand.length > 0) ? player4Hand[0].ff : 0;
    console.log(p1, p2, p3, p4);
    val1 = p1;
    val2 = p2;
    val3 = p3;
    val4 = p4;
    console.log(val1, val2, val3, val4);
}

//retrives values (PS) for compare function
function getpsValues() {
    const p1 = (player1Hand.length > 0) ? player1Hand[0].str : 0;
    const p2 = (player2Hand.length > 0) ? player2Hand[0].str : 0;
    const p3 = (player3Hand.length > 0) ? player3Hand[0].str : 0;
    const p4 = (player4Hand.length > 0) ? player4Hand[0].str : 0;
    console.log(p1, p2, p3, p4);
    val1 = p1;
    val2 = p2;
    val3 = p3;
    val4 = p4;
    console.log(val1, val2, val3, val4);
}

//retrives values (KP) for compare function
function getkpValues() {
    const p1 = (player1Hand.length > 0) ? player1Hand[0].kp : 0;
    const p2 = (player2Hand.length > 0) ? player2Hand[0].kp : 0;
    const p3 = (player3Hand.length > 0) ? player3Hand[0].kp : 0;
    const p4 = (player4Hand.length > 0) ? player4Hand[0].kp : 0;
    console.log(p1, p2, p3, p4);
    val1 = p1;
    val2 = p2;
    val3 = p3;
    val4 = p4;
    console.log(val1, val2, val3, val4);
}


/*switch (noOfPlayers) {
    case 2:
        compare(player1Hand[0].score, player2Hand[0].score);
        break;
    case 3:
        if (playersOut === 1){
            if (p1isOut = true) {
                compare (null, player2Hand[0].score, player3Hand[0].score);
            }
            else if (p2isOut = true) {
                compare (player1Hand[0].score, null, player3Hand[0].score);
            }
            else if (p3isOut = true) {
                compare (player1Hand[0].score, player2Hand[0].score, null);
            }
            else {console.log("something went wrong with playersOut")}
        }
        else {compare(player1Hand[0].score, player2Hand[0].score, player3Hand[0].score);}
        break;
    case 4:
        switch (playersOut) {
            case 0: {
                compare(player1Hand[0].score, player2Hand[0].score, player3Hand[0].score, player4Hand[0].score);
                break;
            }
            case 1: {
                if (p1isOut = true){
                    compare(null, player2Hand[0].score, player3Hand[0].score, player4Hand[0].score);
                }
                else if (p2isOut = true) {
                    compare(player1Hand[0].score, null, player3Hand[0].score, player4Hand[0].score);
                }
                else if (p3isOut = true) {
                    compare(player1Hand[0].score, player2Hand[0].score, null, player4Hand[0].score);
                }
                else if (p4isOut = true) {
                    compare(player1Hand[0].score, player2Hand[0].score, player3Hand[0].score, null);
                }
                break;
            }
            case 2: {
                break;
            }
            default: {console.log("error in playersOut (4 players)");}
        }
        THIS CANNOT POSSIBLY BE A GOOD WAY OF DOING IT
        */
