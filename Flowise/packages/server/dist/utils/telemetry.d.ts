import { PostHog } from 'posthog-node';
export declare class Telemetry {
    postHog?: PostHog;
    constructor();
    id(): Promise<string>;
    sendTelemetry(event: string, properties?: {}): Promise<void>;
    flush(): Promise<void>;
}
