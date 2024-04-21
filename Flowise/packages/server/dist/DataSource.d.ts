import 'reflect-metadata';
import { DataSource } from 'typeorm';
export declare const init: () => Promise<void>;
export declare function getDataSource(): DataSource;
