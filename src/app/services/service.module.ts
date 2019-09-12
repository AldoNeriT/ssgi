import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginGuardGuard,
         SettingsService,
         SharedService,
         SidebarService,
         InstitucionService,
         UsuarioService,
         NormaService,
         ProcesoService,
         SubprocesoService
        } from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuardGuard,
    SettingsService,
    SharedService,
    SidebarService,
    InstitucionService,
    UsuarioService,
    NormaService,
    ProcesoService,
    SubprocesoService
  ]
})
export class ServiceModule { }
