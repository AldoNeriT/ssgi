import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaneacionService, AuditoriaService } from '../../services/service.index';
import { Planeacion } from '../../models/planeacion.model';
import { Auditoria } from '../../models/auditoria.model';
import { Router, ActivatedRoute } from '@angular/router';

declare function init_plugins();
declare function inicializando_dateRange();

@Component({
  selector: 'app-planeacion',
  templateUrl: './planeacion.component.html',
  styles: []
})
export class PlaneacionComponent implements OnInit {

  planeaciones: Planeacion[] = [];
  // auditoria: any[] = [];
  forma: FormGroup;
  formaEditar: FormGroup;

  id: string;
  arrFechasT: any[] = [];
  arrFechas: any[] = [];

  cargando = true;

  objetivosV: string;
  alcanceV: string;
  normasV: string;

  constructor( public _planeacionService: PlaneacionService,
               public _auditoriaService: AuditoriaService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.id = params['idA'];
    });
  }

  ngOnInit() {
    init_plugins();
    inicializando_dateRange();

    this.cargarPlaneacionesAudi( this.id );
    this.cargarAuditoria( this.id );
  }

  cargarPlaneacionesAudi( id: string ) {

    // this.cargando = true;

    this._planeacionService.cargarPlaneacionesAudi( id )
          .subscribe( planeaciones => {
            this.planeaciones = planeaciones;
            // console.log(this.planeaciones);
            // this.cargando = false;

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
            this.arrFechas.sort();

            // console.log('fechasT', this.arrFechasT);
            // console.log('fechas', this.arrFechas);

          });

  }

  cargarAuditoria( id: string ) {

    // this.cargando = true;

    this._auditoriaService.cargarAuditoria( id )
          .subscribe( auditoria => {
            // this.auditoria = auditoria;
            console.log(auditoria);

            this.objetivosV = auditoria.objetivos;
            this.alcanceV = auditoria.alcance;

            let arrNormasV: any[] = [];
            for ( let nor of  auditoria.normas) {
              arrNormasV.push(nor.nombreNorma);
            }

            this.normasV = arrNormasV.join(', ');


            // this.cargando = false;
          });

  }

}
