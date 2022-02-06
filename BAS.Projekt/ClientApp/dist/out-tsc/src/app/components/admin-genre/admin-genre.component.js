import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';
let AdminGenreComponent = class AdminGenreComponent {
    constructor(genreService, notificationService, dialog) {
        this.genreService = genreService;
        this.notificationService = notificationService;
        this.dialog = dialog;
        this.isLoading = true;
        this.genres = {
            genreList: [],
            currentPage: 1,
            pageSize: 10,
            allPages: 1,
            allElements: 0
        };
        this.genreFilter = {
            name: '',
            page: 1,
            pageSize: 10,
            orderBy: '',
        };
        this.displayedColumns = ['name', 'description', 'action'];
        this.isLoading = true;
    }
    ngOnInit() {
        this.pageIndex = 0;
        this.genreFilter.pageSize = 10;
        this.getGenres();
    }
    getGenres() {
        this.genreService.getGenresByName(this.genreFilter).subscribe(result => {
            this.isLoading = true;
            this.genres = result;
            this.isLoading = false;
        });
    }
    onApplyFilters(event) {
        let pageSize = this.genreFilter.pageSize;
        this.genreFilter.pageSize = pageSize;
        this.genreFilter.page = 1;
        this.pageIndex = 0;
        this.getGenres();
    }
    changePage(event) {
        if (event.pageSize != this.genreFilter.pageSize) {
            this.genreFilter.pageSize = event.pageSize;
        }
        this.pageIndex = event.pageIndex;
        this.genreFilter.page = this.pageIndex + 1;
        this.getGenres();
    }
    openDeleteDialog(id) {
        const dialogRef = this.dialog.open(DeleteGenreDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result == true) {
                this.genreService.deleteGenre(id).subscribe(() => {
                    this.notificationService.showSnackBarNotification('Pomyślnie usunięto gatunek filmowy', 'Zamknij', SnackBarStyle.success);
                    this.getGenres();
                });
            }
        });
    }
};
AdminGenreComponent = __decorate([
    Component({
        selector: 'admin-genre',
        templateUrl: './admin-genre.component.html',
        styleUrls: ['./admin-genre.component.css']
    })
], AdminGenreComponent);
export { AdminGenreComponent };
let DeleteGenreDialog = class DeleteGenreDialog {
};
DeleteGenreDialog = __decorate([
    Component({
        selector: 'delete-genre-dialog',
        templateUrl: './delete-genre-dialog.html',
    })
], DeleteGenreDialog);
export { DeleteGenreDialog };
//# sourceMappingURL=admin-genre.component.js.map