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

  cargando = true;

  objetivosV: string;
  alcanceV: string;
  normasV: any[] = [];

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
            console.log(this.planeaciones);
            // this.cargando = false;
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
            this.normasV = auditoria.normas;
            // this.cargando = false;
          });

  }

}
