"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.llmSupportsVision = exports.getImageUploads = exports.getAudioUploads = exports.addImagesToMessages = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const fs_1 = __importDefault(require("fs"));
const addImagesToMessages = (nodeData, options, multiModalOption) => {
    const imageContent = [];
    let model = nodeData.inputs?.model;
    if ((0, exports.llmSupportsVision)(model) && multiModalOption) {
        // Image Uploaded
        if (multiModalOption.image && multiModalOption.image.allowImageUploads && options?.uploads && options?.uploads.length > 0) {
            const imageUploads = (0, exports.getImageUploads)(options.uploads);
            for (const upload of imageUploads) {
                let bf = upload.data;
                if (upload.type == 'stored-file') {
                    const filePath = path_1.default.join((0, utils_1.getStoragePath)(), options.chatflowid, options.chatId, upload.name);
                    // as the image is stored in the server, read the file and convert it to base64
                    const contents = fs_1.default.readFileSync(filePath);
                    bf = 'data:' + upload.mime + ';base64,' + contents.toString('base64');
                    imageContent.push({
                        type: 'image_url',
                        image_url: {
                            url: bf,
                            detail: multiModalOption.image.imageResolution ?? 'low'
                        }
                    });
                }
            }
        }
    }
    return imageContent;
};
exports.addImagesToMessages = addImagesToMessages;
const getAudioUploads = (uploads) => {
    return uploads.filter((upload) => upload.mime.startsWith('audio/'));
};
exports.getAudioUploads = getAudioUploads;
const getImageUploads = (uploads) => {
    return uploads.filter((upload) => upload.mime.startsWith('image/'));
};
exports.getImageUploads = getImageUploads;
const llmSupportsVision = (value) => !!value?.multiModalOption;
exports.llmSupportsVision = llmSupportsVision;
//# sourceMappingURL=multiModalUtils.js.map