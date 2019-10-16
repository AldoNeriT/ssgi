import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaneacionService, UsuarioService, AuditoriaService, NormaService } from '../../services/service.index';
import { Planeacion } from '../../models/planeacion.model';
import { Institucion } from '../../models/institucion.model';
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

  planeacion: any[] = [];
  normas: Norma[] = [];

  arrProActCriV: any[] = [];

  cargando = true;

  procesoV: string;
  auditoriaV: string;
  normasV: string;
  auditorV: string;

  constructor( public _planeacionService: PlaneacionService,
               public _usuarioService: UsuarioService,
               public _auditoriaService: AuditoriaService,
               public _normaService: NormaService,
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
    $('#modalListaAgregar1 > div > div > div > form > div.m-b-40:first').addClass('focused');
    this.cargarPlaneacion( this.idP );
    this.cargarNormas();
    this.cargarUsuario( this.idU );
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
            console.log('Planeacion: ', this.planeacion);

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
                  console.log('Auditoria: ', auditoria);


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

}
