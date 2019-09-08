import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

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
            })
          );
  }

  crearUsuario( usuario: Usuario ) {

    // tslint:disable-next-line: prefer-const
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario );

    // return this.http.post( url, usuario )
    // .pipe(
    //   map( (resp: any ) => {

    //     swal('Usuario Creado', usuario.nombre, 'success');
    //     return resp.usuario;

    //   })
    // );

  }
}
