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

  cargando = true;

  constructor( public _normaService: NormaService,
               public _auditoriaService: AuditoriaService,
               public _usuarioService: UsuarioService,
               public router: Router,
               public activatedRoute: ActivatedRoute) { }

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
