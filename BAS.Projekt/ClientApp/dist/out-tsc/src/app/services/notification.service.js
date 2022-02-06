import { __decorate } from "tslib";
import { SnackBarStyle } from './../interfaces/SnackBarStyle';
import { Injectable } from '@angular/core';
let NotificationService = class NotificationService {
    constructor(snackBar) {
        this.snackBar = snackBar;
    }
    showSnackBarNotification(message, buttonText, snackBarStyle) {
        let className = '';
        switch (snackBarStyle) {
            case SnackBarStyle.success:
                className = 'snackbar-success';
                break;
            case SnackBarStyle.error:
                className = 'snackbar-error';
                break;
        }
        this.snackBar.open(message, buttonText, {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 10000,
            panelClass: [className]
        });
    }
};
NotificationService = __decorate([
    Injectable()
], NotificationService);
export { NotificationService };
//# sourceMappingURL=notification.service.js.map