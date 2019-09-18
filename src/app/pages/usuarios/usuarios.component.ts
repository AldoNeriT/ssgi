import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';

declare function inicializando_table();
declare function init_plugins();

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  mostrarActivos = true;

  constructor( @Inject(DOCUMENT) private _document,
               public _usuarioService: UsuarioService ) {
  }

  ngOnInit() {
    init_plugins();
    inicializando_table();
    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this._usuarioService.cargarUsuarios()
          .subscribe( usuarios => {
            this.usuarios = usuarios;
          });

  }

  cargarUsuariosInactivos() {

    this._usuarioService.cargarUsuariosInactivos()
          .subscribe( usuarios => {
            this.usuarios = usuarios;
          });
  }

  desactivarUsuario( usuario: Usuario) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de desactivar a "${usuario.nombre_Usuario}"?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK'
    }).then((desactivar) => {
      if (desactivar.value) {
        this._usuarioService.desactivarUsuario( usuario._id )
          .subscribe( (resp: any) => {
            this.cargarUsuarios();
          } );
      }
    });

  }

  activarUsuario( usuario: Usuario) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de activar a "${usuario.nombre_Usuario}"?`,
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK'
    }).then((activar) => {
      if (activar.value) {
        this._usuarioService.activarUsuario( usuario._id )
          .subscribe( (resp: any) => {
            this.cargarUsuariosInactivos();
          } );
      }
    });

  }

  desactivarUsuarioPermanente( usuario: Usuario ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de eliminar permanentemente a "${usuario.nombre_Usuario}"?`,
      type: 'error',
      showCancelButton: true,
      confirmButtonText: 'OK'
    }).then((eliminar) => {
      if (eliminar.value) {
        this._usuarioService.desactivarUsuarioPermanente( usuario._id )
          .subscribe( (resp: any) => {
            this.cargarUsuariosInactivos();
          } );
      }
    });

  }

  cambiarCatalogo() {

    this.mostrarActivos = !this.mostrarActivos;
    inicializando_table();

    if ( this.mostrarActivos ) {
      this.cargarUsuarios();
    } else {
      this.cargarUsuariosInactivos();
    }

  }

}
