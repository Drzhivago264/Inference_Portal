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
exports.getStoragePath = exports.prepareSandboxVars = exports.getVars = exports.convertMultiOptionsToStringArray = exports.convertBaseMessagetoIMessage = exports.flattenObject = exports.convertSchemaToZod = exports.serializeChatHistory = exports.convertChatHistoryToText = exports.mapChatMessageToBaseMessage = exports.getUserHome = exports.handleEscapeCharacters = exports.getCredentialParam = exports.getCredentialData = exports.getEncryptionKeyPath = exports.getEnvironmentVariable = exports.xmlScrape = exports.getURLsFromXML = exports.webCrawl = exports.getAvailableURLs = exports.getInputVariables = exports.getNodeModulesPackagePath = exports.handleErrorMessage = exports.serializeQueryParams = exports.getBaseClasses = exports.defaultAllowBuiltInDep = exports.availableDependencies = exports.notEmptyRegex = exports.numberOrExpressionRegex = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const jsdom_1 = require("jsdom");
const zod_1 = require("zod");
const crypto_js_1 = require("crypto-js");
const messages_1 = require("@langchain/core/messages");
exports.numberOrExpressionRegex = '^(\\d+\\.?\\d*|{{.*}})$'; //return true if string consists only numbers OR expression {{}}
exports.notEmptyRegex = '(.|\\s)*\\S(.|\\s)*'; //return true if string is not empty or blank
/*
 * List of dependencies allowed to be import in vm2
 */
exports.availableDependencies = [
    '@aws-sdk/client-bedrock-runtime',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/client-s3',
    '@elastic/elasticsearch',
    '@dqbd/tiktoken',
    '@getzep/zep-js',
    '@gomomento/sdk',
    '@gomomento/sdk-core',
    '@google-ai/generativelanguage',
    '@google/generative-ai',
    '@huggingface/inference',
    '@notionhq/client',
    '@opensearch-project/opensearch',
    '@pinecone-database/pinecone',
    '@qdrant/js-client-rest',
    '@supabase/supabase-js',
    '@upstash/redis',
    '@zilliz/milvus2-sdk-node',
    'apify-client',
    'axios',
    'cheerio',
    'chromadb',
    'cohere-ai',
    'd3-dsv',
    'faiss-node',
    'form-data',
    'google-auth-library',
    'graphql',
    'html-to-text',
    'ioredis',
    'langchain',
    'langfuse',
    'langsmith',
    'linkifyjs',
    'lunary',
    'mammoth',
    'moment',
    'mongodb',
    'mysql2',
    'node-fetch',
    'node-html-markdown',
    'notion-to-md',
    'openai',
    'pdf-parse',
    'pdfjs-dist',
    'pg',
    'playwright',
    'puppeteer',
    'redis',
    'replicate',
    'srt-parser-2',
    'typeorm',
    'weaviate-ts-client'
];
exports.defaultAllowBuiltInDep = [
    'assert',
    'buffer',
    'crypto',
    'events',
    'http',
    'https',
    'net',
    'path',
    'querystring',
    'timers',
    'tls',
    'url',
    'zlib'
];
/**
 * Get base classes of components
 *
 * @export
 * @param {any} targetClass
 * @returns {string[]}
 */
const getBaseClasses = (targetClass) => {
    const baseClasses = [];
    const skipClassNames = ['BaseLangChain', 'Serializable'];
    if (targetClass instanceof Function) {
        let baseClass = targetClass;
        while (baseClass) {
            const newBaseClass = Object.getPrototypeOf(baseClass);
            if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
                baseClass = newBaseClass;
                if (!skipClassNames.includes(baseClass.name))
                    baseClasses.push(baseClass.name);
            }
            else {
                break;
            }
        }
    }
    return baseClasses;
};
exports.getBaseClasses = getBaseClasses;
/**
 * Serialize axios query params
 *
 * @export
 * @param {any} params
 * @param {boolean} skipIndex // Set to true if you want same params to be: param=1&param=2 instead of: param[0]=1&param[1]=2
 * @returns {string}
 */
