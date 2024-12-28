// Let's create factory for players just for the goal of projects
function createPlayer(name, marker) {
  return {
    name,
    marker,
  };
}
//Let the players play turn by turn
let turn = 0;
// Created Two Player Objects
const PlayerOne = createPlayer("Player1", "X");
const PlayerTwo = createPlayer("Player2", "O");
console.table(PlayerOne);
console.table(PlayerTwo);

//Let's create 3*3 array for checking winning conditions
let Winning_Conditions = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

//Creating the row and column index for our box like array so that it will be easy for us for pushing it in array
const give_index = document.querySelectorAll(".board");
let r = 0,
  c = 0;
give_index.forEach((board) => {
  board.setAttribute("row", r);
  board.setAttribute("col", c);
  c++;
  if (c == 3) {
    r++;
    c = 0;
  }
});
//This is to find winning condition with the help of marker
function find_marker(marker) {
  const body = document.querySelector(".main");
  if (marker === "X") {
    console.log("Player1 wo");
    body.style.pointerEvents = "none";
    return "Player1 won";
  } else if (marker === "O") {
    console.log("Player2 won");
    body.style.pointerEvents = "none";
    return "Player2 won";
  }
}

//We have finished some basic stuff now let's move to complete the game
const gameboard = (function () {
    let counter = 0;
    const fillMarker = (board, marker) => {
        let row_board = board.getAttribute('row');
        let col_board = board.getAttribute('col');
        Winning_Conditions[row_board][col_board] = marker
        board.textContent = marker;
        board.style.pointerEvents = 'none'
    }
    const findWinner = (array, marker) => {
        if (array[0][0] === marker && array[0][1] === marker && array[0][2] === marker) {
            find_marker(marker)
            counter++
            return find_marker(marker)

        }
        else if (array[1][0] === marker && array[1][1] === marker && array[1][2] === marker) {
            find_marker(marker)
            counter++
            return find_marker(marker)

        }
        else if (array[2][0] === marker && array[2][1] === marker && array[2][2] === marker) {
            find_marker(marker)
            counter++
            return find_marker(marker)

        }
        else if (array[0][0] === marker && array[1][0] === marker && array[2][0] === marker) {
            find_marker(marker)
            counter++
            return find_marker(marker)

        }
        else if (array[0][1] === marker && array[1][1] === marker && array[2][1] === marker) {
            find_marker(marker)
            counter++
            return find_marker(marker)

        }
        else if (array[0][2] === marker && array[1][2] === marker && array[2][2] === marker) {
            find_marker(marker)
            counter++
            return find_marker(marker)

        }
        else if (array[0][0] === marker && array[1][1] === marker && array[2][2] === marker) {
            find_marker(marker)
            counter++
            return find_marker(marker)
        }
        else if (array[0][2] === marker && array[1][1] === marker && array[2][0] === marker) {
            find_marker(marker)
            counter++
            return find_marker(marker)
        }

    }
       function reset() {
        Winning_Conditions = [['', '', ''],
        ['', '', ''],
        ['', '', '']
        ]
          give_index.forEach((box) => {
            box.style.pointerEvents = 'auto'
            box.textContent = ''
        })
        turn = 0
        const result = document.querySelector('h3')
        result.remove()
    }

    return { fillMarker, findWinner,reset }
  function reset() {
    Winning_Conditions = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    give_index.forEach((box) => {
      box.style.pointerEvents = "auto";
      box.textContent = "";
    });
    turn = 0;
    const result = document.querySelector("h3");
    result.remove();
  }

})();
const body = document.querySelector("body");

const boards = document.querySelectorAll(".board");
boards.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.textContent) {
      if (turn % 2 === 0) {
        gameboard.fillMarker(box, PlayerOne.marker);
        box.classList.add("X");
        box.classList.remove('O')
      } else {
        gameboard.fillMarker(box, PlayerTwo.marker);
        box.classList.add("O");
        box.classList.remove("X")
      }
    } else alert('Already filled')
    let nga = gameboard.findWinner(Winning_Conditions, "X");
    let gga = gameboard.findWinner(Winning_Conditions, "O");
    if (nga) {
      showWinner(nga);
      console.log(nga);
    } else if (gga) {
      showWinner(gga);
      console.log(gga);
    } else if (turn === 8 && !nga && !gga) {
      showWinner("draw");
    }
    turn++;
  });
});
function showWinner(nga) {
  const winner_div = document.createElement("h3");
  winner_div.textContent = nga;
  give_index.forEach((box) => {
    box.style.pointerEvents = "none";
  });
  body.appendChild(winner_div);
}
document.querySelector(".reset").addEventListener("click", () => {
  gameboard.reset();
});

