import { IVariable } from '../../Interface';
export declare class Variable implements IVariable {
    id: string;
    name: string;
    value: string;
    type: string;
    createdDate: Date;
    updatedDate: Date;
}
