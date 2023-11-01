import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent implements AfterViewInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private dialog: MatDialog
  ) {
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {}
  LoadUser() {
    this.service.Getall().subscribe((res) => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'status',
    'role',
    'action',
  ];

  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.LoadUser();
    });
  }
}
