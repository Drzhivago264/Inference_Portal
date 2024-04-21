import { GenericDeviceResult } from "../../typings/device";
export default class NotebooksParser {
    parse: (userAgent: string) => GenericDeviceResult;
}
