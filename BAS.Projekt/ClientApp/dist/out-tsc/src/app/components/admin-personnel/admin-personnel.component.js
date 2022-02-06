import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';
let AdminPersonnelComponent = class AdminPersonnelComponent {
    constructor(personnelService, notificationService, dialog) {
        this.personnelService = personnelService;
        this.notificationService = notificationService;
        this.dialog = dialog;
        this.personnelFilters = {
            fullName: '',
            nationality: '',
            birthDateFrom: null,
            birthDateTo: null,
            page: 1,
            pageSize: 10,
            orderBy: 'surnameasc'
        };
        this.personnel = {
            allElements: 0,
            currentPage: 1,
            allPages: 1,
            pageSize: 10,
            personnelList: []
        };
        this.displayedColumns = ['name', 'dateOfBirth', 'nationality', 'action'];
        this.isLoading = true;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getPersonnel();
        });
    }
    getPersonnel() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoading = true;
            this.personnel = yield this.personnelService.getPersonnel(this.personnelFilters);
            this.isLoading = false;
        });
    }
    applyFilters(event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getPersonnel();
        });
    }
    changePage(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (event.pageSize != this.personnelFilters.pageSize) {
                this.personnelFilters.pageSize = event.pageSize;
            }
            this.pageIndex = event.pageIndex;
            this.personnelFilters.page = this.pageIndex + 1;
            yield this.getPersonnel();
        });
    }
    openDeleteDialog(id) {
        const dialogRef = this.dialog.open(DeletePersonnelDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.personnelService.deletePersonnel(id).subscribe(() => {
                    this.notificationService.showSnackBarNotification('Pomyślnie usunięto osobę', 'Zamknij', SnackBarStyle.success);
                    this.getPersonnel();
                });
            }
        });
    }
};
AdminPersonnelComponent = __decorate([
    Component({
        selector: 'admin-personnel',
        templateUrl: './admin-personnel.component.html',
        styleUrls: ['./admin-personnel.component.css']
    })
], AdminPersonnelComponent);
export { AdminPersonnelComponent };
let DeletePersonnelDialog = class DeletePersonnelDialog {
};
DeletePersonnelDialog = __decorate([
    Component({
        selector: 'delete-personnel-dialog',
        templateUrl: './delete-personnel-dialog.html',
    })
], DeletePersonnelDialog);
export { DeletePersonnelDialog };
//# sourceMappingURL=admin-personnel.component.js.map