import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  private userId: string;
  private token: string;
  public confirmation: string

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.confirmation = '';
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['userId'] || '';
    this.token = this.route.snapshot.queryParams['token'] || '';

    this.authService.confirmEmail(this.userId, this.token).subscribe(result => {
      if(result) {
        this.confirmation = 'Pomyślnie aktywowano konto';
      } else {
        this.confirmation = 'Nie wiem coś poszło nie tak 404 not faund'
      }
    });

  }



}
