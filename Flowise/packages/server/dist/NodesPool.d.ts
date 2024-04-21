import { IComponentNodes, IComponentCredentials } from './Interface';
export declare class NodesPool {
    componentNodes: IComponentNodes;
    componentCredentials: IComponentCredentials;
    private credentialIconPath;
    /**
     * Initialize to get all nodes & credentials
     */
    initialize(): Promise<void>;
    /**
     * Initialize nodes
     */
    private initializeNodes;
    /**
     * Initialize credentials
     */
    private initializeCredentials;
    /**
     * Recursive function to get node files
     * @param {string} dir
     * @returns {string[]}
     */
    private getFiles;
}
