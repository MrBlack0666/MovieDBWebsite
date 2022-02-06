import { NotificationService } from './../../services/notification.service';
import { IPersonnelInSelectDTO } from './../../interfaces/personnel/IPersonnelInSelectDTO';
import { PersonnelService } from './../../services/personnel.service';
import { IGenreList } from './../../interfaces/genres/IGenreList';
import { GenresService } from './../../services/genres.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovieDTO } from 'src/app/interfaces/movies/IMovieDTO';
import { FormControl, Validators } from '@angular/forms';
import { FilmCrew } from 'src/app/interfaces/FilmCrew';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IFile } from 'src/app/interfaces/movies/IFile';
import { Location } from '@angular/common';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';

const numberOfItems = 5;

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit {
  public notFound: boolean;
  public isLoading: boolean;
  public editMode: boolean;
  public movie: IMovieDTO;
  public genreList: IGenreList[];
  movieId: number;
  movieTitle = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  movieDescription = new FormControl('', [Validators.maxLength(2000)]);
  movieReleaseYear = new FormControl('', [Validators.required, Validators.min(1900), Validators.max(2300)]);
  movieLengthInMinutes = new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000000)]);
  file: any;
  fileToUpload: File;
  selectedGenres = new FormControl();
  titleExistError: boolean;

  selectedActors: IPersonnelInSelectDTO[] = [];
  selectedDirectors: IPersonnelInSelectDTO[] = [];
  selectedWriters: IPersonnelInSelectDTO[] = [];

  actorsInDropdown: IPersonnelInSelectDTO[];
  directorsInDropdown: IPersonnelInSelectDTO[];
  writersInDropdown: IPersonnelInSelectDTO[];

  actorInputInDropdown = new FormControl();
  directorInputInDropdown = new FormControl();
  writerInputInDropdown = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('actorInput') actorInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild('directorInput') directorInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoDirector') matAutocompleteDirector: MatAutocomplete;

  @ViewChild('writerInput') writerInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoWriter') matAutocompleteWriter: MatAutocomplete;

  constructor(private route: ActivatedRoute,
    private movieService: MoviesService,
    private genreService: GenresService,
    private personnelService: PersonnelService,
    private notificationService: NotificationService,
    private location: Location) { 
      this.isLoading = true;
      this.notFound = false;
      this.titleExistError = false;
      this.actorsInDropdown = [];
      this.directorsInDropdown = [];
      this.writersInDropdown = [];
      this.actorInputInDropdown.setValue(null);
      this.directorInputInDropdown.setValue(null);
      this.writerInputInDropdown.setValue(null);

      this.movie = {
        id: 0,
        title: "",
        description: "",
        releaseYear: 0,
        movieLengthInMinutes: 0,
        file: null,
        updatePhoto: false,
        crew: [],
        genres: []
      }
    }

  async ngOnInit() {    
    this.route.url.subscribe(urlSegments => {
      this.editMode = urlSegments[2].path === 'edit';

      this.genreService.getGenres().subscribe(data => this.genreList = data);
      
      if(this.editMode === true) {
        this.getMovie(this.route.snapshot.params.id)
      }
      else {
        this.movieId = 0;
        this.movieTitle.setValue('');
        this.movieDescription.setValue('');
        this.movieReleaseYear.setValue('');
        this.movieLengthInMinutes.setValue('');
        this.file = null;
        this.selectedActors = [];
        this.selectedDirectors = [];
        this.selectedWriters = [];
        this.selectedGenres = new FormControl();

        this.getPersonnelToSelect();
      }
    });
  }

  async getPersonnelToSelect() {
    let selectedActorsIndexes = this.selectedActors.map(a => a.id);
    let selectedDirectorsIndexes = this.selectedDirectors.map(a => a.id);
    let selectedWritersIndexes = this.selectedWriters.map(a => a.id);

    this.actorsInDropdown = await this.personnelService.getPersonnelToSelectList(numberOfItems, "", selectedActorsIndexes);
    this.directorsInDropdown = await this.personnelService.getPersonnelToSelectList(numberOfItems, "", selectedDirectorsIndexes);
    this.writersInDropdown = await this.personnelService.getPersonnelToSelectList(numberOfItems, "", selectedWritersIndexes);
    this.isLoading = false;
  }

  async getMovie(id) {
    try {
      let getMovieDTO = await this.movieService.getMovie(id);
      let genres = getMovieDTO.genres.map(g => g.genreId);

      getMovieDTO.personnel.forEach(person => {
        let personInSelect = <IPersonnelInSelectDTO>{
          id: person.personId,
          name: person.name,
          surname: person.surname
        }

        if (person.memberPosition === FilmCrew.Actor) {
          this.selectedActors.push(personInSelect)
        }
        else if (person.memberPosition === FilmCrew.Director) {
          this.selectedDirectors.push(personInSelect)
        } 
        else if(person.memberPosition === FilmCrew.Writer) {
          this.selectedWriters.push(personInSelect)
        }
      })

      this.movieId = getMovieDTO.id;
      this.movieTitle.setValue(getMovieDTO.title);
      this.movieDescription.setValue(getMovieDTO.description);
      this.movieReleaseYear.setValue(getMovieDTO.releaseYear);
      this.movieLengthInMinutes.setValue(getMovieDTO.movieLengthInMinutes);
      this.file = this.getMoviePoster(getMovieDTO.moviePoster);
      this.selectedGenres.setValue(genres);

      this.getPersonnelToSelect();
    }
    catch(exception) {
      this.isLoading = false;
      this.notFound = true;
    }
  }

  getMoviePoster(poster: IFile) {
    if(poster != null) {
      return `data:${poster.contentType};base64,${poster.file}`;
    }
    else {
      return '';
    }
  }

  uploadMoviePoster(event) {
    if(event.target.files != null) {
      this.fileToUpload = event.target.files[0];
      this.movie.updatePhoto = true;

      const reader = new FileReader();
      reader.onload = () => {
        this.file = reader.result as string;
      }
      reader.readAsDataURL(this.fileToUpload)
    }

    else {
      this.file = '';
      this.movie.updatePhoto = false;
    }
  }

  onReturn() {
    this.location.back();
  }

  onSubmit() {
    if(this.movieTitle.invalid ||
      this.movieDescription.invalid ||
      this.movieReleaseYear.invalid ||
      this.movieLengthInMinutes.invalid) {
        this.notificationService.showSnackBarNotification('Nie wszystkie pola są poprawne', 'Zamknij', SnackBarStyle.error);
        return;
      }

    this.movie.id = this.movieId;
    this.movie.title = this.movieTitle.value;
    this.movie.description = this.movieDescription.value;
    this.movie.releaseYear = this.movieReleaseYear.value;
    this.movie.movieLengthInMinutes = this.movieLengthInMinutes.value;
    this.movie.file = this.fileToUpload;
    this.movie.genres = this.selectedGenres.value

    //actors
    this.selectedActors.forEach(actor => {
      this.movie.crew.push({ personnelId: actor.id, filmCrew: FilmCrew.Actor})
    });

    //directors
    this.selectedDirectors.forEach(director => {
      this.movie.crew.push({ personnelId: director.id, filmCrew: FilmCrew.Director})
    });

    //writers
    this.selectedWriters.forEach(writer => {
      this.movie.crew.push({ personnelId: writer.id, filmCrew: FilmCrew.Writer})
    });

    if(this.editMode) {
      this.movieService.editMovie(this.movie).subscribe(data => {
        if(data == true) {
          this.notificationService.showSnackBarNotification('Pomyślnie wprowadzono zmiany', 'Zamknij', SnackBarStyle.success);
          this.location.back();
        } else {
          this.titleExistError = true;
        }
      });
    } else {
      this.movieService.addMovie(this.movie).subscribe(data => {
        if(data == true) {
          this.notificationService.showSnackBarNotification('Pomyślnie dodano nowy film', 'Zamknij', SnackBarStyle.success);
          this.location.back();
        } else {
          this.titleExistError = true;
        }
      });
    }
  }

  getTitleErrorMessage() {
    if (this.movieTitle.hasError('required')) {
      return 'Tytuł nie może być pusty';
    }

    return '';
  }

  getReleaseYearErrorMessage() {
    if(this.movieReleaseYear.hasError('required')) {
      return 'Rok nie może być pusty'
    }
    if(this.movieReleaseYear.hasError('min')) {
      return 'Rok nie może być mniejszy niż 1900';
    }
    if(this.movieReleaseYear.hasError('max')) {
      return 'Rok nie może być większy niż 2300';
    }
    return '';
  }

  getTimeInMinutesErrorMessage() {
    if(this.movieReleaseYear.hasError('required')) {
      return 'Czas trwania filmu  nie może być pusty'
    }
    if(this.movieReleaseYear.hasError('min')) {
      return 'Czas trwania filmu nie może być mniejszy niż 1 minuta';
    }
    if(this.movieReleaseYear.hasError('max')) {
      return 'Czas trwania filmu nie może być większy niż 1.000.000 minut';
    }
    return '';
  }

  getDescriptionErrorMessage() {
    return this.movieTitle.hasError('maxLength') ? 'Tytuł jest za długi' : '';
  }

  removeActor(actor: IPersonnelInSelectDTO): void {
    const index = this.selectedActors.indexOf(actor);

    if (index >= 0) {
      this.selectedActors.splice(index, 1);
    }
  }

  addActor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let foundPerson = this.checkIfObjectIsInList(value, this.actorsInDropdown)

    if (foundPerson != null && !this.checkIfActorIsInSelectedList(foundPerson)) {
      this.selectedActors.push(foundPerson);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.actorInputInDropdown.setValue(null);
  }

  checkIfObjectIsInList(fullName: string, list: IPersonnelInSelectDTO[]) {
    let foundPerson: IPersonnelInSelectDTO = null;
    list.forEach(person => {
      let personFullName = (person.name + ' '+ person.surname);
      if(personFullName.startsWith(fullName)) {
        foundPerson = person;
        return;
      }
    });

    return foundPerson;
  }

  checkIfActorIsInSelectedList(actor: IPersonnelInSelectDTO): boolean {
    if(actor == null) {
      return true;
    }
    let actorExist = false;
    this.selectedActors.forEach(person => {
      if(actor.id == person.id) {
        actorExist = true;
        return;
      }
    })
    return actorExist;
  }

  checkIfDirectorIsInSelectedList(director: IPersonnelInSelectDTO): boolean {
    if(director == null) {
      return true;
    }
    let directorExist = false;
    this.selectedDirectors.forEach(person => {
      if(director.id == person.id) {
        directorExist = true;
        return;
      }
    })
    return directorExist;
  }

  checkIfWriterIsInSelectedList(writer: IPersonnelInSelectDTO): boolean {
    if(writer == null) {
      return true;
    }
    let writerExist = false;
    this.selectedWriters.forEach(person => {
      if(writer.id == person.id) {
        writerExist = true;
        return;
      }
    })
    return writerExist;
  }

  selectedActor(event: MatAutocompleteSelectedEvent): void {
    let foundPerson = this.checkIfObjectIsInList(event.option.viewValue, this.actorsInDropdown)
    if(foundPerson != null && !this.checkIfActorIsInSelectedList(foundPerson)) {
      this.selectedActors.push(foundPerson);
    }
    this.actorInput.nativeElement.value = '';
    this.actorInputInDropdown.setValue(null);
    this.onActorInputChange("");
  }

  async onActorInputChange(value) {
    let selectedActorsIndexes = this.selectedActors.map(a => a.id);
    this.actorsInDropdown = await this.personnelService.getPersonnelToSelectList(numberOfItems, value, selectedActorsIndexes);
  }

  removeDirector(director: IPersonnelInSelectDTO): void {
    const index = this.selectedDirectors.indexOf(director);

    if (index >= 0) {
      this.selectedDirectors.splice(index, 1);
    }
  }

  addDirector(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let foundPerson = this.checkIfObjectIsInList(value, this.directorsInDropdown)

    if (foundPerson != null && !this.checkIfDirectorIsInSelectedList(foundPerson)) {
      this.selectedDirectors.push(foundPerson);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.directorInputInDropdown.setValue(null);
  }

  selectedDirector(event: MatAutocompleteSelectedEvent): void {
    let foundPerson = this.checkIfObjectIsInList(event.option.viewValue, this.directorsInDropdown)
    if(foundPerson != null && !this.checkIfDirectorIsInSelectedList(foundPerson)) {
      this.selectedDirectors.push(foundPerson);
    }

    this.directorInput.nativeElement.value = '';
    this.directorInputInDropdown.setValue(null);
    this.onDirectorInputChange("")
  }

  async onDirectorInputChange(value) {
    let selectedDirectorsIndexes = this.selectedDirectors.map(a => a.id);
    this.directorsInDropdown = await this.personnelService.getPersonnelToSelectList(numberOfItems, value, selectedDirectorsIndexes);
  }

  removeWriter(writer: IPersonnelInSelectDTO): void {
    const index = this.selectedWriters.indexOf(writer);

    if (index >= 0) {
      this.selectedWriters.splice(index, 1);
    }
  }

  addWriter(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let foundPerson = this.checkIfObjectIsInList(value, this.writersInDropdown)

    if (foundPerson != null && !this.checkIfWriterIsInSelectedList(foundPerson)) {
      this.selectedWriters.push(foundPerson);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.writerInputInDropdown.setValue(null);
  }

  selectedWriter(event: MatAutocompleteSelectedEvent): void {
    let foundPerson = this.checkIfObjectIsInList(event.option.viewValue, this.writersInDropdown)
    if(foundPerson != null && !this.checkIfWriterIsInSelectedList(foundPerson)) {
      this.selectedWriters.push(foundPerson);
    }

    this.writerInput.nativeElement.value = '';
    this.writerInputInDropdown.setValue(null);
    this.onWriterInputChange("");
  }

  async onWriterInputChange(value) {
    let selectedWritersIndexes = this.selectedWriters.map(a => a.id);
    this.writersInDropdown = await this.personnelService.getPersonnelToSelectList(numberOfItems, value, selectedWritersIndexes);
  }
}

