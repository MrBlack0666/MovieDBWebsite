import { NotificationService } from './../../services/notification.service';
import { PersonnelService } from './../../services/personnel.service';
import { IPersonnelFilters } from './../../interfaces/personnel/IPersonnelFilters';
import { Component, OnInit } from '@angular/core';
import { IPersonnelListWithFilters } from 'src/app/interfaces/personnel/IPersonnelListWithFilters';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarStyle } from 'src/app/interfaces/SnackBarStyle';

@Component({
  selector: 'admin-personnel',
  templateUrl: './admin-personnel.component.html',
  styleUrls: ['./admin-personnel.component.css']
})
export class AdminPersonnelComponent implements OnInit {
  public personnelFilters: IPersonnelFilters = {
    fullName: '',
    nationality: '',
    birthDateFrom: null,
    birthDateTo: null,
    page: 1,
    pageSize: 10,
    orderBy: 'surnameasc'
  };
  public personnel: IPersonnelListWithFilters = {
    allElements: 0,
    currentPage: 1,
    allPages: 1,
    pageSize: 10,
    personnelList: []
  }
  public isLoading: boolean;
  public pageIndex: number;
  public displayedColumns: string[] = ['name', 'dateOfBirth', 'nationality', 'action'];

  constructor(private personnelService: PersonnelService, private notificationService: NotificationService, public dialog: MatDialog) { 
    this.isLoading = true;
  }

  async ngOnInit() {
    await this.getPersonnel();
  }

  async getPersonnel() {
    this.isLoading = true;
    this.personnel = await this.personnelService.getPersonnel(this.personnelFilters)
    this.isLoading = false;
  }

  async applyFilters(event) {
    await this.getPersonnel();
  }

  async changePage(event) {
    if (event.pageSize != this.personnelFilters.pageSize) {
      this.personnelFilters.pageSize = event.pageSize;
    }
    this.pageIndex = event.pageIndex;

    this.personnelFilters.page = this.pageIndex + 1;
    await this.getPersonnel();
  }

  openDeleteDialog(id) {
    const dialogRef = this.dialog.open(DeletePersonnelDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        this.personnelService.deletePersonnel(id).subscribe(() => {
          this.notificationService.showSnackBarNotification('Pomyślnie usunięto osobę', 'Zamknij', SnackBarStyle.success);
          this.getPersonnel();
        })
      }
    });
  }
}

@Component({
  selector: 'delete-personnel-dialog',
  templateUrl: './delete-personnel-dialog.html',
})
export class DeletePersonnelDialog {}