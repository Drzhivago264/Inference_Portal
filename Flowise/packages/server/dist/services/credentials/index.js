"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const http_status_codes_1 = require("http-status-codes");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const Credential_1 = require("../../database/entities/Credential");
const utils_1 = require("../../utils");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_2 = require("../../errors/utils");
const createCredential = async (requestBody) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const newCredential = await (0, utils_1.transformToCredentialEntity)(requestBody);
        const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).create(newCredential);
        const dbResponse = await appServer.AppDataSource.getRepository(Credential_1.Credential).save(credential);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: credentialsService.createCredential - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
// Delete all credentials from chatflowid
const deleteCredentials = async (credentialId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = await appServer.AppDataSource.getRepository(Credential_1.Credential).delete({ id: credentialId });
        if (!dbResponse) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${credentialId} not found`);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: credentialsService.deleteCredential - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getAllCredentials = async (paramCredentialName) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        let dbResponse = [];
        if (paramCredentialName) {
            if (Array.isArray(paramCredentialName)) {
                for (let i = 0; i < paramCredentialName.length; i += 1) {
                    const name = paramCredentialName[i];
                    const credentials = await appServer.AppDataSource.getRepository(Credential_1.Credential).findBy({
                        credentialName: name
                    });
                    dbResponse.push(...credentials);
                }
            }
            else {
                const credentials = await appServer.AppDataSource.getRepository(Credential_1.Credential).findBy({
                    credentialName: paramCredentialName
                });
                dbResponse = [...credentials];
            }
        }
        else {
            const credentials = await appServer.AppDataSource.getRepository(Credential_1.Credential).find();
            for (const credential of credentials) {
                dbResponse.push((0, lodash_1.omit)(credential, ['encryptedData']));
            }
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: credentialsService.getAllCredentials - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const getCredentialById = async (credentialId) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
            id: credentialId
        });
        if (!credential) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${credentialId} not found`);
        }
        // Decrpyt credentialData
        const decryptedCredentialData = await (0, utils_1.decryptCredentialData)(credential.encryptedData, credential.credentialName, appServer.nodesPool.componentCredentials);
        const returnCredential = Object.assign(Object.assign({}, credential), { plainDataObj: decryptedCredentialData });
        const dbResponse = (0, lodash_1.omit)(returnCredential, ['encryptedData']);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: credentialsService.createCredential - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
const updateCredential = async (credentialId, requestBody) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const credential = await appServer.AppDataSource.getRepository(Credential_1.Credential).findOneBy({
            id: credentialId
        });
        if (!credential) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${credentialId} not found`);
        }
        const updateCredential = await (0, utils_1.transformToCredentialEntity)(requestBody);
        await appServer.AppDataSource.getRepository(Credential_1.Credential).merge(credential, updateCredential);
        const dbResponse = await appServer.AppDataSource.getRepository(Credential_1.Credential).save(credential);
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: credentialsService.updateCredential - ${(0, utils_2.getErrorMessage)(error)}`);
    }
};
exports.default = {
    createCredential,
    deleteCredentials,
    getAllCredentials,
    getCredentialById,
    updateCredential
};
//# sourceMappingURL=index.js.map