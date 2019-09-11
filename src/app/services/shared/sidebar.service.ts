import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Sistema ABC',
      icono: 'mdi mdi-account-settings-variant',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Pendiente', url: '/registro' }
      ]
    }
  ];

  constructor() { }
}
