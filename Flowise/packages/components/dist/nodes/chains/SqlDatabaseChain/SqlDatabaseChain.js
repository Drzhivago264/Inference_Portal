"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const prompts_1 = require("@langchain/core/prompts");
const sql_db_1 = require("langchain/chains/sql_db");
const sql_db_2 = require("langchain/sql_db");
const handler_1 = require("../../../src/handler");
const utils_1 = require("../../../src/utils");
const Moderation_1 = require("../../moderation/Moderation");
const OutputParserHelpers_1 = require("../../outputparsers/OutputParserHelpers");
class SqlDatabaseChain_Chains {
    constructor() {
        this.label = 'Sql Database Chain';
        this.name = 'sqlDatabaseChain';
        this.version = 5.0;
        this.type = 'SqlDatabaseChain';
        this.icon = 'sqlchain.svg';
        this.category = 'Chains';
        this.description = 'Answer questions over a SQL database';
        this.baseClasses = [this.type, ...(0, utils_1.getBaseClasses)(sql_db_1.SqlDatabaseChain)];
        this.inputs = [
            {
                label: 'Language Model',
                name: 'model',
                type: 'BaseLanguageModel'
            },
            {
                label: 'Database',
                name: 'database',
                type: 'options',
                options: [
                    {
                        label: 'SQLite',
                        name: 'sqlite'
                    },
                    {
                        label: 'PostgreSQL',
                        name: 'postgres'
                    },
                    {
                        label: 'MSSQL',
                        name: 'mssql'
                    },
                    {
                        label: 'MySQL',
                        name: 'mysql'
                    }
                ],
                default: 'sqlite'
            },
            {
                label: 'Connection string or file path (sqlite only)',
                name: 'url',
                type: 'string',
                placeholder: '1270.0.0.1:5432/chinook'
            },
            {
                label: 'Include Tables',
                name: 'includesTables',
                type: 'string',
                description: 'Tables to include for queries, separated by comma. Can only use Include Tables or Ignore Tables',
                placeholder: 'table1, table2',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Ignore Tables',
                name: 'ignoreTables',
                type: 'string',
                description: 'Tables to ignore for queries, separated by comma. Can only use Ignore Tables or Include Tables',
                placeholder: 'table1, table2',
                additionalParams: true,
                optional: true
            },
            {
                label: "Sample table's rows info",
                name: 'sampleRowsInTableInfo',
                type: 'number',
                description: 'Number of sample row for tables to load for info.',
                placeholder: '3',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Top Keys',
                name: 'topK',
                type: 'number',
                description: 'If you are querying for several rows of a table you can select the maximum number of results you want to get by using the "top_k" parameter (default is 10). This is useful for avoiding query results that exceed the prompt max length or consume tokens unnecessarily.',
                placeholder: '10',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Custom Prompt',
                name: 'customPrompt',
                type: 'string',
                description: 'You can provide custom prompt to the chain. This will override the existing default prompt used. See <a target="_blank" href="https://python.langchain.com/docs/integrations/tools/sqlite#customize-prompt">guide</a>',
                warning: 'Prompt must include 3 input variables: {input}, {dialect}, {table_info}. You can refer to official guide from description above',
                rows: 4,
                placeholder: sql_db_1.DEFAULT_SQL_DATABASE_PROMPT.template + sql_db_1.DEFAULT_SQL_DATABASE_PROMPT.templateFormat,
                additionalParams: true,
                optional: true
            },
            {
                label: 'Input Moderation',
                description: 'Detect text that could generate harmful output and prevent it from being sent to the language model',
                name: 'inputModeration',
                type: 'Moderation',
                optional: true,
                list: true
            }
        ];
    }
    async init(nodeData) {
        const databaseType = nodeData.inputs?.database;
        const model = nodeData.inputs?.model;
        const url = nodeData.inputs?.url;
        const includesTables = nodeData.inputs?.includesTables;
        const splittedIncludesTables = includesTables == '' ? undefined : includesTables?.split(',');
        const ignoreTables = nodeData.inputs?.ignoreTables;
        const splittedIgnoreTables = ignoreTables == '' ? undefined : ignoreTables?.split(',');
        const sampleRowsInTableInfo = nodeData.inputs?.sampleRowsInTableInfo;
        const topK = nodeData.inputs?.topK;
        const customPrompt = nodeData.inputs?.customPrompt;
        const chain = await getSQLDBChain(databaseType, url, model, splittedIncludesTables, splittedIgnoreTables, sampleRowsInTableInfo, topK, customPrompt);
        return chain;
    }
    async run(nodeData, input, options) {
        const databaseType = nodeData.inputs?.database;
        const model = nodeData.inputs?.model;
        const url = nodeData.inputs?.url;
        const includesTables = nodeData.inputs?.includesTables;
        const splittedIncludesTables = includesTables == '' ? undefined : includesTables?.split(',');
        const ignoreTables = nodeData.inputs?.ignoreTables;
        const splittedIgnoreTables = ignoreTables == '' ? undefined : ignoreTables?.split(',');
        const sampleRowsInTableInfo = nodeData.inputs?.sampleRowsInTableInfo;
        const topK = nodeData.inputs?.topK;
        const customPrompt = nodeData.inputs?.customPrompt;
        const moderations = nodeData.inputs?.inputModeration;
        if (moderations && moderations.length > 0) {
            try {
                // Use the output of the moderation chain as input for the Sql Database Chain
                input = await (0, Moderation_1.checkInputs)(moderations, input);
            }
            catch (e) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                (0, Moderation_1.streamResponse)(options.socketIO && options.socketIOClientId, e.message, options.socketIO, options.socketIOClientId);
                return (0, OutputParserHelpers_1.formatResponse)(e.message);
            }
        }
        const chain = await getSQLDBChain(databaseType, url, model, splittedIncludesTables, splittedIgnoreTables, sampleRowsInTableInfo, topK, customPrompt);
        const loggerHandler = new handler_1.ConsoleCallbackHandler(options.logger);
        const callbacks = await (0, handler_1.additionalCallbacks)(nodeData, options);
        if (options.socketIO && options.socketIOClientId) {
            const handler = new handler_1.CustomChainHandler(options.socketIO, options.socketIOClientId, 2);
            const res = await chain.run(input, [loggerHandler, handler, ...callbacks]);
            return res;
        }
        else {
            const res = await chain.run(input, [loggerHandler, ...callbacks]);
            return res;
        }
    }
}
const getSQLDBChain = async (databaseType, url, llm, includesTables, ignoreTables, sampleRowsInTableInfo, topK, customPrompt) => {
    const datasource = new typeorm_1.DataSource(databaseType === 'sqlite'
        ? {
            type: databaseType,
            database: url
        }
        : {
            type: databaseType,
            url: url
        });
    const db = await sql_db_2.SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
        includesTables: includesTables,
        ignoreTables: ignoreTables,
        sampleRowsInTableInfo: sampleRowsInTableInfo
    });
    const obj = {
        llm,
        database: db,
        verbose: process.env.DEBUG === 'true' ? true : false,
        topK: topK
    };
    if (customPrompt) {
        const options = {
            template: customPrompt,
            inputVariables: (0, utils_1.getInputVariables)(customPrompt)
        };
        obj.prompt = new prompts_1.PromptTemplate(options);
    }
    const chain = new sql_db_1.SqlDatabaseChain(obj);
    return chain;
};
module.exports = { nodeClass: SqlDatabaseChain_Chains };
//# sourceMappingURL=SqlDatabaseChain.js.map