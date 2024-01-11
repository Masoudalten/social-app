// edit-dialog/edit-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  editForm: FormGroup;
  fieldName: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fieldName = data.fieldName;
    this.editForm = this.fb.group({
      editedValue: [data.value, Validators.required]
    });
  }

  saveEdit(): void {
    this.dialogRef.close(this.editForm.value.editedValue);
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }
}
