import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ActivationComponent = class ActivationComponent {
    constructor(authService, route) {
        this.authService = authService;
        this.route = route;
        this.confirmation = '';
    }
    ngOnInit() {
        this.userId = this.route.snapshot.queryParams['userId'] || '';
        this.token = this.route.snapshot.queryParams['token'] || '';
        this.authService.confirmEmail(this.userId, this.token).subscribe(result => {
            if (result) {
                this.confirmation = 'Pomyślnie aktywowano konto';
            }
            else {
                this.confirmation = 'Nie wiem coś poszło nie tak 404 not faund';
            }
        });
    }
};
ActivationComponent = __decorate([
    Component({
        selector: 'activation',
        templateUrl: './activation.component.html',
        styleUrls: ['./activation.component.css']
    })
], ActivationComponent);
export { ActivationComponent };
//# sourceMappingURL=activation.component.js.map