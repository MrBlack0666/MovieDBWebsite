import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IUserRoleListWithFilters } from 'src/app/interfaces/user/IUserRoleListWithFilters';
import { UserService } from 'src/app/services/user.service';
import { IUserRoleFilters } from 'src/app/interfaces/user/IUserRoleFilters';
import { IUserRole } from 'src/app/interfaces/user/IUserRole';

@Component({
    selector: 'admin-user',
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.css']
  })

  export class AdminUserComponent implements OnInit {
    
    public isLoading: boolean;
    public pageIndex: number;
    public displayedColumns: string[] = ['username', 'role','action'];

    public userRoleList: IUserRoleListWithFilters = {
      allElements: 0,
      currentPage: 1,
      allPages: 0,
      pageSize: 0,
      roleList: []
    }

    public roleFilter: IUserRoleFilters = {
      username: '',
      page: 1,
      pageSize: 10,
      orderBy: '',
    }

    public newUserRole: IUserRole = {
      id: null,
      username: null,
      role: null
    }

    constructor(private userService: UserService, public dialog: MatDialog) {
      this.isLoading = true;
    }

    ngOnInit(): void {
      this.pageIndex = 0;
      this.roleFilter.pageSize = 10;
      this.getUserRoleList();
    }

    onApplyFilters(event) {
      let pageSize = this.roleFilter.pageSize;
      this.roleFilter.pageSize = pageSize;
      this.roleFilter.page = 1;
      this.pageIndex = 0;
      this.getUserRoleList();
    }

    changePage(event) {
      if (event.pageSize != this.roleFilter.pageSize) {
        this.roleFilter.pageSize = event.pageSize;
      }
      this.pageIndex = event.pageIndex;
  
      this.roleFilter.page = this.pageIndex + 1;
      this.getUserRoleList();
    }
  
    async getUserRoleList() {
      this.userService.getUserRole(this.roleFilter).subscribe(data => {
        this.isLoading = true;
        this.userRoleList = data;
        this.isLoading = false;
      });
    }

    getUserByFind(id){
      return this.userRoleList.roleList.find(x => x.id === id);
    }

    changeUserRole(id){
      this.newUserRole = this.getUserByFind(id);
      this.userService.changeUserRole(this.newUserRole).subscribe(res => {
        alert('Pomyślnie wprowadzono zmiany');
        this.getUserRoleList();
    });
    }

    openDeleteDialog(id) {
      const dialogRef = this.dialog.open(DeleteUserDialog);
  
      dialogRef.afterClosed().subscribe(result => {
        if(result == true) {
          this.userService.deleteUser(id).subscribe(() => {
            this.getUserRoleList();
            alert("Pomyślnie usunięto użytkownika");
          })
        }
      });
    }
  }

  @Component({
    selector: 'delete-user-dialog',
    templateUrl: './delete-user-dialog.html',
  })
  
  export class DeleteUserDialog {}