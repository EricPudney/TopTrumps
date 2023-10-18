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

//creates (empty) hands for up to 4 players
const player1Hand = [];
const player2Hand = [];
const player3Hand = [];
const player4Hand = [];
let player1 = "";
let player2 = "";
let player3 = "";
let player4 = "";


/*establishes no of players, sets player 1 to start, creates array to be used for cards in play 
and 'rollover' cards in case of a draw; sets default isDraw value to false */
let activePlayer = player1Hand;
const activeCards = [];
const rolloverCards = [];
let isDraw = false;
let winningPlayer = 0;
let noOfPlayers = 0;

//requests number of players
function initiate() {
    /*js code for form and button approach, if used later
    document.getElementById("players").style.display = "block";
    document.getElementById("lbl").style.display = "block";
    document.getElementById("confirm").style.display = "block"; */
    noOfPlayers = Number(prompt("How many players (2, 3 or 4)?"));
//checks valid number of players entered and records player names
    if (noOfPlayers > 1 && noOfPlayers < 5) {
        document.getElementById("start").style.display = "none";
        player1 = prompt("Enter name of player 1");
        player2 = prompt("Enter name of player 2");
        if (noOfPlayers > 2) {
            player3 = prompt("Enter name of player 3");
        }
        if (noOfPlayers > 3) {
            player4 = prompt("Enter name of player 4");
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
        document.getElementById("head").style.display = "block";
        document.getElementById("cardDisplay").setAttribute("src", "/top-trumps/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
        document.getElementById("ps").style.display = "block";
        document.getElementById("ff").style.display = "block";
        document.getElementById("kp").style.display = "block";
        document.getElementById("hr").style.display = "block";
        alert(player1 + " to start!");
    }
    else {
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
function compare(a = null, b = null, c = null, d = null) {
    if (a > b && a > c && a > d) {
        winningPlayer = 1;
    }
    else if (b > a && b > c && b > d) {
        winningPlayer = 2;
    }
    else if (c > a && c > b && c > d) {
        winningPlayer = 3;
    }
    else if (d > a && d > b && d > c) {
        winningPlayer = 4;
    }
    else { draw() };
    console.log("winning player (0 = draw): " + winningPlayer);
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
    }
    else if (winningPlayer === 2) {
        activePlayer = player2Hand;
        winningPlayer = 0;
    }
    else if (winningPlayer === 3) {
        activePlayer = player3Hand;
        winningPlayer = 0;
    }
    else if (winningPlayer === 4) {
        activePlayer = player4Hand;
        winningPlayer = 0;
    }
    else { console.log("Error") }
    display();
}

// currently identical to codeblock which starts game - better solution?
function display() {
    document.getElementById("head").style.display = "block";
    document.getElementById("cardDisplay").setAttribute("src", "/top-trumps/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
    document.getElementById("ps").style.display = "block";
    document.getElementById("ff").style.display = "block";
    document.getElementById("kp").style.display = "block";
    document.getElementById("hr").style.display = "block";
}


//identifies active cards, removes them from player hands
function cardPile() {
    activeCards.push(player1Hand[0])
    player1Hand.splice(0, 1);
    activeCards.push(player2Hand[0])
    player2Hand.splice(0, 1);
    console.log(activeCards);
    if (noOfPlayers === 3) {
        activeCards.push(player3Hand[0])
        player3Hand.splice(0, 1);
        console.log(activeCards);
    }
    else if (noOfPlayers === 4) {
        activeCards.push(player3Hand[0])
        player3Hand.splice(0, 1);
        activeCards.push(player4Hand[0])
        player4Hand.splice(0, 1);
        console.log(activeCards);
    }
}

// pushes activeCards to winner 
function redistributeCards() {
    while (rolloverCards.length > 0) {
        activeCards.push(rolloverCards.pop());
    }
    
    if (winningPlayer === 1) {
        for (i = 0; i <= activeCards.length; i++) {
            player1Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else if (winningPlayer === 2) {
        for (i = 0; i <= activeCards.length; i++) {
            player2Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else if (winningPlayer === 3) {
        for (i = 0; i <= activeCards.length; i++) {
            player3Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else if (winningPlayer === 4) {
        for (i = 0; i <= activeCards.length; i++) {
            player4Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
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

//check to see if any player is down to 0 cards: works for 1p games
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
        //  case 3:

        //  case 4:

    }

}

//run compare function based on active player's choice of category: 
// MORE EFFICIENT WAY TO DO THIS - BUTTONS ISOLATE CATEGORY AND 1 FUNCTION RUNS??
function psChosen() {
    switch (noOfPlayers) {
        case 2:
            compare(player1Hand[0].str, player2Hand[0].str);
            break;
        case 3:
            compare(player1Hand[0].str, player2Hand[0].str, player3Hand[0].str);
            break;
        case 4:
            compare(player1Hand[0].str, player2Hand[0].str, player3Hand[0].str, player4Hand[0].str);
            break;
    }
    if (isDraw = true) {
        isDraw = false;
        return;
    }
    alert("Player " + winningPlayer + " wins!")
    cardPile();
    redistributeCards();
    checkDefeat();
    nextTurn();
}

function ffChosen() {
    switch (noOfPlayers) {
        case 2:
            compare(player1Hand[0].ff, player2Hand[0].ff);
            break;
        case 3:
            compare(player1Hand[0].ff, player2Hand[0].ff, player3Hand[0].ff);
            break;
        case 4:
            compare(player1Hand[0].ff, player2Hand[0].ff, player3Hand[0].ff, player4Hand[0].ff);
            break;
    }
    if (isDraw = true) {
        isDraw = false;
        return;
    }
    cardPile();
    alert("Player " + winningPlayer + " wins!");
    redistributeCards();
    checkDefeat();
    nextTurn();
}

function kpChosen() {
    switch (noOfPlayers) {
        case 2:
            compare(player1Hand[0].kp, player2Hand[0].kp);
            break;
        case 3:
            compare(player1Hand[0].kp, player2Hand[0].kp, player3Hand[0].kp);
            break;
        case 4:
            compare(player1Hand[0].kp, player2Hand[0].kp, player3Hand[0].kp, player4Hand[0].kp);
            break;
    }
    if (isDraw = true) {
        isDraw = false;
        return;
    }
    cardPile();
    alert("Player " + winningPlayer + " wins!")
    redistributeCards();
    checkDefeat();
    nextTurn();
}

function hrChosen() {
    switch (noOfPlayers) {
        case 2:
            compare(player1Hand[0].hr, player2Hand[0].hr);
            break;
        case 3:
            compare(player1Hand[0].hr, player2Hand[0].hr, player3Hand[0].hr);
            break;
        case 4:
            compare(player1Hand[0].hr, player2Hand[0].hr, player3Hand[0].hr, player4Hand[0].hr);
            break;
        default:
            console.log("error - noOfPlayers not working");
    }
    if (isDraw === true) {
        isDraw = false;
        return;
    }
    cardPile();
    alert("Player " + winningPlayer + " wins!")
    redistributeCards();
    checkDefeat();
    nextTurn();
}

//click to start
document.getElementById("start").addEventListener("click", initiate);