import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Planeacion } from '../../models/planeacion.model';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PlaneacionService {

  totalPlaneaciones: number = 0;

  token: string;

  constructor( public http: HttpClient ) {
    this.cargarStorage();
   }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }

  }

  cargarPlaneacion( id: string ) {

    let url = URL_SERVICIOS + '/planeacion/' + id;

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        return resp.planeacion;
      }),
      catchError( err => {
        Swal.fire('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  cargarPlaneacionesAudi( id: string ) {

    let url = URL_SERVICIOS + '/planeacion/auditoria/' + id;

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        return resp.planeaciones;
      }),
      catchError( err => {
        Swal.fire('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  crearPlaneacion( planeacion: Planeacion ) {

    let url = URL_SERVICIOS + '/planeacion';

    if ( planeacion._id ) {
      // *** Aqui se ACTUALIZA la Planeacion ***
      url += '/' + planeacion._id;

      // *** TOKEN ***
      // url += '?token=' + this.token;

      return this.http.put( url, planeacion )
      .pipe(
        map( (resp: any ) => {
          Swal.fire({
            title: 'Planeación Actualizada',
            type: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          return resp.planeacion;
        }),
        catchError( err => {
          Swal.fire('Error', err.error.err.message, 'error');
          return throwError( err ) ;
        })
      );

    } else {
      // *** Aqui se CREA la Planeacion ***

      // *** TOKEN ***
      // url += '?token=' + this.token;

      return this.http.post( url, planeacion )
      .pipe(
        map( (resp: any ) => {
          Swal.fire({
            title: 'Planeación Creada',
            text: '',
            type: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          return resp.planeacion;
        }),
        catchError( err => {
          Swal.fire('Error', err.error.err.message, 'error');
          return throwError( err ) ;
        })
      );
    }

  }

  eliminarPlaneacion( id: string ) {

    let url = URL_SERVICIOS + '/planeacion/' + id;

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.delete( url )
    .pipe(
      map( (resp: any ) => {
        Swal.fire({
          title: 'Eliminado',
          type: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        return resp;
      }),
      catchError( err => {
        console.log(err);
        Swal.fire('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

}
