import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Norma } from '../../models/norma.model';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class NormaService {

  totalNormas: number = 0;

  // norma: Norma;
  token: string;

  constructor( public http: HttpClient ) { }

  cargarNormas() {

    let url = URL_SERVICIOS + '/norma';

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        console.log('SERVICIO RETORNO NORMAS', resp);
        this.totalNormas = resp.cuantos;
        return resp.normas;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  cargarNorma( id: string) {

    let url = URL_SERVICIOS + '/norma/' + id;

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        return resp.norma;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  crearNorma( norma: Norma ) {

    let url = URL_SERVICIOS + '/norma';

    if ( norma._id ) {
      // *** Aqui se ACTUALIZA la Norma ***
      url += '/' + norma._id;

      // *** TOKEN ***
      // url += '?token=' + this.token;

      return this.http.put( url, norma )
      .pipe(
        map( (resp: any ) => {
          swal('Norma Actualizada',
               'La Norma ' + norma.nombreNorma +
               ' se actualizó exitosamente', 'success');
          return resp.norma;
        }),
        catchError( err => {
          swal('Error', err.error.err.message, 'error');
          return throwError( err ) ;
        })
      );

    } else {
      // *** Aqui se CREA la Norma ***

      // *** TOKEN ***
      // url += '?token=' + this.token;

      return this.http.post( url, norma )
      .pipe(
        map( (resp: any ) => {
          swal('Norma Creada',
               'La norma ' + norma.nombreNorma +
               ' se a creado exitosamente', 'success');
          return resp.norma;
        }),
        catchError( err => {
          // swal('Error', err.error.err.message, 'error');
          // swal('Error', err, 'error');
          return throwError( err ) ;
        })
      );
    }

  }

  eliminarNorma( id: string ) {

    let url = URL_SERVICIOS + '/norma/' + id;

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.delete( url )
    .pipe(
      map( (resp: any ) => {
        swal('Norma Eliminada', '', 'success');
        return resp;
      }),
      catchError( err => {
        swal('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

}
