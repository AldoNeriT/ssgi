import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class UsuarioService {

  totalUsuarios: number = 0;

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;
    this.token = token;

  }

  logout() {

    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('userName', usuario.nombre_Usuario);
    } else {
      localStorage.removeItem('userName');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
          .pipe(
            map( (resp: any) => {
              this.guardarStorage( resp.id, resp.token, resp.usuario)
              return true;
            }),
            catchError( err => {
              swal('Error', err.error.err.message, 'error');
              return throwError( err ) ;
            })
          );
  }

  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    if ( usuario._id ) {
      // *** Aqui se ACTUALIZA el Usuario ***
      url += '/' + usuario._id;

      // *** TOKEN ***
      url += '?token=' + this.token;

      return this.http.put( url, usuario )
      .pipe(
        map( (resp: any ) => {
          swal('Usuario Actualizado', usuario.nombre +
               ' ' + usuario.primer_Apellido +
               ' ' + usuario.segundo_Apellido +
               ' se actualizo exitosamente', 'success');
          return resp.usuario;
        }),
        catchError( err => {
          swal('Error', err.error.err.message, 'error');
          return throwError( err ) ;
        })
      );

    } else {
      // *** Aqui se CREA el Usuario ***

        // *** TOKEN ***
      url += '?token=' + this.token;

      return this.http.post( url, usuario )
      .pipe(
        map( (resp: any ) => {
          swal('Usuario Creado', usuario.nombre +
               ' ' + usuario.primer_Apellido +
               ' ' + usuario.segundo_Apellido +
               ' se a creado exitosamente', 'success');
          return resp.usuario;
        }),
        catchError( err => {
          swal('Error', err.error.err.message, 'error');
          return throwError( err ) ;
        })
      );
    }

  }

  cargarUsuarios() {

    let url = URL_SERVICIOS + '/usuario';

    // *** TOKEN ***
    url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        this.totalUsuarios = resp.cuantos;
        return resp.usuarios;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  cargarUsuariosInactivos() {

    let url = URL_SERVICIOS + '/usuario/inactivos';

    // *** TOKEN ***
    url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        this.totalUsuarios = resp.cuantos;
        return resp.usuarios;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  cargarUsuario( id: string) {

    let url = URL_SERVICIOS + '/usuario/' + id;

    // *** TOKEN ***
    url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        return resp.usuario;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  desactivarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;

    // *** TOKEN ***
    url += '?token=' + this.token;

    return this.http.delete( url )
    .pipe(
      map( (resp: any ) => {
        swal('Usuario Desactivado', '', 'success');
        return resp;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  desactivarUsuarioPermanente( id: string ) {

    let url = URL_SERVICIOS + '/usuario/inactivos/' + id;

    // *** TOKEN ***
    url += '?token=' + this.token;

    return this.http.delete( url )
    .pipe(
      map( (resp: any ) => {
        swal('Usuario Eliminado', '', 'success');
        return resp;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  activarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuario/inactivos/' + id;

    // *** TOKEN ***
    url += '?token=' + this.token;

    return this.http.put( url, '' )
    .pipe(
      map( (resp: any ) => {
        swal('Usuario Activado', '', 'success');
        return resp.usuario;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  actualizarPass( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/password/' + usuario._id;

    // *** TOKEN ***
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
    .pipe(
      map( (resp: any ) => {
        swal('Contraseña Actualizada', '', 'success');
        return resp.usuario;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  actualizarMiPerfil( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/miperfil/' + usuario._id;

    // *** TOKEN ***
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
    .pipe(
      map( (resp: any ) => {
        this.usuario = resp.usuario;
        swal('Datos Actualizados', '', 'success');
        return resp.usuario;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );
  }

}
