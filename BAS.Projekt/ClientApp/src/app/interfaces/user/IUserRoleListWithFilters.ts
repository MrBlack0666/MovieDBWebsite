import { IUserRole } from "./IUserRole";

export interface IUserRoleListWithFilters {
    currentPage: number,
    pageSize: number,
    allPages: number,
    allElements: number,
    roleList: IUserRole[]
}