function serializeQueryParams(params, skipIndex) {
    const parts = [];
    const encode = (val) => {
        return encodeURIComponent(val)
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']');
    };
    const convertPart = (key, val) => {
        if (val instanceof Date)
            val = val.toISOString();
        else if (val instanceof Object)
            val = JSON.stringify(val);
        parts.push(encode(key) + '=' + encode(val));
    };
    Object.entries(params).forEach(([key, val]) => {
        if (val === null || typeof val === 'undefined')
            return;
        if (Array.isArray(val))
            val.forEach((v, i) => convertPart(`${key}${skipIndex ? '' : `[${i}]`}`, v));
        else
            convertPart(key, val);
    });
    return parts.join('&');
}
exports.serializeQueryParams = serializeQueryParams;
/**
 * Handle error from try catch
 *
 * @export
 * @param {any} error
 * @returns {string}
 */
function handleErrorMessage(error) {
    let errorMessage = '';
    if (error.message) {
        errorMessage += error.message + '. ';
    }
    if (error.response && error.response.data) {
        if (error.response.data.error) {
            if (typeof error.response.data.error === 'object')
                errorMessage += JSON.stringify(error.response.data.error) + '. ';
            else if (typeof error.response.data.error === 'string')
                errorMessage += error.response.data.error + '. ';
        }
        else if (error.response.data.msg)
            errorMessage += error.response.data.msg + '. ';
        else if (error.response.data.Message)
            errorMessage += error.response.data.Message + '. ';
        else if (typeof error.response.data === 'string')
            errorMessage += error.response.data + '. ';
    }
    if (!errorMessage)
        errorMessage = 'Unexpected Error.';
    return errorMessage;
}
exports.handleErrorMessage = handleErrorMessage;
/**
 * Returns the path of node modules package
 * @param {string} packageName
 * @returns {string}
 */
const getNodeModulesPackagePath = (packageName) => {
    const checkPaths = [
        path.join(__dirname, '..', 'node_modules', packageName),
        path.join(__dirname, '..', '..', 'node_modules', packageName),
        path.join(__dirname, '..', '..', '..', 'node_modules', packageName),
        path.join(__dirname, '..', '..', '..', '..', 'node_modules', packageName),
        path.join(__dirname, '..', '..', '..', '..', '..', 'node_modules', packageName)
    ];
    for (const checkPath of checkPaths) {
        if (fs.existsSync(checkPath)) {
            return checkPath;
        }
    }
    return '';
};
exports.getNodeModulesPackagePath = getNodeModulesPackagePath;
/**
 * Get input variables
 * @param {string} paramValue
 * @returns {boolean}
 */
const getInputVariables = (paramValue) => {
    if (typeof paramValue !== 'string')
        return [];
    let returnVal = paramValue;
    const variableStack = [];
    const inputVariables = [];
    let startIdx = 0;
    const endIdx = returnVal.length;
    while (startIdx < endIdx) {
        const substr = returnVal.substring(startIdx, startIdx + 1);
        // Store the opening double curly bracket
        if (substr === '{') {
            variableStack.push({ substr, startIdx: startIdx + 1 });
        }
        // Found the complete variable
        if (substr === '}' && variableStack.length > 0 && variableStack[variableStack.length - 1].substr === '{') {
            const variableStartIdx = variableStack[variableStack.length - 1].startIdx;
            const variableEndIdx = startIdx;
            const variableFullPath = returnVal.substring(variableStartIdx, variableEndIdx);
            inputVariables.push(variableFullPath);
            variableStack.pop();
        }
        startIdx += 1;
    }
    return inputVariables;
};
exports.getInputVariables = getInputVariables;
/**
 * Crawl all available urls given a domain url and limit
 * @param {string} url
 * @param {number} limit
 * @returns {string[]}
 */
