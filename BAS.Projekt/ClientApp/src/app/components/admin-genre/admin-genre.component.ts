import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IGenreFilters } from 'src/app/interfaces/genres/IGenreFilters';
import { IGenreListWithFilters } from 'src/app/interfaces/genres/IGenreListWithFilters';
import { GenresService } from 'src/app/services/genres.service';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';

@Component({
  selector: 'admin-genre',
  templateUrl: './admin-genre.component.html',
  styleUrls: ['./admin-genre.component.css']
})
export class AdminGenreComponent implements OnInit {

  public isLoading: boolean = true;
  public genres: IGenreListWithFilters = {
    genreList: [],
    currentPage: 1,
    pageSize: 10,
    allPages: 1,
    allElements: 0
  } 
  public genreFilter: IGenreFilters = {
    name: '',
    page: 1,
    pageSize: 10,
    orderBy: '',
  }
  public pageIndex: number;
  public displayedColumns: string[] = ['name', 'description', 'action'];

  constructor(private genreService: GenresService, private notificationService: NotificationService, public dialog: MatDialog) {
    this.isLoading = true;
  }

  ngOnInit(): void {
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
      if(result == true) {
        this.genreService.deleteGenre(id).subscribe(() => {
          this.notificationService.showSnackBarNotification('Pomyślnie usunięto gatunek filmowy', 'Zamknij', SnackBarStyle.success);
          this.getGenres();
        })
      }
    });
  }
}

@Component({
  selector: 'delete-genre-dialog',
  templateUrl: './delete-genre-dialog.html',
})

export class DeleteGenreDialog {}
