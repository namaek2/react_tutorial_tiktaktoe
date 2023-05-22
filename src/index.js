import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  loopRenderSquare1(i){
    var arr2 = [];
    for (var j = 0; j < 3; j++) {
      arr2.push(this.renderSquare(i+j))
    }
    return arr2
  }


  loopRenderSquare(){
    var arr1 = [];
    for (var i = 0; i < 9; i+=3) {
      arr1.push(<div className="board-row">{this.loopRenderSquare1(i)}</div>)
    }
    return arr1
  }

  render() {
    return (
      <div>
        {this.loopRenderSquare()}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber : 0,
      xIsNext: true,
      isRev : false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ history: history.concat([{squares: squares, }]), stepNumber: history.length, xIsNext: !this.state.xIsNext });

  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) === 0,
    });
  }

 
  

  render() {
    var history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const his_rev = (history) => {
      Game.isRev ?
      Game.isRev = false  :
      Game.isRev = true;
    };

    let renderButton = () => {
      return(Game.isRev ?
        <ol>{moves.reverse()}</ol>:<ol>{moves}</ol>
      )
    
    }
   
    const moves = history.map((step, move) => {
      const desc = move?
        'Go to move #' + move :
        'Go to game start';

        return(
          <li key={move}>
            <button onClick={()=> this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = "Winner : " + winner;
    } else if (this.state.stepNumber === 9)  {
      status = "No Winner";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

   
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i)=>this.handleClick(i)}
            />
        </div>
        <div className="game-info">
          <button onClick={()=>history=his_rev(history)}>Reverse</button>
          <div>{status}</div>
          <ol>{renderButton()}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
