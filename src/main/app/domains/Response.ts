import { IResponse } from "@app/interfaces";

export class Response implements IResponse {

    public delay: number;
    public statusCode: number;
    public header: object;
    public body: string;

}
