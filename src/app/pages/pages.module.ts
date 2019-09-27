import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { PipesModule } from '../pipes/pipes.module';

import { PrincipalComponent } from './principal/principal.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { NormasComponent } from './normas/normas.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { ProfileComponent } from './profile/profile.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { PlanesComponent } from './planes/planes.component';
import { AuditoriasComponent } from './auditorias/auditorias.component';


@NgModule({
    declarations: [
        PagesComponent,
        PrincipalComponent,
        InstitucionComponent,
        NormasComponent,
        AccoutSettingsComponent,
        UsuariosComponent,
        UsuarioComponent,
        ProfileComponent,
        ProcesosComponent,
        PlanesComponent,
        AuditoriasComponent
    ],
    exports: [
        PrincipalComponent,
        InstitucionComponent,
        NormasComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ]
})
export class PagesModule {}
