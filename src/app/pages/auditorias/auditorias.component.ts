import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NormaService, UsuarioService, AuditoriaService } from '../../services/service.index';
import { Auditoria } from '../../models/auditoria.model';
import { Usuario } from '../../models/usuario.model';
import { Norma } from 'src/app/models/norma.model';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare function init_plugins();
declare function inicializando_multiSelect();
declare function inicializando_dateRange();

@Component({
  selector: 'app-auditorias',
  templateUrl: './auditorias.component.html',
  styles: []
})
export class AuditoriasComponent implements OnInit {

  normas: Norma[] = [];
  auditores: Usuario[] = [];
  auditados: Usuario[] = [];
  // forma: FormGroup;
  // formaEditar: FormGroup;

  idAud: string;

  id: string;
  ver: string;

  // *** Variables para los Formularios ***
  mostrarFormEditar: boolean;
  mostrarFormVer: boolean;

  cargando = true;

  // *** Variables para la pestaña VER ***
  nombreV: string;
  normasV: string;
  fechaInicialV: Date;
  fechaFinalV: Date;
  planV: string;
  auditoresV: string;
  auditadosV: string;
  objetivoV: string;
  alcanceV: string;
  contactoV: string;

  constructor( public _normaService: NormaService,
               public _auditoriaService: AuditoriaService,
               public _usuarioService: UsuarioService,
               public router: Router,
               public activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      this.ver = params['ver'];

      if ( this.ver === 'ver') {
        this.cargarAuditoriaVer( this.id );
        this.mostrarFormEditar = false;
        this.mostrarFormVer = true;
      } else {
        // this.cargarAuditoria( this.id );
        this.mostrarFormEditar = true;
        this.mostrarFormVer = false;
      }
    });
  }

  ngOnInit() {
    init_plugins();
    inicializando_multiSelect();
    inicializando_dateRange();

    this.cargarNormas();
    this.cargarAuditores();
    this.cargarAuditados();

    this.pruebaSplit('2019-01-01/2019-01-25');
  }

  pruebaSplit( arr: string ) {
    let splitted = arr.split('/');
    console.log(splitted);
  }

  // cargarAuditoria( id: string) {

  //   this.cargando = true;

  //   this._usuarioService.cargarUsuario( id )
  //         .subscribe( usuario => {
  //           // *** La Respuesta es el arreglo como esta en la Base de
  //           //     datos y se le insertan los valores al formulario ***
  //           this.formaActualizar.setValue({
  //             numEmpleado: usuario.numero_Empleado,
  //             usuario: usuario.nombre_Usuario,
  //             nombre: usuario.nombre,
  //             priApellido: usuario.primer_Apellido,
  //             segApellido: usuario.segundo_Apellido || '',
  //             correo: usuario.email,
  //             telefono: usuario.telefono,
  //             puesto: usuario.puesto,
  //             tipoUser: usuario.tipo_Usuario
  //           });

  //           this.cargando = false;
  //         });

  // }

  cargarAuditoriaVer( id: string) {

    // this.cargando = true;

    this._auditoriaService.cargarAuditoria( id )
          .subscribe( auditoria => {
            // *** La Respuesta es el arreglo como esta en la Base de
            //     datos y se le insertan los valores al formulario ***
            this.nombreV = auditoria.nombre;
            this.normasV = auditoria.normas;
            this.fechaInicialV = auditoria.fechaInicial;
            this.fechaFinalV = auditoria.fechaFinal;
            this.planV = auditoria.plan.nombrePlan;
            this.auditoresV = auditoria.grupoAuditor;
            this.auditadosV = auditoria.auditados;
            this.objetivoV = auditoria.objetivos;
            this.alcanceV = auditoria.alcance;
            this.contactoV = auditoria.contacto;

            // this.cargando = false;
          });

  }

  cargarNormas() {

    // this.cargando = true;

    this._normaService.cargarNormas()
          .subscribe( normas => {
            this.normas = normas;
            // console.log(this.normas);
            // this.cargando = false;
          });

  }

  cargarAuditores() {

    // this.cargando = true;

    this._usuarioService.cargarUsuariosPorTipo('AUDITOR')
          .subscribe( auditores => {
            this.auditores = auditores;
            // console.log(this.auditores);
            // this.cargando = false;
          });

  }

  cargarAuditados() {

    // this.cargando = true;

    this._usuarioService.cargarUsuariosPorTipo('AUDITADO')
          .subscribe( auditados => {
            this.auditados = auditados;
            // console.log(this.auditados);
            // this.cargando = false;
          });

  }

}
