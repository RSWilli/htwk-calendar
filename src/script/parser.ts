
export default class Parser {
    static textToDom(markup:string, mimeType="text/xml"){
        const parser = new DOMParser();
        return parser.parseFromString(markup,mimeType);
    }
}