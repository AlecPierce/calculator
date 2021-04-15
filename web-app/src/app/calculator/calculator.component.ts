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
  decimalRegex: RegExp = /[.]/
  result: number = 0;
  displayedResults: number[] = [];
  showResult: boolean = false;
  operatorCount: number = 0;
  decimalCount: number = 0;
  negativeCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  number(value: number): void {
    if (this.showResult) {
      this.clear();
    } else {
      this.operatorCount = 0;
      this.decimalCount = 0;
    }
    this.displayedInputs.push(value.toString());
    this.inputs.push(value.toString());
  }

  decimal(): void {
    this.decimalCount++;
    if(this.decimalCount > 1) {
      window.alert("Using more than one decimal point in succession");
      this.clear();
      return;
    }
    this.inputs.push(".");
    this.displayedInputs.push(".");
  }

  operator(operator: string): void {
    this.operatorCount++;
    this.negativeCount = 0;
    if(this.operatorCount > 1) {
      window.alert("Using more than one operator in succession");
      this.clear();
      return;
    }
    if (this.showResult) {
      this.showResult = false;
      this.inputs.push(this.result.toString());
      this.displayedInputs.push(this.result.toString());
    }
    if(operator === "%") {
      this.inputs.push("%");
      this.displayedInputs.push("/");
    } else {
      this.inputs.push(operator);
      this.displayedInputs.push(operator);
    }
  }

  negative(): void {
    this.negativeCount++;
    if(this.negativeCount > 1 || (this.negativeCount > 1 && this.operatorCount > 1)) {
      window.alert("Using more than one negative in succession");
      this.clear();
      return;
    }
    this.inputs.push("_");
    this.displayedInputs.push("(-)");
  }

  equals(): void {
    this.decipher();
  }

  decipher(): void {
    let numberRegex = /[0123456789]/;
    let operatorRegex = /\+|\*|\-|\%/;
    var hasPreceedingNumber = false;
    var isDecimal = false;
    var constants = [];
    var operator = "";
    var constant = "";
    var lastNumber = "";
    this.inputs.forEach(number => {
      if (numberRegex.test(number)) {
        lastNumber = number;
        constant = constant + number;
        hasPreceedingNumber = true;
      } else if (operatorRegex.test(number)) {
        constants.push(constant);
        constant = "";
        operator = number;
        isDecimal = false;
      } else if (this.decimalRegex.test(number)) {
        isDecimal = true;
        if (hasPreceedingNumber) {
          constant = constant + number;
        } else {
          constant = "0" + number;
        }
      } else {
        constant = constant + "-";
      }
    });
    if (isDecimal) {
      constant = constant + lastNumber;
    }
    constants.push(constant);
    this.calculate(constants, operator);
  }

  private calculate(constants: string[], operator: string): void {
    if (operator == "+") {
      if (this.hasDecimals(constants)) {
        this.result = parseFloat(constants[0]) + parseFloat(constants[1]);
      } else {
        this.result = parseInt(constants[0]) + parseInt(constants[1]);
      }
    }
    if (operator == "*") {
      if (this.hasDecimals(constants)) {
        this.result = parseFloat(constants[0]) * parseFloat(constants[1]);
      } else {
        this.result = Number(constants[0]) * Number(constants[1]);
      }
    }
    if (operator == "-") {
      if (this.hasDecimals(constants)) {
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
      } else if (this.hasDecimals(constants)) {
        this.result = parseFloat(constants[0]) / parseFloat(constants[1]);
      } else {
        this.result = parseInt(constants[0]) / parseInt(constants[1]);
      }
    } else if (operator == "") {
      this.clearInputsAndShowResult();
      this.result = parseFloat(constants[0]);
    }
    this.clearInputsAndShowResult();
    this.displayedResults.push(this.result);
  }

  private clearInputsAndShowResult() {
    this.inputs = [];
    this.displayedInputs = [];
    this.showResult = true;
  }

  clear(): void {
    this.inputs = [];
    this.displayedInputs = [];
    this.showResult = false;
    this.result = 0;
    this.displayedResults = [];
    this.operatorCount = 0;
    this.decimalCount = 0;
    this.negativeCount = 0;
  }

  hasDecimals(constants: string[]): boolean {
    if(this.decimalRegex.test(constants[0]) || this.decimalRegex.test(constants[1])) {
      return true;
    }
    return false;
  }

}
