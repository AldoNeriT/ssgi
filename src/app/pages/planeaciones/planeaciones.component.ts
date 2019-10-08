import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaneacionService, AuditoriaService, UsuarioService } from '../../services/service.index';
import { Planeacion } from '../../models/planeacion.model';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare function init_plugins();

@Component({
  selector: 'app-planeaciones',
  templateUrl: './planeaciones.component.html',
  styles: []
})
export class PlaneacionesComponent implements OnInit {

  planeaciones: any[] = [];

  id: string;
  arrFechasT: any[] = [];
  arrFechas: any[] = [];

  cargando = true;

  objetivosV: string;
  alcanceV: string;
  normasV: string;

  constructor( public _planeacionService: PlaneacionService,
               public _auditoriaService: AuditoriaService,
               public _usuarioService: UsuarioService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.id = params['idA'];
    });
  }

  ngOnInit() {
    init_plugins();

    this.cargarPlaneacionesAudi( this.id );
    this.cargarAuditoria( this.id );
  }

  regresar() {
    this.router.navigate(['/planes']);
  }

  cargarPlaneacionesAudi( id: string ) {

    this.arrFechasT = [];
    this.arrFechas = [];

    this.cargando = true;

    if ( (this._usuarioService.usuario.tipo_Usuario !== 'ALTA_DIRECCION') &&
         (this._usuarioService.usuario.tipo_Usuario !== 'AUDITOR') &&
         (this._usuarioService.usuario.tipo_Usuario !== 'AUDITADO')) {
      this._planeacionService.cargarPlaneacionesAudi( id )
          .subscribe( planeaciones => {
            this.planeaciones = planeaciones;
            // console.log(this.planeaciones);
            // Se extraen las fechas a un array
            for ( let pl of planeaciones) {
              this.arrFechasT.push(pl.fecha);
            }

            // Se eliminas duplicados
            for ( let i = 0; i < this.arrFechasT.length; i++ ) {
              for ( let j = 0; j < this.arrFechasT.length - 1; j++ ) {
                if ( i !== j ) {
                  if ( this.arrFechasT[i] === this.arrFechasT[j] ) {
                    // eliminamos su valor
                    this.arrFechasT[i] = '';
                  }
                }
              }
            }

            // Se crean el nuevo array de fechas sin los duplicados
            for ( let fech of this.arrFechasT) {
              if ( fech !== '') {
                this.arrFechas.push(fech);
              }
            }

            // Ordenamos el array
            // this.arrFechas.sort();

            this.cargando = false;

          });
    } else {
      this._planeacionService.cargarPlaneacionesAudiEnviar( id )
          .subscribe( planeaciones => {
            this.planeaciones = planeaciones;
            // console.log(this.planeaciones);
            // Se extraen las fechas a un array
            for ( let pl of planeaciones) {
              this.arrFechasT.push(pl.fecha);
            }

            // Se eliminas duplicados
            for ( let i = 0; i < this.arrFechasT.length; i++ ) {
              for ( let j = 0; j < this.arrFechasT.length - 1; j++ ) {
                if ( i !== j ) {
                  if ( this.arrFechasT[i] === this.arrFechasT[j] ) {
                    // eliminamos su valor
                    this.arrFechasT[i] = '';
                  }
                }
              }
            }

            // Se crean el nuevo array de fechas sin los duplicados
            for ( let fech of this.arrFechasT) {
              if ( fech !== '') {
                this.arrFechas.push(fech);
              }
            }

            // Ordenamos el array
            // this.arrFechas.sort();

            this.cargando = false;

          });
    }

  }

  cargarAuditoria( id: string ) {

    this.cargando = true;

    this._auditoriaService.cargarAuditoria( id )
          .subscribe( auditoria => {
            this.objetivosV = auditoria.objetivos;
            this.alcanceV = auditoria.alcance;

            let arrNormasV: any[] = [];
            for ( let nor of  auditoria.normas) {
              arrNormasV.push(nor.nombreNorma);
            }

            this.normasV = arrNormasV.join(', ');

            this.cargando = false;

          });

  }

  redirigirNuevo() {
    this.router.navigate(['/planeacionA/n/' + this.id]);
  }

  cambiarEnviar() {

    // let planeacion = new Planeacion(
    //   '',
    //   '',
    //   [],
    //   '',
    //   '',
    //   [],
    //   [],
    //   '',
    //   this.id
    // );

    this._planeacionService.cambiarEnviar( this.id )
          .subscribe( resp => {
            this.cargarPlaneacionesAudi( this.id );
            this.cargarAuditoria( this.id );
          });

    // $('#modalNormaAgregar').modal('hide');

    // $('.show').hide();
    // $('body').removeClass('modal-open');
    // this.router.navigateByUrl('#/normas', {skipLocationChange: true}).then(() =>
    // this.router.navigate(['/normas']));

  }

  eliminarPlaneacion( planeacion: Planeacion ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de eliminar esta fila?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      cancelButtonColor: '#e74c3c',
      animation: false,
      customClass: {
        popup: 'animated tada'
      }
    }).then((eliminar) => {
      if (eliminar.value) {
        this._planeacionService.eliminarPlaneacion( planeacion._id )
            .subscribe( (resp: any) => {
              this.cargarPlaneacionesAudi( this.id );
              this.cargarAuditoria( this.id );
            } );
      }
    });

  }

}
