import { ITool } from '../../Interface';
export declare class Tool implements ITool {
    id: string;
    name: string;
    description: string;
    color: string;
    iconSrc?: string;
    schema?: string;
    func?: string;
    createdDate: Date;
    updatedDate: Date;
}
