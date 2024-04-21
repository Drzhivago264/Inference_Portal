"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flowise_components_1 = require("flowise-components");
const http_status_codes_1 = require("http-status-codes");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const utils_1 = require("../../errors/utils");
const getAllLinks = async (requestUrl, relativeLinksMethod, queryLimit) => {
    try {
        const url = decodeURIComponent(requestUrl);
        if (!relativeLinksMethod) {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Please choose a Relative Links Method in Additional Parameters!`);
        }
        const limit = parseInt(queryLimit);
        if (process.env.DEBUG === 'true')
            console.info(`Start ${relativeLinksMethod}`);
        const links = relativeLinksMethod === 'webCrawl' ? await (0, flowise_components_1.webCrawl)(url, limit) : await (0, flowise_components_1.xmlScrape)(url, limit);
        if (process.env.DEBUG === 'true')
            console.info(`Finish ${relativeLinksMethod}`);
        const dbResponse = {
            status: 'OK',
            links
        };
        return dbResponse;
    }
    catch (error) {
        throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, `Error: fetchLinksService.getAllLinks - ${(0, utils_1.getErrorMessage)(error)}`);
    }
};
exports.default = {
    getAllLinks
};
//# sourceMappingURL=index.js.map