import { IPersonnel } from "./IPersonnel";

export interface IPersonnelListWithFilters {
    currentPage: number,
    pageSize: number,
    allPages: number,
    allElements: number,
    personnelList: IPersonnel[]
}