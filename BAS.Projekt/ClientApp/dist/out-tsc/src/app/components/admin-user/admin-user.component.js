import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let AdminUserComponent = class AdminUserComponent {
    constructor(userService, dialog) {
        this.userService = userService;
        this.dialog = dialog;
        this.displayedColumns = ['username', 'role', 'action'];
        this.userRoleList = {
            allElements: 0,
            currentPage: 1,
            allPages: 0,
            pageSize: 0,
            roleList: []
        };
        this.roleFilter = {
            username: '',
            page: 1,
            pageSize: 10,
            orderBy: '',
        };
        this.newUserRole = {
            id: null,
            username: null,
            role: null
        };
        this.isLoading = true;
    }
    ngOnInit() {
        this.pageIndex = 0;
        this.roleFilter.pageSize = 10;
        this.getUserRoleList();
    }
    onApplyFilters(event) {
        let pageSize = this.roleFilter.pageSize;
        this.roleFilter.pageSize = pageSize;
        this.roleFilter.page = 1;
        this.pageIndex = 0;
        this.getUserRoleList();
    }
    changePage(event) {
        if (event.pageSize != this.roleFilter.pageSize) {
            this.roleFilter.pageSize = event.pageSize;
        }
        this.pageIndex = event.pageIndex;
        this.roleFilter.page = this.pageIndex + 1;
        this.getUserRoleList();
    }
    getUserRoleList() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userService.getUserRole(this.roleFilter).subscribe(data => {
                this.isLoading = true;
                this.userRoleList = data;
                this.isLoading = false;
            });
        });
    }
    getUserByFind(id) {
        return this.userRoleList.roleList.find(x => x.id === id);
    }
    changeUserRole(id) {
        this.newUserRole = this.getUserByFind(id);
        this.userService.changeUserRole(this.newUserRole).subscribe(res => {
            alert('Pomyślnie wprowadzono zmiany');
            this.getUserRoleList();
        });
    }
    openDeleteDialog(id) {
        const dialogRef = this.dialog.open(DeleteUserDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.userService.deleteUser(id).subscribe(() => {
                    this.getUserRoleList();
                    alert("Pomyślnie usunięto użytkownika");
                });
            }
        });
    }
};
AdminUserComponent = __decorate([
    Component({
        selector: 'admin-user',
        templateUrl: './admin-user.component.html',
        styleUrls: ['./admin-user.component.css']
    })
], AdminUserComponent);
export { AdminUserComponent };
let DeleteUserDialog = class DeleteUserDialog {
};
DeleteUserDialog = __decorate([
    Component({
        selector: 'delete-user-dialog',
        templateUrl: './delete-user-dialog.html',
    })
], DeleteUserDialog);
export { DeleteUserDialog };
//# sourceMappingURL=admin-user.component.js.map