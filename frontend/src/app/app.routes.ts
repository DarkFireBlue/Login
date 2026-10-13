import { Routes } from '@angular/router';
import { Login } from './componente/login/login';
import { Home } from './componente/home/home';
import { SinAcceso } from './componente/sin-acceso/sin-acceso';
import { authGuard } from './guard/auth-guard';
import { roleguard } from './guard/role-guard';

export const routes: Routes = [
    //ruta inicial
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    //ruta publica
    {path: 'login', component: Login},
    //ruta protegida
    {path: 'home', component: Home, canActivate: [authGuard, roleguard], 
        data: {roles: ['admin', 'cliente']}},
    //ruta de acceso denegado
    {path: 'sin-acceso', component: SinAcceso},
];
