import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';
export class MyErrorStateMatcher {
    isErrorState(control, form) {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
        return (invalidCtrl || invalidParent);
    }
}
let RegisterComponent = class RegisterComponent {
    constructor(formBuilder, authService, notificationService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.notificationService = notificationService;
        this.router = router;
        this.hide = true;
        this.matcher = new MyErrorStateMatcher();
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', [Validators.required, Validators.minLength(5), Validators.pattern(`^[\\w\\d]*$`)]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(`^[\\S]*(?=.*\\d)(?=.*[a-z])[\\S]*$`)]],
            confirmedPassword: [''],
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]]
        }, { validator: this.checkPasswords });
    }
    ngOnInit() {
        //this.registerForm.valueChanges.subscribe(() => {})
    }
    checkPasswords(group) {
        let pass = group.controls.password.value;
        let confirmedPass = group.controls.confirmedPassword.value;
        return pass === confirmedPass ? null : { notSame: true };
    }
    getPasswordErrorMessage() {
        let control = this.registerForm.controls.password;
        if (control.hasError('required')) {
            return 'Hasło nie może być puste';
        }
        if (control.hasError('minlength')) {
            return `Hasło musi zawierać ${control.getError('minlength').requiredLength} znaków`;
        }
        if (control.hasError('pattern')) {
            return 'Hasło musi zawierać małą literę oraz cyfrę';
        }
        return '';
    }
    getEmailErrorMessage() {
        let control = this.registerForm.controls.email;
        if (control.hasError('required')) {
            return 'Email nie może być pusty';
        }
        if (control.hasError('email')) {
            return `Zły format emaila`;
        }
        return '';
    }
    getUsernameErrorMessage() {
        let control = this.registerForm.controls.username;
        if (control.hasError('required')) {
            return 'Nazwa użytkownika nie może być pusta';
        }
        if (control.hasError('minlength')) {
            return `Nazwa użytkownika musi zawierać ${control.getError('minlength').requiredLength} znaków`;
        }
        if (control.hasError('pattern')) {
            return 'Nazwa użytkownika musi składać się tylko ze znaków alfanumerycznych';
        }
        return '';
    }
    onSubmit() {
        if (this.registerForm.invalid) {
            return;
        }
        let controls = this.registerForm.controls;
        this.authService.register({
            username: controls.username.value,
            password: controls.password.value,
            confirmedPassword: controls.confirmedPassword.value,
            email: controls.email.value,
            name: controls.name.value,
            surname: controls.surname.value
        }).pipe(first())
            .subscribe(response => {
            debugger;
            let error = '';
            if (response.usernameTaken && response.emailTaken) {
                error += "Email oraz nazwa użytkownika już istnieją!";
            }
            else if (response.emailTaken) {
                error = "Email już istnieje!";
            }
            else if (response.usernameTaken) {
                error = "Nazwa użytkownika już istnieje!";
            }
            if (error != '') {
                if (response.usernameTaken && response.emailTaken) {
                    this.notificationService.showSnackBarNotification(error, 'Zamknij', SnackBarStyle.error);
                    return;
                }
            }
            if (response.success) {
                this.notificationService.showSnackBarNotification('Pomyślnie stworzono konto, potwierdź email!', 'Zamknij', SnackBarStyle.success);
                this.router.navigate(['/']);
            }
        }, error => {
        });
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map