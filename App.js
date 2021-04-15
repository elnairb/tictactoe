/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import Square from './components/square';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const counter = useRef(0)
  const[xCount,setXCount] = useState(1)
  const[oCount,setOCount] = useState(1)
  const[board, setBoard] = useState(["","","","","","","","",""]);
  const[player, setPlayer] = useState("O")
  const[result, setResult] = useState({winner: "none", status: null});

  const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];


  const chosenSquare = (square) => {

    setBoard(board.map((value,index) => {
      if (index === square && value === ""){
        return player
      }
      return value;
    }))
  };

  const checkTie = () => {
    let tie = true
    board.forEach((square) => {
      if (square == ""){
        tie = false
      }
    }); 
    if (tie){
      setResult({winner: "none", status: "tie"})
    }
  };

  const checkWin = () => {
    winningCombinations.forEach((currentMoves) => {
      const playerOne = board[currentMoves[0]];
      if (playerOne == "") return;
      let foundWinner = true;
      currentMoves.forEach((index) => {
        if (board[index] != playerOne){
          foundWinner = false;
        }
      });

      if (foundWinner){
        setResult({winner: player, status:"won"});
      }
    });
  };

  const addX = () => {
    setXCount(xCount + 1)
  }

  const addO = () => {
    setOCount(oCount + 1)
  }

  const newGame = () => {
    setBoard(["","","","","","","","",""]);
    setPlayer("O");
  }

  useEffect(() => {
    console.log("App mounted");
    return async() => {
     await console.log("App unmounted");
    }
  }, []);


  useEffect(() => {
    checkTie();
    checkWin()

      if (player == "X"){
        setPlayer("O");
      } else {
        setPlayer("X");
      }

  }, [board]);

  useEffect(() => {
    if (result.status == 'tie'){
      console.log("Tie Game");
      counter.current += 1
      console.log("Round:" + counter.current + " is done")
      newGame();
    }
    if(result.status == 'won' && result.winner == "X"){
      console.log('Game winner is player ' + result.winner);
      counter.current += 1
      addX()
      console.log("X won:" + xCount)
      console.log("Round:" + counter.current + " is done")
      newGame();
    }

    if(result.status == 'won' && result.winner == "O"){
      console.log('Game winner is player ' + result.winner);
      counter.current += 1
      addO()
      console.log("O won:" + oCount)
      console.log("Round:" + counter.current + " is done")
      newGame();
    }

    if(counter.current === 9){
      console.log('Game is done')
    }
  }, [result]);


  return(
    <SafeAreaView>
      <View style={styles.buttonRow}>
          <Square value ={board[0]} ButtonWidth = '33%' chosenSquare={() => {chosenSquare(0)}} />
          <Square value ={board[1]} ButtonWidth = '33%' chosenSquare={() => {chosenSquare(1)}} />
          <Square value ={board[2]} ButtonWidth = '33%' chosenSquare={() => {chosenSquare(2)}} />
      </View>
      <View style={styles.buttonRow}>
          <Square value ={board[3]} ButtonWidth = '33%' chosenSquare={() => {chosenSquare(3)}} />
          <Square value ={board[4]} ButtonWidth = '33%' chosenSquare={() => {chosenSquare(4)}} />
          <Square value ={board[5]} ButtonWidth = '33%' chosenSquare={() => {chosenSquare(5)}} />
      </View>
      <View style={styles.buttonRow}>
          <Square value ={board[6]} ButtonWidth = '33%' chosenSquare={() => {chosenSquare(6)}} />
          <Square value ={board[7]} ButtonWidth = '33%' chosenSquare={() => {chosenSquare(7)}} />
          <Square value ={board[8]} ButtonWidth = '33%' chosenSquare={() => {chosenSquare(8)}} />
      </View>
    </SafeAreaView>
  )
  

}

const styles = StyleSheet.create({
  calculatorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  savContainer: {
    flexGrow: 1,
    backgroundColor: "#000000",
  },
});


export default App;
