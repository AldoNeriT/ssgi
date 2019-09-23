import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proceso } from '../../models/proceso.model';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  totalProcesos: number = 0;

  proceso: Proceso;
  token: string;

  constructor( public http: HttpClient ) { }

  cargarProcesos() {

    let url = URL_SERVICIOS + '/proceso';

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        this.totalProcesos = resp.cuantos;
        return resp.procesos;
      }),
      catchError( err => {
        Swal.fire('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  cargarProceso( id: string ) {

    let url = URL_SERVICIOS + '/proceso/' + id;

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.get( url )
    .pipe(
      map( (resp: any ) => {
        return resp.proceso;
      }),
      catchError( err => {
        Swal.fire('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  crearProceso( proceso: Proceso ) {

    let url = URL_SERVICIOS + '/proceso';

    if ( proceso._id ) {
      // *** Aqui se ACTUALIZA el Proceso ***
      url += '/' + proceso._id;

      // *** TOKEN ***
      // url += '?token=' + this.token;

      return this.http.put( url, proceso )
      .pipe(
        map( (resp: any ) => {
          Swal.fire('Proceso Actualizado', '', 'success');
          return resp.proceso;
        }),
        catchError( err => {
          Swal.fire('Error', err.error.err.message, 'error');
          return throwError( err ) ;
        })
      );

    } else {
      // *** Aqui se CREA el Proceso ***

      // *** TOKEN ***
      // url += '?token=' + this.token;

      return this.http.post( url, proceso )
      .pipe(
        map( (resp: any ) => {
          Swal.fire('Proceso Creado', `${proceso.nombreProceso} se ha creado exitosamente`, 'success');
          return resp.proceso;
        }),
        catchError( err => {
          Swal.fire('Error', err.error.err.message, 'error');
          return throwError( err ) ;
        })
      );
    }

  }

  eliminarSubprocesosProceso( id: string ) {

    // let url = URL_SERVICIOS + '/proceso/' + id;
    let url = URL_SERVICIOS + '/subproceso/proceso/' + id;

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.delete( url )
    .pipe(
      map( (resp: any ) => {
        // Swal.fire('Subprocesos del Proceso Eliminado', '', 'success');
        return resp;
      }),
      catchError( err => {
        Swal.fire('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

  eliminarProceso( id: string ) {

    let url = URL_SERVICIOS + '/proceso/' + id;

    // *** TOKEN ***
    // url += '?token=' + this.token;

    return this.http.delete( url )
    .pipe(
      map( (resp: any ) => {
        Swal.fire('Proceso Eliminado', '', 'success');
        return resp;
      }),
      catchError( err => {
        Swal.fire('Error', err.error.err.message, 'error');
        return throwError( err ) ;
      })
    );

  }

}
