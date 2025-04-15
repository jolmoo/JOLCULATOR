import {useEffect, useRef, useState} from "react";
import {isNumberLiteral} from "@babel/types";
import {number} from "prop-types";


enum Operator{
    add = '+',
    sub = '-',
    mul = '×',
    div = '÷',
}





export const useCalculator = () => {

    const [formula, setFormula] = useState('0')

    const [number, setNumber] = useState('0')
    const [prevNumber, setPrevNumber] = useState('0')


    const lastOperation = useRef<Operator>();


    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }
    }, [number]);


    useEffect(() => {
        const subResult = calculateResult();
        setPrevNumber(`${subResult}`);

    }, [formula]);

    const clean= ()=>{

        setFormula('0');
        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = undefined;
    };

    const cambiarSigno = ()=>{

        if(number.includes('-')){
            return setNumber(number.replace('-',''));
        }
        setNumber('-' + number);
    }

    const deleteLast = () => {
        let currentSign = '';
        let temporalNumber = number;

        if (number.includes('-')) {
            currentSign = '-';
            temporalNumber = number.substring(1);
        }

        if (temporalNumber.length > 1) {
            return setNumber(currentSign + temporalNumber.slice(0, -1));
        }

        setNumber('0');
    };

    const setLastNumber = ()=>{

        calcularResult();
        if(number.endsWith(',')) {
            setPrevNumber(number.slice(0, -1));
        }
            setPrevNumber(number);
            setNumber('0');

    }

    const divideOperation = () =>{
        setLastNumber();
        lastOperation.current = Operator.div;

    }
    const multiplicateOperation = () =>{
        setLastNumber();
        lastOperation.current = Operator.mul;

    }
    const addOperation = () =>{
        setLastNumber();
        lastOperation.current = Operator.add;

    }
    const subOperation = () =>{
        setLastNumber();
        lastOperation.current = Operator.sub;

    }


    const calculateResult = ()=>{

        const [firstValue,operation,secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if(isNaN(num2))return num1;

        switch(operation){

            case Operator.add:
                return num1+num2;

            case Operator.sub:
                return num1 - num2;

            case Operator.mul:
                return num1*num2;

            case Operator.div:
                return num1/num2;

            default:
                throw new Error('Operación no implementada');

        }
    }


    const calcularResult =()=>{

        const result = calculateResult();
        setFormula(`${result}`);

        lastOperation.current = undefined;
        setPrevNumber('0');
    };

    const buildNumber = (numberString: string) =>{

            //console.log({numberString});
        if(number.includes(',') && numberString == ',')return;


        if(number.startsWith('0') || number.startsWith('-0')){

            if(numberString == ',')return setNumber(number + numberString);

            if(numberString == '0' && number.includes(','))return setNumber(number+numberString);

            if(numberString != '0' && !number.includes(','))return setNumber(numberString);

            if(numberString == '0' && !number.includes(','))return;

            return setNumber(number+numberString);
        }

        setNumber(number + numberString);

    };


    return {

        //Props
        formula,
        number,
        prevNumber,

        //metodos
        buildNumber,
        clean,
        cambiarSigno,
        deleteLast,
        divideOperation,
        multiplicateOperation,
        addOperation,
        subOperation,

        calculateResult,
        setLastNumber,
        calcularResult,
    }


}