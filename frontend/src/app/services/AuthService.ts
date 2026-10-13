import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//datos enviados al backend
export interface Credenciales { 
  correo: string;
  contrasena: string;
}

//datos recibidos del backend
export interface RespuestaLogin { 
  token: string;
  nombre: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiServerUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  
  //envio de credenciales al backend
  login(usuario: Credenciales) {
    return this.http.post(`${this.apiServerUrl}/login`, usuario);
  }
  
  //gestión y almacenamiento del token
  guardarToken(token: string, rol: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
  }
  obtenerToken(){
    return localStorage.getItem('token');
  }

  //verificar la sesión
  estaAutenticado(): boolean {
    return this.obtenerToken() !== null;
  }
  cerrarSesion() {
    localStorage.removeItem('token'); 
  }

  //verificación del rol
  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }
  tieneRol(rolesPermitidos: string[]): boolean {
    const rol = this.obtenerRol();
    return rol !== null && rolesPermitidos.includes(rol);
  }
}
