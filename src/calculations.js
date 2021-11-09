//NOTES
//cuando hago string.match(regex)[0] el [0] al final esta porque match() devuelve un array


// // CONSTANTES
// const FORMULA = "0.+.258";

// //REGEX
// // OJO: Este regex agarra el - de adelante

// //CAMBIAR REGEX PARA QUE AGARRE EL 0. 
// const numberRegex = /[\-]?[\.]?[0-9]+[\.]?([0-9]+)?/;
// const operatorRegex = /[\+\-\*\/]/;



// // MAIN PROGRAM



// let remainingFormula = FORMULA.slice();
// let result;
// let operacion;
// let operador;

// result = remainingFormula.match(numberRegex)[0];

// remainingFormula = remainingFormula.slice(result.length);


// while (remainingFormula){
//     operacion = remainingFormula.match(operatorRegex)[0];
//     remainingFormula = remainingFormula.slice(1);
    
//     operador = remainingFormula.match(numberRegex)[0];
//     remainingFormula = remainingFormula.slice(operador.length);


//     console.log("operacion: " + result + operacion + operador);
//     result = operar();
// }

// console.log("resultado final: " + result);



function obtenerResultado(formula){
    const numberRegex = /[\-]?[\.]?[0-9]+[\.]?([0-9]+)?/;
    const operatorRegex = /[\+\-\*\/]/;
    let operacion;
    let operador;

    let result = formula.match(numberRegex)[0];;
    let remainingFormula = formula.slice(result.length);

    console.log("cuenta inicial: " +remainingFormula);

      while (remainingFormula.length > 1){
        console.log("operando "+ result);  
        
        operacion = remainingFormula.match(operatorRegex)[0];
        remainingFormula = remainingFormula.slice(1);
        console.log("operacion "+ operacion);


        operador = remainingFormula.match(numberRegex)[0];
        console.log("opeardor "+ operador);
        remainingFormula = remainingFormula.slice(operador.length);

        // console.log("operacion: " + result + " " + operacion + " " + operador);
        result = operar(result, operacion, operador);
        console.log("result "+ result);

        
        console.log("remainingFormula "+ remainingFormula);
      }

    return result;
}

function operar(result, operacion, operador){
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

const cuenta = "5-3-";
console.log(obtenerResultado(cuenta));

//ARREGLAR MI CALCULADORA, NO PUEDE RESTAR
//MEJORAR LOS REGEX PARA QUE PUEDA AGARRAR MEJOR MIS OPERACIONES Y HACER UN SOLO CORTE