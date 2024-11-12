import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { UserModalComponent } from './modal-component';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosServices } from '../services/usuarios.services';

export interface PeriodicElement {
  usuario: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  departamento: string;
  cargo: string;
  email: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-component',
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
  standalone: true,
  imports: [MatTableModule, MatIconModule, UserModalComponent],
})
export class TableComponent implements OnInit{
  displayedColumns: string[] = ['usuario', 'nombres', 'apellidos', 'departamento', 'cargo', 'email', 'acciones'];
  dataSource: PeriodicElement[] = [];

  constructor(private dialog: MatDialog, private usuariosService: UsuariosServices) {}

  ngOnInit(): void {
    this.usuariosService.getData().subscribe(
      response => {
        this.dataSource = response.data;
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  openUserModal(isEditing: boolean, user?: any) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      data: { user: user, isEditing: isEditing }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Usuario guardado o editado:', result);
      }
    });
  }

  deleteRow(element: PeriodicElement) {
    console.log('Eliminar', element);
  }
}
