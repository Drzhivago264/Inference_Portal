/// <reference types="qs" />
import { Request } from 'express';
import { Server } from 'socket.io';
declare const _default: {
    buildChatflow: (fullRequest: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, ioServer: Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>) => Promise<any>;
};
export default _default;
