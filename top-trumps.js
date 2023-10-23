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
    { name: "terror-of-the-deep", str: 77, ff: 67, kp: 72, hr: 72 },
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
function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = deck[i];
    deck[i] = deck[j];
    deck[j] = k;
}
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

//starts a new game after the old game ends
function reStart() {
    if (player1Hand.length > 0) {
            while (player1Hand.length > 0) {
            deck.push(player1Hand.pop());
        }
    }
    if (player2Hand.length > 0) {
        while (player2Hand.length > 0) {
            deck.push(player2Hand.pop());
        }
    }
    if (player3Hand.length > 0) {
        while (player3Hand.length > 0) {
            deck.push(player3Hand.pop());
        }
    }
    if (player4Hand.length > 0) {
        while (player4Hand.length > 0) {
            deck.push(player4Hand.pop());
        }
    }
    if (rolloverCards.length > 0) {
        while (rolloverCards.length > 0) {
            deck.push(rolloverCards.pop());
        }
    }
    activePlayer = player1Hand;
    p1isOut = false;
    p2isOut = false;
    p3isOut = true;
    p4isOut = true;
    isDraw = false;
    playersOut = 0;
    document.getElementById("end-msg").innerHTML = "";
    document.getElementById("head").style.display = "block";
    document.getElementById("cards").style.display = "grid";
    document.getElementById("ps").style.display = "block";
    document.getElementById("ff").style.display = "block";
    document.getElementById("kp").style.display = "block";
    document.getElementById("hr").style.display = "block";
    document.getElementById("new-game").style.display = "none";
    document.getElementById("button-holder").style.gridColumn = "2 / 3";
    document.getElementById("p2cards").setAttribute("src", "");
    document.getElementById("p3cards").setAttribute("src", "");
    document.getElementById("p4cards").setAttribute("src", "");
    initiate();
}

