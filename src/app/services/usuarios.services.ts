import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuariosServices {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/get_usuarios`);
  }

  store(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/store`, userData);
  }

  update(id_usuario: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/update/${id_usuario}`, userData);
  }

  delete(id_usuario: number, userData: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuarios/delete/${id_usuario}`, userData);
  }
}
