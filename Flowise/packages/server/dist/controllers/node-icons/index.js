"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRunningExpressApp_1 = require("../../utils/getRunningExpressApp");
const internalFlowiseError_1 = require("../../errors/internalFlowiseError");
const http_status_codes_1 = require("http-status-codes");
// Returns specific component node icon via name
const getSingleNodeIcon = async (req, res, next) => {
    try {
        const appServer = (0, getRunningExpressApp_1.getRunningExpressApp)();
        if (Object.prototype.hasOwnProperty.call(appServer.nodesPool.componentNodes, req.params.name)) {
            const nodeInstance = appServer.nodesPool.componentNodes[req.params.name];
            if (nodeInstance.icon === undefined) {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: nodeIconController.getSingleNodeIcon - Node ${req.params.name} icon not found`);
            }
            if (nodeInstance.icon.endsWith('.svg') || nodeInstance.icon.endsWith('.png') || nodeInstance.icon.endsWith('.jpg')) {
                const filepath = nodeInstance.icon;
                res.sendFile(filepath);
            }
            else {
                throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.PRECONDITION_FAILED, `Error: nodeIconController.getSingleNodeIcon - Node ${req.params.name} icon is missing icon`);
            }
        }
        else {
            throw new internalFlowiseError_1.InternalFlowiseError(http_status_codes_1.StatusCodes.NOT_FOUND, `Error: nodeIconController.getSingleNodeIcon - Node ${req.params.name} not found`);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getSingleNodeIcon
};
//# sourceMappingURL=index.js.map