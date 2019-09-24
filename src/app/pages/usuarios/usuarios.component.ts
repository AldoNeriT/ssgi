import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

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
  usuariosIn: Usuario[] = [];
  mostrarActivos = true;

  cargando = true;

  constructor( @Inject(DOCUMENT) private _document,
               public _usuarioService: UsuarioService ) {
  }

  ngOnInit() {
    init_plugins();
    this.cargarUsuarios();
    inicializando_table();
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios()
          .subscribe( usuarios => {
            this.usuarios = usuarios;
            this.cargando = false;
            inicializando_table();
          });

  }

  cargarUsuariosInactivos() {

    this.cargando = true;

    this._usuarioService.cargarUsuariosInactivos()
          .subscribe( usuarios => {
            this.usuariosIn = usuarios;
            this.cargando = false;
            inicializando_table();
          });
  }

  desactivarUsuario( usuario: Usuario) {

    if ( usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('No puedes eliminarte',
      'Si deseas desactivar tu cuenta, hazlo desde otra cuenta Administrador',
      'error');
      return;
    }

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

  // cambiarCatalogo() {

  //   inicializando_table();
  //   this.mostrarActivos = !this.mostrarActivos;

  //   if ( this.mostrarActivos ) {
  //     this.cargarUsuarios();
  //   } else {
  //     this.cargarUsuariosInactivos();
  //   }

  // }

  cambiarPapelera() {

    this.mostrarActivos = false;
    this.cargarUsuariosInactivos();
    inicializando_table();

  }

  cambiarListaU() {

    this.mostrarActivos = true;
    this.cargarUsuarios();
    inicializando_table();

  }

}
