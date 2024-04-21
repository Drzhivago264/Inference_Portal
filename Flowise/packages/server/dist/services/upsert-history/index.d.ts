import { UpsertHistory } from '../../database/entities/UpsertHistory';
declare const _default: {
    getAllUpsertHistory: (sortOrder: string | undefined, chatflowid: string | undefined, startDate: string | undefined, endDate: string | undefined) => Promise<UpsertHistory[]>;
    patchDeleteUpsertHistory: (ids?: string[]) => Promise<any>;
};
export default _default;
