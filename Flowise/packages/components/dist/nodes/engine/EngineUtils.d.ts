import { BaseNode, Metadata } from 'llamaindex';
export declare const reformatSourceDocuments: (sourceNodes: BaseNode<Metadata>[]) => {
    pageContent: any;
    metadata: Metadata;
}[];
