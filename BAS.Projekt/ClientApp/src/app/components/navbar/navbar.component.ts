import { NotificationService } from './../../services/notification.service';
import { UserRole } from './../../interfaces/auth/role';
import { User } from './../../interfaces/auth/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public currentUser: User

  

  constructor(private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService) { 
      this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.currentUser && this.currentUser.userRole === UserRole.Admin;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.notificationService.showSnackBarNotification("Pomyślnie wylogowano", "Zamknij", SnackBarStyle.success);
  }

}
