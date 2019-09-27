import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanService, UsuarioService, AuditoriaService } from '../../services/service.index';
import { Plan } from '../../models/plan.model';
import { Auditoria } from '../../models/auditoria.model';
import { Usuario } from '../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare function init_plugins();

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: []
})
export class PlanesComponent implements OnInit {

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
            // console.log(this.auditorias);
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

  verAuditoria( auditoria: Auditoria, plan: Plan ) {

    if ( plan.valido === true ) {

      if ( auditoria.progreso === 'empezar') {
        Swal.fire({
          title: '¡Empezar!',
          text: `¿Deseas iniciar la Auditoría "${auditoria.nombre}"?`,
          type: 'question',
          showCancelButton: true,
          confirmButtonText: 'Empezar',
          cancelButtonText: 'Cancelar',
          animation: false,
          customClass: {
            popup: 'animated bounceInDown'
          }
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/auditoria/' + auditoria._id ]);
          }
        });
      }

      if ( auditoria.progreso === 'encurso') {
        if ( auditoria.valido === true ) {
          Swal.fire({
            title: '¡En Curso!',
            text: `La Auditoría "${auditoria.nombre}" está en curso`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ver',
            cancelButtonText: 'Cancelar',
            animation: false,
            customClass: {
              popup: 'animated bounceInDown'
            }
          }).then((result) => {
            if (result.value) {
              // this.router.navigate(['/auditoria/' + auditoria._id ]);
            }
          });
        } else {
          Swal.fire({
            title: '¡Advertencia!',
            text: `No puedes ingresar hasta que validen la Auditoría "${auditoria.nombre}"`,
            type: 'warning',
            animation: false,
            customClass: {
              popup: 'animated pulse'
            }
          });
        }
      }

      if ( auditoria.progreso === 'terminado') {
        if ( auditoria.valido === true ) {
          Swal.fire({
            title: '¡Finalizado!',
            text: `La Auditoría "${auditoria.nombre}" ha finalizado`,
            type: 'success',
            showCancelButton: true,
            confirmButtonText: 'Ver',
            cancelButtonText: 'Cancelar',
            animation: false,
            customClass: {
              popup: 'animated bounceInDown'
            }
          }).then((result) => {
            if (result.value) {
              // this.router.navigate(['/auditoria/' + auditoria._id ]);
            }
          });
        } else {
          Swal.fire({
            title: '¡Advertencia!',
            text: `No puedes ingresar hasta que validen la Auditoría "${auditoria.nombre}"`,
            type: 'warning',
            animation: false,
            customClass: {
              popup: 'animated pulse'
            }
          });
        }
      }

    } else {

      Swal.fire({
        title: '¡Advertencia!',
        text: `No puedes ingresar hasta que validen el Plan "${plan.nombrePlan}"`,
        type: 'warning',
        animation: false,
        customClass: {
          popup: 'animated pulse'
        }
      });

    }

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
          Swal.fire({
            title: '¡Campo Vacío!',
            text: 'El nombre del Plan de Auditorías está vacío, inténtalo de nuevo',
            type: 'error',
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          });
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
          let plan = new Plan(
            result.value[0]
          );

