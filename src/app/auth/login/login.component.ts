// import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as alertify from 'alertifyjs'
import { RespuestaApiInterface } from '../interfaces/respuesta-api-interface';
import { UsuarioInterface } from '../interfaces/usuario-interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private fb: FormBuilder, private router: Router, private authService: AuthService) { 

    }

  miFormulario: FormGroup = this.fb.group({
    usuario:    ['admin', [Validators.required]],
    clave: ['Admin1236', [Validators.required]]
  });
  login(){
    const { usuario, clave } = this.miFormulario.value;
    const datosUsuario: UsuarioInterface = {
      usuario: usuario,
      clave: clave
    }
    this.authService.PostAutenticacion(datosUsuario).subscribe(
      (respuesta: RespuestaApiInterface) => {
        if (respuesta.status === 200) {
          this.authService.isLoggedIn = true;
          //alertify.error(this.authService.isLoggedIn);
          window.location.replace('/usuarios');
        } else {
          alertify.error(respuesta.message);
        }
      },
      (error) => {
        alertify.error('Credenciales incorrectas');
      }
    );
  }
}
