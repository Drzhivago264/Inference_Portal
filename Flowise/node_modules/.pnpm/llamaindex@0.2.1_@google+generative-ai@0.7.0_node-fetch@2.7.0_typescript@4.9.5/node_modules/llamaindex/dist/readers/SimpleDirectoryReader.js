import { PapaCSVReader } from "./CSVReader.js";
import { DocxReader } from "./DocxReader.js";
import { HTMLReader } from "./HTMLReader.js";
import { ImageReader } from "./ImageReader.js";
import { MarkdownReader } from "./MarkdownReader.js";
import { PDFReader } from "./PDFReader.js";
import { SimpleDirectoryReader as EdgeSimpleDirectoryReader } from "./SimpleDirectoryReader.edge.js";
import { TextFileReader } from "./TextFileReader.js";
export const FILE_EXT_TO_READER = {
    txt: new TextFileReader(),
    pdf: new PDFReader(),
    csv: new PapaCSVReader(),
    md: new MarkdownReader(),
    docx: new DocxReader(),
    htm: new HTMLReader(),
    html: new HTMLReader(),
    jpg: new ImageReader(),
    jpeg: new ImageReader(),
    png: new ImageReader(),
    gif: new ImageReader()
};
/**
 * Read all the documents in a directory.
 * By default, supports the list of file types
 * in the FILE_EXT_TO_READER map.
 */ export class SimpleDirectoryReader extends EdgeSimpleDirectoryReader {
    async loadData(params) {
        if (typeof params === "string") {
            params = {
                directoryPath: params
            };
        }
        params.fileExtToReader = params.fileExtToReader ?? FILE_EXT_TO_READER;
        return super.loadData(params);
    }
}
