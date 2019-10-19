import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Informe } from '../../models/informe.model';
import { URL_SERVICIOS } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

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
}
