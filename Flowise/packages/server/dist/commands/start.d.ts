import { Command } from '@oclif/core';
export default class Start extends Command {
    static args: never[];
    static flags: {
        FLOWISE_USERNAME: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        FLOWISE_PASSWORD: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        FLOWISE_FILE_SIZE_LIMIT: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        PORT: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        CORS_ORIGINS: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        IFRAME_ORIGINS: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DEBUG: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        BLOB_STORAGE_PATH: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        APIKEY_PATH: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        SECRETKEY_PATH: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        FLOWISE_SECRETKEY_OVERWRITE: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        LOG_PATH: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        LOG_LEVEL: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        TOOL_FUNCTION_BUILTIN_DEP: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        TOOL_FUNCTION_EXTERNAL_DEP: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        NUMBER_OF_PROXIES: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DATABASE_TYPE: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DATABASE_PATH: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DATABASE_PORT: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DATABASE_HOST: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DATABASE_NAME: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DATABASE_USER: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DATABASE_PASSWORD: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DATABASE_SSL: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DATABASE_SSL_KEY_BASE64: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        LANGCHAIN_TRACING_V2: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        LANGCHAIN_ENDPOINT: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        LANGCHAIN_API_KEY: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        LANGCHAIN_PROJECT: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        DISABLE_FLOWISE_TELEMETRY: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        MODEL_LIST_CONFIG_JSON: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
    };
    stopProcess(): Promise<void>;
    run(): Promise<void>;
}
