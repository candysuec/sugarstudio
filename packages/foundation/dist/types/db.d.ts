export interface BaseDBModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserDBModel extends BaseDBModel {
    email: string;
    name?: string;
}
export interface ProjectDBModel extends BaseDBModel {
    name: string;
    ownerId: string;
}
export type DBQueryResult<T> = {
    data: T | T[] | null;
    error: string | null;
    count?: number;
};
