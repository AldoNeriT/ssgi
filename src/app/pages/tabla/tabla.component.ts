import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NormaService, TablaService } from '../../services/service.index';
import { Norma } from '../../models/norma.model';
import { Tabla } from '../../models/tabla.model';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare function floating_labels();

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html'
})
export class TablaComponent implements OnInit {

  constructor( public _normaService: NormaService,
               public _tablaService: TablaService ) {

  }

  normas: Norma[] = [];
  tablas: Tabla[] = [];

  objNormas: any[] = [];

  totalNormas = 0;

  cargando = true;

  ngOnInit() {
    floating_labels();
    this.cargarNormas();
    this.cargarTablas();
  }

  cargarNormas() {

    this.cargando = true;

    this._normaService.cargarNormas()
          .subscribe( normas => {
            this.normas = normas;
            this.totalNormas = normas.length;
            // console.log(normas);
            this.cargando = false;
          });

  }

  cargarTablas() {

    this.cargando = true;

    this._tablaService.cargarTabla()
          .subscribe( tablas => {
            this.tablas = tablas;
            console.log('Tablas: ', tablas);
            this.cargando = false;
          });

  }

  agregarFila() {


    let numero = $('#numero').val() + '';
    let requisito = $('#requisito').val() + '';




    this.objNormas = [];

    for ( let n of this.normas ) {
      if ( $('#ch_' + n._id).prop('checked') ) {
        this.objNormas.push({_id: n._id});
      }
    }
    
    // console.log('objNormas: ', this.objNormas);


    let tabla = new Tabla(
      numero,
      requisito,
      this.objNormas
    );

    // console.log('Tabla Agregar: ', tabla);

    this._tablaService.crearFila( tabla )
          .subscribe( resp => {
            floating_labels();
            this.cargarNormas();
            this.cargarTablas();
          });

  }

}
