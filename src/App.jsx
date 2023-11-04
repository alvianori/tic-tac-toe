/* eslint-disable react/prop-types */
import "./App.css";
import { SimpleGrid } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <Button onClick={onClick} className="square" bgColor="#929292" _hover={{ bgColor: "#FF6600" }}>
      {value}
    </Button>
  );
}

function checkWinner(squaresValue) {
  const rules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < rules.length; i++) {
    const [a, b, c] = rules[i];
    if (squaresValue[a] && squaresValue[a] === squaresValue[b] && squaresValue[a] === squaresValue[c]) {
      return squaresValue[a];
    }
  }
  if (squaresValue.every((square) => square !== null)) {
    return "Draw";
  }
  return false;
}

function App() {
  const [squaresValue, setSquaresValue] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squaresValue[i] || checkWinner(squaresValue)) return;

    const nextSquares = squaresValue.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquaresValue(nextSquares);
    setXIsNext(!xIsNext);
  }
  function reset() {
    setSquaresValue(Array(9).fill(null));
  }

  const squares = squaresValue.map((value, i) => <Square key={i} value={value} onClick={() => handleClick(i)} />);
  const winner = checkWinner(squaresValue);
  let status = "";
  if (winner) {
    if (winner === "Draw") {
      status = "It's a draw!";
    } else {
      status = `The Winner is ${winner}`;
    }
  } else {
    status = `Next Turn is ${xIsNext ? "X" : "O"}`;
  }
  return (
    <>
      <div>
        <h1>Tic Tac Toe</h1>
        <SimpleGrid spacing="20px" boxShadow="md" p="6" rounded="md" bg="#2C2E30">
          <h2>{status}</h2>
          <SimpleGrid columns={[3, null, 3]} spacing="20px" p="6" rounded="md" bg="#2C2E30">
            {squares}
          </SimpleGrid>
          <SimpleGrid px="6" rounded="md" bg="#2C2E30">
            <Button onClick={() => reset()} _hover={{ bgColor: "#FF6600" }}>
              Reset
            </Button>
          </SimpleGrid>
        </SimpleGrid>
      </div>
    </>
  );
}

export default App;
