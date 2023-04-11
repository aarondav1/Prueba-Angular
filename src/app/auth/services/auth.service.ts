import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaApiInterface } from '../interfaces/respuesta-api-interface';
import { UsuarioInterface } from '../interfaces/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(private http: HttpClient) { }

  apiurl = environment.apiUrl + '/autenticacion';
  toggleLogin(){
    this.isLoggedIn = !this.isLoggedIn;
  }
  PostAutenticacion(usuarioData: UsuarioInterface) {
    return this.http.post<RespuestaApiInterface>(this.apiurl, usuarioData, { headers: { 'Content-Type': 'application/json' } });
  }
  
}
