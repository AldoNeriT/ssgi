import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NormaService, UsuarioService, AuditoriaService, InstitucionService, TablaService, InformeService } from '../../services/service.index';
import { Auditoria } from '../../models/auditoria.model';
import { Usuario } from '../../models/usuario.model';
import { Norma } from '../../models/norma.model';
import { Institucion } from '../../models/institucion.model';
import { Informe } from '../../models/informe.model';
import { PersonalContactado } from '../../models/personal-contactado.model';
import { NoConformidades } from '../../models/no-conformidades.model';
import { Tabla } from '../../models/tabla.model';
import { Matriz } from '../../models/matriz.model';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import * as $ from 'jquery';

declare function floating_labels();
declare function inicializando_datePicker();
declare function inicializando_dateRange();

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styles: []
})
export class InformeComponent implements OnInit {

  mostrarFormTitulo = false;
  mostrarFormCom = false;
  mostrarFormConc = false;
  mostrarFormFechas = false;
  mostrarFormFechaEmision = false;

  normas: Norma[] = [];
  tablas: Tabla[] = [];
  personal: PersonalContactado[] = [];
  hallazgos: NoConformidades[] = [];
  matriz: any[] = [];
  informe: Informe;

  // Form
  formaTitulo: FormGroup;
  formaComentarios: FormGroup;
  formaConclusiones: FormGroup;
  formaFechas: FormGroup;
  formaFechaEmision: FormGroup;
  formaOM: FormGroup;
  formaPersonal: FormGroup;
  formaHallazgo: FormGroup;

  totalNormas = 0;

  idA: string;
  idInforme: string;

  cargando = true;

  // Variables para Ver
  auditoriaNombreV: string;
  noAuditoriaV: string;
  auditorLiderV: string;
  grupoAuditorV: string;
  objetivoV: string;
  alcanceV: string;
  directorV: string;
  procesoV: string;
  fechaV: string;
  comentariosV: string;
  conclusionesV: string;
  fechasV: string;
  fechaEmisionV: string;
  oportunidadesMejoraV: any[];


  constructor( public _normaService: NormaService,
               public _auditoriaService: AuditoriaService,
               public _usuarioService: UsuarioService,
               public _institucionService: InstitucionService,
               public _tablaService: TablaService,
               public _informeService: InformeService,
               public router: Router,
               public activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe( params => {
    this.idA = params['idA'];
  });
}

