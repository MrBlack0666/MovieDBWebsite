import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FilmCrew } from 'src/app/interfaces/FilmCrew';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';
const numberOfItems = 5;
let AddEditMovieComponent = class AddEditMovieComponent {
    constructor(route, movieService, genreService, personnelService, notificationService, location) {
        this.route = route;
        this.movieService = movieService;
        this.genreService = genreService;
        this.personnelService = personnelService;
        this.notificationService = notificationService;
        this.location = location;
        this.movieTitle = new FormControl('', [Validators.required, Validators.maxLength(100)]);
        this.movieDescription = new FormControl('', [Validators.maxLength(2000)]);
        this.movieReleaseYear = new FormControl('', [Validators.required, Validators.min(1900), Validators.max(2300)]);
        this.movieLengthInMinutes = new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000000)]);
        this.selectedGenres = new FormControl();
        this.selectedActors = [];
        this.selectedDirectors = [];
        this.selectedWriters = [];
        this.actorInputInDropdown = new FormControl();
        this.directorInputInDropdown = new FormControl();
        this.writerInputInDropdown = new FormControl();
        this.separatorKeysCodes = [ENTER, COMMA];
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
        };
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.route.url.subscribe(urlSegments => {
                this.editMode = urlSegments[2].path === 'edit';
                this.genreService.getGenres().subscribe(data => this.genreList = data);
                if (this.editMode === true) {
                    this.getMovie(this.route.snapshot.params.id);
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
        });
    }
    getPersonnelToSelect() {
        return __awaiter(this, void 0, void 0, function* () {
            let selectedActorsIndexes = this.selectedActors.map(a => a.id);
            let selectedDirectorsIndexes = this.selectedDirectors.map(a => a.id);
            let selectedWritersIndexes = this.selectedWriters.map(a => a.id);
            this.actorsInDropdown = yield this.personnelService.getPersonnelToSelectList(numberOfItems, "", selectedActorsIndexes);
            this.directorsInDropdown = yield this.personnelService.getPersonnelToSelectList(numberOfItems, "", selectedDirectorsIndexes);
            this.writersInDropdown = yield this.personnelService.getPersonnelToSelectList(numberOfItems, "", selectedWritersIndexes);
            this.isLoading = false;
        });
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getMovieDTO = yield this.movieService.getMovie(id);
                let genres = getMovieDTO.genres.map(g => g.genreId);
                getMovieDTO.personnel.forEach(person => {
                    let personInSelect = {
                        id: person.personId,
                        name: person.name,
                        surname: person.surname
                    };
                    if (person.memberPosition === FilmCrew.Actor) {
                        this.selectedActors.push(personInSelect);
                    }
                    else if (person.memberPosition === FilmCrew.Director) {
                        this.selectedDirectors.push(personInSelect);
                    }
                    else if (person.memberPosition === FilmCrew.Writer) {
                        this.selectedWriters.push(personInSelect);
                    }
                });
                this.movieId = getMovieDTO.id;
                this.movieTitle.setValue(getMovieDTO.title);
                this.movieDescription.setValue(getMovieDTO.description);
                this.movieReleaseYear.setValue(getMovieDTO.releaseYear);
                this.movieLengthInMinutes.setValue(getMovieDTO.movieLengthInMinutes);
                this.file = this.getMoviePoster(getMovieDTO.moviePoster);
                this.selectedGenres.setValue(genres);
                this.getPersonnelToSelect();
            }
            catch (exception) {
                this.isLoading = false;
                this.notFound = true;
            }
        });
    }
    getMoviePoster(poster) {
        if (poster != null) {
            return `data:${poster.contentType};base64,${poster.file}`;
        }
        else {
            return '';
        }
    }
    uploadMoviePoster(event) {
        if (event.target.files != null) {
            this.fileToUpload = event.target.files[0];
            this.movie.updatePhoto = true;
            const reader = new FileReader();
            reader.onload = () => {
                this.file = reader.result;
            };
            reader.readAsDataURL(this.fileToUpload);
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
        if (this.movieTitle.invalid ||
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
        this.movie.genres = this.selectedGenres.value;
        //actors
        this.selectedActors.forEach(actor => {
            this.movie.crew.push({ personnelId: actor.id, filmCrew: FilmCrew.Actor });
        });
        //directors
        this.selectedDirectors.forEach(director => {
            this.movie.crew.push({ personnelId: director.id, filmCrew: FilmCrew.Director });
        });
        //writers
        this.selectedWriters.forEach(writer => {
            this.movie.crew.push({ personnelId: writer.id, filmCrew: FilmCrew.Writer });
        });
        if (this.editMode) {
            this.movieService.editMovie(this.movie).subscribe(data => {
                if (data == true) {
                    this.notificationService.showSnackBarNotification('Pomyślnie wprowadzono zmiany', 'Zamknij', SnackBarStyle.success);
                    this.location.back();
                }
                else {
                    this.titleExistError = true;
                }
            });
        }
        else {
            this.movieService.addMovie(this.movie).subscribe(data => {
                if (data == true) {
                    this.notificationService.showSnackBarNotification('Pomyślnie dodano nowy film', 'Zamknij', SnackBarStyle.success);
                    this.location.back();
                }
                else {
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
        if (this.movieReleaseYear.hasError('required')) {
            return 'Rok nie może być pusty';
        }
        if (this.movieReleaseYear.hasError('min')) {
            return 'Rok nie może być mniejszy niż 1900';
        }
        if (this.movieReleaseYear.hasError('max')) {
            return 'Rok nie może być większy niż 2300';
        }
        return '';
    }
    getTimeInMinutesErrorMessage() {
        if (this.movieReleaseYear.hasError('required')) {
            return 'Czas trwania filmu  nie może być pusty';
        }
        if (this.movieReleaseYear.hasError('min')) {
            return 'Czas trwania filmu nie może być mniejszy niż 1 minuta';
        }
        if (this.movieReleaseYear.hasError('max')) {
            return 'Czas trwania filmu nie może być większy niż 1.000.000 minut';
        }
        return '';
    }
    getDescriptionErrorMessage() {
        return this.movieTitle.hasError('maxLength') ? 'Tytuł jest za długi' : '';
    }
    removeActor(actor) {
        const index = this.selectedActors.indexOf(actor);
        if (index >= 0) {
            this.selectedActors.splice(index, 1);
        }
    }
    addActor(event) {
        const input = event.input;
        const value = event.value;
        let foundPerson = this.checkIfObjectIsInList(value, this.actorsInDropdown);
        if (foundPerson != null && !this.checkIfActorIsInSelectedList(foundPerson)) {
            this.selectedActors.push(foundPerson);
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.actorInputInDropdown.setValue(null);
    }
    checkIfObjectIsInList(fullName, list) {
        let foundPerson = null;
        list.forEach(person => {
            let personFullName = (person.name + ' ' + person.surname);
            if (personFullName.startsWith(fullName)) {
                foundPerson = person;
                return;
            }
        });
        return foundPerson;
    }
    checkIfActorIsInSelectedList(actor) {
        if (actor == null) {
            return true;
        }
        let actorExist = false;
        this.selectedActors.forEach(person => {
            if (actor.id == person.id) {
                actorExist = true;
                return;
            }
        });
        return actorExist;
    }
    checkIfDirectorIsInSelectedList(director) {
        if (director == null) {
            return true;
        }
        let directorExist = false;
        this.selectedDirectors.forEach(person => {
            if (director.id == person.id) {
                directorExist = true;
                return;
            }
        });
        return directorExist;
    }
    checkIfWriterIsInSelectedList(writer) {
        if (writer == null) {
            return true;
        }
        let writerExist = false;
        this.selectedWriters.forEach(person => {
            if (writer.id == person.id) {
                writerExist = true;
                return;
            }
        });
        return writerExist;
    }
    selectedActor(event) {
        let foundPerson = this.checkIfObjectIsInList(event.option.viewValue, this.actorsInDropdown);
        if (foundPerson != null && !this.checkIfActorIsInSelectedList(foundPerson)) {
            this.selectedActors.push(foundPerson);
        }
        this.actorInput.nativeElement.value = '';
        this.actorInputInDropdown.setValue(null);
        this.onActorInputChange("");
    }
    onActorInputChange(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectedActorsIndexes = this.selectedActors.map(a => a.id);
            this.actorsInDropdown = yield this.personnelService.getPersonnelToSelectList(numberOfItems, value, selectedActorsIndexes);
        });
    }
    removeDirector(director) {
        const index = this.selectedDirectors.indexOf(director);
        if (index >= 0) {
            this.selectedDirectors.splice(index, 1);
        }
    }
    addDirector(event) {
        const input = event.input;
        const value = event.value;
        let foundPerson = this.checkIfObjectIsInList(value, this.directorsInDropdown);
        if (foundPerson != null && !this.checkIfDirectorIsInSelectedList(foundPerson)) {
            this.selectedDirectors.push(foundPerson);
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.directorInputInDropdown.setValue(null);
    }
    selectedDirector(event) {
        let foundPerson = this.checkIfObjectIsInList(event.option.viewValue, this.directorsInDropdown);
        if (foundPerson != null && !this.checkIfDirectorIsInSelectedList(foundPerson)) {
            this.selectedDirectors.push(foundPerson);
        }
        this.directorInput.nativeElement.value = '';
        this.directorInputInDropdown.setValue(null);
        this.onDirectorInputChange("");
    }
    onDirectorInputChange(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectedDirectorsIndexes = this.selectedDirectors.map(a => a.id);
            this.directorsInDropdown = yield this.personnelService.getPersonnelToSelectList(numberOfItems, value, selectedDirectorsIndexes);
        });
    }
    removeWriter(writer) {
        const index = this.selectedWriters.indexOf(writer);
        if (index >= 0) {
            this.selectedWriters.splice(index, 1);
        }
    }
    addWriter(event) {
        const input = event.input;
        const value = event.value;
        let foundPerson = this.checkIfObjectIsInList(value, this.writersInDropdown);
        if (foundPerson != null && !this.checkIfWriterIsInSelectedList(foundPerson)) {
            this.selectedWriters.push(foundPerson);
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.writerInputInDropdown.setValue(null);
    }
    selectedWriter(event) {
        let foundPerson = this.checkIfObjectIsInList(event.option.viewValue, this.writersInDropdown);
        if (foundPerson != null && !this.checkIfWriterIsInSelectedList(foundPerson)) {
            this.selectedWriters.push(foundPerson);
        }
        this.writerInput.nativeElement.value = '';
        this.writerInputInDropdown.setValue(null);
        this.onWriterInputChange("");
    }
    onWriterInputChange(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectedWritersIndexes = this.selectedWriters.map(a => a.id);
            this.writersInDropdown = yield this.personnelService.getPersonnelToSelectList(numberOfItems, value, selectedWritersIndexes);
        });
    }
};
__decorate([
    ViewChild('actorInput')
], AddEditMovieComponent.prototype, "actorInput", void 0);
__decorate([
    ViewChild('auto')
], AddEditMovieComponent.prototype, "matAutocomplete", void 0);
__decorate([
    ViewChild('directorInput')
], AddEditMovieComponent.prototype, "directorInput", void 0);
__decorate([
    ViewChild('autoDirector')
], AddEditMovieComponent.prototype, "matAutocompleteDirector", void 0);
__decorate([
    ViewChild('writerInput')
], AddEditMovieComponent.prototype, "writerInput", void 0);
__decorate([
    ViewChild('autoWriter')
], AddEditMovieComponent.prototype, "matAutocompleteWriter", void 0);
AddEditMovieComponent = __decorate([
    Component({
        selector: 'app-add-edit-movie',
        templateUrl: './add-edit-movie.component.html',
        styleUrls: ['./add-edit-movie.component.css']
    })
], AddEditMovieComponent);
export { AddEditMovieComponent };
//# sourceMappingURL=add-edit-movie.component.js.map