declare const _default: {
    createApiKey: (keyName: string) => Promise<any>;
    deleteApiKey: (id: string) => Promise<any>;
    getAllApiKeys: () => Promise<any>;
    updateApiKey: (id: string, keyName: string) => Promise<any>;
    verifyApiKey: (paramApiKey: string) => Promise<any>;
};
export default _default;
