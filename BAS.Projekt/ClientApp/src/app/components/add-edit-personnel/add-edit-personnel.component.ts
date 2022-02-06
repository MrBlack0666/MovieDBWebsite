import { NotificationService } from './../../services/notification.service';
import { PersonnelService } from './../../services/personnel.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPersonnel } from 'src/app/interfaces/personnel/IPersonnel';
import { Location } from '@angular/common';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';

@Component({
  selector: 'app-add-edit-personnel',
  templateUrl: './add-edit-personnel.component.html',
  styleUrls: ['./add-edit-personnel.component.css']
})
export class AddEditPersonnelComponent implements OnInit {
  public notFound: boolean;
  public isLoading: boolean;
  public editMode: boolean;

  personnelId: number;
  personnelName = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  personnelSurname = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  personnelNationality = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  personnelDateOfBirth = new FormControl(null, [Validators.required]);

  minDate: Date = new Date(1800, 1, 1);
  maxDate: Date = new Date();

  constructor(private personnelService: PersonnelService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private location: Location) {
    this.isLoading = true;
    this.notFound = false;
  }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      this.editMode = urlSegments[2].path === 'edit';
      
      if(this.editMode === true) {
        this.getPerson(this.route.snapshot.params.id)
      }
      else {
        this.personnelId = 0;
        this.personnelName.setValue('');
        this.personnelSurname.setValue('');
        this.personnelNationality.setValue('');
        this.personnelDateOfBirth.setValue(null);
        this.isLoading = false;
      }
    });
  }

  async getPerson(id) {
    try {
      let person = await this.personnelService.getPerson(id);

      this.personnelId = person.id;
      this.personnelName.setValue(person.name);
      this.personnelSurname.setValue(person.surname);
      this.personnelNationality.setValue(person.nationality);
      this.personnelDateOfBirth.setValue(new Date(person.dateOfBirth));
      this.isLoading = false;
    }
    catch(exception) {
      this.isLoading = false;
      this.notFound = true;
    }
  }

  getNameErrorMessage() {
    if (this.personnelName.hasError('required')) {
      return 'Imię nie może być puste';
    }
    if(this.personnelName.hasError('maxLength')) {
      return 'Imię jest za długie';
    }

    return '';
  }

  getSurnameErrorMessage() {
    if (this.personnelSurname.hasError('required')) {
      return 'Nazwisko nie może być puste';
    }
    if(this.personnelSurname.hasError('maxLength')) {
      return 'Nazwisko jest za długie';
    }

    return '';
  }

  getNationalityErrorMessage() {
    if (this.personnelNationality.hasError('required')) {
      return 'Narodowość nie może być pusta';
    }
    if(this.personnelNationality.hasError('maxLength')) {
      return 'Narodowość jest za długa';
    }

    return '';
  }

  onReturn() {
    this.location.back();
  }

  onSubmit() {
    if(this.personnelName.invalid ||
      this.personnelSurname.invalid ||
      this.personnelNationality.invalid || 
      this.personnelDateOfBirth.invalid) {
        this.notificationService.showSnackBarNotification('Nie wszystkie pola są poprawne', 'Zamknij', SnackBarStyle.error);
        return;
    }
    
    let person = <IPersonnel> {
      id: this.personnelId,
      name: this.personnelName.value,
      surname: this.personnelSurname.value,
      nationality: this.personnelNationality.value,
      dateOfBirth: this.personnelDateOfBirth.value
    }

    if(this.editMode) {
      this.personnelService.editPersonnel(person).subscribe(data => {
        this.notificationService.showSnackBarNotification('Pomyślnie wprowadzono zmiany', 'Zamknij', SnackBarStyle.success);
        this.location.back();
      });
    } else {
      this.personnelService.addPersonnel(person).subscribe(data => {
        this.notificationService.showSnackBarNotification('Pomyślnie dodano osobę', 'Zamknij', SnackBarStyle.success);
        this.location.back();
      });
    }
    
  }
}
