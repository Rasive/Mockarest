export interface IResponse {

    /**
     * The delay in ms before replying
     *
     * @type integer
     */
    delay?: number;

    /**
     * The status code of the response
     *
     * @type integer
     */
    statusCode: number;

    /**
     * Pass along a header in a key val form
     */
    header?: object;

}
