import { RouterModule, Routes } from '@angular/router';

import {
    LoginGuardGuard,
    InstitucionGuard,
    UsuarioGuard,
    NormaGuard,
    ProcesoGuard
} from '../services/service.index';

import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PrincipalComponent } from './principal/principal.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NormasComponent } from './normas/normas.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { PlanesComponent } from './planes/planes.component';
import { AuditoriasComponent } from './auditorias/auditorias.component';




const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'home', component: PrincipalComponent, data: { titulo: 'Home' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Mi Perfil' } },
            // Mantenimiento
            {
                path: 'institucion',
                component: InstitucionComponent,
                canActivate: [ InstitucionGuard ],
                data: { titulo: 'Institución' }
            },
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ UsuarioGuard ],
                data: { titulo: 'Lista de Usuarios' }
            },
            {
                path: 'usuario/:id',
                component: UsuarioComponent,
                canActivate: [ UsuarioGuard ],
                data: { titulo: 'Usuario' }
            },
            {
                path: 'usuario/:ver/:id',
                component: UsuarioComponent,
                canActivate: [ UsuarioGuard ],
                data: { titulo: 'Usuario' }
            },
            {
                path: 'normas',
                component: NormasComponent,
                canActivate: [ NormaGuard ],
                data: { titulo: 'Normas' }
            },
            {
                path: 'procesos',
                component: ProcesosComponent,
                canActivate: [ ProcesoGuard ],
                data: { titulo: 'Procesos' }
            },
            { path: 'planes', component: PlanesComponent, data: { titulo: 'Plan de Auditorías' } },
            { path: 'auditoria/:id', component: AuditoriasComponent, data: { titulo: 'Auditoría' } },
            { path: 'auditoria/:ver/:id', component: AuditoriasComponent, data: { titulo: 'Auditoría' } },
            { path: '', redirectTo: '/home', pathMatch: 'full'}
        ]
     }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
