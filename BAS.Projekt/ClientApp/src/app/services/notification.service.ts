import { SnackBarStyle } from './../interfaces/SnackBarStyle';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBarNotification(message: string, buttonText: string, snackBarStyle: SnackBarStyle) {
    let className = '';
    switch(snackBarStyle) {
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
    })
  }
}
