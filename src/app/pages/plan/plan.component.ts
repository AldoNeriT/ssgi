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
  auditorias: any[] = [];
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

    this.cargando = true;

    this._planService.cargarPlanes()
          .subscribe( planes => {
            this.planes = planes;
            this.cargando = false;
          });

  }

  cargarAuditorias() {

    this.cargando = true;

    this._auditoriaService.cargarAuditorias()
          .subscribe( auditorias => {
            this.auditorias = auditorias;
            this.cargando = false;
          });

  }

  cargarAuditoriasPlan( id: string ) {

    this.cargando = true;

    this._auditoriaService.cargarAuditoriasPlan( id )
          .subscribe( auditorias => {
            this.auditorias = auditorias;
            $('#card-acordeon > div.collapse').removeClass('show');
            $('#card-acordeon > a').attr('aria-expanded', 'false');
            this.cargando = false;
          });

  }

  imprimir( id: string ) {
    console.log(id);
  }

  modalAgregar() {
    Swal.mixin({
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Plan de Auditorías',
        text: 'Escribe el nombre',
        input: 'text'
      },
      {
        title: '¿Cúantas Auditorías?',
        text: 'Escoge la cantidad de Auditorías que tendrá el Plan',
        input: 'select',
        inputOptions: {
          1: '1',
          2: '2',
          3: '3',
          4: '4',
          5: '5'
        },
      }
    ]).then((result) => {
      if ( result.value ) {
        // ************************************************
        // *** SI NO FUE CANCELADO EL FORMULARIO 1, PASA ESTO ***
        // ************************************************
        if (result.value[0] === '') {
          Swal.fire('Campo Vacío', 'El nombre del Plan de Auditorías está vacío, inténtalo de nuevo', 'error');
        } else {
          // Swal.fire({
          //   title: 'Respuestas',
          //   html:
          //     'Tus respuestas: ' + result.value,
          //   confirmButtonText: 'Ok'
          // });

          // ************************************************
          // *** AQUI SE AGREGARA EL PLAN ***
          // ************************************************

          let cant: any[] = [];
          let cont: any[] = [];

          if (result.value[1] === '1') {
            cant = ['1'];
            cont = [
              {
                title: 'Auditoría 1',
                text: '1'
              }
            ];
            console.log(cant);
          }
          if (result.value[1] === '2') {
            cant = ['1', '2'];
            cont = [
              {
                title: 'Auditoría 1',
                text: '1'
              },
              {
                title: 'Auditoría 2',
                text: '2'
              }
            ];
            console.log(cant);
          }
          if (result.value[1] === '3') {
            cant = ['1', '2', '3'];
            cont = [
              {
                title: 'Auditoría 1',
                text: '1'
              },
              {
                title: 'Auditoría 2',
                text: '2'
              },
              {
                title: 'Auditoría 3',
                text: '3'
              }
            ];
            console.log(cant);
          }
          if (result.value[1] === '4') {
            cant = ['1', '2', '3', '4'];
            cont = [
              {
                title: 'Auditoría 1',
                text: '1'
              },
              {
                title: 'Auditoría 2',
                text: '2'
              },
              {
                title: 'Auditoría 3',
                text: '3'
              },
              {
                title: 'Auditoría 4',
                text: '4'
              }
            ];
            console.log(cant);
          }
          if (result.value[1] === '5') {
            cant = ['1', '2', '3', '4', '5'];
            cont = [
              {
                title: 'Auditoría 1',
                text: '1'
              },
              {
                title: 'Auditoría 2',
                text: '2'
              },
              {
                title: 'Auditoría 3',
                text: '3'
              },
              {
                title: 'Auditoría 4',
                text: '4'
              },
              {
                title: 'Auditoría 5',
                text: '5'
              }
            ];
            console.log(cant);
          }
          Swal.mixin({
            input: 'text',
            confirmButtonText: 'Siguiente',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            progressSteps: cant
          }).queue(cont).then((result2) => {
            if (result2.value) {
              // ************************************************
              // *** SI NO FUE CANCELADO EL FORMULARIO 2, PASA ESTO ***
              // ************************************************

              if ((result2.value[0] === '') ||
                  (result2.value[1] === '') ||
                  (result2.value[2] === '') ||
                  (result2.value[3] === '') ||
                  (result2.value[4] === '')) {
                Swal.fire('Campo Vacío', 'Alguna Auditoría quedo con campos vacíos, inténtalo de nuevo', 'error');
              } else {
                Swal.fire({
                  title: 'Respuestas',
                  html:
                    'Tus respuestas: ' + result2.value,
                  confirmButtonText: 'Ok'
                });

                // ************************************************
                // *** AQUI SE AGREGARAN LAS AUDITORIAS QUE SEAN NECESARIAS ***
                // ************************************************
              }
            } else {
              // ************************************************
              // *** SI FUE CANCELADO EL FORMULARIO 2, PASA ESTO ***
              // ************************************************

              // ************************************************
              // *** AQUI SE ELIMINARÁ EL PLAN CREADO ***
              // ************************************************
              Swal.fire('Cancelado', 'Se canceló la creación de las Auditorías', 'error');
            }
          });
        }
      } else {
        // ************************************************
        // *** SI FUE CANCELADO EL FORMULARIO 1, PASA ESTO ***
        // ************************************************
        Swal.fire('Cancelado', 'Se canceló la creación del Plan de Auditorías', 'error');
      }
    });
  }

}
