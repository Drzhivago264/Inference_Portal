"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const client_1 = __importDefault(require("./parsers/client"));
const device_1 = __importDefault(require("./parsers/device"));
const operating_system_1 = __importDefault(require("./parsers/operating-system"));
const vendor_fragment_1 = __importDefault(require("./parsers/vendor-fragment"));
const browser_1 = __importDefault(require("./parsers/client/browser"));
const BotParser = require("./parsers/bot");
const user_agent_1 = require("./utils/user-agent");
const version_compare_1 = require("./utils/version-compare");
class DeviceDetector {
    constructor(options) {
        // Default options
        this.options = {
            skipBotDetection: false,
            versionTruncation: 1
        };
        this.parse = (userAgent) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            const result = {
                client: this.clientParser.parse(userAgent),
                os: this.operatingSystemParser.parse(userAgent),
                device: this.deviceParser.parse(userAgent),
                bot: this.options.skipBotDetection ? null : this.botParser.parse(userAgent)
            };
            const osName = (_a = result.os) === null || _a === void 0 ? void 0 : _a.name;
            const osVersion = (_b = result.os) === null || _b === void 0 ? void 0 : _b.version;
            const osFamily = operating_system_1.default.getOsFamily(osName || "");
            if (!((_c = result.device) === null || _c === void 0 ? void 0 : _c.brand)) {
                const brand = this.vendorFragmentParser.parse(userAgent);
                if (brand) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.brand = brand;
                }
            }
            /**
             * Assume all devices running iOS / Mac OS are from Apple
             */
            if (!((_d = result.device) === null || _d === void 0 ? void 0 : _d.brand) && ["Apple TV", "watchOS", "iOS", "Mac"].includes(osName || "")) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.brand = "Apple";
            }
            /**
             * Chrome on Android passes the device type based on the keyword 'Mobile'
             * If it is present the device should be a smartphone, otherwise it's a tablet
             * See https://developer.chrome.com/multidevice/user-agent#chrome_for_android_user_agent
             * Note: We do not check for browser (family) here, as there might be mobile apps using Chrome, that won't have
             *       a detected browser, but can still be detected. So we check the useragent for Chrome instead.
             */
            if (!((_e = result.device) === null || _e === void 0 ? void 0 : _e.type) && osFamily === "Android" && user_agent_1.userAgentParser("Chrome/[\\.0-9]*", userAgent)) {
                if (user_agent_1.userAgentParser("Chrome/[.0-9]* (?:Mobile|eliboM)", userAgent)) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.type = "smartphone";
                }
                else if (user_agent_1.userAgentParser("Chrome/[.0-9]* (?!Mobile)", userAgent)) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.type = "tablet";
                }
            }
            /**
             * Some user agents simply contain the fragment 'Android; Tablet;' or 'Opera Tablet', so we assume those devices are tablets
             */
            if (!((_f = result.device) === null || _f === void 0 ? void 0 : _f.type) && this.hasAndroidTabletFragment(userAgent) || user_agent_1.userAgentParser("Opera Tablet", userAgent)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "tablet";
            }
            /**
             * Some user agents simply contain the fragment 'Android; Mobile;', so we assume those devices are smartphones
             */
            if (!((_g = result.device) === null || _g === void 0 ? void 0 : _g.type) && this.hasAndroidMobileFragment(userAgent)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "smartphone";
            }
            /**
             * Android up to 3.0 was designed for smartphones only. But as 3.0, which was tablet only, was published
             * too late, there were a bunch of tablets running with 2.x
             * With 4.0 the two trees were merged and it is for smartphones and tablets
             *
             * So were are expecting that all devices running Android < 2 are smartphones
             * Devices running Android 3.X are tablets. Device type of Android 2.X and 4.X+ are unknown
             */
            if (!((_h = result.device) === null || _h === void 0 ? void 0 : _h.type) && osName === "Android" && osVersion !== "") {
                if (version_compare_1.versionCompare(osVersion, "2.0") === -1) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.type = "smartphone";
                }
                else if (version_compare_1.versionCompare(osVersion, "3.0") >= 0 && version_compare_1.versionCompare(osVersion, "4.0") === -1) {
                    if (!result.device) {
                        result.device = this.createDeviceObject();
                    }
                    result.device.type = "tablet";
                }
            }
            /**
             * All detected feature phones running android are more likely smartphones
             */
            if (((_j = result.device) === null || _j === void 0 ? void 0 : _j.type) === "feature phone" && osFamily === "Android") {
                result.device.type = "smartphone";
            }
            /**
             * According to http://msdn.microsoft.com/en-us/library/ie/hh920767(v=vs.85).aspx
             * Internet Explorer 10 introduces the "Touch" UA string token. If this token is present at the end of the
             * UA string, the computer has touch capability, and is running Windows 8 (or later).
             * This UA string will be transmitted on a touch-enabled system running Windows 8 (RT)
             *
             * As most touch enabled devices are tablets and only a smaller part are desktops/notebooks we assume that
             * all Windows 8 touch devices are tablets.
             */
            if (!((_k = result.device) === null || _k === void 0 ? void 0 : _k.type)
                && this.isToucheEnabled(userAgent)
                && (osName === "Windows RT"
                    || (osName === "Windows"
                        && version_compare_1.versionCompare(osVersion, "8.0") >= 0))) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "tablet";
            }
            /**
             * All devices running Opera TV Store are assumed to be televisions
             */
            if (user_agent_1.userAgentParser("Opera TV Store", userAgent)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "television";
            }
            /**
             * All devices running Tizen TV or SmartTV are assumed to be televisions
             */
            if (user_agent_1.userAgentParser("SmartTV|Tizen.+ TV .+$", userAgent)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "television";
            }
            /**
             * Devices running Kylo or Espital TV Browsers are assumed to be televisions
             */
            if (!((_l = result.device) === null || _l === void 0 ? void 0 : _l.type) && ["Kylo", "Espial TV Browser"].includes(((_m = result.client) === null || _m === void 0 ? void 0 : _m.name) || "")) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "television";
            }
            /**
             * Set device type to desktop if string ua contains desktop
             */
            const hasDesktop = "desktop" !== ((_o = result.device) === null || _o === void 0 ? void 0 : _o.type)
                && null !== user_agent_1.userAgentParser("Desktop", userAgent)
                && this.hasDesktopFragment(userAgent);
            if (hasDesktop) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "desktop";
            }
            // set device type to desktop for all devices running a desktop os that were not detected as an other device type
            if (!((_p = result.device) === null || _p === void 0 ? void 0 : _p.type) && this.isDesktop(result, osFamily)) {
                if (!result.device) {
                    result.device = this.createDeviceObject();
                }
                result.device.type = "desktop";
            }
            return result;
        };
        this.hasAndroidMobileFragment = (userAgent) => {
            return user_agent_1.userAgentParser("Android( [\.0-9]+)?; Mobile;", userAgent);
        };
        this.hasAndroidTabletFragment = (userAgent) => {
            return user_agent_1.userAgentParser("Android( [\.0-9]+)?; Tablet;", userAgent);
        };
        this.hasDesktopFragment = (userAgent) => {
            return user_agent_1.userAgentParser("Desktop (x(?:32|64)|WOW64);", userAgent);
        };
        this.isDesktop = (result, osFamily) => {
            if (!result.os) {
                return false;
            }
            // Check for browsers available for mobile devices only
            if (this.usesMobileBrowser(result.client)) {
                return false;
            }
            return operating_system_1.default.getDesktopOsArray().includes(osFamily);
        };
        this.usesMobileBrowser = (client) => {
            var _a, _b;
            if (!client)
                return false;
            return ((_a = client) === null || _a === void 0 ? void 0 : _a.type) === "browser" && browser_1.default.isMobileOnlyBrowser((_b = client) === null || _b === void 0 ? void 0 : _b.name);
        };
        this.isToucheEnabled = (userAgent) => {
            return user_agent_1.userAgentParser("Touch", userAgent);
        };
        this.createDeviceObject = () => ({
            type: "",
            brand: "",
            model: ""
        });
        this.options = Object.assign(Object.assign({}, this.options), options);
        this.clientParser = new client_1.default(this.options);
        this.deviceParser = new device_1.default();
        this.operatingSystemParser = new operating_system_1.default(this.options);
        this.vendorFragmentParser = new vendor_fragment_1.default();
        this.botParser = new BotParser();
    }
}
module.exports = DeviceDetector;
