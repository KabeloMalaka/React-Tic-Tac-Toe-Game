import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  // const [hasWinner, setHasWinnenr] = useState(false); \\ Just derive winner from gameTurns to limit states
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(innerArr => [...innerArr])];
  // let gameBoard = JSON.parse(JSON.stringify(initialGameBoard));
  let winner = null;
  
  for(const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }

  console.log('GameBoard', gameBoard)
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
    console.log('Goes in once', firstSymbol, secondSymbol, thirdSymbol)

    if(firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol) {
        console.log("Winner", firstSymbol)
        winner = players[firstSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prePlayers => {
      return {
        ...prePlayers,
        [symbol]: newName
      };
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange} />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange} />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}

        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  )
}

export default App