const getAvailableURLs = async (url, limit) => {
    try {
        const availableUrls = [];
        console.info(`Crawling: ${url}`);
        availableUrls.push(url);
        const response = await axios_1.default.get(url);
        const $ = (0, cheerio_1.load)(response.data);
        const relativeLinks = $("a[href^='/']");
        console.info(`Available Relative Links: ${relativeLinks.length}`);
        if (relativeLinks.length === 0)
            return availableUrls;
        limit = Math.min(limit + 1, relativeLinks.length); // limit + 1 is because index start from 0 and index 0 is occupy by url
        console.info(`True Limit: ${limit}`);
        // availableUrls.length cannot exceed limit
        for (let i = 0; availableUrls.length < limit; i++) {
            if (i === limit)
                break; // some links are repetitive so it won't added into the array which cause the length to be lesser
            console.info(`index: ${i}`);
            const element = relativeLinks[i];
            const relativeUrl = $(element).attr('href');
            if (!relativeUrl)
                continue;
            const absoluteUrl = new URL(relativeUrl, url).toString();
            if (!availableUrls.includes(absoluteUrl)) {
                availableUrls.push(absoluteUrl);
                console.info(`Found unique relative link: ${absoluteUrl}`);
            }
        }
        return availableUrls;
    }
    catch (err) {
        throw new Error(`getAvailableURLs: ${err?.message}`);
    }
};
exports.getAvailableURLs = getAvailableURLs;
/**
 * Search for href through htmlBody string
 * @param {string} htmlBody
 * @param {string} baseURL
 * @returns {string[]}
 */
function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new jsdom_1.JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    const urls = [];
    for (const linkElement of linkElements) {
        try {
            const urlObj = new URL(linkElement.href, baseURL);
            urls.push(urlObj.href);
        }
        catch (err) {
            if (process.env.DEBUG === 'true')
                console.error(`error with scraped URL: ${err.message}`);
            continue;
        }
    }
    return urls;
}
/**
 * Normalize URL to prevent crawling the same page
 * @param {string} urlString
 * @returns {string}
 */
function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = urlObj.hostname + urlObj.pathname;
    if (hostPath.length > 0 && hostPath.slice(-1) == '/') {
        // handling trailing slash
        return hostPath.slice(0, -1);
    }
    return hostPath;
}
/**
 * Recursive crawl using normalizeURL and getURLsFromHTML
 * @param {string} baseURL
 * @param {string} currentURL
 * @param {string[]} pages
 * @param {number} limit
 * @returns {Promise<string[]>}
 */