          this._planService.crearPlan( plan )
              .subscribe( resp => {
                console.log(resp._id);
                // this.cargarPlanes();
                let cant: any[] = [];
                let cont: any[] = [];

                if (result.value[1] === '1') {
                  cant = ['1'];
                  cont = [
                    {
                      title: 'Auditoría 1',
                      text: 'Escribe el nombre'
                    }
                  ];
                  // console.log(cant);
                }
                if (result.value[1] === '2') {
                  cant = ['1', '2'];
                  cont = [
                    {
                      title: 'Auditoría 1',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 2',
                      text: 'Escribe el nombre'
                    }
                  ];
                  // console.log(cant);
                }
                if (result.value[1] === '3') {
                  cant = ['1', '2', '3'];
                  cont = [
                    {
                      title: 'Auditoría 1',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 2',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 3',
                      text: 'Escribe el nombre'
                    }
                  ];
                  // console.log(cant);
                }
                if (result.value[1] === '4') {
                  cant = ['1', '2', '3', '4'];
                  cont = [
                    {
                      title: 'Auditoría 1',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 2',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 3',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 4',
                      text: 'Escribe el nombre'
                    }
                  ];
                  // console.log(cant);
                }
                if (result.value[1] === '5') {
                  cant = ['1', '2', '3', '4', '5'];
                  cont = [
                    {
                      title: 'Auditoría 1',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 2',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 3',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 4',
                      text: 'Escribe el nombre'
                    },
                    {
                      title: 'Auditoría 5',
                      text: 'Escribe el nombre'
                    }
                  ];
                  // console.log(cant);
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
                      Swal.fire({
                        title: '¡Campos Vacíos!',
                        text: 'Alguna Auditoría quedo con campos vacíos, inténtalo de nuevo',
                        type: 'error',
                        animation: false,
                        customClass: {
                          popup: 'animated tada'
                        }
                      });
                      // ************************************************
                      // *** AQUI SE ELIMINARÁ EL PLAN CREADO ***
                      // ************************************************
                      this._planService.eliminarPlanPermanente( resp._id )
                          .subscribe( resp2 => {
                            // this.cargarPlanes();
                            // Swal.fire('Cancelado', 'Se canceló la creación de las Auditorías', 'error');
                          });
                    } else {
                      // Swal.fire({
                      //   title: 'Respuestas',
                      //   html:
                      //     'Tus respuestas: ' + result2.value,
                      //   confirmButtonText: 'Ok'
                      // });

                      // ************************************************
                      // *** AQUI SE AGREGARAN LAS AUDITORIAS QUE SEAN NECESARIAS ***
                      // ************************************************

                      console.log(result2.value.length);

                      // tslint:disable-next-line: prefer-for-of
                      for ( let i = 0; i < result2.value.length; i++) {
                        // console.log(resp.nombrePlan + '_' + result2.value[i]);

                        let auditoria = new Auditoria(
                          resp.nombrePlan + '_' + result2.value[i],
                          result2.value[i],
                          [],
                          new Date('2018-09-09'),
                          new Date('2018-09-08'),
                          resp._id,
                          [],
                          [],
                          '',
                          '',
                          ''
                        );

                        this._auditoriaService.crearAuditoria( auditoria )
                            .subscribe( resp3 => {
                              this.cargarPlanes();
                              this.cargarAuditorias();
                              Swal.fire('Auditorías Creadas', 'Enviaremos las Auditorías para su Validación', 'success');
                            });

                      }
                    }
                  } else {
                    // ************************************************
                    // *** SI FUE CANCELADO EL FORMULARIO 2, PASA ESTO ***
                    // ************************************************

                    // ************************************************
                    // *** AQUI SE ELIMINARÁ EL PLAN CREADO ***
                    // ************************************************
                    this._planService.eliminarPlanPermanente( resp._id )
                          .subscribe( resp2 => {
                            // this.cargarPlanes();
                            Swal.fire('Cancelado', 'Se canceló la creación de las Auditorías', 'error');
                          });
                  }
                });
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

  editarPlan( plan2: Plan ) {

    Swal.fire({
      title: 'Modificar Nombre',
      text: 'Ingrese el nuevo nombre que tendrá el Plan de Auditorías',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Listo',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#e74c3c'
    }).then((result) => {
      if (result.value) {
        let plan = new Plan(
          result.value,
          plan2._id
        );
        this._planService.crearPlan( plan )
            .subscribe( resp2 => {
              this.cargarPlanes();
              this.cargarAuditorias();
            });
        console.log('if ', result.value);
      } else {
        if ( result.value === undefined) {
        } else {
          Swal.fire({
            title: '¡Campo Vacío!',
            text: 'El nombre del Plan de Auditorías está vacío, inténtalo de nuevo',
            type: 'error',
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          });
        }
      }
    });

  }

  eliminarPlan( plan: Plan ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `Si eliminas el Plan "${plan.nombrePlan}" se borrarán las Auditorías asociadas. ¿Deseas continuar?`,
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
        this._planService.eliminarAuditoriasPlan( plan._id )
          .subscribe( (resp: any) => {
          } );
        this._planService.eliminarPlan( plan._id )
            .subscribe( (resp: any) => {
              this.cargarPlanes();
              this.cargarAuditorias();
            } );
      }
    });

  }

  validarContrasena( usuario2: Usuario, plan: Plan ) {

    Swal.fire({
      title: 'Ingrese su contraseña',
      input: 'password',
      showCancelButton: true,
      confirmButtonText: 'Validar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#e74c3c'
    }).then((result) => {
      if (result.value) {
        let usuario = new Usuario(
          usuario2.numero_Empleado,
          usuario2.nombre_Usuario,
          usuario2.numero_Empleado,
          usuario2.primer_Apellido,
          usuario2.email,
          usuario2.telefono,
          usuario2.puesto,
          result.value,
          usuario2.tipo_Usuario,
          usuario2.segundo_Apellido,
          usuario2._id
        );
        this._usuarioService.validarContrasena( usuario )
          .subscribe( resp => {
            this._planService.validarPlan( plan )
                .subscribe( resp2 => {
                  this.cargarPlanes();
                  this.cargarAuditorias();
                });
          });
      // console.log(result.value);
      } else {
        if ( result.value === undefined) {
        } else {
          Swal.fire({
            title: '¡Campo Vacío!',
            text: 'No ingresaste ninguna contraseña, inténtalo de nuevo',
            type: 'error',
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          });
        }
      }
    });

  }

}
