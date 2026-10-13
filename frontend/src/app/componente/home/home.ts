import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})

export class Home {
  rol: string | null;
  correo: string | null;
  nombre: string | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.rol = this.authService.obtenerRol();
    this.correo = localStorage.getItem('correo');
    this.nombre = localStorage.getItem('nombre');
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    localStorage.removeItem('correo');
    localStorage.removeItem('nombre');
    this.router.navigate(['/login']);
  }
}
