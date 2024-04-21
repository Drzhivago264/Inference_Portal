import { IVisionChatModal, ICommonObject, IFileUpload, IMultiModalOption, INodeData, MessageContentImageUrl } from './Interface';
export declare const addImagesToMessages: (nodeData: INodeData, options: ICommonObject, multiModalOption?: IMultiModalOption) => MessageContentImageUrl[];
export declare const getAudioUploads: (uploads: IFileUpload[]) => IFileUpload[];
export declare const getImageUploads: (uploads: IFileUpload[]) => IFileUpload[];
export declare const llmSupportsVision: (value: any) => value is IVisionChatModal;