//requests number of players when start button clicked
function initiate() {
    /*js code for form and button approach, if used later
    document.getElementById("players").style.display = "block";
    document.getElementById("lbl").style.display = "block";
    document.getElementById("confirm").style.display = "block"; */
    input = prompt("How many players (2, 3 or 4)?");
    //checks valid number of players entered and records player names
    if (parseInt(input) > 1 && parseInt(input) < 5) {
        noOfPlayers = parseInt(input);
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
        //shuffles and deals the cards to 2-4 players
        shuffle();
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
        //adjusts grid depending on no of players
        if (noOfPlayers === 2) {
            document.getElementById("cards").style.gridTemplateColumns = "0.2fr 1fr 1fr 0.2fr";
        }
        else if (noOfPlayers === 3) {
            document.getElementById("cards").style.gridTemplateColumns = "0.2fr 1fr 1fr 1fr 0.2fr";
        }
        else if (noOfPlayers === 4) {
            document.getElementById("cards").style.gridTemplateColumns = "0.2fr 1fr 1fr 1fr 1fr 0.2fr";
        }
        //starts the game
        document.getElementById("head").innerHTML = player1 + " to start! Choose a category.";
        document.getElementById("p1cards").setAttribute("src", "/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
        document.getElementById("ps").style.display = "block";
        document.getElementById("ff").style.display = "block";
        document.getElementById("kp").style.display = "block";
        document.getElementById("hr").style.display = "block";
    }
    else if (input === null) {return;}
    else {
        alert("Please enter a numeral from 2-4.");
        initiate();
    }
}

//makes all players' cards visible
function displayCards() {
    switch (activePlayer) {
        case player1Hand:
            if (!p2isOut) {
                document.getElementById("p2cards").setAttribute("src", "/top-trumps-imgs/" + player2Hand[0].name + ".jpg");
            }
            if (!p3isOut) {
                document.getElementById("p3cards").setAttribute("src", "/top-trumps-imgs/" + player3Hand[0].name + ".jpg");
            }
            if (!p4isOut) {
                document.getElementById("p4cards").setAttribute("src", "/top-trumps-imgs/" + player4Hand[0].name + ".jpg");
            }
            break;
        case player2Hand:
            if (!p1isOut) {
                document.getElementById("p1cards").setAttribute("src", "/top-trumps-imgs/" + player1Hand[0].name + ".jpg");
            }
            if (!p3isOut) {
                document.getElementById("p3cards").setAttribute("src", "/top-trumps-imgs/" + player3Hand[0].name + ".jpg");
            }
            if (!p4isOut) {
                document.getElementById("p4cards").setAttribute("src", "/top-trumps-imgs/" + player4Hand[0].name + ".jpg");
            }
            break;
        case player3Hand:
            if (!p2isOut) {
                document.getElementById("p2cards").setAttribute("src", "/top-trumps-imgs/" + player2Hand[0].name + ".jpg");
            }
            if (!p1isOut) {
                document.getElementById("p1cards").setAttribute("src", "/top-trumps-imgs/" + player1Hand[0].name + ".jpg");
            }
            if (!p4isOut) {
                document.getElementById("p4cards").setAttribute("src", "/top-trumps-imgs/" + player4Hand[0].name + ".jpg");
            }
            break;
        case player4Hand:
            document.getElementById("button-holder").style.gridColumn = "5 / span 1";
            if (!p1isOut) {
                document.getElementById("p1cards").setAttribute("src", "/top-trumps-imgs/" + player1Hand[0].name + ".jpg");
            }
            if (!p2isOut) {
                document.getElementById("p2cards").setAttribute("src", "/top-trumps-imgs/" + player2Hand[0].name + ".jpg");
            }
            if (!p3isOut) {
                document.getElementById("p3cards").setAttribute("src", "/top-trumps-imgs/" + player3Hand[0].name + ".jpg");
            }
    }
}

//compares value of cards, creates continue button, hides selector buttons
function compare(a, b, c, d) {
    console.log(a, b, c, d);
    const array = [a, b, c, d];
    array.sort(function (a, b) { return b - a });
    if (array[0] === array[1]) {
        isDraw = true;
        document.getElementById("head").innerHTML = "It's a draw - choose again.";
    }
    else if (a > b && a > c && a > d) {
        winningPlayer = 1;
        document.getElementById("head").innerHTML = player1 + " wins!";
    }
    else if (b > a && b > c && b > d) {
        winningPlayer = 2;
        document.getElementById("head").innerHTML = player2 + " wins!";
    }
    else if (c > a && c > b && c > d) {
        winningPlayer = 3;
        document.getElementById("head").innerHTML = player3 + " wins!";
    }
    else if (d > a && d > b && d > c) {
        winningPlayer = 4;
        document.getElementById("head").innerHTML = player4 + " wins!";
    }
    else { console.log("Error in comparing values") }
    document.getElementById("cont-button").style.display = "block";
    document.getElementById("cont-button").innerText = "Continue";
    document.getElementById("cont-button").addEventListener("click", continueTurn);
    document.getElementById("button-holder").style.display = "none";
}

//deals with a draw following compare () function
function draw() {
    isDraw = false;
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

//start new turn
function nextTurn() {
    document.getElementById("cont-button").style.display = "none";
    document.getElementById("p1cards").setAttribute("src", "");
    document.getElementById("p2cards").setAttribute("src", "");
    document.getElementById("p3cards").setAttribute("src", "");
    document.getElementById("p4cards").setAttribute("src", "");
    if (winningPlayer === 1) {
        activePlayer = player1Hand;
        winningPlayer = 0;
        document.getElementById("head").innerHTML = player1 + "'s turn: choose a category.";
        document.getElementById("p1cards").setAttribute("src", "/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
        document.getElementById("button-holder").style.gridColumn = "2 / 3";
    }
    else if (winningPlayer === 2) {
        activePlayer = player2Hand;
        winningPlayer = 0;
        document.getElementById("head").innerHTML = player2 + "'s turn: choose a category.";
        document.getElementById("p2cards").setAttribute("src", "/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
        document.getElementById("button-holder").style.gridColumn = "3 / 4";
    }
    else if (winningPlayer === 3) {
        activePlayer = player3Hand;
        winningPlayer = 0;
        document.getElementById("head").innerHTML = player3 + "'s turn: choose a category.";
        document.getElementById("p3cards").setAttribute("src", "/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
        document.getElementById("button-holder").style.gridColumn = "4 / 5";
    }
    else if (winningPlayer === 4) {
        activePlayer = player4Hand;
        winningPlayer = 0;
        document.getElementById("head").innerHTML = player4 + "'s turn: choose a category.";
        document.getElementById("p4cards").setAttribute("src", "/top-trumps-imgs/" + activePlayer[0].name + ".jpg");
        document.getElementById("button-holder").style.gridColumn = "5 / 6";
    }
    document.getElementById("button-holder").style.display = "flex";
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

// pushes all rollover & active cards to winner 
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
    document.getElementById("head").style.display = "none";
    document.getElementById("cards").style.display = "none";
    document.getElementById("ps").style.display = "none";
    document.getElementById("ff").style.display = "none";
    document.getElementById("kp").style.display = "none";
    document.getElementById("hr").style.display = "none";
    document.getElementById("end-msg").innerHTML = winner + " obliterated the oppositon BRUTALLY.";
    document.getElementById("new-game").style.display = "block";
}

//check to see if any player is down to 0 cards and/or the game is over
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
        default: console.log("Error - noOfPlayers issue");
    }
}

//makes buttons work
function psChosen() {
    getpsValues();
    turnResult();
}

function ffChosen() {
    getffValues();
    turnResult();
}

function kpChosen() {
    getkpValues();
    turnResult();
}

function hrChosen() {
    gethrValues();
    turnResult();
}

//completes turn after 'continue' button clicked
function continueTurn() {
    if (isDraw === true) {
        draw();
    }
    else {
        cardPile();
        redistributeCards();
        checkDefeat();
        nextTurn();
    }
}

//cycles through remaining turn events
function turnResult() {
    displayCards();
    compare(val1, val2, val3, val4);
}

//click to start
document.getElementById("start").addEventListener("click", initiate);

//click to play again
document.getElementById("new-game").addEventListener("click", reStart);

//retrieves values (HR) for compare function
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

//retrieves values (FF) for compare function
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

//retrieves values (PS) for compare function
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

//retrieves values (KP) for compare function
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