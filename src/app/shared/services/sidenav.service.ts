import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaApiMenu } from '../interfaces/respuesta-api-menu';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  constructor(private http: HttpClient) { }

  apiurl = environment.apiUrl + '/menu';

  GetMenu(): Observable<RespuestaApiMenu> {
    return this.http.get<RespuestaApiMenu>(this.apiurl);
  }
}
