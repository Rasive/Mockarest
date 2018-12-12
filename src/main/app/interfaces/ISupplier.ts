export interface ISupplier<T> {

    create(...arg: any): T;

    createFromJSON(json: any, ...arg: any): T;
}
