import { IAssistant } from '../../Interface';
export declare class Assistant implements IAssistant {
    id: string;
    details: string;
    credential: string;
    iconSrc?: string;
    createdDate: Date;
    updatedDate: Date;
}
