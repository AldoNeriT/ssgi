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

  formaEditar: FormGroup;

  id: string;
  ver: string;

  idPlan: string;
  progresoAudi: string;

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

      // if ( this.ver === 'ver') {
      //   this.cargarAuditoriaVer( this.id );
      //   this.mostrarFormEditar = false;
      //   this.mostrarFormVer = true;
      // } else {
      //   this.cargarAuditoria( this.id );
      //   this.mostrarFormEditar = true;
      //   this.mostrarFormVer = false;
      // }
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

    this.formaEditar = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      normas: new FormControl( null, Validators.required ),
      fechas: new FormControl( null, Validators.required ),
      auditores: new FormControl( null, Validators.required ),
      auditados: new FormControl( null, Validators.required ),
      objetivos: new FormControl( null, [Validators.required, Validators.email] ),
      alcance: new FormControl( null, Validators.required ),
      contacto: new FormControl( null, Validators.required ),
    });

    if ( this.ver === 'ver') {
      this.cargarAuditoriaVer( this.id );
      this.mostrarFormEditar = false;
      this.mostrarFormVer = true;
    } else {
      this.cargarAuditoria( this.id );
      this.mostrarFormEditar = true;
      this.mostrarFormVer = false;
    }
  }

  imprimirMultiSelect() {
    // *** SEGUIR ORDEN DE PASOS ***

    // Agregar valores al select
    // $('#normas').val(["0: '5d8148580e34b70017e458ec'", "2: '5d8148770e34b70017e458ee'"]);

    // Agregar el diseño al select
    // $('ul.select2-selection__rendered:eq(0)').html('');
    // $('ul.select2-selection__rendered:eq(0)').append('<li class="select2-selection__choice" title=" Seguridad "><span class="select2-selection__choice__remove" role="presentation">×</span> Seguridad </li>');
    // $('ul.select2-selection__rendered:eq(0)').append('<li class="select2-selection__choice" title=" Calidad "><span class="select2-selection__choice__remove" role="presentation">×</span> Calidad </li>');
    
    // Extraer valores del select
    // $('#normas').val()
    // console.log($('#normas').val());
  }

  pruebaSplit( arr: string ) {
    let splitted = arr.split('/');
    console.log(splitted);
  }

  cargarAuditoria( id: string) {

    // this.cargarNormas();
    // console.log('Normas: ', this.normas);
    // this.cargarAuditores();
    // this.cargarAuditados();

    // this.cargando = true;

    this._auditoriaService.cargarAuditoria( id )
          .subscribe( auditoria => {
            // *** La Respuesta es el arreglo como esta en la Base de
            //     datos y se le insertan los valores al formulario ***

            console.log('RESPUESTA: ', auditoria);

            this.formaEditar.setValue({
              nombre: auditoria.nombre,
              normas: auditoria.normas,
              // fechas: auditoria.fechaInicial + '' + auditoria.fechaFinal,
              fechas: '01/01/2019 - 05/05/2019',
              auditores: auditoria.grupoAuditor,
              auditados: auditoria.auditados,
              objetivos: auditoria.objetivos,
              alcance: auditoria.alcance,
              contacto: auditoria.contacto,
            });

            this.planV = auditoria.plan.nombrePlan;
            this.idPlan = auditoria.plan._id;
            this.progresoAudi = auditoria.progreso;

            $('#formEditable > div > div > div > form > div.m-b-40').addClass('focused');

            // ************************************************
            // *** AQUI SE AGREGARAN LOS DATOS A LOS SELECTS ***
            // ************************************************

            // Inicializando arreglos necesarios
            let arrNormas: any[] = [];
            let arrNormasNombre: any[] = [];

            // Llenando arreglos
            // for ( let i = 0; i < this.normas.length; i++ ){
            //   for ( let j = 0; j < auditoria.normas.length; j++ ) {
            //     if ( this.normas[i] === auditoria.normas[j] ) {
            //       arrNormas.push(`${i}: '${this.normas[i]}'`);
            //     }
            //   }
            // }

            arrNormas = ["0: '5d8148580e34b70017e458ec'", "2: '5d8148770e34b70017e458ee'"];
            arrNormasNombre = ["Calidad", "Seguridad"];

            // Imprimir lo que contiene cada arreglo
            console.log('arrNormas: ', arrNormas);
            console.log('arrNormasNombre: ', arrNormasNombre);

            // Agregar arreglo al select
            $('#normas').val(arrNormas);

            // Agregar el diseño al select
            $('ul.select2-selection__rendered:eq(0)').html('');
            for ( let k = 0; k < arrNormas.length; k++ ) {
              $('ul.select2-selection__rendered:eq(0)').append(`<li class="select2-selection__choice" title=" ${arrNormasNombre[k]} "><span class="select2-selection__choice__remove" role="presentation">×</span> ${arrNormasNombre[k]} </li>`);
            }

            // Imprimir valor del select
            console.log('valueSelect: ', $('#normas').val());

            // this.cargando = false;

          });

  }

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

  editarAuditoria() {

    if ( this.formaEditar.invalid ) {
      return;
    }

    let auditoria = new Auditoria(
      this.planV + '_' + this.formaEditar.value.nombre,
      this.formaEditar.value.nombre,
      this.formaEditar.value.normas,
      new Date('2000-01-01'),
      new Date('2000-01-01'),
      this.idPlan,
      this.formaEditar.value.auditores,
      this.formaEditar.value.auditados,
      this.formaEditar.value.objetivos,
      this.formaEditar.value.alcance,
      this.formaEditar.value.contacto,
      this.id
    );

    console.log('IMPRIMIR: ', auditoria);

    // this._auditoriaService.crearAuditoria( auditoria )
    //       .subscribe( resp => {
    //         this.router.navigate(['/planes']);
    //       });

  }

}
