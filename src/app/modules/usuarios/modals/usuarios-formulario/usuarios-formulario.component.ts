import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostUsuarioInterface } from '../../interfaces/post-usuario-interface';
import { UsuarioInterface } from '../../interfaces/usuario-interface';
import { UsuariosService } from '../../services/usuarios.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-usuarios-formulario',
  templateUrl: './usuarios-formulario.component.html',
  styleUrls: ['./usuarios-formulario.component.css']
})
export class UsuariosFormularioComponent implements OnInit {

  constructor(private builder: FormBuilder, private dialog: MatDialog, 
    private usuarioService: UsuariosService, 
    @Inject(MAT_DIALOG_DATA) public data: { element: UsuarioInterface, idEdit: number }) { }

  editdata!: UsuarioInterface;

  ngOnInit(): void {
    if (this.data.element != null) {
      this.usuarioForm.setValue({
        nombre: this.data.element.nombre, apellido: this.data.element.apellido,
        usuario: this.data.element.usuario, correo: this.data.element.correo, clave: this.data.element.clave
      });
    }
  }

  usuarioForm=this.builder.group({
    nombre: this.builder.control('', Validators.required),
    apellido: this.builder.control('', Validators.required),
    usuario: this.builder.control('', Validators.required),
    correo: this.builder.control('', Validators.required),
    clave: this.builder.control('', Validators.required)
  });

  AgregarUsuario() {
    if (this.usuarioForm.valid) {
      const usuario: PostUsuarioInterface = {
        nombre: this.usuarioForm.get('nombre')?.value!,
        apellido: this.usuarioForm.get('apellido')?.value!,
        usuario: this.usuarioForm.get('usuario')?.value!,
        correo: this.usuarioForm.get('correo')?.value!,
        clave: this.usuarioForm.get('clave')?.value!,
      };
      if (this.data.idEdit != null) {        
        this.usuarioService.ActualizarUsuario(this.data.idEdit, usuario).subscribe(response => {
          this.CerrarFormulario();
          alertify.success("Actualizacion exitosa");
        });
      } else {
        this.usuarioService.PostUsuario(usuario).subscribe(response => {
          this.CerrarFormulario();
          alertify.success("Usuario ingresado");
        });
      }
    }
  }

  CerrarFormulario(){
    this.dialog.closeAll();
  }

}
