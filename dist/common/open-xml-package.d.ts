import JSZip from "jszip";
import { XmlParser } from "../parser/xml-parser";
import { Relationship } from "./relationship";
export interface OpenXmlPackageOptions {
    trimXmlDeclaration: boolean;
    keepOrigin: boolean;
}
export declare class OpenXmlPackage {
    private _zip;
    options: OpenXmlPackageOptions;
    xmlParser: XmlParser;
    constructor(_zip: JSZip, options: OpenXmlPackageOptions);
    get(path: string): any;
    update(path: string, content: any): void;
    static load(input: Blob | any, options: OpenXmlPackageOptions): Promise<OpenXmlPackage>;
    save(type?: any): Promise<any>;
    load(path: string, type?: JSZip.OutputType): Promise<any>;
    loadRelationships(path?: string): Promise<Relationship[]>;
    parseXmlDocument(txt: string): Document;
}
