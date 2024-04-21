import { IUpsertHistory } from '../../Interface';
export declare class UpsertHistory implements IUpsertHistory {
    id: string;
    chatflowid: string;
    result: string;
    flowData: string;
    date: Date;
}
