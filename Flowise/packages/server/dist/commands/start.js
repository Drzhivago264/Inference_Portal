"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const path_1 = __importDefault(require("path"));
const Server = __importStar(require("../index"));
const DataSource = __importStar(require("../DataSource"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '..', '.env'), override: true });
var EXIT_CODE;
(function (EXIT_CODE) {
    EXIT_CODE[EXIT_CODE["SUCCESS"] = 0] = "SUCCESS";
    EXIT_CODE[EXIT_CODE["FAILED"] = 1] = "FAILED";
})(EXIT_CODE || (EXIT_CODE = {}));
let processExitCode = EXIT_CODE.SUCCESS;
class Start extends core_1.Command {
    async stopProcess() {
        logger_1.default.info('Shutting down Flowise...');
        try {
            // Shut down the app after timeout if it ever stuck removing pools
            setTimeout(() => {
                logger_1.default.info('Flowise was forced to shut down after 30 secs');
                process.exit(processExitCode);
            }, 30000);
            // Removing pools
            const serverApp = Server.getInstance();
            if (serverApp)
                await serverApp.stopApp();
        }
        catch (error) {
            logger_1.default.error('There was an error shutting down Flowise...', error);
        }
        process.exit(processExitCode);
    }
    async run() {
        process.on('SIGTERM', this.stopProcess);
        process.on('SIGINT', this.stopProcess);
        // Prevent throw new Error from crashing the app
        // TODO: Get rid of this and send proper error message to ui
        process.on('uncaughtException', (err) => {
            logger_1.default.error('uncaughtException: ', err);
        });
        process.on('unhandledRejection', (err) => {
            logger_1.default.error('unhandledRejection: ', err);
        });
        const { flags } = await this.parse(Start);
        if (flags.PORT)
            process.env.PORT = flags.PORT;
        if (flags.CORS_ORIGINS)
            process.env.CORS_ORIGINS = flags.CORS_ORIGINS;
        if (flags.IFRAME_ORIGINS)
            process.env.IFRAME_ORIGINS = flags.IFRAME_ORIGINS;
        if (flags.DEBUG)
            process.env.DEBUG = flags.DEBUG;
        if (flags.NUMBER_OF_PROXIES)
            process.env.NUMBER_OF_PROXIES = flags.NUMBER_OF_PROXIES;
        // Authorization
        if (flags.FLOWISE_USERNAME)
            process.env.FLOWISE_USERNAME = flags.FLOWISE_USERNAME;
        if (flags.FLOWISE_PASSWORD)
            process.env.FLOWISE_PASSWORD = flags.FLOWISE_PASSWORD;
        if (flags.APIKEY_PATH)
            process.env.APIKEY_PATH = flags.APIKEY_PATH;
        // Storage
        if (flags.BLOB_STORAGE_PATH)
            process.env.BLOB_STORAGE_PATH = flags.BLOB_STORAGE_PATH;
        //API Configuration
        if (flags.FLOWISE_FILE_SIZE_LIMIT)
            process.env.FLOWISE_FILE_SIZE_LIMIT = flags.FLOWISE_FILE_SIZE_LIMIT;
        // Credentials
        if (flags.SECRETKEY_PATH)
            process.env.SECRETKEY_PATH = flags.SECRETKEY_PATH;
        if (flags.FLOWISE_SECRETKEY_OVERWRITE)
            process.env.FLOWISE_SECRETKEY_OVERWRITE = flags.FLOWISE_SECRETKEY_OVERWRITE;
        // Logs
        if (flags.LOG_PATH)
            process.env.LOG_PATH = flags.LOG_PATH;
        if (flags.LOG_LEVEL)
            process.env.LOG_LEVEL = flags.LOG_LEVEL;
        // Tool functions
        if (flags.TOOL_FUNCTION_BUILTIN_DEP)
            process.env.TOOL_FUNCTION_BUILTIN_DEP = flags.TOOL_FUNCTION_BUILTIN_DEP;
        if (flags.TOOL_FUNCTION_EXTERNAL_DEP)
            process.env.TOOL_FUNCTION_EXTERNAL_DEP = flags.TOOL_FUNCTION_EXTERNAL_DEP;
        // Database config
        if (flags.DATABASE_TYPE)
            process.env.DATABASE_TYPE = flags.DATABASE_TYPE;
        if (flags.DATABASE_PATH)
            process.env.DATABASE_PATH = flags.DATABASE_PATH;
        if (flags.DATABASE_PORT)
            process.env.DATABASE_PORT = flags.DATABASE_PORT;
        if (flags.DATABASE_HOST)
            process.env.DATABASE_HOST = flags.DATABASE_HOST;
        if (flags.DATABASE_NAME)
            process.env.DATABASE_NAME = flags.DATABASE_NAME;
        if (flags.DATABASE_USER)
            process.env.DATABASE_USER = flags.DATABASE_USER;
        if (flags.DATABASE_PASSWORD)
            process.env.DATABASE_PASSWORD = flags.DATABASE_PASSWORD;
        if (flags.DATABASE_SSL)
            process.env.DATABASE_SSL = flags.DATABASE_SSL;
        if (flags.DATABASE_SSL_KEY_BASE64)
            process.env.DATABASE_SSL_KEY_BASE64 = flags.DATABASE_SSL_KEY_BASE64;
        // Langsmith tracing
        if (flags.LANGCHAIN_TRACING_V2)
            process.env.LANGCHAIN_TRACING_V2 = flags.LANGCHAIN_TRACING_V2;
        if (flags.LANGCHAIN_ENDPOINT)
            process.env.LANGCHAIN_ENDPOINT = flags.LANGCHAIN_ENDPOINT;
        if (flags.LANGCHAIN_API_KEY)
            process.env.LANGCHAIN_API_KEY = flags.LANGCHAIN_API_KEY;
        if (flags.LANGCHAIN_PROJECT)
            process.env.LANGCHAIN_PROJECT = flags.LANGCHAIN_PROJECT;
        // Telemetry
        if (flags.DISABLE_FLOWISE_TELEMETRY)
            process.env.DISABLE_FLOWISE_TELEMETRY = flags.DISABLE_FLOWISE_TELEMETRY;
        // Disable langchain warnings
        process.env.LANGCHAIN_SUPPRESS_MIGRATION_WARNINGS = 'true';
        // Model list config
        if (flags.MODEL_LIST_CONFIG_JSON)
            process.env.MODEL_LIST_CONFIG_JSON = flags.MODEL_LIST_CONFIG_JSON;
        await (async () => {
            try {
                logger_1.default.info('Starting Flowise...');
                await DataSource.init();
                await Server.start();
            }
            catch (error) {
                logger_1.default.error('There was an error starting Flowise...', error);
                processExitCode = EXIT_CODE.FAILED;
                // @ts-ignore
                process.emit('SIGINT');
            }
        })();
    }
}
exports.default = Start;
Start.args = [];
Start.flags = {
    FLOWISE_USERNAME: core_1.Flags.string(),
    FLOWISE_PASSWORD: core_1.Flags.string(),
    FLOWISE_FILE_SIZE_LIMIT: core_1.Flags.string(),
    PORT: core_1.Flags.string(),
    CORS_ORIGINS: core_1.Flags.string(),
    IFRAME_ORIGINS: core_1.Flags.string(),
    DEBUG: core_1.Flags.string(),
    BLOB_STORAGE_PATH: core_1.Flags.string(),
    APIKEY_PATH: core_1.Flags.string(),
    SECRETKEY_PATH: core_1.Flags.string(),
    FLOWISE_SECRETKEY_OVERWRITE: core_1.Flags.string(),
    LOG_PATH: core_1.Flags.string(),
    LOG_LEVEL: core_1.Flags.string(),
    TOOL_FUNCTION_BUILTIN_DEP: core_1.Flags.string(),
    TOOL_FUNCTION_EXTERNAL_DEP: core_1.Flags.string(),
    NUMBER_OF_PROXIES: core_1.Flags.string(),
    DATABASE_TYPE: core_1.Flags.string(),
    DATABASE_PATH: core_1.Flags.string(),
    DATABASE_PORT: core_1.Flags.string(),
    DATABASE_HOST: core_1.Flags.string(),
    DATABASE_NAME: core_1.Flags.string(),
    DATABASE_USER: core_1.Flags.string(),
    DATABASE_PASSWORD: core_1.Flags.string(),
    DATABASE_SSL: core_1.Flags.string(),
    DATABASE_SSL_KEY_BASE64: core_1.Flags.string(),
    LANGCHAIN_TRACING_V2: core_1.Flags.string(),
    LANGCHAIN_ENDPOINT: core_1.Flags.string(),
    LANGCHAIN_API_KEY: core_1.Flags.string(),
    LANGCHAIN_PROJECT: core_1.Flags.string(),
    DISABLE_FLOWISE_TELEMETRY: core_1.Flags.string(),
    MODEL_LIST_CONFIG_JSON: core_1.Flags.string()
};
//# sourceMappingURL=start.js.map