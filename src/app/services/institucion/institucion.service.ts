import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Institucion } from '../../models/institucion.model';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  totalInstituciones: number = 0;

  institucion: Institucion;
  token: string;

  constructor( public http: HttpClient ) { }

  cargarInstituciones() {

    let url = URL_SERVICIOS + '/institucion';

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        this.totalInstituciones = resp.cuantos;
        return resp;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  // *** ESTE METODO NO ES USADO, SE ELIMINARÁ ***
  // cargarInstitucion( id: string ) {

  //   let url = URL_SERVICIOS + '/institucion/' + id;

  //   // *** TOKEN ***
  //   // url += '?token=' + this.token;

  //   return this.http.get( url )
  //   .pipe(
  //     map( (resp: any ) => {
  //       return resp.institucion;
  //     }),
  //     catchError( err => {
  //       swal('Error', err.error.err.message, 'error');
  //       return throwError( err ) ;
  //     })
  //   );

  // }

  crearInstitucion( institucion: Institucion ) {

    let url = URL_SERVICIOS + '/institucion';

    if ( institucion._id ) {
      // *** Aqui se ACTUALIZA la Institucion ***
      url += '/' + institucion._id;

      // *** TOKEN ***
      // url += '?token=' + this.token;

      return this.http.put( url, institucion )
      .pipe(
        map( (resp: any ) => {
          swal('Institución Actualizada', '', 'success');
          return resp.institucion;
        }),
        catchError( err => {
          swal('Error', err.error.err.message, 'error');
          return throwError( err ) ;
        })
      );

    } else {
      // *** Aqui se CREA la Institucion ***

      // *** TOKEN ***
      // url += '?token=' + this.token;

      return this.http.post( url, institucion )
      .pipe(
        map( (resp: any ) => {
          swal('Institución Creada', `${institucion.nombreInstitucion} se ha creado exitosamente`, 'success');
          return resp.institucion;
        }),
        catchError( err => {
          swal('Error', err.error.err.message, 'error');
          return throwError( err ) ;
        })
      );
    }

  }

  // *** ESTE METODO ES DE EMERGENCIA PARA BORRAR ***
  eliminarInstitucion( id: string ) {

    let url = URL_SERVICIOS + '/institucion/' + id;

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.delete( url )
    .pipe(
      map( (resp: any ) => {
        swal('Institución Eliminada', '', 'success');
        return resp;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

}
