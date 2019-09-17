import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { PrincipalComponent } from './principal/principal.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { NormasComponent } from './normas/normas.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { UsuarioComponent } from './usuarios/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { ProcesosComponent } from './procesos/procesos.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            { path: 'home', component: PrincipalComponent, data: { titulo: 'Home' } },
            { path: 'institucion', component: InstitucionComponent, data: { titulo: 'Institución' } },
            { path: 'normas', component: NormasComponent, data: { titulo: 'Normas' } },
            { path: 'procesos', component: ProcesosComponent, data: { titulo: 'Procesos' } },
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
