"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md_1 = require("./md");
describe("Callout", () => {
    test("parses callout without emoji", () => {
        const text = "Call out text content.";
        expect((0, md_1.callout)(text)).toBe(`> ${text}`);
    });
    test("parses callout with emoji", () => {
        const text = "Call out text content.";
        expect((0, md_1.callout)(text, {
            type: "emoji",
            emoji: "😍",
        })).toBe(`> 😍 ${text}`);
    });
});
describe("Markdown Table", () => {
    test("parse simple table to markdown table", () => {
        const mockTable = [
            ["number", "char"],
            ["1", "a"],
            ["2", "b"],
        ];
        expect((0, md_1.table)(mockTable)).toBe(`
| number | char |
| ------ | ---- |
| 1      | a    |
| 2      | b    |
    `.trim());
    });
});
describe("Text Annotations", () => {
    test("Inline Code", () => {
        expect((0, md_1.inlineCode)("simple text")).toBe("`simple text`");
    });
    test("Code Block", () => {
        expect((0, md_1.codeBlock)("simple text", "javascript")).toBe(`\`\`\`javascript
simple text
\`\`\``.trim());
    });
    test("Inline Equation", () => {
        expect((0, md_1.inlineEquation)("E = mc^2")).toBe("$E = mc^2$");
    });
    test("Equation Block", () => {
        expect((0, md_1.equation)("E = mc^2")).toBe(`$$
E = mc^2
$$`.trim());
    });
    test("Bold", () => {
        expect((0, md_1.bold)("simple text")).toBe("**simple text**");
    });
    test("Italic", () => {
        expect((0, md_1.italic)("simple text")).toBe("_simple text_");
    });
    test("StrikeThrough", () => {
        expect((0, md_1.strikethrough)("simple text")).toBe("~~simple text~~");
    });
    test("Underline", () => {
        expect((0, md_1.underline)("simple text")).toBe("<u>simple text</u>");
    });
});
describe("Headings", () => {
    test("Heading 1", () => {
        expect((0, md_1.heading1)("simple text")).toBe("# simple text");
    });
    test("Heading 2", () => {
        expect((0, md_1.heading2)("simple text")).toBe("## simple text");
    });
    test("Heading 3", () => {
        expect((0, md_1.heading3)("simple text")).toBe("### simple text");
    });
});
describe("List Elements", () => {
    test("Bullet", () => {
        expect((0, md_1.bullet)("simple text")).toBe("- simple text");
    });
    test("Checked todo", () => {
        expect((0, md_1.todo)("simple text", true)).toBe("- [x] simple text");
    });
    test("Unchecked todo", () => {
        expect((0, md_1.todo)("simple text", false)).toBe("- [ ] simple text");
    });
});
describe("Image", () => {
    test("Image with alt text", async () => {
        expect(await (0, md_1.image)("simple text", "https://example.com/image", false)).toBe(`![simple text](https://example.com/image)`);
    });
    test("Image to Base64", async () => {
        const image_markdown = await (0, md_1.image)("simple text", "https://w.wallhaven.cc/full/ex/wallhaven-ex9gwo.png", true);
        expect(image_markdown).toMatch(`![simple text](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAYAAADo08FDAAAgAElEQVR4Aby9O5OlW5r`);
    });
});
describe("Toggle", () => {
    const noSpaces = (text) => text.replace(/\s+/g, "");
    test("displays content if toggle title is empty", () => {
        expect(noSpaces((0, md_1.toggle)(undefined, "content"))).toBe("content");
    });
    test("return empty string if title and content are empty", () => {
        expect(noSpaces((0, md_1.toggle)(undefined, undefined))).toBe("");
    });
    test("Displays toggle with <details> and <summary>", () => {
        expect(noSpaces((0, md_1.toggle)("title", "content"))).toBe("<details><summary>title</summary>content</details>");
    });
});
//# sourceMappingURL=md.spec.js.map