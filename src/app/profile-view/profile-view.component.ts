// profile-view.component.ts - presentation component
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent {
  @Input() user: any;
  @Input() currentUser: boolean = false; 
  @Output() edit = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  editableFields: Set<string> = new Set<string>();

  profileForm!: FormGroup; 
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required]],
      username: [this.user.username, Validators.required],
      image: [this.user.image],
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
}
