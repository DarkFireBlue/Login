import { Component} from '@angular/core';
import { AuthService, Credenciales } from '../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})

export class Login {
  constructor(private authService: AuthService, private router: Router) {}
  
  iniciarSesion(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const datos = new FormData(form);
    
    const usuario: Credenciales = {
      correo: datos.get('correo') as string,
      contrasena: datos.get('contrasena') as string,
    }

    this.authService.login(usuario).subscribe({
      next: (response) => {
        console.log('Inicio de sesión correcto:', response);
        
        // Guarda el token y el rol
        const respuesta = response as { token: string; nombre: string; rol: string };
        this.authService.guardarToken(respuesta.token, respuesta.rol);
        localStorage.setItem('correo', usuario.correo);
        localStorage.setItem('nombre', respuesta.nombre);
        this.router.navigate(['/home']); // Rediririge a la página de inicio

      },
      
      // Mostrar mensajes de error
      error: (error) => {
        console.error('Usuario o contraseña incorrectos:', error);
        if (error.status === 401) {
          this.router.navigate(['/sin-acceso'], { queryParams: { error: 'Usuario o contraseña incorrectos' } });
        } else {
          this.router.navigate(['/sin-acceso'], { queryParams: { error: 'Error en el inicio de sesión. Por favor, inténtelo de nuevo más tarde.' } });
        }
      }
    });
  }
}
