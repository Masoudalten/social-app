import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../services/UserService.service';

@Component({
  selector: 'app-profile',
  template: `
    <app-profile-view
      [user]="user"
      [currentUser]="currentUser"
      (edit)="openEditDialog($event)"
      (logout)="OnLogOut()"
    ></app-profile-view>
  `,
})
export class ProfileComponent implements OnInit {
  user: any;
  profileForm!: FormGroup;
  editableFields: Set<string> = new Set<string>();
  currentUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserAuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.userService.getUser(userId).subscribe(
        user => {
          if (!user) {
            console.error('User not found');
          } else {
            this.user = user;
            this.initForm();
            this.logCurrentUserStatus();
          }
        },
        error => {
          console.error('Error fetching user:', error);
        }
      );
    });

  }
  private logCurrentUserStatus(): void {
    if (this.userService.session && this.userService.session.id === this.user.id) {
      this.currentUser = true;
    } else {
      this.currentUser = false;
    }
  }

  private initForm() {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required]],
      username: [this.user.username, Validators.required],
      image: [this.user.image]
    });
  }




  saveChanges() {
    localStorage.setItem('session', JSON.stringify(this.user));
    console.log('Changes saved to local storage.');
  }

  openEditDialog(fieldName: string): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: {
        fieldName,
        value: this.user[fieldName]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.user[fieldName] = result;
        this.userService.updateUser(this.user);
      }
    });
  }

  OnLogOut() {
    this.userService.logout();
  }
}