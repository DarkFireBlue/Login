import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; //Esto redirige a la pagina de login

@Component({
  imports: [RouterLink],
  selector: 'app-sin-acceso',
  styleUrl: './sin-acceso.css',
  templateUrl: './sin-acceso.html',
})
export class SinAcceso {}
