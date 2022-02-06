import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IGenre } from 'src/app/interfaces/genres/IGenre';
import { GenresService } from 'src/app/services/genres.service';
import { Location } from '@angular/common';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';

@Component({
  selector: 'app-add-edit-genre',
  templateUrl: './add-edit-genre.component.html',
  styleUrls: ['./add-edit-genre.component.css']
})
export class AddEditGenreComponent implements OnInit {

  public notFound: boolean;
  public isLoading: boolean;
  public editMode: boolean;
  public genreExistError: boolean;
  
  public genre: IGenre;
  genreId: number;
  genreName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  genreDescription = new FormControl('', [Validators.required, Validators.maxLength(100)]);

  constructor(private route: ActivatedRoute,
      private genreService: GenresService,
      private location: Location,
      private notificationService: NotificationService) {
    this.notFound = false;
    this.isLoading = true;
    this.genreExistError = false;

    this.genre = {
      name: '',
      description: '',
      id: 0
    };
  }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.editMode = urlSegments[2].path === 'edit';

      if(this.editMode === true) {
        this.getGenre(this.route.snapshot.params.id);
      } else {
        this.genreId = 0;
        this.genreName.setValue('');
        this.genreDescription.setValue('');
        this.isLoading = false;
      }
    });
  }

  async getGenre(id) {
    try {
      let genre = await this.genreService.getGenre(id);
      this.genreId = genre.id
      this.genreName.setValue(genre.name);
      this.genreDescription.setValue(genre.description);

      this.isLoading = false;

    } catch(exception) {
      this.isLoading = false;
      this.notFound = true;
    }
  }

  onSubmit() {
    if(this.genreName.invalid) {
      this.notificationService.showSnackBarNotification('Nie wszystkie pola są poprawne', 'Zamknij', SnackBarStyle.error);
    }

    this.genre.id = this.genreId;
    this.genre.name = this.genreName.value;
    this.genre.description = this.genreDescription.value;

    if(this.editMode) {
      this.genreService.editGenre(this.genre).subscribe(res => {
        if(res == true) {
          this.notificationService.showSnackBarNotification('Pomyślnie wprowadzono zmiany', 'Zamknij', SnackBarStyle.success);
          this.location.back();
        } else {
          this.genreExistError = true;
        }
      });
    } else {
      this.genreService.addGenre(this.genre).subscribe(res => {
        if(res == true) {
          this.notificationService.showSnackBarNotification('Pomyślnie dodano gatunek filmowy', 'Zamknij', SnackBarStyle.success);
          this.location.back();
        } else {
          this.genreExistError = true;
        }
      }, error => {
        console.log(error);
      });
    }
  }

  onReturn() {
    this.location.back();
  }

  getNameErrorMessage() {
    if (this.genreName.hasError('required')) {
      return 'Nazwa gatunku nie może być pusta';
    }

    return '';
  }

  getDescriptionErrorMessage() {
    if (this.genreDescription.hasError('required')) {
      return 'Opis gatunku nie może być pusty';
    }

    return '';
  }
}
