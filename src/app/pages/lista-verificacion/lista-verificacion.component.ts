import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaneacionService, UsuarioService, AuditoriaService, NormaService, ListaVerificacionService } from '../../services/service.index';
import { Planeacion } from '../../models/planeacion.model';
import { Institucion } from '../../models/institucion.model';
import { ListaVerificacion } from '../../models/lista-verificacion.model';
import { Norma } from 'src/app/models/norma.model';
import { Router, ActivatedRoute } from '@angular/router';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare function floating_labels();

@Component({
  selector: 'app-lista-verificacion',
  templateUrl: './lista-verificacion.component.html',
  styles: []
})
export class ListaVerificacionComponent implements OnInit {

  idP: string;
  idU: string;

  idAu: string;

  idLista: string;

  planeacion: any[] = [];
  normas: Norma[] = [];
  listas: ListaVerificacion[] = [];

  arrProActCriV: any[] = [];

  cargando = true;

  procesoV: string;
  auditoriaV: string;
  normasV: string;
  auditorV: string;

  forma: FormGroup;
  formaEditar1: FormGroup;
  formaEditar2: FormGroup;

  constructor( public _planeacionService: PlaneacionService,
               public _usuarioService: UsuarioService,
               public _auditoriaService: AuditoriaService,
               public _normaService: NormaService,
               public _listaVerificacionService: ListaVerificacionService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.idP = params['idP'];
      this.idU = params['idU'];
    });
    floating_labels();
  }

  ngOnInit() {
    floating_labels();
    this.cargarPlaneacion( this.idP );
    this.cargarNormas();
    this.cargarUsuario( this.idU );
    this.cargarListas( this.idP, this.idU);

    this.forma = new FormGroup({
      norma: new FormControl( null, Validators.required ),
      pregunta: new FormControl( null, Validators.required )
    });

    this.formaEditar1 = new FormGroup({
      norma: new FormControl( null, Validators.required ),
      pregunta: new FormControl( null, Validators.required )
    });

    this.formaEditar2 = new FormGroup({
      documento: new FormControl( null, Validators.required ),
      evidencia: new FormControl( null, Validators.required ),
      hallazgos: new FormControl( null, Validators.required )
    });
  }

  regresar() {
    this.router.navigate(['/listas/' + this.idAu]);
  }

  cargarUsuario( id: string) {

    this.cargando = true;

    this._usuarioService.cargarUsuario( id )
          .subscribe( usuario => {
            this.auditorV = usuario.nombre + ' ' + usuario.primer_Apellido + ' ' + (usuario.segundo_Apellido || '');
            this.cargando = false;
          });

  }

  cargarNormas() {

    this.cargando = true;

    this._normaService.cargarNormas()
          .subscribe( normas => {
            this.normas = normas;
            // console.log('Normas: ', this.normas);
            this.cargando = false;
            // init_plugins();
          });

  }

  cargarPlaneacion( id: string ) {
    this.cargando = true;

    this._planeacionService.cargarPlaneacion( id )
          .subscribe( planeaciones => {
            this.planeacion = planeaciones;
            // console.log('Planeacion: ', this.planeacion);

            this.auditoriaV = planeaciones.auditoria.nombreAuditoria;
            this.idAu = planeaciones.auditoria._id;

            let array: any[] = [];
            if ( planeaciones.proceso.nombreProceso ) {
              array.push(planeaciones.proceso.nombreProceso);
            }
            if ( planeaciones.actividad ) {
              array.push(planeaciones.actividad);
            }
            if ( planeaciones.criterio ) {
              array.push(planeaciones.criterio);
            }
            if ( planeaciones.area ) {
              array.push(planeaciones.area);
            }

            this.arrProActCriV.push(array.join(', '));


            this._auditoriaService.cargarAuditoria( planeaciones.auditoria._id )
                .subscribe( auditoria => {
                  // this.institucion = instituciones.instituciones;
                  // console.log('Auditoria: ', auditoria);


                  let arrNormasV: any[] = [];
                  for ( let nor of  auditoria.normas) {
                    arrNormasV.push(nor.nombreNorma);
                  }

                  this.normasV = arrNormasV.join(', ');


                  this.cargando = false;
                });


            this.cargando = false;
          });
  }

  cargarListas( idP: string, idU: string) {

    this.cargando = true;

    this._listaVerificacionService.cargarListasPlaneacionUsuario( idP, idU)
          .subscribe( listas => {
            this.listas = listas;
            console.log(this.listas);
            this.cargando = false;
          });

  }

  agregarLista() {

    if ( this.forma.invalid ) {
      return;
    }

    let listaVerificacion = new ListaVerificacion(
      this.idU,
      this.idP,
      this.forma.value.norma,
      this.forma.value.pregunta,
      '',
      '',
      ''
    );

    console.log(listaVerificacion);

    this._listaVerificacionService.crearListaVerificacion( listaVerificacion )
        .subscribe( resp => {
          floating_labels();
          this.cargarPlaneacion( this.idP );
          this.cargarNormas();
          this.cargarUsuario( this.idU );
          this.cargarListas( this.idP, this.idU);
        });
  }

  formEditable1( listaVerificacion: ListaVerificacion ) {

    this.formaEditar1.setValue({
      norma: listaVerificacion.puntoNorma,
      pregunta: listaVerificacion.pregunta
    });

    this.idLista = listaVerificacion._id;

    $('#modalListaEditar1 > div > div > div > form > div.m-b-40').addClass('focused');
  }

  formEditable2( listaVerificacion: ListaVerificacion ) {

    console.log(listaVerificacion);

    this.formaEditar2.setValue({
      documento: listaVerificacion.documento,
      evidencia: listaVerificacion.evidencia,
      hallazgos: listaVerificacion.hallazgos
    });

    this.idLista = listaVerificacion._id;

    if ( (listaVerificacion.documento !== '') || (listaVerificacion.evidencia !== '') || (listaVerificacion.hallazgos !== '') ) {
      $('#modalListaEditar2 > div > div > div > form > div.m-b-40').addClass('focused');
    }
  }

  editarLista() {

    let listaVerificacion = new ListaVerificacion(
      this.idU,
      this.idP,
      this.formaEditar1.value.norma,
      this.formaEditar1.value.pregunta,
      '',
      '',
      '',
      this.idLista
    );

    console.log(listaVerificacion);


    this._listaVerificacionService.editarListaVerificacion( listaVerificacion )
            .subscribe( resp => {
              floating_labels();
              this.cargarPlaneacion( this.idP );
              this.cargarNormas();
              this.cargarUsuario( this.idU );
              this.cargarListas( this.idP, this.idU);
            });

  }

  completarLista() {

    let listaVerificacion = new ListaVerificacion(
      this.idU,
      this.idP,
      '',
      '',
      this.formaEditar2.value.documento,
      this.formaEditar2.value.evidencia,
      this.formaEditar2.value.hallazgos,
      this.idLista
    );

    console.log(listaVerificacion);


    this._listaVerificacionService.completarListaVerificacion( listaVerificacion )
            .subscribe( resp => {
              floating_labels();
              this.cargarPlaneacion( this.idP );
              this.cargarNormas();
              this.cargarUsuario( this.idU );
              this.cargarListas( this.idP, this.idU);
            });

  }

  eliminarLista( listaVerificacion: ListaVerificacion ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de eliminar esta lista?`,
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
        this._listaVerificacionService.eliminarLista( listaVerificacion._id )
          .subscribe( (resp: any) => {
              floating_labels();
              this.cargarPlaneacion( this.idP );
              this.cargarNormas();
              this.cargarUsuario( this.idU );
              this.cargarListas( this.idP, this.idU);
          } );
      }
    });

  }

}
