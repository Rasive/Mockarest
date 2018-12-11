export class JSONMap {
    public static map<T>(arr: any[], fn: (json: any) => T): T[] {
        if (!arr) { return []; }

        return arr.map((val) => fn(val));
    }
}
