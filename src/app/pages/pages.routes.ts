import { RouterModule, Routes } from '@angular/router';

import {
    LoginGuardGuard,
    AbcGuard,
    UsuarioIdGuard
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
import { MenuAuditoriaComponent } from './menu-auditoria/menu-auditoria.component';
import { PlaneacionesComponent } from './planeaciones/planeaciones.component';
import { PlaneacionComponent } from './planeaciones/planeacion.component';
import { ListaVerificacionComponent } from './lista-verificacion/lista-verificacion.component';
import { InformeComponent } from './informe/informe.component';
import { BitacoraAccionesComponent } from './bitacora-acciones/bitacora-acciones.component';

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
                canActivate: [ AbcGuard ],
                data: { titulo: 'Institución' }
            },
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AbcGuard ],
                data: { titulo: 'Lista de Usuarios' }
            },
            {
                path: 'usuario/:id',
                component: UsuarioComponent,
                canActivate: [ UsuarioIdGuard ],
                data: { titulo: 'Usuario' }
            },
            {
                path: 'usuario/:ver/:id',
                component: UsuarioComponent,
                canActivate: [ AbcGuard ],
                data: { titulo: 'Usuario' }
            },
            {
                path: 'normas',
                component: NormasComponent,
                canActivate: [ AbcGuard ],
                data: { titulo: 'Normas' }
            },
            {
                path: 'procesos',
                component: ProcesosComponent,
                canActivate: [ AbcGuard ],
                data: { titulo: 'Procesos' }
            },
            { path: 'planes', component: PlanesComponent, data: { titulo: 'Plan de Auditorías' } },
            {
                path: 'auditoria/:id',
                component: AuditoriasComponent,
                canActivate: [ AbcGuard ],
                data: { titulo: 'Auditoría' }
            },
            { path: 'menu-auditoria/:idA', component: MenuAuditoriaComponent, data: { titulo: 'Menú de Auditorias' } },
            { path: 'planeacion/:idA', component: PlaneacionesComponent, data: { titulo: 'Planeación' } },
            { path: 'planeacionA/:idA', component: PlaneacionComponent, data: { titulo: 'Planeación' } },
            { path: 'planeacionA/:idA/:idP', component: PlaneacionComponent, data: { titulo: 'Planeación' } },
            { path: 'listaVerificacion/:idA/:idU', component: ListaVerificacionComponent, data: { titulo: 'Lista de Verificación' } },
            { path: 'informe/:idA/:idU', component: InformeComponent, data: { titulo: 'Informe' } },
            { path: 'bitacora/:idA/:idU', component: BitacoraAccionesComponent, data: { titulo: 'Bitacora de Acciones' } },
            { path: '', redirectTo: '/home', pathMatch: 'full'}
        ]
     }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
