import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Button extends React.Component{
  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e){
    if(e.keyCode === this.props.keyCode){
      this.props.onClick(this.props.value);
    }
  }


  render(){
    return(
      <div
        onClick = {() => this.props.onClick(this.props.value)}
        id = {this.props.id}
        className = "button"
      >
        {this.props.innerText}
      </div>
    );
  }
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      display: "0",
      formula: "",
      firstClick: true,
      decimal: false
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value){
    console.log("in handleclick");
    console.log(this.state);
    let formula = this.state.formula;
    let display = this.state.display;
    let firstClick = this.state.firstClick;
    let decimal = this.state.decimal;

    if(firstClick){
      if (value >= 1 && value <= 9){
        display = "";
        this.setState({firstClick: false});
      }
    }

    //getting out of handle click if zero is pressed at start
    if(value === "0"){
      if(display === "0" && !decimal){
        return;
      }
    }

    if (value === "."){
      if(firstClick){
        display = "0";
      }
      if(!decimal){
        this.setState({
          decimal: true,
          firstClick: false,

        });
      }else{
        return;
      }
    }

    if (value === "+" ||  value === "*" || value === "/" || value == "-"){

      if(firstClick){
        if (value === "-"){
          let ultimos2 = formula.slice(-2);
          if (
            ultimos2 === "+-" ||
            ultimos2 === "*-" ||
            ultimos2 === "/-" ||
            ultimos2 === "--" 
          ){
            return;
          }else{
            this.setState({formula: formula + "-"});
          }
        }else{ // + * /
          //pregunto si el anterior es uno de esos operadores
          if(formula[formula.length-1] == "+" ||
            formula[formula.length-1] == "/" ||
            formula[formula.length-1] == "*" ||
            formula[formula.length-1] == "-" ){
              //pregunto por el mas anterior y si es algun operador corto 2
              if(formula[formula.length-2] == "+" ||
              formula[formula.length-2] == "/" ||
              formula[formula.length-2] == "*" ||
              formula[formula.length-2] == "-"){
                this.setState({
                  formula : formula.slice(0,-2) + value
                });
              }else{
                this.setState({
                  formula : formula.slice(0,-1) + value,
                  
                });

              }
            }
        }


        //agregar el display adelante si es distinto de cero para seguir operando sobre resultados
        if(display != 0){
          this.formulaConcat(display+value);
        }
      }
      else{
        this.formulaConcat(value);
      }
      return;
    }


    if(value === "c"){
      this.resetState();
      return;
    }

    if(value === "e"){
      if(formula.length < 2) return;
      let resultado = this.obtenerResultado(formula);
      this.resetState();
      this.setState({display: resultado});

      return;

    }

    //changing display. se aplica cuando tenemos numeros
    this.setState({
      display: display + value,
      formula: formula + value
    });
  }
  // END OF handleClick

  formulaConcat(numberAndOp){
    let formula = this.state.formula;
    this.setState({
      formula: formula + numberAndOp,
      firstClick: true,
      decimal: false,
      display: 0,
    })
  }

  resetState(){
    this.setState({
      display: "0",
      formula: "",
      firstClick: true,
      decimal: false,
    });
  }

  obtenerResultado(formula){
      const numberRegex = /[\-]?[\.]?[0-9]+[\.]?([0-9]+)?/;
      const operatorRegex = /[\+\-\*\/]/;
      let operacion;
      let operador;

      let result = formula.match(numberRegex)[0];;
      let remainingFormula = formula.slice(result.length);
      
      console.log("cuenta inicial: " + formula);

      while (remainingFormula.length > 1 && /[0-9]/.test(remainingFormula)){
        operacion = remainingFormula.match(operatorRegex)[0];
        remainingFormula = remainingFormula.slice(1);
        operador = remainingFormula.match(numberRegex)[0];
        remainingFormula = remainingFormula.slice(operador.length);
        result = this.operar(result, operacion, operador);
      }

      console.log("result "+ result);
      return result;
  }

  operar(result, operacion, operador){
      let resultFloat = parseFloat(result);
      let operadorFloat = parseFloat(operador);

      switch(operacion){
          case("+"):
              resultFloat += operadorFloat;
              break;
          case("-"):
              resultFloat -= operadorFloat;
              break;
          case("/"):
              resultFloat /= operadorFloat;
              break;
          case("*"):
              resultFloat *= operadorFloat;
              break;
      }

      resultFloat = Math.round(resultFloat * 10000) / 10000;

      return "" + resultFloat;
  } 

  //RENDER Calculator
  render(){
    const buttons = this.props.buttons.map((button) => {
      return (
        <Button
          id = {button.id}
          innerText = {button.innerText}
          value = {button.value}
          key = {button.id}
          keyCode = {button.keyCode}
          onClick = {(value) => this.handleClick(value)}
        />
      );
    });

    return(
      <div id="calculator">
        <div id="pantalla">
          <div id="formula">{this.state.formula}</div>
          <div id="display">{this.state.display}</div>
        </div>
        <div id="buttons">
          {buttons}
        </div>
      </div>
    );
  }
}

function App(props){
  return(
    <div>
      <Calculator buttons={BUTTONS}/>
      <p className="creditos">hecho por <a target="_blank" href="https://youtube.com/c/deivchoi">David Choi</a></p>

    </div>
  );
}

// CONSTANTS
const BUTTONS = [
  {
    id : "clear",
    innerText : "C",
    value : "c",
    keyCode: 27
  },
  {
    id : "divide",
    innerText : "/",
    value : "/",
    keyCode: 111
  },
  {
    id : "multiply",
    innerText : "*",
    value : "*",
    keyCode: 106
  },
  {
    id : "subtract",
    innerText : "-",
    value : "-",
    keyCode: 109
  },
  {
    id : "seven",
    innerText : "7",
    value : "7",
    keyCode: 103
  },
  {
    id : "eight",
    innerText : "8",
    value : "8",
    keyCode: 104
  },
  {
    id : "nine",
    innerText : "9",
    value : "9",
    keyCode: 105
  },
  {
    id : "add",
    innerText : "+",
    value : "+",
    keyCode: 107
  },
  {
    id : "four",
    innerText : "4",
    value : "4",
    keyCode: 100
  },
  {
    id : "five",
    innerText : "5",
    value : "5",
    keyCode: 101
  },
  {
    id : "six",
    innerText : "6",
    value : "6",
    keyCode: 102
  },
  {
    id : "one",
    innerText : "1",
    value : "1",
    keyCode: 97
  },
  {
    id : "two",
    innerText : "2",
    value : "2",
    keyCode: 98
  },
  {
    id : "three",
    innerText : "3",
    value : "3",
    keyCode: 99
  },
  {
    id : "equals",
    innerText : "=",
    value : "e",
    keyCode: 13
  },
  {
    id : "zero",
    innerText : "0",
    value : "0",
    keyCode: 96
  },
  {
    id : "decimal",
    innerText : ".",
    value : ".",
    keyCode: 110
  },
];

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

