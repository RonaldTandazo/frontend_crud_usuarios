import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-user-modal',
  templateUrl: './modal-component.html',
  styleUrls: ['./modal-component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatDialogContent, FormsModule, MatSelectModule, MatButtonModule, MatDialogModule, ReactiveFormsModule],
})

export class UserModalComponent implements OnInit {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  user: any = {};
  isEditing: boolean = false;
  departamentos: any[] = [];
  cargos: any[] = [];
  errorMessage = signal('');

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.user) {
      this.user = this.data.user;
      this.isEditing = true;
    }
    this.departamentos = this.data.departamentos;
    this.cargos = this.data.cargos;
  }

  onSubmit(): void {
    this.dialogRef.close();
    if(this.isEditing){
      this.data.update(this.user)
    }else{
      this.data.store(this.user)
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Debe ingresar un e-mail');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('El e-mail no es válido');
    }
  }
}
