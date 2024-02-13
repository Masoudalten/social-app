import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/UserService.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnChanges, OnInit {
  @Input() user: any;
  @Input() currentUser: boolean = false;
  @Output() edit = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  editableFields: Set<string> = new Set<string>();

  profileForm!: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserAuthService) { }

  ngOnInit() {
    // console.log(this.userService.user?.subscribe(user=>{console.log(user)}))
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      this.initForm();
    }
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
    this.userService.updateUserChanges(this.user, this.user.key).subscribe();
    localStorage.setItem('session', JSON.stringify(this.user));
    console.log(this.user);
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
