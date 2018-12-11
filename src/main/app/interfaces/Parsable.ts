// tslint:disable-next-line:only-arrow-functions
export function Parsable<T>() {
    return (constructor: IParsable<T>) => null;
}

export interface IParsable<T> {
    fromJSON(json: any, ...dependencies: any): T;
}
