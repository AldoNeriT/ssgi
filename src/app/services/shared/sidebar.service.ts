import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  constructor( public _usuarioService: UsuarioService ) { }

  seleccionarMenu() {
    if ( this._usuarioService.usuario.tipo_Usuario === 'ROOT') {
      this.menuRoot();
      return;
    }
    if ( this._usuarioService.usuario.tipo_Usuario === 'ADMIN') {
      this.menuAdmin();
      return;
    }
    if ( this._usuarioService.usuario.tipo_Usuario === 'AUDITOR_LIDER') {
      this.menuAuditorLider();
      return;
    }
    if ( this._usuarioService.usuario.tipo_Usuario === 'AUDITOR') {
      this.menuAuditor();
      return;
    }
    if ( this._usuarioService.usuario.tipo_Usuario === 'AUDITADO') {
      this.menuAuditado();
      return;
    }
    if ( this._usuarioService.usuario.tipo_Usuario === 'ALTA_DIRECCION') {
      this.menuAltaD();
      return;
    }
  }

  menuRoot() {

    this.menu = [
      {
        titulo: 'Inicio',
        icono: 'mdi mdi-home',
        submenu: [
          { titulo: 'Home', url: '/home' }
        ]
      },
      {
        titulo: 'Sistema ABC',
        icono: 'mdi mdi-account-settings-variant',
        submenu: [
          { titulo: 'Institución', url: '/institucion' },
          { titulo: 'Usuarios', url: '/usuarios' },
          { titulo: 'Normas', url: '/normas' },
          { titulo: 'Procesos', url: '/procesos' },
          { titulo: 'Plan de Auditorias', url: '/plan' }
        ]
      }
    ];

  }

  menuAdmin() {

    this.menu = [
      {
        titulo: 'Inicio',
        icono: 'mdi mdi-home',
        submenu: [
          { titulo: 'Home', url: '/home' }
        ]
      },
      {
        titulo: 'Sistema ABC',
        icono: 'mdi mdi-account-settings-variant',
        submenu: [
          { titulo: 'Institución', url: '/institucion' },
          { titulo: 'Usuarios', url: '/usuarios' },
          { titulo: 'Normas', url: '/normas' },
          { titulo: 'Procesos', url: '/procesos' },
          { titulo: 'Plan de Auditorias', url: '/plan' }
        ]
      }
    ];

  }

  menuAuditorLider() {

    this.menu = [
      {
        titulo: 'Inicio',
        icono: 'mdi mdi-home',
        submenu: [
          { titulo: 'Home', url: '/home' }
        ]
      },
      {
        titulo: 'Sistema',
        icono: 'mdi mdi-account-settings-variant',
        submenu: [
          { titulo: 'Institución', url: '/institucion' },
          { titulo: 'Usuarios', url: '/usuarios' },
          { titulo: 'Normas', url: '/normas' },
          { titulo: 'Procesos', url: '/procesos' },
          { titulo: 'Plan de Auditorias', url: '/plan' }
        ]
      }
    ];

  }

  menuAuditor() {

    this.menu = [
      {
        titulo: 'Inicio',
        icono: 'mdi mdi-home',
        submenu: [
          { titulo: 'Home', url: '/home' }
        ]
      }
    ];

  }

  menuAuditado() {

    this.menu = [
      {
        titulo: 'Inicio',
        icono: 'mdi mdi-home',
        submenu: [
          { titulo: 'Home', url: '/home' }
        ]
      }
    ];

  }

  menuAltaD() {

    this.menu = [
      {
        titulo: 'Inicio',
        icono: 'mdi mdi-home',
        submenu: [
          { titulo: 'Home', url: '/home' }
        ]
      },
      {
        titulo: 'Auditorias',
        icono: 'mdi mdi-book',
        submenu: [
          { titulo: 'Plan de Auditorias', url: '/plan' }
        ]
      }
    ];

  }

}
