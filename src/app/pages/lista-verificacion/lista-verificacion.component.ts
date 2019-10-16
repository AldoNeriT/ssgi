import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaneacionService, UsuarioService, AuditoriaService } from '../../services/service.index';
import { Planeacion } from '../../models/planeacion.model';
import { Institucion } from '../../models/institucion.model';
import { Router, ActivatedRoute } from '@angular/router';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import Swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-lista-verificacion',
  templateUrl: './lista-verificacion.component.html',
  styles: []
})
export class ListaVerificacionComponent implements OnInit {

  idP: string;
  idU: string;

  planeacion: any[] = [];

  arrProActCriV: any[] = [];

  cargando = true;

  procesoV: string;
  auditoriaV: string;
  normasV: string;
  auditorV: string;

  constructor( public _planeacionService: PlaneacionService,
               public _usuarioService: UsuarioService,
               public _auditoriaService: AuditoriaService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.idP = params['idP'];
      this.idU = params['idU'];
    });
  }

  ngOnInit() {
    this.cargarPlaneacion( this.idP );
  }

  regresar( idAuditoria: string ) {
    this.router.navigate(['/listas/' + idAuditoria]);
  }

  cargarPlaneacion( id: string ) {
    this.cargando = true;

    this._planeacionService.cargarPlaneacion( id )
          .subscribe( planeaciones => {
            this.planeacion = planeaciones;
            console.log('Planeacion: ', this.planeacion);

            this.auditoriaV = planeaciones.auditoria.nombreAuditoria;
            this.auditorV = this._usuarioService.usuario.nombre + ' ' + this._usuarioService.usuario.primer_Apellido + ' ' + this._usuarioService.usuario.segundo_Apellido || ''

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
