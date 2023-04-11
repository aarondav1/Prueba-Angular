import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaApiBasica } from 'src/app/shared/interfaces/respuesta-api-basica';
import { environment } from 'src/environments/environment';
import { PostUsuarioInterface } from '../interfaces/post-usuario-interface';
import { RespuestaApiUsuario } from '../interfaces/respuesta-api-usuario';
import { UsuarioInterface } from '../interfaces/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  apiurl = environment.apiUrl + '/usuarios';

  ListarUsuarios(): Observable<RespuestaApiUsuario>{
    return this.http.get<RespuestaApiUsuario>(this.apiurl);
  }

  PostUsuario(usuarioData: PostUsuarioInterface) {
    return this.http.post<RespuestaApiBasica>(this.apiurl, usuarioData);
  }

  ActualizarUsuario(id: number, usuarioData: PostUsuarioInterface) {
    return this.http.put<RespuestaApiBasica>(this.apiurl + '/' + id, usuarioData);
  }  

  EliminarUsuario(id: number){
    return this.http.delete<RespuestaApiBasica>(this.apiurl + '/' + id);
  }
}
