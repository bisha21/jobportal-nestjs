interface QueryParams {
    [key: string]: any;
}
export declare class ApiFeaturesPrisma {
    private queryParams;
    private options;
    constructor(queryParams: QueryParams);
    filter(): this;
    sort(defaultSort?: any): this;
    limitFields(): this;
    paginate(defaultLimit?: number): this;
    includeRelations(): this;
    getOptions(): Record<string, any>;
}
export {};
