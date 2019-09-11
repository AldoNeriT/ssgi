import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

declare function inicializando_table();

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
    inicializando_table();
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios()
          .subscribe( usuarios => {
            this.usuarios = usuarios;
            // console.log(usuarios);
          });
  }

  cargarUsuariosInactivos() {
    this._usuarioService.cargarUsuariosInactivos()
          .subscribe( usuarios => {
            this.usuarios = usuarios;
            // console.log(usuarios);
          });
  }

  desactivarUsuario( usuario: Usuario) {

    swal({
      title: '¡Advertencia!',
      text: '¿Estas seguro de desactivar el Usuario?',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.desactivarUsuario( usuario._id )
          .subscribe( (resp: any) => {
            // console.log('RESP DEL DELETE', resp );
            this.cargarUsuarios();
          } );
      }
    });

  }

  activarUsuario( usuario: Usuario) {

    swal({
      title: '¡Advertencia!',
      text: '¿Estas seguro de activar el Usuario?',
      icon: 'info',
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.activarUsuario( usuario._id )
          .subscribe( (resp: any) => {
            // console.log('RESP DEL DELETE', resp );
            this.cargarUsuariosInactivos();
          } );
      }
    });

  }

  desactivarUsuarioPermanente( usuario: Usuario) {

    swal({
      title: '¡Advertencia!',
      text: '¿Estas seguro de eliminar permanentemente el Usuario?',
      icon: 'error',
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.desactivarUsuarioPermanente( usuario._id )
          .subscribe( (resp: any) => {
            // console.log('RESP DEL DELETE', resp );
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
