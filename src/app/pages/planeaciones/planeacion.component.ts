import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProcesoService, UsuarioService, PlaneacionService, AuditoriaService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Proceso } from '../../models/proceso.model';
import { Planeacion } from '../../models/planeacion.model';
import { Auditoria } from '../../models/auditoria.model';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare function init_plugins();
declare function inicializando_multiSelect();
declare function inicializando_clockPicker();
declare function inicializando_datePicker();

@Component({
  selector: 'app-planeacion',
  templateUrl: './planeacion.component.html',
  styles: []
})
export class PlaneacionComponent implements OnInit {

  procesos: Proceso[] = [];
  auditores: Usuario[] = [];
  auditados: Usuario[] = [];
  auditoria: Auditoria[] = [];

  forma: FormGroup;
  formaEditar: FormGroup;

  // *** Variables para los Formularios ***
  mostrarFormAgregar: boolean;
  mostrarFormEditar: boolean;

  id: string;
  idP: string;
  titulo: string;

  cargando = true;

  nombreAudiV: string;

  constructor( public _procesoService: ProcesoService,
               public _usuarioService: UsuarioService,
               public _planeacionService: PlaneacionService,
               public _auditoriaService: AuditoriaService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.id = params['idA'];
      this.idP = params['idP'];
    });
  }

  ngOnInit() {
    init_plugins();
    inicializando_multiSelect();
    inicializando_clockPicker();
    inicializando_datePicker();

    this.cargarProcesos();
    this.cargarAuditores();
    this.cargarAuditados();

    this.forma = new FormGroup({
      fecha: new FormControl( null, Validators.required ),
      desde: new FormControl( null, Validators.required ),
      hasta: new FormControl( null, Validators.required ),
      proceso: new FormControl( null, Validators.required ),
      actividad: new FormControl( null, Validators.required ),
      criterio: new FormControl( null, Validators.required ),
      participantes: new FormControl( null, Validators.required ),
      contacto: new FormControl( null, Validators.required ),
      area: new FormControl( null, Validators.required ),
    });

    this.formaEditar = new FormGroup({
      fechaE: new FormControl( null, Validators.required ),
      desdeE: new FormControl( null, Validators.required ),
      hastaE: new FormControl( null, Validators.required ),
      procesoE: new FormControl( null, Validators.required ),
      actividadE: new FormControl( null, Validators.required ),
      criterioE: new FormControl( null, Validators.required ),
      participantesE: new FormControl( null, Validators.required ),
      contactoE: new FormControl( null, Validators.required ),
      areaE: new FormControl( null, Validators.required ),
    });

    this.condiciones();

  }

  condiciones() {

    if ( this.id === 'editar') {
      this.cargarPlaneacion( this.idP );
      this.titulo = 'Actualizar';
      this.mostrarFormAgregar = false;
      this.mostrarFormEditar = true;
    } else {
      this.cargarAuditoria( this.id );
      this.titulo = 'Agregar Planeación a la Auditoría';
      this.mostrarFormAgregar = true;
      this.mostrarFormEditar = false;
    }
  }

  regresar() {
    this.router.navigate(['/planeacion/' + this.id]);
  }

  cargarProcesos() {

    this.cargando = true;

    this._procesoService.cargarProcesos()
          .subscribe( procesos => {
            this.procesos = procesos;
            // console.log('Proceso: ', this.procesos);
            this.cargando = false;
            // init_plugins();
            // inicializando_multiSelect();
            // inicializando_dateRange();
          });

  }

  cargarAuditores() {

    this.cargando = true;

    this._usuarioService.cargarUsuariosPorTipo('AUDITOR')
          .subscribe( auditores => {
            this.auditores = auditores;
            // console.log('Auditores: ', this.auditores);
            this.cargando = false;
            // init_plugins();
            // inicializando_multiSelect();
            // inicializando_dateRange();
          });

  }

  cargarAuditados() {

    this.cargando = true;

    this._usuarioService.cargarUsuariosPorTipo('AUDITADO')
          .subscribe( auditados => {
            this.auditados = auditados;
            // console.log('Auditados: ', this.auditados);
            this.cargando = false;
            // init_plugins();
            // inicializando_multiSelect();
            // inicializando_dateRange();
          });

  }

  cargarAuditoria( id: string ) {

    this.cargando = true;

    this._auditoriaService.cargarAuditoria( id )
          .subscribe( auditoria => {
            this.auditoria = auditoria;
            this.nombreAudiV = auditoria.nombre;
            // console.log('Auditoria: ', this.auditoria);
            this.cargando = false;
            // init_plugins();
            // inicializando_multiSelect();
            // inicializando_dateRange();
          });

  }

  cargarPlaneacion( id: string) {

    this.cargando = true;

    this._planeacionService.cargarPlaneacion( id )
          .subscribe( planeacion => {
            // this.planeacion = auditoria;
            this.nombreAudiV = planeacion.auditoria.nombre;
            this.id = planeacion.auditoria._id;
            console.log('ppppp: ', planeacion);

            let horas = planeacion.horario;
            let arrHoras = horas.split(' - ');

            this.formaEditar.setValue({
              fechaE: planeacion.fecha,
              desdeE: arrHoras[0],
              hastaE: arrHoras[1],
              procesoE: planeacion.proceso._id,
              actividadE: planeacion.actividad,
              criterioE: planeacion.criterio,
              participantesE: planeacion.participantes,
              contactoE: planeacion.contacto,
              areaE: planeacion.area
            });

            $('#formEditable > div.m-b-40').addClass('focused');

            // ************************************************
            // *** AQUI SE AGREGARAN LOS DATOS AL SELECT PARTICIPANTES 01 ***
            // ************************************************

            // Inicializando arreglos necesarios
            let arrAuditores: any[] = [];
            let arrAuditoresNombre: any[] = [];

            // Llenando arreglos
            for ( let i = 0; i < this.auditores.length; i++ ) {
              for ( let j = 0; j < planeacion.participantes.length; j++ ) {
                if ( this.auditores[i]._id === planeacion.participantes[j]._id ) {
                  arrAuditores.push(`${i}: '${this.auditores[i]._id}'`);
                  arrAuditoresNombre.push(`${this.auditores[i].nombre} ${this.auditores[i].primer_Apellido} ${this.auditores[i].segundo_Apellido || ''}`);
                }
              }
            }

            // Agregar arreglo al select
            $('#participantesE').val(arrAuditores);

            // Agregar el diseño al select
            $('ul.select2-selection__rendered:eq(0)').html('');
            for ( let k = 0; k < arrAuditores.length; k++ ) {
              $('ul.select2-selection__rendered:eq(0)').append(`<li class="select2-selection__choice" title=" ${arrAuditoresNombre[k]} "><span class="select2-selection__choice__remove" role="presentation">×</span> ${arrAuditoresNombre[k]} </li>`);
            }

            // ************************************************
            // *** AQUI SE AGREGARAN LOS DATOS AL SELECT CONTACTO 02 ***
            // ************************************************

            // Inicializando arreglos necesarios
            let arrAuditados: any[] = [];
            let arrAuditadosNombre: any[] = [];

            // Llenando arreglos
            for ( let i = 0; i < this.auditados.length; i++ ) {
              for ( let j = 0; j < planeacion.contacto.length; j++ ) {
                if ( this.auditados[i]._id === planeacion.contacto[j]._id ) {
                  arrAuditados.push(`${i}: '${this.auditados[i]._id}'`);
                  arrAuditadosNombre.push(`${this.auditados[i].nombre} ${this.auditados[i].primer_Apellido} ${this.auditados[i].segundo_Apellido || ''}`);
                }
              }
            }

            // Agregar arreglo al select
            $('#contactoE').val(arrAuditados);

            // Agregar el diseño al select
            $('ul.select2-selection__rendered:eq(1)').html('');
            for ( let k = 0; k < arrAuditados.length; k++ ) {
              $('ul.select2-selection__rendered:eq(1)').append(`<li class="select2-selection__choice" title=" ${arrAuditadosNombre[k]} "><span class="select2-selection__choice__remove" role="presentation">×</span> ${arrAuditadosNombre[k]} </li>`);
            }

            this.cargando = false;
            // init_plugins();
            // inicializando_multiSelect();
            // inicializando_dateRange();
          });

  }

  agregarPlaneacion() {

    if ( this.forma.invalid ) {
      // console.log('invalido');
      // console.log(this.formaEditar.value);
      // return;
    }

    let fecha: any = $('#fecha').val();
    let arrFechas = fecha.split('/');
    let fechaC = arrFechas[0] + '/' + arrFechas[1] + '/' + arrFechas[2];
    // mes - dia - año
    // [][][]

    let horaI: any = $('#desde').val();
    let horaF: any = $('#hasta').val();

    let auditor: any = $('#participantes').val();
    let objAuditor: any[] = [];
    for ( let i = 0; i < auditor.length; i++) {
      let auditorfor: string = auditor[i];
      let rauditorfor = auditorfor.split(`'`);
      objAuditor.push({_id: rauditorfor[1]});
    }
    // console.log('objAuditor: ', objAuditor);

    let auditado: any = $('#contacto').val();
    let objAuditado: any[] = [];
    for ( let i = 0; i < auditado.length; i++) {
      let auditadofor: string = auditado[i];
      let rauditadofor = auditadofor.split(`'`);
      objAuditado.push({_id: rauditadofor[1]});
    }
    // console.log('objAuditados: ', objAuditado);

    let planeacion = new Planeacion(
      fechaC,
      horaI + ' - ' + horaF,
      this.forma.value.proceso,
      this.forma.value.actividad,
      this.forma.value.criterio,
      objAuditor,
      objAuditado,
      this.forma.value.area,
      this.id
    );

    console.log('planeacion: ', planeacion);

    this._planeacionService.crearPlaneacion( planeacion )
          .subscribe( resp => {
            this.router.navigate(['/planeacion/' + this.id]);
          });

  }

  actualizarPlaneacion() {

    if ( this.forma.invalid ) {
      // console.log('invalido');
      // console.log(this.formaEditar.value);
      // return;
    }

    let fecha: any = $('#fechaE').val();
    let arrFechas = fecha.split('/');
    let fechaC = arrFechas[0] + '/' + arrFechas[1] + '/' + arrFechas[2];
    // mes - dia - año
    // [][][]

    let horaI: any = $('#desdeE').val();
    let horaF: any = $('#hastaE').val();

    let auditor: any = $('#participantesE').val();
    let objAuditor: any[] = [];
    for ( let i = 0; i < auditor.length; i++) {
      let auditorfor: string = auditor[i];
      let rauditorfor = auditorfor.split(`'`);
      objAuditor.push({_id: rauditorfor[1]});
    }
    // console.log('objAuditor: ', objAuditor);

    let auditado: any = $('#contactoE').val();
    let objAuditado: any[] = [];
    for ( let i = 0; i < auditado.length; i++) {
      let auditadofor: string = auditado[i];
      let rauditadofor = auditadofor.split(`'`);
      objAuditado.push({_id: rauditadofor[1]});
    }
    // console.log('objAuditados: ', objAuditado);

    let planeacion = new Planeacion(
      fechaC,
      horaI + ' - ' + horaF,
      this.formaEditar.value.procesoE,
      this.formaEditar.value.actividadE,
      this.formaEditar.value.criterioE,
      objAuditor,
      objAuditado,
      this.formaEditar.value.areaE,
      this.id,
      this.idP
    );

    console.log('planeacion: ', planeacion);

    this._planeacionService.crearPlaneacion( planeacion )
          .subscribe( resp => {
            this.router.navigate(['/planeacion/' + this.id]);
          });

  }

}
