import { ICredential } from '../../Interface';
export declare class Credential implements ICredential {
    id: string;
    name: string;
    credentialName: string;
    encryptedData: string;
    createdDate: Date;
    updatedDate: Date;
}
