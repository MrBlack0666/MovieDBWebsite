import { __decorate } from "tslib";
import { UserRole } from './../../interfaces/auth/role';
import { Component } from '@angular/core';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';
let NavbarComponent = class NavbarComponent {
    constructor(router, authService, notificationService) {
        this.router = router;
        this.authService = authService;
        this.notificationService = notificationService;
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }
    ngOnInit() {
    }
    isAdmin() {
        return this.currentUser && this.currentUser.userRole === UserRole.Admin;
    }
    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
        this.notificationService.showSnackBarNotification("Pomyślnie wylogowano", "Zamknij", SnackBarStyle.success);
    }
};
NavbarComponent = __decorate([
    Component({
        selector: 'navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css']
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map