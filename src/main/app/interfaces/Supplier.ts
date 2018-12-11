export interface ISupplier<T> {

    create(): T;

    createFromJSON(json: any): T;
}
