"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const http_status_codes_1 = require("http-status-codes");
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
// Get all component credentials
const getAllComponentsCredentials = async () => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        const dbResponse = [];
        for (const credName in appServer.nodesPool.componentCredentials) {
            const clonedCred = (0, lodash_1.cloneDeep)(appServer.nodesPool.componentCredentials[credName]);
            dbResponse.push(clonedCred);
        }
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: componentsCredentialsService.getAllComponentsCredentials - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
const getComponentByName = async (credentialName) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (!credentialName.includes('&amp;')) {
            if (Object.prototype.hasOwnProperty.call(appServer.nodesPool.componentCredentials, credentialName)) {
                return appServer.nodesPool.componentCredentials[credentialName];
            }
            else {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: componentsCredentialsService.getSingleComponentsCredential - Credential ${credentialName} not found`);
            }
        }
        else {
            const dbResponse = [];
            for (const name of credentialName.split('&amp;')) {
                if (Object.prototype.hasOwnProperty.call(appServer.nodesPool.componentCredentials, name)) {
                    dbResponse.push(appServer.nodesPool.componentCredentials[name]);
                }
                else {
                    throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: componentsCredentialsService.getSingleComponentsCredential - Credential ${name} not found`);
                }
            }
            return dbResponse;
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: componentsCredentialsService.getSingleComponentsCredential - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
// Returns specific component credential icon via name
const getSingleComponentsCredentialIcon = async (credentialName) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (Object.prototype.hasOwnProperty.call(appServer.nodesPool.componentCredentials, credentialName)) {
            const credInstance = appServer.nodesPool.componentCredentials[credentialName];
            if (credInstance.icon === undefined) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${credentialName} icon not found`);
            }
            if (credInstance.icon.endsWith('.svg') || credInstance.icon.endsWith('.png') || credInstance.icon.endsWith('.jpg')) {
                const filepath = credInstance.icon;
                return filepath;
            }
            else {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Credential ${credentialName} icon is missing icon`);
            }
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Credential ${credentialName} not found`);
        }
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: componentsCredentialsService.getSingleComponentsCredentialIcon - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getAllComponentsCredentials,
    getComponentByName,
    getSingleComponentsCredentialIcon
};
//# sourceMappingURL=index.js.map