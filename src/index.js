import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class BoardNumber extends React.Component {

  renderSquare(i,disp) {
        return (
            <Square
                value={disp}
                onClick={() => this.props.onClick(i)}
            />
        ); 
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare('7','７')}
          {this.renderSquare('8','８')}
          {this.renderSquare('9','９')}
        </div>
        <div className="board-row">
          {this.renderSquare('4','４')}
          {this.renderSquare('5','５')}
          {this.renderSquare('6','６')}
        </div>
        <div className="board-row">
          {this.renderSquare('1','１')}
          {this.renderSquare('2','２')}
          {this.renderSquare('3','３')}
        </div>
        <div className="board-row">
          {this.renderSquare('0','０')}
          {this.renderSquare('00','00')}
          {this.renderSquare('.','. ')}
        </div>
      </div>
    );
  }
}


class BoardCalcType extends React.Component {

  renderSquare(i,disp) {
        return (
            <Square
                value={disp}
                onClick={() => this.props.onClick(i)}
            />
        ); 
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare('4','÷')}
          {this.renderSquare('3','×')}
        </div>
        <div className="board-row">
          {this.renderSquare('1','＋')}
          {this.renderSquare('2','－')}
        </div>
      </div>
    );
  }
}

class CalculatorContainer extends React.Component { 
  constructor(props) {
    super(props);
    // calctype 1:+ 2:- 3:* 4:/
    this.state = {
      first: '',
      calcType: '',
      second: '',
      isCalc: false,
      isPointed: false,
      pointDone: false,
      display: '',
    };
  }
  
  handleClickNumber(val) {
    
    let isPoint = (val === '.');
    if (isPoint && this.state.first === '') return;
    if (isPoint && this.state.isPointed) return;

    val = this.state.pointDone ? ('.' + val) : val;
    let setValFirst = !this.state.isPointed ? parseFloat(this.state.first + val) : this.state.first + val;
    let setValSecond = !this.state.isPointed ? parseFloat(this.state.second + val) : this.state.second + val;
    
    this.setState({
      first: this.state.isCalc ? this.state.first : setValFirst,
      second: this.state.isCalc ? setValSecond : this.state.second,
      display: this.state.isCalc ? setValSecond : setValFirst,
      isPointed: (isPoint || this.state.isPointed),
      pointDone: isPoint,
    });
  }
  
  handleClickCalcType(type) {

    if (!this.state.isCalc && this.state.first === '') return;

    this.setState({
      calcType: type,
      isCalc: true,
    });
  }
  

  clickClear() {
    this.setState({
      first: '',
      calcType: '',
      second: '',
      isCalc: false,
      isPointed: false,
      pointDone: false,
      display: '0',
    });
  }

  clickResult() {
  
     if (!this.state.isCalc) return;
  
     let result;
     let firstVal = parseFloat(this.state.first);
     let secondVal = parseFloat(this.state.second);
     switch (this.state.calcType) {
         case '1': 
             result = firstVal + secondVal;
             break;
         case '2': 
             result = firstVal - secondVal;
             break;
         case '3': 
             result = firstVal * secondVal;
             break;
         case '4': 
             result = Math.floor(firstVal / secondVal * Math.pow( 10, 7 ) ) / Math.pow( 10, 7 );
             break;
         default:
             result = null;
     }
      this.setState({
          first: result,
          calcType: '',
          second: '',
          isPointed: false,
          pointDone: false,
          display: result,
    });
  }
  
  render() {
    return (
      <div className="calculator">
      <div className="square display">{this.state.display}</div>
        <div className="calculator-board">
          <div className="calculator-board-inn">
            <BoardNumber
                onClick={(i) => this.handleClickNumber(i)}
            />
          </div>
          <div className="calculator-board-right">
            <div className="calculator-board-inn">
              <BoardCalcType
                  onClick={(i) => this.handleClickCalcType(i)}
              />
            </div>
            <div className="calculator-board-right calculator-board-inn">
              <button className="square square-wide" onClick={() => this.clickClear()}>CA</button>
              <button className="square square-wide" onClick={() => this.clickResult()}>＝</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <CalculatorContainer />,
  document.getElementById('root')
);


