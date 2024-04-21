"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const lodash_1 = require("lodash");
const documents_1 = require("@langchain/core/documents");
const typeorm_1 = require("@langchain/community/vectorstores/typeorm");
const utils_1 = require("../../../src/utils");
const indexing_1 = require("../../../src/indexing");
class Postgres_VectorStores {
    constructor() {
        //@ts-ignore
        this.vectorStoreMethods = {
            async upsert(nodeData, options) {
                const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
                const user = (0, utils_1.getCredentialParam)('user', credentialData, nodeData);
                const password = (0, utils_1.getCredentialParam)('password', credentialData, nodeData);
                const _tableName = nodeData.inputs?.tableName;
                const tableName = _tableName ? _tableName : 'documents';
                const docs = nodeData.inputs?.document;
                const embeddings = nodeData.inputs?.embeddings;
                const additionalConfig = nodeData.inputs?.additionalConfig;
                const recordManager = nodeData.inputs?.recordManager;
                let additionalConfiguration = {};
                if (additionalConfig) {
                    try {
                        additionalConfiguration = typeof additionalConfig === 'object' ? additionalConfig : JSON.parse(additionalConfig);
                    }
                    catch (exception) {
                        throw new Error('Invalid JSON in the Additional Configuration: ' + exception);
                    }
                }
                const postgresConnectionOptions = {
                    ...additionalConfiguration,
                    type: 'postgres',
                    host: nodeData.inputs?.host,
                    port: nodeData.inputs?.port,
                    username: user,
                    password: password,
                    database: nodeData.inputs?.database
                };
                const args = {
                    postgresConnectionOptions: postgresConnectionOptions,
                    tableName: tableName
                };
                const flattenDocs = docs && docs.length ? (0, lodash_1.flatten)(docs) : [];
                const finalDocs = [];
                for (let i = 0; i < flattenDocs.length; i += 1) {
                    if (flattenDocs[i] && flattenDocs[i].pageContent) {
                        finalDocs.push(new documents_1.Document(flattenDocs[i]));
                    }
                }
                try {
                    if (recordManager) {
                        const vectorStore = await typeorm_1.TypeORMVectorStore.fromDataSource(embeddings, args);
                        // Avoid Illegal invocation error
                        vectorStore.similaritySearchVectorWithScore = async (query, k, filter) => {
                            return await similaritySearchVectorWithScore(query, k, tableName, postgresConnectionOptions, filter);
                        };
                        await recordManager.createSchema();
                        const res = await (0, indexing_1.index)({
                            docsSource: finalDocs,
                            recordManager,
                            vectorStore,
                            options: {
                                cleanup: recordManager?.cleanup,
                                sourceIdKey: recordManager?.sourceIdKey ?? 'source',
                                vectorStoreName: tableName
                            }
                        });
                        return res;
                    }
                    else {
                        const vectorStore = await typeorm_1.TypeORMVectorStore.fromDocuments(finalDocs, embeddings, args);
                        // Avoid Illegal invocation error
                        vectorStore.similaritySearchVectorWithScore = async (query, k, filter) => {
                            return await similaritySearchVectorWithScore(query, k, tableName, postgresConnectionOptions, filter);
                        };
                        return { numAdded: finalDocs.length, addedDocs: finalDocs };
                    }
                }
                catch (e) {
                    throw new Error(e);
                }
            }
        };
        this.label = 'Postgres';
        this.name = 'postgres';
        this.version = 4.0;
        this.type = 'Postgres';
        this.icon = 'postgres.svg';
        this.category = 'Vector Stores';
        this.description = 'Upsert embedded data and perform similarity search upon query using pgvector on Postgres';
        this.baseClasses = [this.type, 'VectorStoreRetriever', 'BaseRetriever'];
        this.badge = 'NEW';
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['PostgresApi']
        };
        this.inputs = [
            {
                label: 'Document',
                name: 'document',
                type: 'Document',
                list: true,
                optional: true
            },
            {
                label: 'Embeddings',
                name: 'embeddings',
                type: 'Embeddings'
            },
            {
                label: 'Record Manager',
                name: 'recordManager',
                type: 'RecordManager',
                description: 'Keep track of the record to prevent duplication',
                optional: true
            },
            {
                label: 'Host',
                name: 'host',
                type: 'string'
            },
            {
                label: 'Database',
                name: 'database',
                type: 'string'
            },
            {
                label: 'Port',
                name: 'port',
                type: 'number',
                placeholder: '6432',
                optional: true
            },
            {
                label: 'Table Name',
                name: 'tableName',
                type: 'string',
                placeholder: 'documents',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Additional Configuration',
                name: 'additionalConfig',
                type: 'json',
                additionalParams: true,
                optional: true
            },
            {
                label: 'Top K',
                name: 'topK',
                description: 'Number of top results to fetch. Default to 4',
                placeholder: '4',
                type: 'number',
                additionalParams: true,
                optional: true
            }
        ];
        this.outputs = [
            {
                label: 'Postgres Retriever',
                name: 'retriever',
                baseClasses: this.baseClasses
            },
            {
                label: 'Postgres Vector Store',
                name: 'vectorStore',
                baseClasses: [this.type, ...(0, utils_1.getBaseClasses)(typeorm_1.TypeORMVectorStore)]
            }
        ];
    }
    async init(nodeData, _, options) {
        const credentialData = await (0, utils_1.getCredentialData)(nodeData.credential ?? '', options);
        const user = (0, utils_1.getCredentialParam)('user', credentialData, nodeData);
        const password = (0, utils_1.getCredentialParam)('password', credentialData, nodeData);
        const _tableName = nodeData.inputs?.tableName;
        const tableName = _tableName ? _tableName : 'documents';
        const embeddings = nodeData.inputs?.embeddings;
        const additionalConfig = nodeData.inputs?.additionalConfig;
        const output = nodeData.outputs?.output;
        const topK = nodeData.inputs?.topK;
        const k = topK ? parseFloat(topK) : 4;
        let additionalConfiguration = {};
        if (additionalConfig) {
            try {
                additionalConfiguration = typeof additionalConfig === 'object' ? additionalConfig : JSON.parse(additionalConfig);
            }
            catch (exception) {
                throw new Error('Invalid JSON in the Additional Configuration: ' + exception);
            }
        }
        const postgresConnectionOptions = {
            ...additionalConfiguration,
            type: 'postgres',
            host: nodeData.inputs?.host,
            port: nodeData.inputs?.port,
            username: user,
            user: user,
            password: password,
            database: nodeData.inputs?.database
        };
        const args = {
            postgresConnectionOptions: postgresConnectionOptions,
            tableName: tableName
        };
        const vectorStore = await typeorm_1.TypeORMVectorStore.fromDataSource(embeddings, args);
        // Rewrite the method to use pg pool connection instead of the default connection
        /* Otherwise a connection error is displayed when the chain tries to execute the function
            [chain/start] [1:chain:ConversationalRetrievalQAChain] Entering Chain run with input: { "question": "what the document is about", "chat_history": [] }
            [retriever/start] [1:chain:ConversationalRetrievalQAChain > 2:retriever:VectorStoreRetriever] Entering Retriever run with input: { "query": "what the document is about" }
            [ERROR]: uncaughtException:  Illegal invocation TypeError: Illegal invocation at Socket.ref (node:net:1524:18) at Connection.ref (.../node_modules/pg/lib/connection.js:183:17) at Client.ref (.../node_modules/pg/lib/client.js:591:21) at BoundPool._pulseQueue (/node_modules/pg-pool/index.js:148:28) at .../node_modules/pg-pool/index.js:184:37 at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
        */
        vectorStore.similaritySearchVectorWithScore = async (query, k, filter) => {
            return await similaritySearchVectorWithScore(query, k, tableName, postgresConnectionOptions, filter);
        };
        if (output === 'retriever') {
            const retriever = vectorStore.asRetriever(k);
            return retriever;
        }
        else if (output === 'vectorStore') {
            ;
            vectorStore.k = k;
            return vectorStore;
        }
        return vectorStore;
    }
}
const similaritySearchVectorWithScore = async (query, k, tableName, postgresConnectionOptions, filter) => {
    const embeddingString = `[${query.join(',')}]`;
    const _filter = filter ?? '{}';
    const queryString = `
        SELECT *, embedding <=> $1 as "_distance"
        FROM ${tableName}
        WHERE metadata @> $2
        ORDER BY "_distance" ASC
        LIMIT $3;`;
    const pool = new pg_1.Pool(postgresConnectionOptions);
    const conn = await pool.connect();
    const documents = await conn.query(queryString, [embeddingString, _filter, k]);
    conn.release();
    const results = [];
    for (const doc of documents.rows) {
        if (doc._distance != null && doc.pageContent != null) {
            const document = new documents_1.Document(doc);
            document.id = doc.id;
            results.push([document, doc._distance]);
        }
    }
    return results;
};
module.exports = { nodeClass: Postgres_VectorStores };
//# sourceMappingURL=Postgres.js.map