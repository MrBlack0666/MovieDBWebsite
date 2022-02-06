import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let EditUserRoleComponent = class EditUserRoleComponent {
    constructor(route, userService, location) {
        this.route = route;
        this.userService = userService;
        this.location = location;
        this.userrole = '';
        this.userRole = {
            id: null,
            username: null,
            role: null
        };
        this.notFound = false;
        this.isLoading = true;
    }
    ngOnInit() {
        this.isLoading = false;
        this.route.url.subscribe(urlSegments => {
            this.getUsername(this.route.snapshot.params.id);
        });
        this.userRole.id = this.route.snapshot.params.id;
    }
    getUsername(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userService.getUserName(id).subscribe(data => {
                this.userRole.username = data.userName;
                this.userRole.role = data.role;
            });
        });
    }
    onSubmit() {
        this.userService.changeUserRole(this.userRole).subscribe(res => {
            alert('Pomyślnie wprowadzono zmiany');
            this.location.back();
        });
    }
    onReturn() {
        this.location.back();
    }
};
EditUserRoleComponent = __decorate([
    Component({
        selector: 'app-edit-user-role',
        templateUrl: './edit-user-role.component.html',
        styleUrls: ['./edit-user-role.component.css']
    })
], EditUserRoleComponent);
export { EditUserRoleComponent };
//# sourceMappingURL=edit-user-role.component.js.map