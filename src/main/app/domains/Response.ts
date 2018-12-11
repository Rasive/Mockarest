import { Parsable } from "../interfaces/Parsable";

@Parsable<Response>()
export class Response {

    public static fromJSON(json: any): Response {
        const response = new Response();
        response.delay = json.delay;
        response.statusCode = json.statusCode;
        response.header = json.header;
        response.body = json.body;

        return response;
    }

    public delay: number;
    public statusCode: number;
    public header: object;
    public body: string;
}
