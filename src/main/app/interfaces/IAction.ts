export interface IAction {

    /**
     * Precondition for when to execute the goto statement
     */
    precondition?: string;

    /**
     * Goto state after hitting the endpoint
     *
     * @pattern ^[at]states\/\w+$
     */
    goto: string;

}
