import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../services/UserService.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  profileForm!: FormGroup;
  editableFields: Set<string> = new Set<string>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserAuthService,
    private fb: FormBuilder,
    public dialog: MatDialog 
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.user = this.userService.getUser(userId);

      if (!this.user) {
        console.error('User not found');
      } else {
        this.initForm();
      }
    });
  }

  private initForm() {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required]],
      username: [this.user.username, Validators.required],
      image:[this.user.image]
    });
  }

  saveChanges() {
    localStorage.setItem('session', JSON.stringify(this.user));
    console.log('Changes saved to local storage.');
  }

  toggleField(field: string) {
    if (this.editableFields.has(field)) {
      this.editableFields.delete(field);
    } else {
      this.editableFields.add(field);
    }
  }

  isFieldEditable(field: string): boolean {
    return this.editableFields.has(field);
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
}
