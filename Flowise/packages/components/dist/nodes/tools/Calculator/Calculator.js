"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../src/utils");
const calculator_1 = require("langchain/tools/calculator");
class Calculator_Tools {
    constructor() {
        this.label = 'Calculator';
        this.name = 'calculator';
        this.version = 1.0;
        this.type = 'Calculator';
        this.icon = 'calculator.svg';
        this.category = 'Tools';
        this.description = 'Perform calculations on response';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(calculator_1.Calculator)];
    }
    async init() {
        return new calculator_1.Calculator();
    }
}
module.exports = { nodeClass: Calculator_Tools };
//# sourceMappingURL=Calculator.js.map