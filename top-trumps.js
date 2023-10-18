//creates 32 cards in an array (the deck)
const deck = [
    { name: "wolfman", str: 78, ff: 68, kp: 73, hr: 70 },
    { name: "the-beast", str: 87, ff: 77, kp: 82, hr: 98 },
    { name: "colossus", str: 90, ff: 80, kp: 87, hr: 71 },
    { name: "thor", str: 100, ff: 90, kp: 97, hr: 68 },
    { name: "slime-creature", str: 71, ff: 61, kp: 68, hr: 86 },
    { name: "living-skull", str: 68, ff: 58, kp: 63, hr: 89 },
    { name: "miss-vampire", str: 70, ff: 60, kp: 65, hr: 87 },
    { name: "frankenstein", str: 85, ff: 75, kp: 82, hr: 75 },
    { name: "alien", str: 68, ff: 58, kp: 65, hr: 97 },
    { name: "fire-demon", str: 71, ff: 61, kp: 66, hr: 77 },
    { name: "creature-lagoon", str: 76, ff: 66, kp: 73, hr: 79 },
    { name: "cyclops", str: 84, ff: 74, kp: 79, hr: 74 },
    { name: "zetan-priest", str: 94, ff: 84, kp: 91, hr: 95 },
    { name: "death", str: 99, ff: 89, kp: 95, hr: 100 },
    { name: "jailer", str: 69, ff: 59, kp: 66, hr: 69 },
    { name: "devil-priest", str: 92, ff: 82, kp: 89, hr: 92 },
    { name: "killer-rat", str: 70, ff: 60, kp: 67, hr: 79 },
    { name: "zoltan", str: 82, ff: 72, kp: 77, hr: 84 },
    { name: "lizard-man", str: 83, ff: 73, kp: 80, hr: 81 },
    { name: "martian-warrior", str: 80, ff: 70, kp: 75, hr: 72 },
    { name: "terror-of-the-deep", str: 77, ff: 67, kp: 72, hr: 77 },
    { name: "venusian-death-cell", str: 79, ff: 69, kp: 74, hr: 98 },
    { name: "the-mummy", str: 86, ff: 76, kp: 81, hr: 80 },
    { name: "the-fiend", str: 81, ff: 71, kp: 78, hr: 80 },
    { name: "talon", str: 72, ff: 62, kp: 67, hr: 76 },
    { name: "dr-syn", str: 73, ff: 63, kp: 68, hr: 73 },
    { name: "living-gargoyle", str: 72, ff: 62, kp: 69, hr: 85 },
    { name: "the-sorceror", str: 75, ff: 65, kp: 72, hr: 83 },
    { name: "diablo", str: 74, ff: 64, kp: 69, hr: 78 },
    { name: "hunchback-notre-dame", str: 75, ff: 65, kp: 72, hr: 68 },
    { name: "high-priestess-zoltan", str: 69, ff: 59, kp: 66, hr: 82 },
    { name: "creature-outer-space", str: 79, ff: 69, kp: 76, hr: 78 },
]

//shuffles the deck: Fisher Yates method, copied from W3 schools
for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = deck[i];
    deck[i] = deck[j];
    deck[j] = k;
}
console.log("Deck shuffled");

//creates (empty) hands for up to 4 players
const player1Hand = [];
const player2Hand = [];
const player3Hand = [];
const player4Hand = [];

/*establishes default no of players, sets player 1 to 
start, creates array to be used for cards in play. */
let noOfPlayers = 2;
let activePlayer = player1Hand;
let activeCards = [];
let winningPlayer = 0;

//requests number of players
function initiate() {
    /*js code for form and button approach, if used later
    document.getElementById("players").style.display = "block";
    document.getElementById("lbl").style.display = "block";
    document.getElementById("confirm").style.display = "block"; */
    let players = prompt("How many players (2, 3 or 4)?", 2);
    if (Number(players) > 1 && Number(players) < 5) {
        document.getElementById("start").style.display = "none";
        noOfPlayers = Number(players);
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
        console.log("Cards dealt");
        //start the game
        document.getElementById("head").style.display = "block";
        document.getElementById("cardDisplay").setAttribute("src", "/top-trumps/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
        document.getElementById("ps").style.display = "block";
        document.getElementById("ff").style.display = "block";
        document.getElementById("kp").style.display = "block";
        document.getElementById("hr").style.display = "block";
    }
    else {
        alert("Please enter a numeral from 2-4.");
        initiate();
    }
}

/*deals with a draw following compare () function
function draw(a, b, c, d) {
    const cards = [a, b, c, d];
    cards.sort(function(a, b){return b - a});
}*/

//compares value of cards, pushes all cards to winner
function compare(a = 0, b = 0, c = 0, d = 0) {
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
    console.log("Cards compared: winner " + winningPlayer);

    //    else draw(a, b, c, d);
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
    if (winningPlayer === 1) {
        for (i = 1; i <= noOfPlayers; i++) {
            player1Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else if (winningPlayer === 2) {
        for (i = 1; i <= noOfPlayers; i++) {
            player2Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else if (winningPlayer === 3) {
        for (i = 1; i <= noOfPlayers; i++) {
            player3Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }
    else if (winningPlayer === 4) {
        for (i = 1; i <= noOfPlayers; i++) {
            player4Hand.push(activeCards[0]);
            activeCards.splice(0, 1);
        }
    }

}




//run compare function based on active player's choice of category: 
// MORE EFFICIENT WAY TO DO THIS - BUTTONS ISOLATE CATEGORY AND 1 FUNCTION RUNS
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
    alert("Player " + winningPlayer + " wins!")
    cardPile();
    redistributeCards();
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
    cardPile();
    alert("Player " + winningPlayer + " wins!");
    redistributeCards();
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
    cardPile();
    alert("Player " + winningPlayer + " wins!")
    redistributeCards();
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
    cardPile();
    alert("Player " + winningPlayer + " wins!")
    redistributeCards();
    nextTurn();
}

//click to start
document.getElementById("start").addEventListener("click", initiate);