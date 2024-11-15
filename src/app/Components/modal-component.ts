import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UsuariosServices } from '../services/usuarios.services';
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
  imports: [MatFormFieldModule, MatInputModule, MatDialogContent, FormsModule, MatSelectModule, MatButtonModule, MatDialogModule],
})

export class UserModalComponent implements OnInit {
  user: any = {};
  isEditing: boolean = false;
  departamentos: any[] = [];
  cargos: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuariosServices
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
    if(!this.isEditing){
      console.log("llega aqui la wbd")
      this.usuarioService.store(this.user).subscribe(response => {
        alert(response.data);
      });
    }else{
      console.log("llega aca la wbd")
      this.usuarioService.update(this.user.id, this.user).subscribe(response => {
        alert(response.data);
      });
    }

    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
