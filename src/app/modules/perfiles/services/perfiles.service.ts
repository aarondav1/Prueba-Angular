import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaApiBasica } from 'src/app/shared/interfaces/respuesta-api-basica';
import { environment } from 'src/environments/environment';
import { PostPerfil } from '../interfaces/post-perfil';
import { RespuestaApiPerfiles } from '../interfaces/respuesta-api-perfiles';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(private http: HttpClient) { }

  apiurl = environment.apiUrl + '/perfiles';

  ListarPerfiles(): Observable<RespuestaApiPerfiles>{
    return this.http.get<RespuestaApiPerfiles>(this.apiurl);
  }

  PostPerfil(perfileData: PostPerfil) {
    return this.http.post<RespuestaApiBasica>(this.apiurl, perfileData);
  }

  ActualizarPerfil(id: number, perfileData: PostPerfil) {
    return this.http.put<RespuestaApiBasica>(this.apiurl + '/' + id, perfileData);
  }  

  EliminarPerfil(id: number){
    return this.http.delete<RespuestaApiBasica>(this.apiurl + '/' + id);
  }
}
