import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilesInterface } from '../../interfaces/perfiles-interface';
import { PostPerfil } from '../../interfaces/post-perfil';
import { PerfilesService } from '../../services/perfiles.service';

import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-perfiles-formulario',
  templateUrl: './perfiles-formulario.component.html',
  styleUrls: ['./perfiles-formulario.component.css']
})
export class PerfilesFormularioComponent implements OnInit {

  constructor(private builder: FormBuilder, private dialog: MatDialog, 
    private perfilService: PerfilesService, 
    @Inject(MAT_DIALOG_DATA) public data: { element: PerfilesInterface, idEdit: number }) { }

  editdata!: PerfilesInterface;

  ngOnInit(): void {
    if (this.data.element != null) {
      this.perfilForm.setValue({
        descripcion: this.data.element.descripcion
      });
    }
  }

  perfilForm=this.builder.group({
    descripcion: this.builder.control('', Validators.required)
  });

  AgregarPerfil() {
    if (this.perfilForm.valid) {
      const perfil: PostPerfil = {
        descripcion: this.perfilForm.get('descripcion')?.value!
      };
      if (this.data.idEdit != null) {        
        this.perfilService.ActualizarPerfil(this.data.idEdit, perfil).subscribe(response => {
          this.CerrarFormulario();
          alertify.success("Actualizacion exitosa");
        });
      } else {
        this.perfilService.PostPerfil(perfil).subscribe(response => {
          this.CerrarFormulario();
          alertify.success("Perfil ingresado");
        });
      }
    }
  }
  CerrarFormulario(){
    this.dialog.closeAll();
  }

}
