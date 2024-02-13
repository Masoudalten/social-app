import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../services/UserService.service';
import { User } from '../interface/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  users: any;
  user: any;
  profileForm!: FormGroup;
  editableFields: Set<string> = new Set<string>();
  @Output() currentUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserAuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(() => {
      this.route.params.subscribe(params => {
        const userId = +params['id'];
        this.userService.getUser(userId).subscribe({
          next: (user: User) => {
            this.user = user;
            this.initForm();
            this.logCurrentUserStatus();
          },
          error: (err: any) => {
            console.error('Error fetching user:', err);
          }
        });
      });
    })
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