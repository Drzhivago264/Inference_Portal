import { ICommonObject, IFileUpload } from './Interface';
export declare const convertSpeechToText: (upload: IFileUpload, speechToTextConfig: ICommonObject, options: ICommonObject) => Promise<string | undefined>;
