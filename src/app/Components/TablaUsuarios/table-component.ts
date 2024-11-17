import {Component, Input} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { UserModalComponent } from '../ModalUsuarios/modal-component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosServices } from '../../services/usuarios.services';
import { MatButtonModule } from '@angular/material/button';
import { ModalGeneralComponent } from '../ModalGeneral/modal-general';
import { ConfirmDialogComponent } from '../ModalConfirmacion/modal-confirmacion';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-component',
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
  standalone: true,
  imports: [MatTableModule, MatIconModule, UserModalComponent, MatButtonModule, ConfirmDialogComponent],
})
export class TableComponent {
  displayedColumns: string[] = ['usuario', 'nombres', 'apellidos', 'departamento', 'cargo', 'email', 'acciones'];
  @Input() usuarios: any[] = [];
  @Input() departamentos: any[] = [];
  @Input() cargos: any[] = [];

  constructor(
    private dialog: MatDialog,
    private usuariosService: UsuariosServices
  ) {}

  openUserModal(isEditing: boolean, user?: any) {
    this.dialog.open(UserModalComponent, {
      data: {
        user: user,
        isEditing: isEditing,
        departamentos: this.departamentos,
        cargos: this.cargos,
        update: this.onFinish.bind(this)
      }
    });
  }

  deleteUser(id_usuario: number, user: any) {
    let title = '';
    let message = '' ;
    let success = false;

    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el usuario confirma la eliminación
        this.usuariosService.delete(id_usuario, user).subscribe(
          response => {
            title = "Operación Exitosa";
            message = response.data;
            success = true;

            this.usuarios = this.usuarios.filter(usuario => usuario.id !== id_usuario);
          },
          error => {
            title = "Operación Fallida";
            message = error.data;
          },
          () => {
            this.showGeneralDialog(title, message, success);
          }
        );
      }
    });
  }

  onFinish(data: any){
    let title = '';
    let message = '' ;
    let success = false ;

    this.usuariosService?.update(data.id, data).subscribe(
      response => {
        title = "Operación Exitosa"
        message = response.data
        success = true
      },
      error => {
        title = "Operación Fallida"
        message = error.data
      },
      () => {
        this.showGeneralDialog(title, message, success);
      }
    );
  }

  private showGeneralDialog(title: string, message: string, success: boolean): void {
    this.dialog.open(ModalGeneralComponent, {
      data: { title: title, message: message, success: success }
    });
  }
}
