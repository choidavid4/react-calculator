import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// User Story #1: My calculator should contain a clickable element containing an = (equal sign) with a corresponding id="equals". DONE

// User Story #2: My calculator should contain 10 clickable elements containing one number each from 0-9, with the following corresponding IDs: id="zero", id="one", id="two", id="three", id="four", id="five", id="six", id="seven", id="eight", and id="nine". DONE

// User Story #3: My calculator should contain 4 clickable elements each containing one of the 4 primary mathematical operators with the following corresponding IDs: id="add", id="subtract", id="multiply", id="divide". DONE

// User Story #4: My calculator should contain a clickable element containing a . (decimal point) symbol with a corresponding id="decimal". DONE

// User Story #5: My calculator should contain a clickable element with an id="clear". DONE

// User Story #6: My calculator should contain an element to display values with a corresponding id="display". DONE

// User Story #7: At any time, pressing the clear button clears the input and output values, and returns the calculator to its initialized state; 0 should be shown in the element with the id of display. DONE

// User Story #8: As I input numbers, I should be able to see my input in the element with the id of display. DONE

// User Story #9: In any order, I should be able to add, subtract, multiply and divide a chain of numbers of any length, and when I hit =, the correct result should be shown in the element with the id of display. DONE

// User Story #10: When inputting numbers, my calculator should not allow a number to begin with multiple zeros. DONE

// User Story #11: When the decimal element is clicked, a . should append to the currently displayed value; two . in one number should not be accepted. DONE

// User Story #12: I should be able to perform any operation (+, -, *, /) on numbers containing decimal points. DONE

// User Story #13: If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign). For example, if 5 + * 7 = is entered, the result should be 35 (i.e. 5 * 7); if 5 * - 5 = is entered, the result should be -25 (i.e. 5 * (-5)). DONE

// User Story #14: Pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation. DONE

// User Story #15: My calculator should have several decimal places of precision when it comes to rounding (note that there is no exact standard, but you should be able to handle calculations like 2 / 7 with reasonable precision to at least 4 decimal places). DONE

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

// 1. FILTRAR EN EL INPUT EL INGRESO DE VARIOS OPERACIONES, NOS LLEGAN MAXIMO 2
//POSIBLE INPUTS [+,-,*,/, --,/-,*-,+-]
// 2. SOLO PERMITIR - EN PRIMER INPUT

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      display: "0",
      formula: "",
      firstClick: true,
      decimal: false,
      minusCap: false,
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick(value){
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

    //tomar todos los operadores pero a la hora de hacer la cuenta solo ver el ultimo a menos que tengamos "-"
    if (value === "+" ||  value === "*" || value === "/" || value == "-"){

      if(firstClick){
        if(
          formula[formula.length-1] == "+" ||
          formula[formula.length-1] == "/" ||
          formula[formula.length-1] == "*"){
            
          }


        //agregar el display adelante si es distinto de cero
        if(display != 0){
          this.formulaConcat(display+value);
        }else{
          this.formulaConcat(value);
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
      // while(
      //     this.state.formula[formula.length-1] === "+" ||
      //     this.state.formula[formula.length-1] === "*" ||
      //     this.state.formula[formula.length-1] === "/" ||
      //     this.state.formula[formula.length-1] === "-"
      //   ) {
      //     console.log("in while");
      //     this.setState({
      //       formula: this.state.formula.slice(0,-1)});
      // }
      
      // this.setState({
      //   formula: this.state.formula + display,
      // });
      console.log("formula " + this.state.formula);
      

      let resultado = this.obtenerResultado(formula);
      this.resetState();
      this.setState({display: resultado});
      console.log("display " + this.state.display);
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
        // console.log("operando "+ result);   //3 + 5 * 6 - 2 / 4 
        
        operacion = remainingFormula.match(operatorRegex)[0];
        remainingFormula = remainingFormula.slice(1);
        // console.log("operacion "+ operacion);


        operador = remainingFormula.match(numberRegex)[0];
        // console.log("opeardor "+ operador);
        remainingFormula = remainingFormula.slice(operador.length);

        // console.log("operacion: " + result + " " + operacion + " " + operador);
        result = this.operar(result, operacion, operador);
        // 

        // console.log("remainingFormula "+ remainingFormula);
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
    // console.log("state.formula= "+this.state.formula);
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

