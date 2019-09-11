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
    // console.log('Servicio de Usuario listo');
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

    // tslint:disable-next-line: prefer-const
    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
          .pipe(
            map( (resp: any) => {

              this.guardarStorage( resp.id, resp.token, resp.usuario)

              // localStorage.setItem('id', resp.id);
              // localStorage.setItem('token', resp.token);
              // localStorage.setItem('usuario', JSON.stringify( resp.usuario ) );

              return true;
            }),
            catchError( err => {
              swal('Error', err.error.err.message, 'error');
              // console.log(err.error.err.message);
              return throwError( err ) ;
            })
          );
  }

  crearUsuario( usuario: Usuario ) {

    // tslint:disable-next-line: prefer-const
    let url = URL_SERVICIOS + '/usuario';

    console.log('CONTIENE ID???????????', usuario._id );

    if ( usuario._id ) {
      // *** Aqui se ACTUALIZA el Usuario ***
      url += '/' + usuario._id;
      // url += '?token=' + this.token;

      return this.http.put( url, usuario )
      .pipe(
        map( (resp: any ) => {

          swal('Usuario Actualizado', usuario.nombre + ' ' + usuario.primer_Apellido + ' se actualizo exitosamente', 'success');
          console.log('Respuestaaaaaa Actualizado: ',  resp );
          return resp.usuario;

        }),
        catchError( err => {
          swal('Error', err.error.err.message, 'error');
          // console.log(err.error.err.message);
          return throwError( err ) ;
        })
      );

    } else {
      // *** Aqui se CREA el Usuario ***

      // url += '?token=' + this.token;
      // console.log(url);

      return this.http.post( url, usuario )
      .pipe(
        map( (resp: any ) => {

          swal('Usuario Creado', usuario.nombre + ' ' + usuario.primer_Apellido + ' se a creado exitosamente', 'success');
          console.log('Respuestaaaaaa Creado: ',  resp );
          return resp.usuario;

        }),
        catchError( err => {
          swal('Error', err.error.err.message, 'error');
          // console.log(err.error.err.message);
          return throwError( err ) ;
        })
      );
    }

  }

  cargarUsuarios() {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {

        this.totalUsuarios = resp.cuantos;
        return resp.usuarios;

      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        // console.log(err.error.err.message);
        return throwError( err ) ;
      })
    );
  }

  cargarUsuariosInactivos() {
    let url = URL_SERVICIOS + '/usuario/inactivos';

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {

        this.totalUsuarios = resp.cuantos;
        return resp.usuarios;

      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        // console.log(err.error.err.message);
        return throwError( err ) ;
      })
    );
  }

  cargarUsuario( id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {

        console.log('Usuario Cargado Individualmente', resp.usuario );
        return resp.usuario;

      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        // console.log(err.error.err.message);
        return throwError( err ) ;
      })
    );
  }

  desactivarUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;

    return this.http.delete( url )
    .pipe(
      map( (resp: any ) => {

        swal('Usuario Desactivado', '', 'success');
        // console.log('Respuestaaaaaa: ',  resp );
        return resp;

      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        // console.log(err.error.err.message);
        return throwError( err ) ;
      })
    );
  }

  desactivarUsuarioPermanente( id: string ) {
    let url = URL_SERVICIOS + '/usuario/inactivos/' + id;

    return this.http.delete( url )
    .pipe(
      map( (resp: any ) => {

        swal('Usuario Eliminado', '', 'success');
        // console.log('Respuestaaaaaa: ',  resp );
        return resp;

      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        // console.log(err.error.err.message);
        return throwError( err ) ;
      })
    );
  }

  activarUsuario( id: string ) {

    // tslint:disable-next-line: prefer-const
    let url = URL_SERVICIOS + '/usuario/inactivos/' + id;

    console.log('CONTIENE ID???????????', id );

    // *** Aqui se ACTUALIZA el Usuario ***
    // url += '/' + usuario._id;
    // url += '?token=' + this.token;

    return this.http.put( url, '' )
    .pipe(
      map( (resp: any ) => {

        swal('Usuario Activado', '', 'success');
        console.log('Respuestaaaaaa Activado: ',  resp );
        return resp.usuario;

      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        // console.log(err.error.err.message);
        return throwError( err ) ;
      })
    );
  }

  actualizarPass( usuario: Usuario ) {

    // tslint:disable-next-line: prefer-const
    let url = URL_SERVICIOS + '/usuario/password/' + usuario._id;

    console.log('CONTIENE ID???????????', usuario._id );

    // *** Aqui se ACTUALIZA el Usuario ***
    // url += '/' + usuario._id;
    // url += '?token=' + this.token;

    return this.http.put( url, usuario )
    .pipe(
      map( (resp: any ) => {

        swal('Contraseña Actualizada', '', 'success');
        console.log('Respuestaaaaaa Activado: ',  resp );
        return resp.usuario;

      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        // console.log(err.error.err.message);
        return throwError( err ) ;
      })
    );
  }

}
