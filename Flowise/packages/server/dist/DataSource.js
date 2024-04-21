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
exports.getDataSource = exports.init = void 0;
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const typeorm_1 = require("typeorm");
const utils_1 = require("./utils");
const entities_1 = require("./database/entities");
const sqlite_1 = require("./database/migrations/sqlite");
const mysql_1 = require("./database/migrations/mysql");
const postgres_1 = require("./database/migrations/postgres");
let appDataSource;
const init = async () => {
    var _a, _b;
    let homePath;
    let flowisePath = path_1.default.join((0, utils_1.getUserHome)(), '.flowise');
    if (!fs.existsSync(flowisePath)) {
        fs.mkdirSync(flowisePath);
    }
    switch (process.env.DATABASE_TYPE) {
        case 'sqlite':
            homePath = (_a = process.env.DATABASE_PATH) !== null && _a !== void 0 ? _a : flowisePath;
            appDataSource = new typeorm_1.DataSource({
                type: 'sqlite',
                database: path_1.default.resolve(homePath, 'database.sqlite'),
                synchronize: false,
                migrationsRun: false,
                entities: Object.values(entities_1.entities),
                migrations: sqlite_1.sqliteMigrations
            });
            break;
        case 'mysql':
            appDataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT || '3306'),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                charset: 'utf8mb4',
                synchronize: false,
                migrationsRun: false,
                entities: Object.values(entities_1.entities),
                migrations: mysql_1.mysqlMigrations,
                ssl: getDatabaseSSLFromEnv()
            });
            break;
        case 'postgres':
            appDataSource = new typeorm_1.DataSource({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT || '5432'),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                ssl: getDatabaseSSLFromEnv(),
                synchronize: false,
                migrationsRun: false,
                entities: Object.values(entities_1.entities),
                migrations: postgres_1.postgresMigrations
            });
            break;
        default:
            homePath = (_b = process.env.DATABASE_PATH) !== null && _b !== void 0 ? _b : flowisePath;
            appDataSource = new typeorm_1.DataSource({
                type: 'sqlite',
                database: path_1.default.resolve(homePath, 'database.sqlite'),
                synchronize: false,
                migrationsRun: false,
                entities: Object.values(entities_1.entities),
                migrations: sqlite_1.sqliteMigrations
            });
            break;
    }
};
exports.init = init;
function getDataSource() {
    if (appDataSource === undefined) {
        (0, exports.init)();
    }
    return appDataSource;
}
exports.getDataSource = getDataSource;
const getDatabaseSSLFromEnv = () => {
    if (process.env.DATABASE_SSL_KEY_BASE64) {
        return {
            rejectUnauthorized: false,
            ca: Buffer.from(process.env.DATABASE_SSL_KEY_BASE64, 'base64')
        };
    }
    else if (process.env.DATABASE_SSL === 'true') {
        return true;
    }
    return undefined;
};
//# sourceMappingURL=DataSource.js.map