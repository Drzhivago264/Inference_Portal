import { ClientResult } from "./parsers/client";
import { DeviceResult } from "./parsers/device";
import { Result as OperatingSystemResult } from "./parsers/operating-system";
import BotParser = require("./parsers/bot");
declare namespace DeviceDetector {
    interface DeviceDetectorResult {
        client: ClientResult;
        device: DeviceResult;
        os: OperatingSystemResult;
        bot: BotParser.DeviceDetectorBotResult;
    }
    interface DeviceDetectorOptions {
        skipBotDetection: boolean;
        versionTruncation: 0 | 1 | 2 | 3 | null;
    }
}
declare class DeviceDetector {
    private clientParser;
    private deviceParser;
    private operatingSystemParser;
    private vendorFragmentParser;
    private botParser;
    private readonly options;
    constructor(options?: Partial<DeviceDetector.DeviceDetectorOptions>);
    parse: (userAgent: string) => DeviceDetector.DeviceDetectorResult;
    private hasAndroidMobileFragment;
    private hasAndroidTabletFragment;
    private hasDesktopFragment;
    private isDesktop;
    private usesMobileBrowser;
    private isToucheEnabled;
    private createDeviceObject;
}
export = DeviceDetector;