  ngOnInit() {
    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();

    this.cargarAuditoria( this.idA );
    this.cargarNormas();
    // this.cargarTablas();
    this.cargarInforme( this.idA );

    this.formaTitulo = new FormGroup({
      proceso: new FormControl( null, Validators.required ),
      fecha: new FormControl( null, Validators.required )
    });

    this.formaComentarios = new FormGroup({
      comentarios: new FormControl( null, Validators.required )
    });

    this.formaConclusiones = new FormGroup({
      conclusiones: new FormControl( null, Validators.required )
    });

    this.formaFechas = new FormGroup({
      fechas: new FormControl( null, Validators.required )
    });

    this.formaFechaEmision = new FormGroup({
      fechaEmision: new FormControl( null, Validators.required )
    });

    this.formaOM = new FormGroup({
      oportunidad: new FormControl( null, Validators.required )
    });

    this.formaPersonal = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      puesto: new FormControl( null, Validators.required )
    });

    this.formaHallazgo = new FormGroup({
      hallazgo: new FormControl( null, Validators.required ),
      requisito: new FormControl( null, Validators.required )
    });
  }

  matrizValores() {

    for ( let t of this.tablas) {
      for ( let m of this.matriz) {
        if ( t._id === m.tabla._id) {
          if ( m.revision === 'A' ) {
            console.log('A');
            $('#r11_' + t._id).attr('checked', 'true');
          }
          if ( m.revision === 'NA' ) {
            console.log('NA');
            $('#r12_' + t._id).attr('checked', 'true');
          }
          if ( m.revision === 'EP' ) {
            console.log('EP');
            $('#r13_' + t._id).attr('checked', 'true');
          }

          if ( m.resultado === 'AD' ) {
            console.log('AD');
            $('#r21_' + t._id).attr('checked', 'true');
          }
          if ( m.resultado === 'NC' ) {
            console.log('NC');
            $('#r22_' + t._id).attr('checked', 'true');
          }
          if ( m.resultado === 'NR' ) {
            console.log('NR');
            $('#r23_' + t._id).attr('checked', 'true');
          }
          if ( m.resultado === 'EP' ) {
            console.log('EP');
            $('#r24_' + t._id).attr('checked', 'true');
          }
          if ( m.resultado === 'NA' ) {
            console.log('NA');
            $('#r25_' + t._id).attr('checked', 'true');
          }
        }
      }
    }
  }

  cargarAuditoria( id: string ) {

    this.cargando = true;

    this._auditoriaService.cargarAuditoria( id )
          .subscribe( auditoria => {
            // this.auditoria = auditoria;
            // console.log('Auditoria: ', auditoria);

            this.auditoriaNombreV = auditoria.nombre;
            this.noAuditoriaV = auditoria.nombreAuditoria;

            let arrGrupoAuditorV: any[] = [];
            for ( let gp of  auditoria.grupoAuditor) {
              arrGrupoAuditorV.push(gp.nombre + ' ' + gp.primer_Apellido + ' ' + (gp.segundo_Apellido || ''));
            }

            this.grupoAuditorV = arrGrupoAuditorV.join(', ');

            this.objetivoV = auditoria.objetivos;
            this.alcanceV = auditoria.alcance;


            this.cargando = false;
            floating_labels();
            inicializando_datePicker();
            inicializando_dateRange();
          });

  }

  cargarNormas() {

    this.cargando = true;

    this._normaService.cargarNormas()
          .subscribe( normas => {
            this.normas = normas;
            this.totalNormas = normas.length;
            // console.log(normas);
            this.cargando = false;
            floating_labels();
            inicializando_datePicker();
            inicializando_dateRange();
          });

  }

  cargarTablas() {

    this.cargando = true;

    this._tablaService.cargarTabla()
          .subscribe( tablas => {
            this.tablas = tablas;
            // console.log('Tablas: ', tablas);



            this._informeService.cargarMatrizInforme( this.idInforme )
                .subscribe( matriz => {
                  this.matriz = matriz;
                  console.log('Matriz: ', matriz);


                  this.matrizValores();


                  this.cargando = false;
                  floating_labels();
                  inicializando_datePicker();
                  inicializando_dateRange();
                });



            this.cargando = false;
            floating_labels();
            inicializando_datePicker();
            inicializando_dateRange();
          });

  }

  cargarInforme( idAudi: string ) {

    this.cargando = true;

    this._informeService.cargarInforme( idAudi )
          .subscribe( informe => {
            this.informe = informe;
            // console.log('Informe: ', this.informe);

            this.auditorLiderV = informe.auditorLider.nombre + ' ' + informe.auditorLider.primer_Apellido + ' ' + (informe.auditorLider.segundo_Apellido || '');
            this.directorV = informe.director.nombre + ' ' + informe.director.primer_Apellido + ' ' + (informe.director.segundo_Apellido || '');

            this.procesoV = informe.proceso;
            this.fechaV = informe.fecha;

            this.comentariosV = informe.comentarios;
            this.conclusionesV = informe.conclusiones;

            this.fechasV = informe.fechaAuditorias;
            this.fechaEmisionV = informe.fechaEmision;

            this.oportunidadesMejoraV = informe.oportunidadesMejora;

            // console.log('OPOPOP', this.oportunidadesMejoraV);

            this.idInforme = informe._id;

            this.cargarPersonal( informe._id );
            this.cargarNoConf( informe._id );
            this.cargarTablas();

            this.cargando = false;
            floating_labels();
            inicializando_datePicker();
            inicializando_dateRange();
          });

  }

  cargarPersonal( id: string) {

    this.cargando = true;

    this._informeService.cargarPersonal( id )
          .subscribe( personal => {
            this.personal = personal;
            // console.log('Personal: ', personal);
            this.cargando = false;
            floating_labels();
            inicializando_datePicker();
            inicializando_dateRange();
          });

  }

  cargarNoConf( id: string) {

    this.cargando = true;

    this._informeService.cargarNoConformidades( id )
          .subscribe( hallazgos => {
            this.hallazgos = hallazgos;
            // console.log('Hallazgos: ', hallazgos);
            this.cargando = false;
            floating_labels();
            inicializando_datePicker();
            inicializando_dateRange();
          });

  }




  // ************************************************
  // *** FORMS DE LOS EDITABLES ***
  // ************************************************

  editarTitulo() {
    this.mostrarFormTitulo = !this.mostrarFormTitulo;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
    this.cargarNormas();
    // this.cargarTablas();

    if ( !this.mostrarFormTitulo ) {
      return;
    }

    // console.log('Titulo');

    this.formaTitulo.setValue({
      proceso: this.informe.proceso,
      fecha: this.informe.fecha
    });
  }

  editarComentarios() {
    this.mostrarFormCom = !this.mostrarFormCom;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
    this.cargarNormas();
    // this.cargarTablas();

    if ( !this.mostrarFormCom ) {
      return;
    }

    // console.log('Comentarios');

    this.formaComentarios.setValue({
      comentarios: this.informe.comentarios
    });
  }

  editarConclusiones() {
    this.mostrarFormConc = !this.mostrarFormConc;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
    this.cargarNormas();
    // this.cargarTablas();

    if ( !this.mostrarFormConc ) {
      return;
    }

    // console.log('Conclusiones');

    this.formaConclusiones.setValue({
      conclusiones: this.informe.conclusiones,
    });
  }

  editarFechas() {
    this.mostrarFormFechas = !this.mostrarFormFechas;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
    this.cargarNormas();
    // this.cargarTablas();

    if ( !this.mostrarFormFechas ) {
      return;
    }

    // console.log('Fechas');

    this.formaFechas.setValue({
      fechas: this.informe.fechaAuditorias
    });
  }

  editarFechaEmision() {
    this.mostrarFormFechaEmision = !this.mostrarFormFechaEmision;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
    this.cargarNormas();
    // this.cargarTablas();

    if ( !this.mostrarFormFechaEmision ) {
      return;
    }

    // console.log('Fecha de Emisión');

    this.formaFechaEmision.setValue({
      fechaEmision: this.informe.fechaEmision
    });
  }

  // ************************************************
  // *** EDITAR ***
  // ************************************************

  editarTituloS() {

    // if ( this.formaTitulo.invalid ) {
    //   console.log('Invalido');
    //   return;
    // }

    let fech = $('#fecha').val() + '';

    this.mostrarFormTitulo = false;

    let informe = new Informe(
      this.idA,
      this.formaTitulo.value.proceso,
      fech,
      [],
      '',
      '',
      '',
      '',
      '',
      '',
      this.idInforme
    );

    // console.log('Informe Titulo: ', informe);

    this._informeService.modificarTitulo( informe )
            .subscribe( resp => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
            });

  }

  editarComentariosS() {

    if ( this.formaComentarios.invalid ) {
      // console.log('Invalido');
      return;
    }

    this.mostrarFormCom = false;

    let informe = new Informe(
      this.idA,
      '',
      '',
      [],
      this.formaComentarios.value.comentarios,
      '',
      '',
      '',
      '',
      '',
      this.idInforme
    );

    // console.log('Informe Comentarios: ', informe);

    this._informeService.modificarComentarios( informe )
            .subscribe( resp => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
            });

  }

  editarConclusionesS() {

    if ( this.formaConclusiones.invalid ) {
      // console.log('Invalido');
      return;
    }

    this.mostrarFormConc = false;

    let informe = new Informe(
      this.idA,
      '',
      '',
      [],
      '',
      this.formaConclusiones.value.conclusiones,
      '',
      '',
      '',
      '',
      this.idInforme
    );

    // console.log('Informe Conclusiones: ', informe);

    this._informeService.modificarConclusiones( informe )
            .subscribe( resp => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
            });

  }

  editarFechasS() {

    // if ( this.formaTitulo.invalid ) {
    //   console.log('Invalido');
    //   return;
    // }

    let fech = $('#fechas').val() + '';

    this.mostrarFormFechas = false;

    let informe = new Informe(
      this.idA,
      this.formaTitulo.value.proceso,
      '',
      [],
      '',
      '',
      '',
      '',
      fech,
      '',
      this.idInforme
    );

    // console.log('Informe Fecha Auditorias: ', informe);

    this._informeService.modificarFechas( informe )
            .subscribe( resp => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
            });

  }

  editarFechaEmisionS() {

    // if ( this.formaTitulo.invalid ) {
    //   console.log('Invalido');
    //   return;
    // }

    let fech = $('#fechaEmision').val() + '';

    this.mostrarFormFechaEmision = false;

    let informe = new Informe(
      this.idA,
      this.formaTitulo.value.proceso,
      '',
      [],
      '',
      '',
      '',
      '',
      '',
      fech,
      this.idInforme
    );

    // console.log('Informe Fecha Emision: ', informe);

    this._informeService.modificarFechaEmision( informe )
            .subscribe( resp => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
            });

  }

  editarOMS() {

    if ( this.formaOM.invalid ) {
      // console.log('Invalido');
      return;
    }

    this.mostrarFormCom = false;

    this.oportunidadesMejoraV.push(this.formaOM.value.oportunidad);

    let informe = new Informe(
      this.idA,
      '',
      '',
      this.oportunidadesMejoraV,
      '',
      '',
      '',
      '',
      '',
      '',
      this.idInforme
    );

    // console.log('Informe OM: ', informe);

    this._informeService.modificarOM( informe )
            .subscribe( resp => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
            });

  }

  eliminarOM( ind: number ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de eliminar esta Oportunidad de Mejora?`,
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

        // console.log('index: ', ind);
        this.oportunidadesMejoraV.splice(ind, 1);
        // console.log('OOPOPPPPPPPPPP: ',this.oportunidadesMejoraV);

        let informe = new Informe(
          this.idA,
          '',
          '',
          this.oportunidadesMejoraV,
          '',
          '',
          '',
          '',
          '',
          '',
          this.idInforme
        );

        // console.log('Informe OM: ', informe);

        this._informeService.eliminarOM( informe )
                .subscribe( resp => {
                  floating_labels();
                  inicializando_datePicker();
                  inicializando_dateRange();

                  this.cargarAuditoria( this.idA );
                  this.cargarNormas();
                  // this.cargarTablas();
                  this.cargarInforme( this.idA );
                });


      }
    });

  }

  editarPersonalS() {

    if ( this.formaPersonal.invalid ) {
      // console.log('Invalido');
      return;
    }

    let personal = new PersonalContactado(
      this.idInforme,
      this.formaPersonal.value.nombre,
      this.formaPersonal.value.puesto,
    );

    // console.log('Personal: ', personal);

    this._informeService.crearPersonal( personal )
            .subscribe( resp => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
            });

  }

  eliminarPersonal( personal: PersonalContactado ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de eliminar a "${personal.nombre}"?`,
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
        this._informeService.eliminarPersonal( personal._id )
          .subscribe( (resp: any) => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
          } );
      }
    });

  }

  editarHallazgoS() {

    if ( this.formaHallazgo.invalid ) {
      // console.log('Invalido');
      return;
    }

    let hallazgo = new NoConformidades(
      this.idInforme,
      this.formaHallazgo.value.hallazgo,
      this.formaHallazgo.value.requisito,
    );

    // console.log('Hallazgo: ', hallazgo);

    this._informeService.crearNoConformidades( hallazgo )
            .subscribe( resp => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
            });

  }

  eliminarHallazgo( hallazgo: NoConformidades ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de eliminar "${hallazgo.hallazgo}"?`,
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
        this._informeService.eliminarNoConformidades( hallazgo._id )
          .subscribe( (resp: any) => {
              floating_labels();
              inicializando_datePicker();
              inicializando_dateRange();

              this.cargarAuditoria( this.idA );
              this.cargarNormas();
              // this.cargarTablas();
              this.cargarInforme( this.idA );
          } );
      }
    });

  }

}
