import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  inputs: string[] = [];
  displayedInputs: string[] = [];
  equation: string[] = [];
  isDecimal: boolean[] = [];
  decimalRegex: RegExp = /[.]/g
  result: number = 0;
  displayedResults: number[] = [];
  showResult: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  number(value: number): void {
    if (this.showResult) {
      this.clear();
    }
    this.displayedInputs.push(value.toString());
    this.inputs.push(value.toString());
  }

  decimal(): void {
    this.inputs.push(".");
    this.displayedInputs.push(".");
  }

  sum(): void {
    if (this.showResult) {
      this.showResult = false;
      this.inputs.push(this.result.toString());
      this.displayedInputs.push(this.result.toString());
    }
    this.inputs.push("+");
    this.displayedInputs.push("+");
  }

  subtract(): void {
    if (this.showResult) {
      this.showResult = false;
      this.inputs.push(this.result.toString());
      this.displayedInputs.push(this.result.toString());
    }
    this.inputs.push("-");
    this.displayedInputs.push("-");
  }

  multiply(): void {
    if (this.showResult) {
      this.showResult = false;
      this.inputs.push(this.result.toString());
      this.displayedInputs.push(this.result.toString());
    }
    this.inputs.push("*");
    this.displayedInputs.push("*");
  }

  divide(): void {
    if (this.showResult) {
      this.showResult = false;
      this.inputs.push(this.result.toString());
      this.displayedInputs.push(this.result.toString());
    }
    this.inputs.push("%");
    this.displayedInputs.push("/");
  }

  equals(): void {
    this.decipher();
  }

  decipher(): void {
    let numberRegex = /[0123456789]/
    let operatorRegex = /\+|\*|\-|\%/
    var hasPreceedingNumber = false;
    var isDecimal = false;
    var constants = [];
    var operator = "";
    var constant = "";
    var lastNumber = "";
    var operatorCount = 0;
    var exit = false;
    this.inputs.forEach(number => {
      if (numberRegex.test(number)) {
        lastNumber = number;
        constant = constant + number;
        hasPreceedingNumber = true;
        operatorCount = 0;
      } else if (operatorRegex.test(number)) {
        constants.push(constant);
        constant = "";
        operator = number;
        isDecimal = false;
        operatorCount = operatorCount + 1;
        if (operatorCount > 1) {
          window.alert("Using more than one operator in succession");
          this.result = 0;
          this.showResult = false;
          this.inputs = [];
          this.displayedInputs = [];
          exit = true;
        }
      } else if (this.decimalRegex.test(number)) {
        isDecimal = true;
        if (hasPreceedingNumber) {
          constant = constant + number;
        } else {
          constant = "0" + number;
        }
      }
    });
    if (isDecimal) {
      constant = constant + lastNumber;
    }
    if (exit) {
      return;
    }
    constants.push(constant);
    this.calculate(constants, operator);
  }

  calculate(constants: string[], operator: string): void {
    if (operator == "+") {
      if (this.decimalRegex.test(constants[0]) || this.decimalRegex.test(constants[1])) {
        this.result = parseFloat(constants[0]) + parseFloat(constants[1]);
      } else {
        this.result = parseInt(constants[0]) + parseInt(constants[1]);
      }
    }
    if (operator == "*") {
      if (this.decimalRegex.test(constants[0]) || this.decimalRegex.test(constants[1])) {
        this.result = parseFloat(constants[0]) * parseFloat(constants[1]);
      } else {
        this.result = parseInt(constants[0]) * parseInt(constants[1]);
      }
    }
    if (operator == "-") {
      if (this.decimalRegex.test(constants[0]) || this.decimalRegex.test(constants[1])) {
        this.result = parseFloat(constants[0]) - parseFloat(constants[1]);
      } else {
        this.result = parseInt(constants[0]) - parseInt(constants[1]);
      }
    }
    if (operator == "%") {
      if (parseFloat(constants[1]) === 0) {
        window.alert("Can't divide by 0");
        this.clear();
        return;
      } else if (this.decimalRegex.test(constants[0]) || this.decimalRegex.test(constants[1])) {
        this.result = parseFloat(constants[0]) / parseFloat(constants[1]);
      } else {
        this.result = parseInt(constants[0]) / parseInt(constants[1]);
      }
    } else if (operator == "") {
      this.inputs = [];
      this.displayedInputs = [];
      this.showResult = true;
      this.result = parseFloat(constants[0]);
    }
    this.inputs = [];
    this.displayedInputs = [];
    this.showResult = true;
    this.displayedResults.push(this.result);
  }

  clear(): void {
    this.inputs = [];
    this.displayedInputs = [];
    this.showResult = false;
    this.result = 0;
  }

}
