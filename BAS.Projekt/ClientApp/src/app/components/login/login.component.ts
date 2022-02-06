import { SnackBarStyle } from './../../interfaces/SnackBarStyle';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide: boolean = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  public password: string;
  private returnUrl: string;

  public errorMessage: string = '';
  
  constructor(private authService: AuthService,
      private notificationService: NotificationService,
      private route: ActivatedRoute,
      private router: Router) { 
    
    if (this.authService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email nie może być pusty';
    }

    return this.email.hasError('email') ? 'Zły format emaila' : '';
  }

  onSubmit() {
    if(this.email.invalid || this.password === null || this.password === undefined || this.password.length === 0) {
      return;
    }

    this.authService.login(this.email.value, this.password).pipe(first()).subscribe(response => {
          if(response.invalidEmailOrPassword) {
            this.errorMessage = "Niepoprawny login bądź hasło"
            return;
          }
          if(!response.hasConfirmedEmail) {
            this.errorMessage = "Email nie został jeszcze potwierdzony, sprawdź skrzynkę pocztową";
            return;
          }

          if(!response.success) {
            this.errorMessage = "Coś poszło nie tak!";
            return;
          }
          else {
            this.notificationService.showSnackBarNotification('Pomyślnie zalogowano!', 'Zamknij', SnackBarStyle.success);
            this.router.navigate([this.returnUrl]);
            return;
          }
        },
        error => {
          this.errorMessage = "Coś poszło nie tak";
        });
  }
}
