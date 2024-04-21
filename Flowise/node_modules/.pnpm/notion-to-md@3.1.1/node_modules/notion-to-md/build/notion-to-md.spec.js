"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notion_to_md_1 = require("./notion-to-md");
describe("setCustomTransformer", () => {
    test("blockToMarkdown sends parsing block to customTransformer", () => {
        const customTransformerMock = jest.fn();
        const n2m = new notion_to_md_1.NotionToMarkdown({ notionClient: {} });
        n2m.setCustomTransformer("test", customTransformerMock);
        n2m.blockToMarkdown({
            id: "test",
            name: "test",
            type: "test",
            test: { foo: "bar" },
        });
        expect(customTransformerMock).toHaveBeenCalledWith(expect.objectContaining({
            type: "test",
            test: { foo: "bar" },
        }));
    });
    test("supports only one customTransformer per type ", () => {
        const customTransformerMock1 = jest.fn();
        const customTransformerMock2 = jest.fn();
        const n2m = new notion_to_md_1.NotionToMarkdown({ notionClient: {} });
        n2m.setCustomTransformer("test", customTransformerMock1);
        n2m.setCustomTransformer("test", customTransformerMock2);
        n2m.blockToMarkdown({
            id: "test",
            name: "test",
            type: "test",
            test: { foo: "bar" },
        });
        expect(customTransformerMock1).not.toHaveBeenCalled();
        expect(customTransformerMock2).toHaveBeenCalled();
    });
    test("customTransformer implementation works", async () => {
        const customTransformerMock = jest.fn();
        customTransformerMock.mockImplementation(async () => {
            return "hello";
        });
        const n2m = new notion_to_md_1.NotionToMarkdown({ notionClient: {} });
        n2m.setCustomTransformer("divider", customTransformerMock);
        const md = await n2m.blockToMarkdown({
            id: "test",
            type: "divider",
            divider: {},
            object: "block",
        });
        expect(md).toBe("hello");
    });
    test("customTransformer default implementation works", async () => {
        const customTransformerMock = jest.fn();
        customTransformerMock.mockImplementation(async () => {
            return false;
        });
        const n2m = new notion_to_md_1.NotionToMarkdown({ notionClient: {} });
        n2m.setCustomTransformer("divider", customTransformerMock);
        const md = await n2m.blockToMarkdown({
            id: "test",
            type: "divider",
            divider: {},
            object: "block",
        });
        expect(md).toBe("---");
    });
});
//# sourceMappingURL=notion-to-md.spec.js.map