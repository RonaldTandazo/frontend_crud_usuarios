import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { TableComponent } from './Components/TablaUsuarios/table-component'
import { DepartamentosService } from './services/departamentos.services';
import { CargosService } from './services/cargos.services';
import { UserModalComponent } from './Components/ModalUsuarios/modal-component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UsuariosServices } from './services/usuarios.services';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ModalGeneralComponent } from './Components/ModalGeneral/modal-general';

interface Departamento {
  value: number;
  label: string;
}

interface Cargo {
  value: number;
  label: string;
}


export interface Usuarios {
  id: number;
  usuario: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  departamento: string;
  cargo: string;
  email: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, MatFormFieldModule, MatSelectModule, MatButtonModule, MatPaginatorModule, MatDividerModule, TableComponent, UserModalComponent, ModalGeneralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];
  selectedDepartamento: number = 0;
  selectedCargo: number = 0;
  usuarios: Usuarios[] = [];

  pageEvent: PageEvent | undefined;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  constructor(
    private departamentoService: DepartamentosService,
    private cargoService: CargosService,
    private usuariosService: UsuariosServices,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.onBuscar();
    this.loadDepartamentos();
    this.loadCargos();
  }

  loadDepartamentos() {
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
  }

  loadCargos() {
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
        cargos: this.cargos,
        store: this.onFinish.bind(this)
      }
    });
  }

  onBuscar(){
    const filters = {
      "id_departamento": this.selectedDepartamento,
      "id_cargo": this.selectedCargo,
      "page": this.pageIndex,
      "perPage": this.pageSize
    }
    this.usuariosService.getData(filters).subscribe(
      response => {
        this.usuarios = response.data.data;
        this.length = response.data.total;
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  onFinish(data: any){
    let title = '';
    let message = '' ;
    let success = false ;

    this.usuariosService?.store(data).subscribe(
      response => {
        title = "Operación Exitosa"
        message = response.data
        success = true
        this.onBuscar();
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

  onLimpiar(){
    this.selectedCargo = 0
    this.selectedDepartamento = 0
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.onBuscar()
  }
}
