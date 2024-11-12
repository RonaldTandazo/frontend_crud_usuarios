import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { TableComponent } from './Components/table-component'
import { DepartamentosService } from './services/departamentos.services';
import { CargosService } from './services/cargos.services';
import { UserModalComponent } from './Components/modal-component';
import { MatDialog } from '@angular/material/dialog';

interface Departamento {
  value: number;
  label: string;
}

interface Cargo {
  value: number;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule, MatSelectModule, MatButtonModule, MatDividerModule, TableComponent, UserModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];

  constructor(private departamentoService: DepartamentosService, private cargoService: CargosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.departamentoService.getData().subscribe(
      response => {
        this.departamentos = response.data.map((item: any) => {
          return {
            value: item.id,
            label: item.nombre,
          }
        });
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );

    this.cargoService.getData().subscribe(
      response => {
        this.cargos = response.data.map((item: any) => {
          return {
            value: item.id,
            label: item.nombre,
          }
        });
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  openUserModal(isEditing: boolean, user?: any) {
    this.dialog.open(UserModalComponent, {
      data: {
        user: user,
        isEditing: isEditing,
        departamentos: this.departamentos,
        cargos: this.cargos
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Usuario guardado o editado:', result);
    //   }
    // });
  }
}
