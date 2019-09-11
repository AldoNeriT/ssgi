import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { RegistroComponent } from './registro/registro.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { UsuarioComponent } from './usuarios/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'registro', component: RegistroComponent, data: { titulo: 'Registro' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Lista de Usuarios' } },
            { path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'Usuario' } },
            { path: 'usuario/:ver/:id', component: UsuarioComponent, data: { titulo: 'Usuario' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
     }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
