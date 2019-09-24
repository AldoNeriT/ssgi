import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
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
        // { titulo: 'Home', url: '/home' },
        { titulo: 'Institución', url: '/institucion' },
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Normas', url: '/normas' },
        { titulo: 'Procesos', url: '/procesos' }
      ]
    }
  ];

  constructor() { }
}
