import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';
let AddEditGenreComponent = class AddEditGenreComponent {
    constructor(route, genreService, location, notificationService) {
        this.route = route;
        this.genreService = genreService;
        this.location = location;
        this.notificationService = notificationService;
        this.genreName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
        this.genreDescription = new FormControl('', [Validators.required, Validators.maxLength(100)]);
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
            if (this.editMode === true) {
                this.getGenre(this.route.snapshot.params.id);
            }
            else {
                this.genreId = 0;
                this.genreName.setValue('');
                this.genreDescription.setValue('');
                this.isLoading = false;
            }
        });
    }
    getGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let genre = yield this.genreService.getGenre(id);
                this.genreId = genre.id;
                this.genreName.setValue(genre.name);
                this.genreDescription.setValue(genre.description);
                this.isLoading = false;
            }
            catch (exception) {
                this.isLoading = false;
                this.notFound = true;
            }
        });
    }
    onSubmit() {
        if (this.genreName.invalid) {
            this.notificationService.showSnackBarNotification('Nie wszystkie pola są poprawne', 'Zamknij', SnackBarStyle.error);
        }
        this.genre.id = this.genreId;
        this.genre.name = this.genreName.value;
        this.genre.description = this.genreDescription.value;
        if (this.editMode) {
            this.genreService.editGenre(this.genre).subscribe(res => {
                if (res == true) {
                    this.notificationService.showSnackBarNotification('Pomyślnie wprowadzono zmiany', 'Zamknij', SnackBarStyle.success);
                    this.location.back();
                }
                else {
                    this.genreExistError = true;
                }
            });
        }
        else {
            this.genreService.addGenre(this.genre).subscribe(res => {
                if (res == true) {
                    this.notificationService.showSnackBarNotification('Pomyślnie dodano gatunek filmowy', 'Zamknij', SnackBarStyle.success);
                    this.location.back();
                }
                else {
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
};
AddEditGenreComponent = __decorate([
    Component({
        selector: 'app-add-edit-genre',
        templateUrl: './add-edit-genre.component.html',
        styleUrls: ['./add-edit-genre.component.css']
    })
], AddEditGenreComponent);
export { AddEditGenreComponent };
//# sourceMappingURL=add-edit-genre.component.js.map