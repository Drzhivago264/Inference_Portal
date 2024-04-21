"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainTool = void 0;
const tools_1 = require("@langchain/core/tools");
const utils_1 = require("../../../src/utils");
class ChainTool extends tools_1.DynamicTool {
    constructor({ chain, ...rest }) {
        super({
            ...rest,
            func: async (input, runManager) => {
                // To enable LLM Chain which has promptValues
                if (chain.prompt && chain.prompt.promptValues) {
                    const promptValues = (0, utils_1.handleEscapeCharacters)(chain.prompt.promptValues, true);
                    const values = await chain.call(promptValues, runManager?.getChild());
                    return values?.text;
                }
                return chain.run(input, runManager?.getChild());
            }
        });
        this.chain = chain;
    }
}
exports.ChainTool = ChainTool;
//# sourceMappingURL=core.js.map