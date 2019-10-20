import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NormaService, UsuarioService, AuditoriaService, InstitucionService, TablaService } from '../../services/service.index';
import { Auditoria } from '../../models/auditoria.model';
import { Usuario } from '../../models/usuario.model';
import { Norma } from '../../models/norma.model';
import { Institucion } from '../../models/institucion.model';
import { Informe } from '../../models/informe.model';
import { Tabla } from '../../models/tabla.model';
import { Router, ActivatedRoute } from '@angular/router';

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
  informe: Informe[] = [];

  // Form
  formaTitulo: FormGroup;
  formaComentarios: FormGroup;
  formaConclusiones: FormGroup;
  formaFechas: FormGroup;
  formaFechaEmision: FormGroup;

  totalNormas = 0;

  idA: string;

  cargando = true;

  // Variables para Ver
  auditoriaNombreV: string;
  noAuditoriaV: string;
  auditorLiderV: string;
  grupoAuditorV: string;
  objetivoV: string;
  alcanceV: string;
  directorV: string;

  constructor( public _normaService: NormaService,
               public _auditoriaService: AuditoriaService,
               public _usuarioService: UsuarioService,
               public _institucionService: InstitucionService,
               public _tablaService: TablaService,
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
    this.cargarUsuarios();
    this.cargarNormas();
    this.cargarTablas();
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

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuariosPorTipo( 'AUDITOR_LIDER' )
          .subscribe( usuario1 => {
            // this.auditoria = auditoria;
            // console.log('AuditorLider: ', usuario1[0]);

            if ( usuario1[0] ) {
              this.auditorLiderV = usuario1[0].nombre + ' ' + usuario1[0].primer_Apellido + ' ' + (usuario1[0].segundo_Apellido || '');
            } else {
              this.auditorLiderV = '';
            }

            this._usuarioService.cargarUsuariosPorTipo( 'ALTA_DIRECCION' )
                    .subscribe( usuario2 => {
                      // this.auditoria = auditoria;
                      // console.log('AltaDireccion: ', usuario2[0]);

                      if ( usuario2[0] ) {
                        this.directorV = usuario2[0].nombre + ' ' + usuario2[0].primer_Apellido + ' ' + (usuario2[0].segundo_Apellido || '');
                      } else {
                        this.directorV = '';
                      }

                      this.cargando = false;

                      floating_labels();
                      inicializando_datePicker();
                      inicializando_dateRange();
                    });

            // this.cargando = false;

            // floating_labels();
            // inicializando_datePicker();
            // inicializando_dateRange();
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
            this.cargando = false;
            floating_labels();
            inicializando_datePicker();
            inicializando_dateRange();
          });

  }

  cargarInforme( idAudi: string ) {

    // this.cargando = true;

    // this._informeService.cargarInforme( idAudi )
    //       .subscribe( informe => {
    //         this.informe = informe;
    //         // console.log('Informe: ', informe);
    //         this.cargando = false;
    //         floating_labels();
    //         inicializando_datePicker();
    //         inicializando_dateRange();
    //       });

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
    this.cargarTablas();

    if ( !this.mostrarFormTitulo ) {
      return;
    }

    console.log('Titulo');

    // this.formaTitulo.setValue({
    //   proceso: this.informe.proceso,
    //   fecha: this.informe.fecha
    // });
  }

  editarComentarios() {
    this.mostrarFormCom = !this.mostrarFormCom;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
    this.cargarNormas();
    this.cargarTablas();

    if ( !this.mostrarFormCom ) {
      return;
    }

    console.log('Comentarios');

    // this.formaComentarios.setValue({
    //   comentarios: this.informe.comentarios
    // });
  }

  editarConclusiones() {
    this.mostrarFormConc = !this.mostrarFormConc;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
    this.cargarNormas();
    this.cargarTablas();

    if ( !this.mostrarFormConc ) {
      return;
    }

    console.log('Conclusiones');

    // this.formaConclusiones.setValue({
    //   conclusiones: this.informe.conclusiones,
    // });
  }

  editarFechas() {
    this.mostrarFormFechas = !this.mostrarFormFechas;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
    this.cargarNormas();
    this.cargarTablas();

    if ( !this.mostrarFormFechas ) {
      return;
    }

    console.log('Fechas');
    
    // this.formaFechas.setValue({
    //   fechas: this.informe.fechas
    // });
  }

  editarFechaEmision() {
    this.mostrarFormFechaEmision = !this.mostrarFormFechaEmision;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
    this.cargarNormas();
    this.cargarTablas();

    if ( !this.mostrarFormFechaEmision ) {
      return;
    }

    console.log('Fecha de Emisión');

    // this.formaFechaEmision.setValue({
    //   fechaEmision: this.informe.fechaEmision
    // });
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
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'idInforme'
    );

    console.log('Informe: ', informe);

    // this._informeService.editarTitulo( informe )
    //         .subscribe( resp => {
    //           floating_labels();
    //           inicializando_datePicker();
    //           inicializando_dateRange();
          
    //           this.cargarAuditoria( this.idA );
    //           this.cargarUsuarios();
    //           this.cargarNormas();
    //           this.cargarTablas();
    //         });

  }

  editarComentariosS() {

    if ( this.formaComentarios.invalid ) {
      console.log('Invalido');
      return;
    }

    this.mostrarFormCom = false;

    let informe = new Informe(
      this.idA,
      '',
      '',
      '',
      this.formaComentarios.value.comentarios,
      '',
      '',
      '',
      '',
      '',
      'idInforme'
    );

    console.log('Informe: ', informe);

    // this._informeService.editarTitulo( informe )
    //         .subscribe( resp => {
    //           floating_labels();
    //           inicializando_datePicker();
    //           inicializando_dateRange();
          
    //           this.cargarAuditoria( this.idA );
    //           this.cargarUsuarios();
    //           this.cargarNormas();
    //           this.cargarTablas();
    //         });

  }

  editarConclusionesS() {

    if ( this.formaConclusiones.invalid ) {
      console.log('Invalido');
      return;
    }

    this.mostrarFormConc = false;

    let informe = new Informe(
      this.idA,
      '',
      '',
      '',
      '',
      this.formaConclusiones.value.conclusiones,
      '',
      '',
      '',
      '',
      'idInforme'
    );

    console.log('Informe: ', informe);

    // this._informeService.editarTitulo( informe )
    //         .subscribe( resp => {
    //           floating_labels();
    //           inicializando_datePicker();
    //           inicializando_dateRange();
          
    //           this.cargarAuditoria( this.idA );
    //           this.cargarUsuarios();
    //           this.cargarNormas();
    //           this.cargarTablas();
    //         });

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
      '',
      '',
      '',
      '',
      '',
      fech,
      '',
      'idInforme'
    );

    console.log('Informe: ', informe);

    // this._informeService.editarTitulo( informe )
    //         .subscribe( resp => {
    //           floating_labels();
    //           inicializando_datePicker();
    //           inicializando_dateRange();
          
    //           this.cargarAuditoria( this.idA );
    //           this.cargarUsuarios();
    //           this.cargarNormas();
    //           this.cargarTablas();
    //         });

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
      '',
      '',
      '',
      '',
      '',
      '',
      fech,
      'idInforme'
    );

    console.log('Informe: ', informe);

    // this._informeService.editarTitulo( informe )
    //         .subscribe( resp => {
    //           floating_labels();
    //           inicializando_datePicker();
    //           inicializando_dateRange();
          
    //           this.cargarAuditoria( this.idA );
    //           this.cargarUsuarios();
    //           this.cargarNormas();
    //           this.cargarTablas();
    //         });

  }

}
