import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProcesoService } from '../../services/service.index';
import { SubprocesoService } from '../../services/subproceso/subproceso.service';
import { Proceso } from '../../models/proceso.model';
import { Subproceso } from '../../models/subproceso.model';

import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare function init_plugins();

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styles: []
})
export class ProcesosComponent implements OnInit {

  procesos: Proceso[] = [];
  subprocesos: Subproceso[] = [];

  forma: FormGroup;
  formaEditar: FormGroup;

  formaSub: FormGroup;
  formaEditarSub: FormGroup;

  idPro: string;
  idSub: string;

  cargando = true;
  cargando2 = false;

  constructor( public _procesoService: ProcesoService,
               public _subprocesoService: SubprocesoService ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required )
    });

    this.formaEditar = new FormGroup({
      nombre: new FormControl( null, Validators.required )
    });

    this.formaSub = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      // proceso: new FormControl( null, Validators.required ),
      archivo: new FormControl( null, Validators.required )
    });

    this.formaEditarSub = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      // proceso: new FormControl( null, Validators.required ),
      archivo: new FormControl( null, Validators.required )
    });

    this.cargarProcesos();
  }

  claseActive() {

    // $('#list-procesos > li:first > a').addClass('active');
    // $('#list-procesos > li:first > a').attr('aria-expanded', 'true');
    // console.log($('#list-procesos > li:first > a'));

    // $('#list-procesos > li:first > a').addClass('active');
    $('div.tab-pane:first').attr('aria-expanded', 'true');
    console.log($('div.tab-pane:first'));

  }

  // ************************************************
  // *** PROCESOS ***
  // ************************************************

  cargarProcesos() {

    this.cargando = true;

    this._procesoService.cargarProcesos()
          .subscribe( procesos => {
            this.procesos = procesos;
            this.cargando = false;
          });
    this.claseActive();
  }

  // cargarSubprocesos() {

  //   // this.cargando = true;

  //   this._subprocesoService.cargarSubprocesos()
  //         .subscribe( subprocesos => {
  //           this.subprocesos = subprocesos;
  //           // this.cargando = false;
  //         });

  // }

  cargarSubprocesosProceso( id: string ) {

    this.cargando2 = true;

    this._subprocesoService.cargarSubprocesosProceso( id )
          .subscribe( subprocesos => {
            this.subprocesos = subprocesos;
            this.cargando2 = false;
          });

    this.idPro = id;

    // $('#list-procesos > li > a:first').addClass('active');

    // console.log($('#list-procesos > li > a:first'));

  }

  agregarProceso() {

    if ( this.forma.invalid ) {
      return;
    }

    let proceso = new Proceso(
      this.forma.value.nombre
    );

    this._procesoService.crearProceso( proceso )
          .subscribe( resp => {
            this.cargarProcesos();
          });

  }

  formEditable( proceso: Proceso ) {

    this.formaEditar.setValue({
      nombre: proceso.nombreProceso,
    });

    this.idPro = proceso._id;

    $('#modalProcesoEditar > div > div > div > form > div.m-b-40').addClass('focused');
  }

  editarProceso() {

    let proceso = new Proceso(
      this.formaEditar.value.nombre,
      this.idPro
    );

    this._procesoService.crearProceso( proceso )
            .subscribe( resp => {
              this.cargarProcesos();
            });

  }

  eliminarProceso( proceso: Proceso ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de eliminar el Proceso "${proceso.nombreProceso}"?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK'
    }).then((eliminar) => {
      if (eliminar.value) {
        this._procesoService.eliminarSubprocesosProceso( proceso._id )
          .subscribe( (resp: any) => {
            // this.cargarProcesos();
          } );
        this._procesoService.eliminarProceso( proceso._id )
          .subscribe( (resp: any) => {
            this.cargarProcesos();
          } );
      }
    });

  }

  // ************************************************
  // *** SUBPROCESOS ***
  // ************************************************

  agregarSubproceso() {

    if ( this.formaSub.invalid ) {
      return;
    }

    let subproceso = new Subproceso(
      this.formaSub.value.nombre,
      this.idPro,
      this.formaSub.value.archivo
    );

    console.log(subproceso);
    console.log(this.idPro);

    this._subprocesoService.crearSubproceso( subproceso )
          .subscribe( resp => {
            this.cargarSubprocesosProceso( this.idPro ) ;
          });

  }

  formEditableSub( subproceso: Subproceso ) {

    this.formaEditarSub.setValue({
      nombre: subproceso.nombreSubproceso,
      archivo: subproceso.archivoDigital
    });

    this.idSub = subproceso._id;

    $('#modalSubprocesoEditar > div > div > div > form > div.m-b-40').addClass('focused');
  }

  editarSubproceso() {

    let subproceso = new Subproceso(
      this.formaEditarSub.value.nombre,
      this.idPro,
      this.formaEditarSub.value.archivo,
      this.idSub
    );

    this._subprocesoService.crearSubproceso( subproceso )
            .subscribe( resp => {
              // this.cargarProcesos();
              this.cargarSubprocesosProceso( this.idPro ) ;
            });

  }

  eliminarSubproceso( subproceso: Subproceso ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de eliminar el Subproceso "${subproceso.nombreSubproceso}"?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK'
    }).then((eliminar) => {
      if (eliminar.value) {
        this._subprocesoService.eliminarSubproceso( subproceso._id )
          .subscribe( (resp: any) => {
            this.cargarSubprocesosProceso( this.idPro ) ;
          } );
      }
    });

  }

}
