import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { RegistroComponent } from './registro/registro.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { UsuarioComponent } from './usuarios/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            { path: 'home', component: DashboardComponent, data: { titulo: 'Home' } },
            { path: 'institucion', component: ProgressComponent, data: { titulo: 'Institucion' } },
            { path: 'normar', component: RegistroComponent, data: { titulo: 'Normas' } },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Lista de Usuarios' } },
            { path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'Usuario' } },
            { path: 'usuario/:ver/:id', component: UsuarioComponent, data: { titulo: 'Usuario' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Mi Perfil' } },
            { path: '', redirectTo: '/home', pathMatch: 'full'}
        ]
     }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
