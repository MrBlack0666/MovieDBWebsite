import { __decorate } from "tslib";
import { SnackBarStyle } from './../../interfaces/SnackBarStyle';
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
let LoginComponent = class LoginComponent {
    constructor(authService, notificationService, route, router) {
        this.authService = authService;
        this.notificationService = notificationService;
        this.route = route;
        this.router = router;
        this.hide = true;
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.errorMessage = '';
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    getErrorMessage() {
        if (this.email.hasError('required')) {
            return 'Email nie może być pusty';
        }
        return this.email.hasError('email') ? 'Zły format emaila' : '';
    }
    onSubmit() {
        if (this.email.invalid || this.password === null || this.password === undefined || this.password.length === 0) {
            return;
        }
        this.authService.login(this.email.value, this.password).pipe(first()).subscribe(response => {
            if (response.invalidEmailOrPassword) {
                this.errorMessage = "Niepoprawny login bądź hasło";
                return;
            }
            if (!response.hasConfirmedEmail) {
                this.errorMessage = "Email nie został jeszcze potwierdzony, sprawdź skrzynkę pocztową";
                return;
            }
            if (!response.success) {
                this.errorMessage = "Coś poszło nie tak!";
                return;
            }
            else {
                this.notificationService.showSnackBarNotification('Pomyślnie zalogowano!', 'Zamknij', SnackBarStyle.success);
                this.router.navigate([this.returnUrl]);
                return;
            }
        }, error => {
            this.errorMessage = "Coś poszło nie tak";
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map