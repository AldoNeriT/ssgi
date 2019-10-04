import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProcesoService, UsuarioService, PlaneacionService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Proceso } from '../../models/proceso.model';
import { Planeacion } from '../../models/planeacion.model';
import { Router, ActivatedRoute } from '@angular/router';

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


  // planeaciones: Planeacion[] = [];
  // auditoria: any[] = [];
  forma: FormGroup;
  // formaEditar: FormGroup;

  id: string;
  // arrFechasT: any[] = [];
  // arrFechas: any[] = [];

  cargando = true;

  // objetivosV: string;
  // alcanceV: string;
  // normasV: string;

  constructor( public _procesoService: ProcesoService,
               public _usuarioService: UsuarioService,
               public _planeacionService: PlaneacionService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.id = params['idA'];
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

  agregarPlaneacion() {

    if ( this.forma.invalid ) {
      // console.log('invalido');
      // console.log(this.formaEditar.value);
      // return;
    }

    let fecha: any = $('#fecha').val();
    let arrFechas = fecha.split('/');
    let fechaC = arrFechas[1] + '/' + arrFechas[0] + '/' + arrFechas[2];
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
    console.log('objAuditor: ', objAuditor);

    let auditado: any = $('#contacto').val();
    let objAuditado: any[] = [];
    for ( let i = 0; i < auditado.length; i++) {
      let auditadofor: string = auditado[i];
      let rauditadofor = auditadofor.split(`'`);
      objAuditado.push({_id: rauditadofor[1]});
    }
    console.log('objAuditados: ', objAuditado);

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

}
