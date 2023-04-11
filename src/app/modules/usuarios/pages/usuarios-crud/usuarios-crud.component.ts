import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import * as alertify from 'alertifyjs'
import { UsuarioInterface } from '../../interfaces/usuario-interface';
import { UsuariosFormularioComponent } from '../../modals/usuarios-formulario/usuarios-formulario.component';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios-crud',
  templateUrl: './usuarios-crud.component.html',
  styleUrls: ['./usuarios-crud.component.css']
})
export class UsuariosCRUDComponent implements OnInit {
  constructor(private dialog: MatDialog, private usuarioService: UsuariosService) { }

  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  idBusqueda?: number;
  usuarioData!: UsuarioInterface[];
  finaldata!: MatTableDataSource<UsuarioInterface>;
  displayColums: string[] = ["id", "nombre", "apellido", "usuario", "correo", "action"]

  ngOnInit(): void {
    this.CargarUsuarios();
  }

  AbrirFormularioUsuario(element?: UsuarioInterface, idEdit?: number) {
    const busForm = this.dialog.open(UsuariosFormularioComponent, {
      width: '500px',
      data: { element: element, idEdit: idEdit } 
    })
    busForm.afterClosed().subscribe(r => {
      this.CargarUsuarios();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterNombre = filterValue.trim().toLowerCase();
    this.finaldata.filterPredicate = (data: { nombre: string; }, filter: any) => {
      const nombre = data.nombre.trim().toLowerCase();
      return nombre.includes(filter);
    };
    this.finaldata.filter = filterNombre;
  }

  // BuscarUsuarios(idBusqueda: number){
  //   this.usuarioService.GetBusConRutasAsociadas(idBusqueda).subscribe(response => {
  //     const bus = response;
  //     this.finaldata = new MatTableDataSource<UsuarioInterface>([bus]);
  //     this.finaldata.paginator=this._paginator;
  //     this.finaldata.sort=this._sort;
  //   });
  // }

  CargarUsuarios() {
    this.usuarioService.ListarUsuarios().subscribe(response => {
      this.usuarioData = response.data;
      this.finaldata=new MatTableDataSource<UsuarioInterface>(this.usuarioData);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  EditarUsuario(element: UsuarioInterface, idEdit: number){
    this.AbrirFormularioUsuario(element, idEdit);
  };

  EliminarUsuario(id: number) {
    alertify.confirm("Eliminar usuario", "Seguro que quiere eliminar este usuario?", () => {
      this.usuarioService.EliminarUsuario(id).subscribe(
        response => {
          this.CargarUsuarios();
          alertify.success('Eliminacion exitosa');
        },
        error => {
          alertify.error(error.error);
        }
      );
    }, function () {})
   }
}