async function crawl(baseURL, currentURL, pages, limit) {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (limit !== 0 && pages.length === limit)
        return pages;
    if (baseURLObj.hostname !== currentURLObj.hostname)
        return pages;
    const normalizeCurrentURL = baseURLObj.protocol + '//' + normalizeURL(currentURL);
    if (pages.includes(normalizeCurrentURL)) {
        return pages;
    }
    pages.push(normalizeCurrentURL);
    if (process.env.DEBUG === 'true')
        console.info(`actively crawling ${currentURL}`);
    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399) {
            if (process.env.DEBUG === 'true')
                console.error(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`);
            return pages;
        }
        const contentType = resp.headers.get('content-type');
        if ((contentType && !contentType.includes('text/html')) || !contentType) {
            if (process.env.DEBUG === 'true')
                console.error(`non html response, content type: ${contentType}, on page: ${currentURL}`);
            return pages;
        }
        const htmlBody = await resp.text();
        const nextURLs = getURLsFromHTML(htmlBody, currentURL);
        for (const nextURL of nextURLs) {
            pages = await crawl(baseURL, nextURL, pages, limit);
        }
    }
    catch (err) {
        if (process.env.DEBUG === 'true')
            console.error(`error in fetch url: ${err.message}, on page: ${currentURL}`);
    }
    return pages;
}
/**
 * Prep URL before passing into recursive crawl function
 * @param {string} stringURL
 * @param {number} limit
 * @returns {Promise<string[]>}
 */
async function webCrawl(stringURL, limit) {
    const URLObj = new URL(stringURL);
    const modifyURL = stringURL.slice(-1) === '/' ? stringURL.slice(0, -1) : stringURL;
    return await crawl(URLObj.protocol + '//' + URLObj.hostname, modifyURL, [], limit);
}
exports.webCrawl = webCrawl;
function getURLsFromXML(xmlBody, limit) {
    const dom = new jsdom_1.JSDOM(xmlBody, { contentType: 'text/xml' });
    const linkElements = dom.window.document.querySelectorAll('url');
    const urls = [];
    for (const linkElement of linkElements) {
        const locElement = linkElement.querySelector('loc');
        if (limit !== 0 && urls.length === limit)
            break;
        if (locElement?.textContent) {
            urls.push(locElement.textContent);
        }
    }
    return urls;
}
exports.getURLsFromXML = getURLsFromXML;
async function xmlScrape(currentURL, limit) {
    let urls = [];
    if (process.env.DEBUG === 'true')
        console.info(`actively scarping ${currentURL}`);
    try {
        const resp = await fetch(currentURL);
        if (resp.status > 399) {
            if (process.env.DEBUG === 'true')
                console.error(`error in fetch with status code: ${resp.status}, on page: ${currentURL}`);
            return urls;
        }
        const contentType = resp.headers.get('content-type');
        if ((contentType && !contentType.includes('application/xml') && !contentType.includes('text/xml')) || !contentType) {
            if (process.env.DEBUG === 'true')
                console.error(`non xml response, content type: ${contentType}, on page: ${currentURL}`);
            return urls;
        }
        const xmlBody = await resp.text();
        urls = getURLsFromXML(xmlBody, limit);
    }
    catch (err) {
        if (process.env.DEBUG === 'true')
            console.error(`error in fetch url: ${err.message}, on page: ${currentURL}`);
    }
    return urls;
}
exports.xmlScrape = xmlScrape;
/**
 * Get env variables
 * @param {string} name
 * @returns {string | undefined}
 */
const getEnvironmentVariable = (name) => {
    try {
        return typeof process !== 'undefined' ? process.env?.[name] : undefined;
    }
    catch (e) {
        return undefined;
    }
};
exports.getEnvironmentVariable = getEnvironmentVariable;
/**
 * Returns the path of encryption key
 * @returns {string}
 */
const getEncryptionKeyFilePath = () => {
    const checkPaths = [
        path.join(__dirname, '..', '..', 'encryption.key'),
        path.join(__dirname, '..', '..', 'server', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', 'server', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', '..', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', '..', 'server', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', '..', '..', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', '..', '..', 'server', 'encryption.key'),
        path.join((0, exports.getUserHome)(), '.flowise', 'encryption.key')
    ];
    for (const checkPath of checkPaths) {
        if (fs.existsSync(checkPath)) {
            return checkPath;
        }
    }
    return '';
};
const getEncryptionKeyPath = () => {
    return process.env.SECRETKEY_PATH ? path.join(process.env.SECRETKEY_PATH, 'encryption.key') : getEncryptionKeyFilePath();
};
exports.getEncryptionKeyPath = getEncryptionKeyPath;
/**
 * Returns the encryption key
 * @returns {Promise<string>}
 */
const getEncryptionKey = async () => {
    if (process.env.FLOWISE_SECRETKEY_OVERWRITE !== undefined && process.env.FLOWISE_SECRETKEY_OVERWRITE !== '') {
        return process.env.FLOWISE_SECRETKEY_OVERWRITE;
    }
    try {
        return await fs.promises.readFile((0, exports.getEncryptionKeyPath)(), 'utf8');
    }
    catch (error) {
        throw new Error(error);
    }
};
/**
 * Decrypt credential data
 * @param {string} encryptedData
 * @param {string} componentCredentialName
 * @param {IComponentCredentials} componentCredentials
 * @returns {Promise<ICommonObject>}
 */
const decryptCredentialData = async (encryptedData) => {
    const encryptKey = await getEncryptionKey();
    const decryptedData = crypto_js_1.AES.decrypt(encryptedData, encryptKey);
    try {
        return JSON.parse(decryptedData.toString(crypto_js_1.enc.Utf8));
    }
    catch (e) {
        console.error(e);
        throw new Error('Credentials could not be decrypted.');
    }
};
/**
 * Get credential data
 * @param {string} selectedCredentialId
 * @param {ICommonObject} options
 * @returns {Promise<ICommonObject>}
 */
const getCredentialData = async (selectedCredentialId, options) => {
    const appDataSource = options.appDataSource;
    const databaseEntities = options.databaseEntities;
    try {
        if (!selectedCredentialId) {
            return {};
        }
        const credential = await appDataSource.getRepository(databaseEntities['Credential']).findOneBy({
            id: selectedCredentialId
        });
        if (!credential)
            return {};
        // Decrypt credentialData
        const decryptedCredentialData = await decryptCredentialData(credential.encryptedData);
        return decryptedCredentialData;
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.getCredentialData = getCredentialData;
const getCredentialParam = (paramName, credentialData, nodeData) => {
    return nodeData.inputs[paramName] ?? credentialData[paramName] ?? undefined;
};
exports.getCredentialParam = getCredentialParam;
// reference https://www.freeformatter.com/json-escape.html
const jsonEscapeCharacters = [
    { escape: '"', value: 'FLOWISE_DOUBLE_QUOTE' },
    { escape: '\n', value: 'FLOWISE_NEWLINE' },
    { escape: '\b', value: 'FLOWISE_BACKSPACE' },
    { escape: '\f', value: 'FLOWISE_FORM_FEED' },
    { escape: '\r', value: 'FLOWISE_CARRIAGE_RETURN' },
    { escape: '\t', value: 'FLOWISE_TAB' },
    { escape: '\\', value: 'FLOWISE_BACKSLASH' }
];
function handleEscapesJSONParse(input, reverse) {
    for (const element of jsonEscapeCharacters) {
        input = reverse ? input.replaceAll(element.value, element.escape) : input.replaceAll(element.escape, element.value);
    }
    return input;
}
function iterateEscapesJSONParse(input, reverse) {
    for (const element in input) {
        const type = typeof input[element];
        if (type === 'string')
            input[element] = handleEscapesJSONParse(input[element], reverse);
        else if (type === 'object')
            input[element] = iterateEscapesJSONParse(input[element], reverse);
    }
    return input;
}
function handleEscapeCharacters(input, reverse) {
    const type = typeof input;
    if (type === 'string')
        return handleEscapesJSONParse(input, reverse);
    else if (type === 'object')
        return iterateEscapesJSONParse(input, reverse);
    return input;
}
exports.handleEscapeCharacters = handleEscapeCharacters;
/**
 * Get user home dir
 * @returns {string}
 */
const getUserHome = () => {
    let variableName = 'HOME';
    if (process.platform === 'win32') {
        variableName = 'USERPROFILE';
    }
    if (process.env[variableName] === undefined) {
        // If for some reason the variable does not exist, fall back to current folder
        return process.cwd();
    }
    return process.env[variableName];
};
exports.getUserHome = getUserHome;
/**
 * Map ChatMessage to BaseMessage
 * @param {IChatMessage[]} chatmessages
 * @returns {BaseMessage[]}
 */
const mapChatMessageToBaseMessage = (chatmessages = []) => {
    const chatHistory = [];
    for (const message of chatmessages) {
        if (message.role === 'apiMessage') {
            chatHistory.push(new messages_1.AIMessage(message.content));
        }
        else if (message.role === 'userMessage') {
            chatHistory.push(new messages_1.HumanMessage(message.content));
        }
    }
    return chatHistory;
};
exports.mapChatMessageToBaseMessage = mapChatMessageToBaseMessage;
/**
 * Convert incoming chat history to string
 * @param {IMessage[]} chatHistory
 * @returns {string}
 */
const convertChatHistoryToText = (chatHistory = []) => {
    return chatHistory
        .map((chatMessage) => {
        if (chatMessage.type === 'apiMessage') {
            return `Assistant: ${chatMessage.message}`;
        }
        else if (chatMessage.type === 'userMessage') {
            return `Human: ${chatMessage.message}`;
        }
        else {
            return `${chatMessage.message}`;
        }
    })
        .join('\n');
};
exports.convertChatHistoryToText = convertChatHistoryToText;
/**
 * Serialize array chat history to string
 * @param {string | Array<string>} chatHistory
 * @returns {string}
 */
const serializeChatHistory = (chatHistory) => {
    if (Array.isArray(chatHistory)) {
        return chatHistory.join('\n');
    }
    return chatHistory;
};
exports.serializeChatHistory = serializeChatHistory;
/**
 * Convert schema to zod schema
 * @param {string | object} schema
 * @returns {ICommonObject}
 */
const convertSchemaToZod = (schema) => {
    try {
        const parsedSchema = typeof schema === 'string' ? JSON.parse(schema) : schema;
        const zodObj = {};
        for (const sch of parsedSchema) {
            if (sch.type === 'string') {
                if (sch.required)
                    zod_1.z.string({ required_error: `${sch.property} required` }).describe(sch.description);
                zodObj[sch.property] = zod_1.z.string().describe(sch.description);
            }
            else if (sch.type === 'number') {
                if (sch.required)
                    zod_1.z.number({ required_error: `${sch.property} required` }).describe(sch.description);
                zodObj[sch.property] = zod_1.z.number().describe(sch.description);
            }
            else if (sch.type === 'boolean') {
                if (sch.required)
                    zod_1.z.boolean({ required_error: `${sch.property} required` }).describe(sch.description);
                zodObj[sch.property] = zod_1.z.boolean().describe(sch.description);
            }
        }
        return zodObj;
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.convertSchemaToZod = convertSchemaToZod;
/**
 * Flatten nested object
 * @param {ICommonObject} obj
 * @param {string} parentKey
 * @returns {ICommonObject}
 */
const flattenObject = (obj, parentKey) => {
    let result = {};
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const _key = parentKey ? parentKey + '.' + key : key;
        if (typeof value === 'object') {
            result = { ...result, ...(0, exports.flattenObject)(value, _key) };
        }
        else {
            result[_key] = value;
        }
    });
    return result;
};
exports.flattenObject = flattenObject;
/**
 * Convert BaseMessage to IMessage
 * @param {BaseMessage[]} messages
 * @returns {IMessage[]}
 */
const convertBaseMessagetoIMessage = (messages) => {
    const formatmessages = [];
    for (const m of messages) {
        if (m._getType() === 'human') {
            formatmessages.push({
                message: m.content,
                type: 'userMessage'
            });
        }
        else if (m._getType() === 'ai') {
            formatmessages.push({
                message: m.content,
                type: 'apiMessage'
            });
        }
        else if (m._getType() === 'system') {
            formatmessages.push({
                message: m.content,
                type: 'apiMessage'
            });
        }
    }
    return formatmessages;
};
exports.convertBaseMessagetoIMessage = convertBaseMessagetoIMessage;
/**
 * Convert MultiOptions String to String Array
 * @param {string} inputString
 * @returns {string[]}
 */
const convertMultiOptionsToStringArray = (inputString) => {
    let ArrayString = [];
    try {
        ArrayString = JSON.parse(inputString);
    }
    catch (e) {
        ArrayString = [];
    }
    return ArrayString;
};
exports.convertMultiOptionsToStringArray = convertMultiOptionsToStringArray;
/**
 * Get variables
 * @param {DataSource} appDataSource
 * @param {IDatabaseEntity} databaseEntities
 * @param {INodeData} nodeData
 */
const getVars = async (appDataSource, databaseEntities, nodeData) => {
    const variables = (await appDataSource.getRepository(databaseEntities['Variable']).find()) ?? [];
    // override variables defined in overrideConfig
    // nodeData.inputs.variables is an Object, check each property and override the variable
    if (nodeData?.inputs?.vars) {
        for (const propertyName of Object.getOwnPropertyNames(nodeData.inputs.vars)) {
            const foundVar = variables.find((v) => v.name === propertyName);
            if (foundVar) {
                // even if the variable was defined as runtime, we override it with static value
                foundVar.type = 'static';
                foundVar.value = nodeData.inputs.vars[propertyName];
            }
            else {
                // add it the variables, if not found locally in the db
                variables.push({ name: propertyName, type: 'static', value: nodeData.inputs.vars[propertyName] });
            }
        }
    }
    return variables;
};
exports.getVars = getVars;
/**
 * Prepare sandbox variables
 * @param {IVariable[]} variables
 */
const prepareSandboxVars = (variables) => {
    let vars = {};
    if (variables) {
        for (const item of variables) {
            let value = item.value;
            // read from .env file
            if (item.type === 'runtime') {
                value = process.env[item.name] ?? '';
            }
            Object.defineProperty(vars, item.name, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: value
            });
        }
    }
    return vars;
};
exports.prepareSandboxVars = prepareSandboxVars;
/**
 * Prepare storage path
 */
const getStoragePath = () => {
    return process.env.BLOB_STORAGE_PATH ? path.join(process.env.BLOB_STORAGE_PATH) : path.join((0, exports.getUserHome)(), '.flowise', 'storage');
};
exports.getStoragePath = getStoragePath;
//# sourceMappingURL=utils.js.map