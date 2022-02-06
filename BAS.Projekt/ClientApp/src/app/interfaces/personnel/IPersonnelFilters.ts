export interface IPersonnelFilters {
    fullName: string,
    nationality: string,
    birthDateFrom: Date|null,
    birthDateTo: Date|null,
    page: number,
    pageSize: number|null,
    orderBy: string
}