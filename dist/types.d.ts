declare module "document/dom" {
    export enum DomType {
        Document = "document",
        Paragraph = "paragraph",
        Run = "run",
        Break = "break",
        NoBreakHyphen = "noBreakHyphen",
        Table = "table",
        Row = "row",
        Cell = "cell",
        Hyperlink = "hyperlink",
        Drawing = "drawing",
        Image = "image",
        Text = "text",
        Tab = "tab",
        Symbol = "symbol",
        BookmarkStart = "bookmarkStart",
        BookmarkEnd = "bookmarkEnd",
        Footer = "footer",
        Header = "header",
        FootnoteReference = "footnoteReference",
        EndnoteReference = "endnoteReference",
        Footnote = "footnote",
        Endnote = "endnote",
        SimpleField = "simpleField",
        ComplexField = "complexField",
        Instruction = "instruction",
        VmlPicture = "vmlPicture",
        MmlMath = "mmlMath",
        MmlMathParagraph = "mmlMathParagraph",
        MmlFraction = "mmlFraction",
        MmlFunction = "mmlFunction",
        MmlFunctionName = "mmlFunctionName",
        MmlNumerator = "mmlNumerator",
        MmlDenominator = "mmlDenominator",
        MmlRadical = "mmlRadical",
        MmlBase = "mmlBase",
        MmlDegree = "mmlDegree",
        MmlSuperscript = "mmlSuperscript",
        MmlSubscript = "mmlSubscript",
        MmlPreSubSuper = "mmlPreSubSuper",
        MmlSubArgument = "mmlSubArgument",
        MmlSuperArgument = "mmlSuperArgument",
        MmlNary = "mmlNary",
        MmlDelimiter = "mmlDelimiter",
        MmlRun = "mmlRun",
        MmlEquationArray = "mmlEquationArray",
        MmlLimit = "mmlLimit",
        MmlLimitLower = "mmlLimitLower",
        MmlMatrix = "mmlMatrix",
        MmlMatrixRow = "mmlMatrixRow",
        MmlBox = "mmlBox",
        MmlBar = "mmlBar",
        MmlGroupChar = "mmlGroupChar",
        VmlElement = "vmlElement",
        Inserted = "inserted",
        Deleted = "deleted",
        DeletedText = "deletedText",
        Comment = "comment",
        CommentReference = "commentReference",
        CommentRangeStart = "commentRangeStart",
        CommentRangeEnd = "commentRangeEnd"
    }
    export interface OpenXmlElement {
        type: DomType;
        children?: OpenXmlElement[];
        cssStyle?: Record<string, string>;
        props?: Record<string, any>;
        styleName?: string;
        className?: string;
        parent?: OpenXmlElement;
    }
    export abstract class OpenXmlElementBase implements OpenXmlElement {
        type: DomType;
        children?: OpenXmlElement[];
        cssStyle?: Record<string, string>;
        props?: Record<string, any>;
        className?: string;
        styleName?: string;
        parent?: OpenXmlElement;
    }
    export interface WmlHyperlink extends OpenXmlElement {
        id?: string;
        href?: string;
    }
    export interface WmlNoteReference extends OpenXmlElement {
        id: string;
    }
    export interface WmlBreak extends OpenXmlElement {
        break: "page" | "lastRenderedPageBreak" | "textWrapping";
    }
    export interface WmlText extends OpenXmlElement {
        text: string;
    }
    export interface WmlSymbol extends OpenXmlElement {
        font: string;
        char: string;
    }
    export interface WmlTable extends OpenXmlElement {
        columns?: WmlTableColumn[];
        cellStyle?: Record<string, string>;
        colBandSize?: number;
        rowBandSize?: number;
    }
    export interface WmlTableRow extends OpenXmlElement {
        isHeader?: boolean;
    }
    export interface WmlTableCell extends OpenXmlElement {
        verticalMerge?: 'restart' | 'continue' | string;
        span?: number;
    }
    export interface IDomImage extends OpenXmlElement {
        src: string;
    }
    export interface WmlTableColumn {
        width?: string;
    }
    export interface IDomNumbering {
        id: string;
        level: number;
        start: number;
        pStyleName: string;
        pStyle: Record<string, string>;
        rStyle: Record<string, string>;
        levelText?: string;
        suff: string;
        format?: string;
        bullet?: NumberingPicBullet;
    }
    export interface NumberingPicBullet {
        id: number;
        src: string;
        style?: string;
    }
}
declare module "document/common" {
    import { XmlParser } from "parser/xml-parser";
    export const ns: {
        wordml: string;
        drawingml: string;
        picture: string;
        compatibility: string;
        math: string;
    };
    export type LengthType = "px" | "pt" | "%" | "";
    export type Length = string;
    export interface Font {
        name: string;
        family: string;
    }
    export interface CommonProperties {
        fontSize: Length;
        color: string;
    }
    export type LengthUsageType = {
        mul: number;
        unit: LengthType;
    };
    export const LengthUsage: Record<string, LengthUsageType>;
    export function convertLength(val: string, usage?: LengthUsageType): string;
    export function convertBoolean(v: string, defaultValue?: boolean): boolean;
    export function convertPercentage(val: string): number;
    export function parseCommonProperty(elem: Element, props: CommonProperties, xml: XmlParser): boolean;
}
declare module "parser/xml-parser" {
    import { Length, LengthUsageType } from "document/common";
    export function parseXmlString(xmlString: string, trimXmlDeclaration?: boolean): Document;
    export function serializeXmlString(elem: Node): string;
    export class XmlParser {
        elements(elem: Element, localName?: string): Element[];
        element(elem: Element, localName: string): Element;
        elementAttr(elem: Element, localName: string, attrLocalName: string): string;
        attrs(elem: Element): Attr[];
        attr(elem: Element, localName: string): string;
        intAttr(node: Element, attrName: string, defaultValue?: number): number;
        hexAttr(node: Element, attrName: string, defaultValue?: number): number;
        floatAttr(node: Element, attrName: string, defaultValue?: number): number;
        boolAttr(node: Element, attrName: string, defaultValue?: boolean): boolean;
        lengthAttr(node: Element, attrName: string, usage?: LengthUsageType): Length;
    }
    const globalXmlParser: XmlParser;
    export default globalXmlParser;
}
declare module "document/border" {
    import { XmlParser } from "parser/xml-parser";
    import { Length } from "document/common";
    export interface Border {
        color: string;
        type: string;
        size: Length;
        frame: boolean;
        shadow: boolean;
        offset: Length;
    }
    export interface Borders {
        top: Border;
        left: Border;
        right: Border;
        bottom: Border;
    }
    export function parseBorder(elem: Element, xml: XmlParser): Border;
    export function parseBorders(elem: Element, xml: XmlParser): Borders;
}
declare module "document/section" {
    import { XmlParser } from "parser/xml-parser";
    import { Borders } from "document/border";
    import { Length } from "document/common";
    export interface Column {
        space: Length;
        width: Length;
    }
    export interface Columns {
        space: Length;
        numberOfColumns: number;
        separator: boolean;
        equalWidth: boolean;
        columns: Column[];
    }
    export interface PageSize {
        width: Length;
        height: Length;
        orientation: "landscape" | string;
    }
    export interface PageNumber {
        start: number;
        chapSep: "colon" | "emDash" | "endash" | "hyphen" | "period" | string;
        chapStyle: string;
        format: "none" | "cardinalText" | "decimal" | "decimalEnclosedCircle" | "decimalEnclosedFullstop" | "decimalEnclosedParen" | "decimalZero" | "lowerLetter" | "lowerRoman" | "ordinalText" | "upperLetter" | "upperRoman" | string;
    }
    export interface PageMargins {
        top: Length;
        right: Length;
        bottom: Length;
        left: Length;
        header: Length;
        footer: Length;
        gutter: Length;
    }
    export enum SectionType {
        Continuous = "continuous",
        NextPage = "nextPage",
        NextColumn = "nextColumn",
        EvenPage = "evenPage",
        OddPage = "oddPage"
    }
    export interface FooterHeaderReference {
        id: string;
        type: string | "first" | "even" | "default";
    }
    export interface SectionProperties {
        type: SectionType | string;
        pageSize: PageSize;
        pageMargins: PageMargins;
        pageBorders: Borders;
        pageNumber: PageNumber;
        columns: Columns;
        footerRefs: FooterHeaderReference[];
        headerRefs: FooterHeaderReference[];
        titlePage: boolean;
    }
    export function parseSectionProperties(elem: Element, xml?: XmlParser): SectionProperties;
}
declare module "document/document" {
    import { OpenXmlElement } from "document/dom";
    import { SectionProperties } from "document/section";
    export interface DocumentElement extends OpenXmlElement {
        props: SectionProperties;
    }
}
declare module "document/line-spacing" {
    import { XmlParser } from "parser/xml-parser";
    import { Length } from "document/common";
    export interface LineSpacing {
        after: Length;
        before: Length;
        line: number;
        lineRule: "atLeast" | "exactly" | "auto";
    }
    export function parseLineSpacing(elem: Element, xml: XmlParser): LineSpacing;
}
declare module "document/run" {
    import { XmlParser } from "parser/xml-parser";
    import { CommonProperties } from "document/common";
    import { OpenXmlElement } from "document/dom";
    export interface WmlRun extends OpenXmlElement, RunProperties {
        id?: string;
        verticalAlign?: string;
        fieldRun?: boolean;
    }
    export interface RunProperties extends CommonProperties {
    }
    export function parseRunProperties(elem: Element, xml: XmlParser): RunProperties;
    export function parseRunProperty(elem: Element, props: RunProperties, xml: XmlParser): boolean;
}
declare module "document/paragraph" {
    import { OpenXmlElement } from "document/dom";
    import { CommonProperties, Length } from "document/common";
    import { Borders } from "document/border";
    import { SectionProperties } from "document/section";
    import { LineSpacing } from "document/line-spacing";
    import { XmlParser } from "parser/xml-parser";
    import { RunProperties } from "document/run";
    export interface WmlParagraph extends OpenXmlElement, ParagraphProperties {
    }
    export interface ParagraphProperties extends CommonProperties {
        sectionProps: SectionProperties;
        tabs: ParagraphTab[];
        numbering: ParagraphNumbering;
        border: Borders;
        textAlignment: "auto" | "baseline" | "bottom" | "center" | "top" | string;
        lineSpacing: LineSpacing;
        keepLines: boolean;
        keepNext: boolean;
        pageBreakBefore: boolean;
        outlineLevel: number;
        styleName?: string;
        runProps: RunProperties;
    }
    export interface ParagraphTab {
        style: "bar" | "center" | "clear" | "decimal" | "end" | "num" | "start" | "left" | "right";
        leader: "none" | "dot" | "heavy" | "hyphen" | "middleDot" | "underscore";
        position: Length;
    }
    export interface ParagraphNumbering {
        id: string;
        level: number;
    }
    export function parseParagraphProperties(elem: Element, xml: XmlParser): ParagraphProperties;
    export function parseParagraphProperty(elem: Element, props: ParagraphProperties, xml: XmlParser): boolean;
    export function parseTabs(elem: Element, xml: XmlParser): ParagraphTab[];
    export function parseNumbering(elem: Element, xml: XmlParser): ParagraphNumbering;
}
declare module "document/bookmarks" {
    import { XmlParser } from "parser/xml-parser";
    import { OpenXmlElement } from "document/dom";
    export interface WmlBookmarkStart extends OpenXmlElement {
        id: string;
        name: string;
        colFirst: number;
        colLast: number;
    }
    export interface WmlBookmarkEnd extends OpenXmlElement {
        id: string;
    }
    export function parseBookmarkStart(elem: Element, xml: XmlParser): WmlBookmarkStart;
    export function parseBookmarkEnd(elem: Element, xml: XmlParser): WmlBookmarkEnd;
}
declare module "document/style" {
    import { ParagraphProperties } from "document/paragraph";
    import { RunProperties } from "document/run";
    export interface IDomStyle {
        id: string;
        name?: string;
        cssName?: string;
        aliases?: string[];
        target: string;
        basedOn?: string;
        isDefault?: boolean;
        styles: IDomSubStyle[];
        linked?: string;
        next?: string;
        paragraphProps: ParagraphProperties;
        runProps: RunProperties;
    }
    export interface IDomSubStyle {
        target: string;
        mod?: string;
        values: Record<string, string>;
    }
}
declare module "document/fields" {
    import { OpenXmlElement } from "document/dom";
    export interface WmlInstructionText extends OpenXmlElement {
        text: string;
    }
    export interface WmlFieldChar extends OpenXmlElement {
        charType: 'begin' | 'end' | 'separate' | string;
        lock: boolean;
    }
    export interface WmlFieldSimple extends OpenXmlElement {
        instruction: string;
        lock: boolean;
        dirty: boolean;
    }
}
declare module "utils" {
    export function escapeClassName(className: string): string;
    export function splitPath(path: string): [string, string];
    export function resolvePath(path: string, base: string): string;
    export function keyBy<T = any>(array: T[], by: (x: T) => any): Record<any, T>;
    export function blobToBase64(blob: Blob): Promise<string>;
    export function isObject(item: any): boolean;
    export function isString(item: unknown): item is string;
    export function mergeDeep(target: any, ...sources: any[]): any;
    export function parseCssRules(text: string): Record<string, string>;
    export function formatCssRules(style: Record<string, string>): string;
    export function asArray<T>(val: T | T[]): T[];
}
declare module "vml/vml" {
    import { DocumentParser } from "document-parser";
    import { OpenXmlElementBase, DomType } from "document/dom";
    export class VmlElement extends OpenXmlElementBase {
        type: DomType;
        tagName: string;
        cssStyleText?: string;
        attrs: Record<string, string>;
        wrapType?: string;
        imageHref?: {
            id: string;
            title: string;
        };
    }
    export function parseVmlElement(elem: Element, parser: DocumentParser): VmlElement;
}
declare module "comments/elements" {
    import { DomType, OpenXmlElementBase } from "document/dom";
    export class WmlComment extends OpenXmlElementBase {
        type: DomType;
        id: string;
        author: string;
        initials: string;
        date: string;
    }
    export class WmlCommentReference extends OpenXmlElementBase {
        id?: string;
        type: DomType;
        constructor(id?: string);
    }
    export class WmlCommentRangeStart extends OpenXmlElementBase {
        id?: string;
        type: DomType;
        constructor(id?: string);
    }
    export class WmlCommentRangeEnd extends OpenXmlElementBase {
        id?: string;
        type: DomType;
        constructor(id?: string);
    }
}
declare module "document-parser" {
    import { WmlTable, IDomNumbering, WmlHyperlink, IDomImage, OpenXmlElement, WmlTableColumn, WmlTableCell, WmlTableRow, NumberingPicBullet } from "document/dom";
    import { DocumentElement } from "document/document";
    import { WmlParagraph } from "document/paragraph";
    import { WmlRun } from "document/run";
    import { IDomStyle, IDomSubStyle } from "document/style";
    export var autos: {
        shd: string;
        color: string;
        borderColor: string;
        highlight: string;
    };
    export interface DocumentParserOptions {
        ignoreWidth: boolean;
        debug: boolean;
    }
    export class DocumentParser {
        options: DocumentParserOptions;
        constructor(options?: Partial<DocumentParserOptions>);
        parseNotes(xmlDoc: Element, elemName: string, elemClass: any): any[];
        parseComments(xmlDoc: Element): any[];
        parseDocumentFile(xmlDoc: Element): DocumentElement;
        parseBackground(elem: Element): any;
        parseBodyElements(element: Element): OpenXmlElement[];
        parseStylesFile(xstyles: Element): IDomStyle[];
        parseDefaultStyles(node: Element): IDomStyle;
        parseStyle(node: Element): IDomStyle;
        parseTableStyle(node: Element): IDomSubStyle[];
        parseNumberingFile(xnums: Element): IDomNumbering[];
        parseNumberingPicBullet(elem: Element): NumberingPicBullet;
        parseAbstractNumbering(node: Element, bullets: any[]): IDomNumbering[];
        parseNumberingLevel(id: string, node: Element, bullets: any[]): IDomNumbering;
        parseSdt(node: Element, parser: Function): OpenXmlElement[];
        parseInserted(node: Element, parentParser: Function): OpenXmlElement;
        parseDeleted(node: Element, parentParser: Function): OpenXmlElement;
        parseParagraph(node: Element): OpenXmlElement;
        parseParagraphProperties(elem: Element, paragraph: WmlParagraph): void;
        parseFrame(node: Element, paragraph: WmlParagraph): void;
        parseHyperlink(node: Element, parent?: OpenXmlElement): WmlHyperlink;
        parseRun(node: Element, parent?: OpenXmlElement): WmlRun;
        parseMathElement(elem: Element): OpenXmlElement;
        parseMathProperies(elem: Element): Record<string, any>;
        parseRunProperties(elem: Element, run: WmlRun): void;
        parseVmlPicture(elem: Element): OpenXmlElement;
        checkAlternateContent(elem: Element): Element;
        parseDrawing(node: Element): OpenXmlElement;
        parseDrawingWrapper(node: Element): OpenXmlElement;
        parseGraphic(elem: Element): OpenXmlElement;
        parsePicture(elem: Element): IDomImage;
        parseTable(node: Element): WmlTable;
        parseTableColumns(node: Element): WmlTableColumn[];
        parseTableProperties(elem: Element, table: WmlTable): void;
        parseTablePosition(node: Element, table: WmlTable): void;
        parseTableRow(node: Element): WmlTableRow;
        parseTableRowProperties(elem: Element, row: WmlTableRow): void;
        parseTableCell(node: Element): OpenXmlElement;
        parseTableCellProperties(elem: Element, cell: WmlTableCell): void;
        parseDefaultProperties(elem: Element, style?: Record<string, string>, childStyle?: Record<string, string>, handler?: (prop: Element) => boolean): Record<string, string>;
        parseUnderline(node: Element, style: Record<string, string>): void;
        parseFont(node: Element, style: Record<string, string>): void;
        parseIndentation(node: Element, style: Record<string, string>): void;
        parseSpacing(node: Element, style: Record<string, string>): void;
        parseMarginProperties(node: Element, output: Record<string, string>): void;
        parseTrHeight(node: Element, output: Record<string, string>): void;
        parseBorderProperties(node: Element, output: Record<string, string>): void;
    }
}
declare module "common/relationship" {
    import { XmlParser } from "parser/xml-parser";
    export interface Relationship {
        id: string;
        type: RelationshipTypes | string;
        target: string;
        targetMode: "" | "External" | string;
    }
    export enum RelationshipTypes {
        OfficeDocument = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
        FontTable = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable",
        Image = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
        Numbering = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering",
        Styles = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
        StylesWithEffects = "http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects",
        Theme = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
        Settings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings",
        WebSettings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings",
        Hyperlink = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        Footnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes",
        Endnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes",
        Footer = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer",
        Header = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header",
        ExtendedProperties = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
        CoreProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
        CustomProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties",
        Comments = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments"
    }
    export function parseRelationships(root: Element, xml: XmlParser): Relationship[];
}
declare module "common/open-xml-package" {
    import JSZip from "jszip";
    import { XmlParser } from "parser/xml-parser";
    import { Relationship } from "common/relationship";
    export interface OpenXmlPackageOptions {
        trimXmlDeclaration: boolean;
        keepOrigin: boolean;
    }
    export class OpenXmlPackage {
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
}
declare module "common/part" {
    import { OpenXmlPackage } from "common/open-xml-package";
    import { Relationship } from "common/relationship";
    export class Part {
        protected _package: OpenXmlPackage;
        path: string;
        protected _xmlDocument: Document;
        rels: Relationship[];
        constructor(_package: OpenXmlPackage, path: string);
        load(): Promise<any>;
        save(): void;
        protected parseXml(root: Element): void;
    }
}
declare module "font-table/fonts" {
    import { XmlParser } from "parser/xml-parser";
    export interface FontDeclaration {
        name: string;
        altName: string;
        family: string;
        embedFontRefs: EmbedFontRef[];
    }
    export interface EmbedFontRef {
        id: string;
        key: string;
        type: 'regular' | 'bold' | 'italic' | 'boldItalic';
    }
    export function parseFonts(root: Element, xml: XmlParser): FontDeclaration[];
    export function parseFont(elem: Element, xml: XmlParser): FontDeclaration;
    export function parseEmbedFontRef(elem: Element, xml: XmlParser): EmbedFontRef;
}
declare module "font-table/font-table" {
    import { Part } from "common/part";
    import { FontDeclaration } from "font-table/fonts";
    export class FontTablePart extends Part {
        fonts: FontDeclaration[];
        parseXml(root: Element): void;
    }
}
declare module "document/document-part" {
    import { OpenXmlPackage } from "common/open-xml-package";
    import { Part } from "common/part";
    import { DocumentParser } from "document-parser";
    import { DocumentElement } from "document/document";
    export class DocumentPart extends Part {
        private _documentParser;
        constructor(pkg: OpenXmlPackage, path: string, parser: DocumentParser);
        body: DocumentElement;
        parseXml(root: Element): void;
    }
}
declare module "numbering/numbering" {
    import { ParagraphProperties } from "document/paragraph";
    import { RunProperties } from "document/run";
    import { XmlParser } from "parser/xml-parser";
    export interface NumberingPartProperties {
        numberings: Numbering[];
        abstractNumberings: AbstractNumbering[];
        bulletPictures: NumberingBulletPicture[];
    }
    export interface Numbering {
        id: string;
        abstractId: string;
        overrides: NumberingLevelOverride[];
    }
    export interface NumberingLevelOverride {
        level: number;
        start: number;
        numberingLevel: NumberingLevel;
    }
    export interface AbstractNumbering {
        id: string;
        name: string;
        multiLevelType: "singleLevel" | "multiLevel" | "hybridMultilevel" | string;
        levels: NumberingLevel[];
        numberingStyleLink: string;
        styleLink: string;
    }
    export interface NumberingLevel {
        level: number;
        start: string;
        restart: number;
        format: 'lowerRoman' | 'lowerLetter' | string;
        text: string;
        justification: string;
        bulletPictureId: string;
        paragraphStyle: string;
        paragraphProps: ParagraphProperties;
        runProps: RunProperties;
    }
    export interface NumberingBulletPicture {
        id: string;
        referenceId: string;
        style: string;
    }
    export function parseNumberingPart(elem: Element, xml: XmlParser): NumberingPartProperties;
    export function parseNumbering(elem: Element, xml: XmlParser): Numbering;
    export function parseAbstractNumbering(elem: Element, xml: XmlParser): AbstractNumbering;
    export function parseNumberingLevel(elem: Element, xml: XmlParser): NumberingLevel;
    export function parseNumberingLevelOverrride(elem: Element, xml: XmlParser): NumberingLevelOverride;
    export function parseNumberingBulletPicture(elem: Element, xml: XmlParser): NumberingBulletPicture;
}
declare module "numbering/numbering-part" {
    import { OpenXmlPackage } from "common/open-xml-package";
    import { Part } from "common/part";
    import { DocumentParser } from "document-parser";
    import { IDomNumbering } from "document/dom";
    import { AbstractNumbering, Numbering, NumberingBulletPicture, NumberingPartProperties } from "numbering/numbering";
    export class NumberingPart extends Part implements NumberingPartProperties {
        private _documentParser;
        constructor(pkg: OpenXmlPackage, path: string, parser: DocumentParser);
        numberings: Numbering[];
        abstractNumberings: AbstractNumbering[];
        bulletPictures: NumberingBulletPicture[];
        domNumberings: IDomNumbering[];
        parseXml(root: Element): void;
    }
}
declare module "styles/styles-part" {
    import { OpenXmlPackage } from "common/open-xml-package";
    import { Part } from "common/part";
    import { DocumentParser } from "document-parser";
    import { IDomStyle } from "document/style";
    export class StylesPart extends Part {
        styles: IDomStyle[];
        private _documentParser;
        constructor(pkg: OpenXmlPackage, path: string, parser: DocumentParser);
        parseXml(root: Element): void;
    }
}
declare module "header-footer/elements" {
    import { OpenXmlElementBase, DomType } from "document/dom";
    export class WmlHeader extends OpenXmlElementBase {
        type: DomType;
    }
    export class WmlFooter extends OpenXmlElementBase {
        type: DomType;
    }
}
declare module "header-footer/parts" {
    import { OpenXmlPackage } from "common/open-xml-package";
    import { Part } from "common/part";
    import { DocumentParser } from "document-parser";
    import { OpenXmlElement } from "document/dom";
    import { WmlHeader, WmlFooter } from "header-footer/elements";
    export abstract class BaseHeaderFooterPart<T extends OpenXmlElement = OpenXmlElement> extends Part {
        rootElement: T;
        private _documentParser;
        constructor(pkg: OpenXmlPackage, path: string, parser: DocumentParser);
        parseXml(root: Element): void;
        protected abstract createRootElement(): T;
    }
    export class HeaderPart extends BaseHeaderFooterPart<WmlHeader> {
        protected createRootElement(): WmlHeader;
    }
    export class FooterPart extends BaseHeaderFooterPart<WmlFooter> {
        protected createRootElement(): WmlFooter;
    }
}
declare module "document-props/extended-props" {
    import { XmlParser } from "parser/xml-parser";
    export interface ExtendedPropsDeclaration {
        template: string;
        totalTime: number;
        pages: number;
        words: number;
        characters: number;
        application: string;
        lines: number;
        paragraphs: number;
        company: string;
        appVersion: string;
    }
    export function parseExtendedProps(root: Element, xmlParser: XmlParser): ExtendedPropsDeclaration;
}
declare module "document-props/extended-props-part" {
    import { Part } from "common/part";
    import { ExtendedPropsDeclaration } from "document-props/extended-props";
    export class ExtendedPropsPart extends Part {
        props: ExtendedPropsDeclaration;
        parseXml(root: Element): void;
    }
}
declare module "document-props/core-props" {
    import { XmlParser } from "parser/xml-parser";
    export interface CorePropsDeclaration {
        title: string;
        description: string;
        subject: string;
        creator: string;
        keywords: string;
        language: string;
        lastModifiedBy: string;
        revision: number;
    }
    export function parseCoreProps(root: Element, xmlParser: XmlParser): CorePropsDeclaration;
}
declare module "document-props/core-props-part" {
    import { Part } from "common/part";
    import { CorePropsDeclaration } from "document-props/core-props";
    export class CorePropsPart extends Part {
        props: CorePropsDeclaration;
        parseXml(root: Element): void;
    }
}
declare module "theme/theme" {
    import { XmlParser } from "parser/xml-parser";
    export class DmlTheme {
        colorScheme: DmlColorScheme;
        fontScheme: DmlFontScheme;
    }
    export interface DmlColorScheme {
        name: string;
        colors: Record<string, string>;
    }
    export interface DmlFontScheme {
        name: string;
        majorFont: DmlFormInfo;
        minorFont: DmlFormInfo;
    }
    export interface DmlFormInfo {
        latinTypeface: string;
        eaTypeface: string;
        csTypeface: string;
    }
    export function parseTheme(elem: Element, xml: XmlParser): DmlTheme;
    export function parseColorScheme(elem: Element, xml: XmlParser): DmlColorScheme;
    export function parseFontScheme(elem: Element, xml: XmlParser): DmlFontScheme;
    export function parseFontInfo(elem: Element, xml: XmlParser): DmlFormInfo;
}
declare module "theme/theme-part" {
    import { OpenXmlPackage } from "common/open-xml-package";
    import { Part } from "common/part";
    import { DmlTheme } from "theme/theme";
    export class ThemePart extends Part {
        theme: DmlTheme;
        constructor(pkg: OpenXmlPackage, path: string);
        parseXml(root: Element): void;
    }
}
declare module "notes/elements" {
    import { OpenXmlElementBase, DomType } from "document/dom";
    export abstract class WmlBaseNote implements OpenXmlElementBase {
        type: DomType;
        id: string;
        noteType: string;
    }
    export class WmlFootnote extends WmlBaseNote {
        type: DomType;
    }
    export class WmlEndnote extends WmlBaseNote {
        type: DomType;
    }
}
declare module "notes/parts" {
    import { OpenXmlPackage } from "common/open-xml-package";
    import { Part } from "common/part";
    import { DocumentParser } from "document-parser";
    import { WmlBaseNote, WmlEndnote, WmlFootnote } from "notes/elements";
    export class BaseNotePart<T extends WmlBaseNote> extends Part {
        protected _documentParser: DocumentParser;
        notes: T[];
        constructor(pkg: OpenXmlPackage, path: string, parser: DocumentParser);
    }
    export class FootnotesPart extends BaseNotePart<WmlFootnote> {
        constructor(pkg: OpenXmlPackage, path: string, parser: DocumentParser);
        parseXml(root: Element): void;
    }
    export class EndnotesPart extends BaseNotePart<WmlEndnote> {
        constructor(pkg: OpenXmlPackage, path: string, parser: DocumentParser);
        parseXml(root: Element): void;
    }
}
declare module "settings/settings" {
    import { Length } from "document/common";
    import { XmlParser } from "parser/xml-parser";
    export interface WmlSettings {
        defaultTabStop: Length;
        footnoteProps: NoteProperties;
        endnoteProps: NoteProperties;
        autoHyphenation: boolean;
    }
    export interface NoteProperties {
        nummeringFormat: string;
        defaultNoteIds: string[];
    }
    export function parseSettings(elem: Element, xml: XmlParser): WmlSettings;
    export function parseNoteProperties(elem: Element, xml: XmlParser): NoteProperties;
}
declare module "settings/settings-part" {
    import { OpenXmlPackage } from "common/open-xml-package";
    import { Part } from "common/part";
    import { WmlSettings } from "settings/settings";
    export class SettingsPart extends Part {
        settings: WmlSettings;
        constructor(pkg: OpenXmlPackage, path: string);
        parseXml(root: Element): void;
    }
}
declare module "document-props/custom-props" {
    import { XmlParser } from "parser/xml-parser";
    export interface CustomProperty {
        formatId: string;
        name: string;
        type: string;
        value: string;
    }
    export function parseCustomProps(root: Element, xml: XmlParser): CustomProperty[];
}
declare module "document-props/custom-props-part" {
    import { Part } from "common/part";
    import { CustomProperty } from "document-props/custom-props";
    export class CustomPropsPart extends Part {
        props: CustomProperty[];
        parseXml(root: Element): void;
    }
}
declare module "comments/comments-part" {
    import { Part } from "common/part";
    import { OpenXmlPackage } from "common/open-xml-package";
    import { DocumentParser } from "document-parser";
    import { WmlComment } from "comments/elements";
    export class CommentsPart extends Part {
        protected _documentParser: DocumentParser;
        comments: WmlComment[];
        commentMap: Record<string, WmlComment>;
        constructor(pkg: OpenXmlPackage, path: string, parser: DocumentParser);
        parseXml(root: Element): void;
    }
}
declare module "word-document" {
    import { DocumentParser } from "document-parser";
    import { Relationship } from "common/relationship";
    import { Part } from "common/part";
    import { FontTablePart } from "font-table/font-table";
    import { DocumentPart } from "document/document-part";
    import { NumberingPart } from "numbering/numbering-part";
    import { StylesPart } from "styles/styles-part";
    import { ExtendedPropsPart } from "document-props/extended-props-part";
    import { CorePropsPart } from "document-props/core-props-part";
    import { ThemePart } from "theme/theme-part";
    import { EndnotesPart, FootnotesPart } from "notes/parts";
    import { SettingsPart } from "settings/settings-part";
    import { CommentsPart } from "comments/comments-part";
    export class WordDocument {
        private _package;
        private _parser;
        private _options;
        rels: Relationship[];
        parts: Part[];
        partsMap: Record<string, Part>;
        documentPart: DocumentPart;
        fontTablePart: FontTablePart;
        numberingPart: NumberingPart;
        stylesPart: StylesPart;
        footnotesPart: FootnotesPart;
        endnotesPart: EndnotesPart;
        themePart: ThemePart;
        corePropsPart: CorePropsPart;
        extendedPropsPart: ExtendedPropsPart;
        settingsPart: SettingsPart;
        commentsPart: CommentsPart;
        static load(blob: Blob | any, parser: DocumentParser, options: any): Promise<WordDocument>;
        save(type?: string): Promise<any>;
        private loadRelationshipPart;
        loadDocumentImage(id: string, part?: Part): Promise<string>;
        loadNumberingImage(id: string): Promise<string>;
        loadFont(id: string, key: string): Promise<string>;
        private blobToURL;
        findPartByRelId(id: string, basePart?: Part): Part;
        getPathById(part: Part, id: string): string;
        private loadResource;
    }
    export function deobfuscate(data: Uint8Array, guidKey: string): Uint8Array;
}
declare module "javascript" {
    import { Length } from "document/common";
    import { ParagraphTab } from "document/paragraph";
    export function computePixelToPoint(container?: HTMLElement): number;
    export function updateTabStop(elem: HTMLElement, tabs: ParagraphTab[], defaultTabSize: Length, pixelToPoint?: number): void;
}
declare module "html-renderer" {
    import { WordDocument } from "word-document";
    import { WmlTable, IDomNumbering, WmlHyperlink, IDomImage, OpenXmlElement, WmlTableColumn, WmlTableCell, WmlText, WmlSymbol, WmlBreak, WmlNoteReference } from "document/dom";
    import { CommonProperties } from "document/common";
    import { Options } from "docx-preview";
    import { DocumentElement } from "document/document";
    import { WmlParagraph } from "document/paragraph";
    import { FontTablePart } from "font-table/font-table";
    import { FooterHeaderReference, SectionProperties } from "document/section";
    import { WmlRun, RunProperties } from "document/run";
    import { WmlBookmarkStart } from "document/bookmarks";
    import { IDomStyle } from "document/style";
    import { WmlBaseNote, WmlFootnote } from "notes/elements";
    import { ThemePart } from "theme/theme-part";
    import { Part } from "common/part";
    import { VmlElement } from "vml/vml";
    import { WmlCommentRangeStart, WmlCommentReference } from "comments/elements";
    interface CellPos {
        col: number;
        row: number;
    }
    type CellVerticalMergeType = Record<number, HTMLTableCellElement>;
    export class HtmlRenderer {
        htmlDocument: Document;
        className: string;
        rootSelector: string;
        document: WordDocument;
        options: Options;
        styleMap: Record<string, IDomStyle>;
        currentPart: Part;
        tableVerticalMerges: CellVerticalMergeType[];
        currentVerticalMerge: CellVerticalMergeType;
        tableCellPositions: CellPos[];
        currentCellPosition: CellPos;
        footnoteMap: Record<string, WmlFootnote>;
        endnoteMap: Record<string, WmlFootnote>;
        currentFootnoteIds: string[];
        currentEndnoteIds: string[];
        usedHederFooterParts: any[];
        defaultTabSize: string;
        currentTabs: any[];
        tabsTimeout: any;
        tasks: Promise<any>[];
        constructor(htmlDocument: Document);
        render(document: WordDocument, bodyContainer: HTMLElement, styleContainer: HTMLElement, options: Options): void;
        renderTheme(themePart: ThemePart, styleContainer: HTMLElement): void;
        renderFontTable(fontsPart: FontTablePart, styleContainer: HTMLElement): void;
        processStyleName(className: string): string;
        processStyles(styles: IDomStyle[]): Record<any, IDomStyle>;
        prodessNumberings(numberings: IDomNumbering[]): void;
        processElement(element: OpenXmlElement): void;
        processTable(table: WmlTable): void;
        copyStyleProperties(input: Record<string, string>, output: Record<string, string>, attrs?: string[]): Record<string, string>;
        createSection(className: string, props: SectionProperties): HTMLElement;
        createSectionContent(props: SectionProperties): HTMLElement;
        renderSections(document: DocumentElement): HTMLElement[];
        renderHeaderFooter(refs: FooterHeaderReference[], props: SectionProperties, page: number, firstOfSection: boolean, into: HTMLElement): void;
        isPageBreakElement(elem: OpenXmlElement): boolean;
        splitBySection(elements: OpenXmlElement[]): {
            sectProps: SectionProperties;
            elements: OpenXmlElement[];
        }[];
        renderWrapper(children: HTMLElement[]): HTMLDivElement;
        renderDefaultStyle(): HTMLStyleElement;
        renderNumbering(numberings: IDomNumbering[], styleContainer: HTMLElement): HTMLStyleElement;
        renderStyles(styles: IDomStyle[]): HTMLElement;
        renderNotes(noteIds: string[], notesMap: Record<string, WmlBaseNote>, into: HTMLElement): void;
        renderElement(elem: OpenXmlElement): Node | Node[];
        renderChildren(elem: OpenXmlElement, into?: Element): Node[];
        renderElements(elems: OpenXmlElement[], into?: Element): Node[];
        renderContainer(elem: OpenXmlElement, tagName: keyof HTMLElementTagNameMap, props?: Record<string, any>): HTMLElement | HTMLDivElement | HTMLParagraphElement | HTMLObjectElement | HTMLTableElement | HTMLAnchorElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFormElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLLinkElement | HTMLMapElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLTrackElement | HTMLUListElement | HTMLVideoElement;
        renderContainerNS(elem: OpenXmlElement, ns: string, tagName: string, props?: Record<string, any>): any;
        renderParagraph(elem: WmlParagraph): HTMLParagraphElement;
        renderRunProperties(style: any, props: RunProperties): void;
        renderCommonProperties(style: any, props: CommonProperties): void;
        renderHyperlink(elem: WmlHyperlink): HTMLAnchorElement;
        renderCommentRangeStart(commentStart: WmlCommentRangeStart): Comment;
        renderCommentRangeEnd(commentEnd: WmlCommentRangeStart): Comment;
        renderCommentReference(commentRef: WmlCommentReference): Comment;
        renderDrawing(elem: OpenXmlElement): HTMLDivElement;
        renderImage(elem: IDomImage): HTMLImageElement;
        renderText(elem: WmlText): Text;
        renderDeletedText(elem: WmlText): Text;
        renderBreak(elem: WmlBreak): HTMLBRElement;
        renderInserted(elem: OpenXmlElement): Node | Node[];
        renderDeleted(elem: OpenXmlElement): Node;
        renderSymbol(elem: WmlSymbol): HTMLSpanElement;
        renderFootnoteReference(elem: WmlNoteReference): HTMLElement;
        renderEndnoteReference(elem: WmlNoteReference): HTMLElement;
        renderTab(elem: OpenXmlElement): HTMLSpanElement;
        renderBookmarkStart(elem: WmlBookmarkStart): HTMLElement;
        renderRun(elem: WmlRun): HTMLSpanElement;
        renderTable(elem: WmlTable): HTMLTableElement;
        renderTableColumns(columns: WmlTableColumn[]): HTMLTableColElement;
        renderTableRow(elem: OpenXmlElement): HTMLTableRowElement;
        renderTableCell(elem: WmlTableCell): HTMLTableCellElement;
        renderVmlPicture(elem: OpenXmlElement): HTMLDivElement;
        renderVmlElement(elem: VmlElement): SVGElement;
        renderVmlChildElement(elem: VmlElement): any;
        renderMmlRadical(elem: OpenXmlElement): HTMLElement;
        renderMmlDelimiter(elem: OpenXmlElement): HTMLElement;
        renderMmlNary(elem: OpenXmlElement): HTMLElement;
        renderMmlPreSubSuper(elem: OpenXmlElement): any;
        renderMmlGroupChar(elem: OpenXmlElement): any;
        renderMmlBar(elem: OpenXmlElement): any;
        renderMmlRun(elem: OpenXmlElement): any;
        renderMllList(elem: OpenXmlElement): any;
        renderStyleValues(style: Record<string, string>, ouput: HTMLElement): void;
        renderClass(input: OpenXmlElement, ouput: HTMLElement): void;
        findStyle(styleName: string): IDomStyle;
        numberingClass(id: string, lvl: number): string;
        tabStopClass(): string;
        styleToString(selectors: string, values: Record<string, string>, cssText?: string): string;
        numberingCounter(id: string, lvl: number): string;
        levelTextToContent(text: string, suff: string, id: string, numformat: string): string;
        numFormatToCssValue(format: string): any;
        refreshTabStops(): void;
        createElement: typeof createElement;
    }
    type ChildType = Node | string;
    function createElement<T extends keyof HTMLElementTagNameMap>(tagName: T, props?: Partial<Record<keyof HTMLElementTagNameMap[T], any>>, children?: ChildType[]): HTMLElementTagNameMap[T];
}
declare module "docx-preview" {
    export interface Options {
        inWrapper: boolean;
        ignoreWidth: boolean;
        ignoreHeight: boolean;
        ignoreFonts: boolean;
        breakPages: boolean;
        debug: boolean;
        experimental: boolean;
        className: string;
        trimXmlDeclaration: boolean;
        renderHeaders: boolean;
        renderFooters: boolean;
        renderFootnotes: boolean;
        renderEndnotes: boolean;
        ignoreLastRenderedPageBreak: boolean;
        useBase64URL: boolean;
        renderChanges: boolean;
    }
    export const defaultOptions: Options;
    export function praseAsync(data: Blob | any, userOptions?: Partial<Options>): Promise<any>;
    export function renderDocument(document: any, bodyContainer: HTMLElement, styleContainer?: HTMLElement, userOptions?: Partial<Options>): Promise<any>;
    export function renderAsync(data: Blob | any, bodyContainer: HTMLElement, styleContainer?: HTMLElement, userOptions?: Partial<Options>): Promise<any>;
}
declare module "length" {
    export class Length {
        readonly value: number;
        readonly type?: string;
        constructor(value: number, type?: string);
        static parse(text: string): Length;
        static from(val: any): Length;
        add(length: Length): Length;
        mul(val: number): Length;
        valueOf(): number;
        toString(): string;
    }
}
