import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanService, UsuarioService, AuditoriaService } from '../../services/service.index';
import { Plan } from '../../models/plan.model';
import { Auditoria } from '../../models/auditoria.model';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare function init_plugins();

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styles: []
})
export class PlanComponent implements OnInit {

  planes: Plan[] = [];
  auditorias: Auditoria[] = [];
  forma: FormGroup;
  formaEditar: FormGroup;

  idNor: string;

  cargando = true;

  constructor( public _planService: PlanService,
               public _auditoriaService: AuditoriaService,
               public _usuarioService: UsuarioService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    init_plugins();
    this.cargarPlanes();
    this.cargarAuditorias();
  }

  cargarPlanes() {

    // this.cargando = true;

    this._planService.cargarPlanes()
          .subscribe( planes => {
            console.log(planes);
            this.planes = planes;
            // this.cargando = false;
          });

  }

  cargarAuditorias() {

    // this.cargando = true;

    this._auditoriaService.cargarAuditorias()
          .subscribe( auditorias => {
            console.log(auditorias);
            this.auditorias = auditorias;
            // this.cargando = false;
          });

  }

  imprimir() {
    console.log('Hola');
    this.router.navigate(['/home']);
  }

}
