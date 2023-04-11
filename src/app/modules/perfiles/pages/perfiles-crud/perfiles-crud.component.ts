import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import * as alertify from 'alertifyjs'
import { PerfilesInterface } from '../../interfaces/perfiles-interface';
import { PerfilesFormularioComponent } from '../../modals/perfiles-formulario/perfiles-formulario.component';
import { PerfilesService } from '../../services/perfiles.service';

@Component({
  selector: 'app-perfiles-crud',
  templateUrl: './perfiles-crud.component.html',
  styleUrls: ['./perfiles-crud.component.css']
})
export class PerfilesCRUDComponent implements OnInit {
  constructor(private dialog: MatDialog, private perfilService: PerfilesService) { }

  @ViewChild(MatPaginator) _paginator!:MatPaginator;
  @ViewChild(MatSort) _sort!:MatSort;
  idBusqueda?: number;
  perfilData!: PerfilesInterface[];
  finaldata!: MatTableDataSource<PerfilesInterface>;
  displayColums: string[] = ["id", "descripcion", "action"]

  ngOnInit(): void {
    this.CargarPerfiles();
  }

  AbrirFormularioPerfil(element?: PerfilesInterface, idEdit?: number) {
    const busForm = this.dialog.open(PerfilesFormularioComponent, {
      width: '500px',
      data: { element: element, idEdit: idEdit } 
    })
    busForm.afterClosed().subscribe(r => {
      this.CargarPerfiles();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();
    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
    const filterNombre = filterValue.trim().toLowerCase();
    this.finaldata.filterPredicate = (data: { descripcion: string; }, filter: any) => {
      const nombre = data.descripcion.trim().toLowerCase();
      return nombre.includes(filter);
    };
    this.finaldata.filter = filterNombre;
  }

  CargarPerfiles() {
    this.perfilService.ListarPerfiles().subscribe(response => {
      this.perfilData = response.data;
      this.finaldata=new MatTableDataSource<PerfilesInterface>(this.perfilData);
      this.finaldata.paginator=this._paginator;
      this.finaldata.sort=this._sort;
    });
  }

  EditarPerfil(element: PerfilesInterface, idEdit: number){
    this.AbrirFormularioPerfil(element, idEdit);
  };

  EliminarPerfil(id: number) {
    alertify.confirm("Eliminar perfil", "Seguro que quiere eliminar este perfil?", () => {
      this.perfilService.EliminarPerfil(id).subscribe(
        response => {
          this.CargarPerfiles();
          alertify.success('Eliminacion exitosa');
        },
        error => {
          alertify.error(error.error);
        }
      );
    }, function () {})
   }
}
