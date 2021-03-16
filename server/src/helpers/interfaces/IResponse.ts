export interface IResponse {
    status: {
        code: number;
        message: string;
    };
    result?: any;
    duplicateFields?: string;
}
