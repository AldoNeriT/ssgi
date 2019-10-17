import { Component, OnInit } from '@angular/core';
import { AuditoriaService, UsuarioService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { Auditoria } from '../../models/auditoria.model';


// declare function init_plugins();

@Component({
  selector: 'app-menu-auditoria',
  templateUrl: './menu-auditoria.component.html',
  styles: []
})
export class MenuAuditoriaComponent implements OnInit {

  id: string;
  cargando = true;
  pasosV: number;

  constructor( public _auditoriaService: AuditoriaService,
               public _usuarioService: UsuarioService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.id = params['idA'];
    });
  }

  ngOnInit() {
    // init_plugins();
    this.cargarAuditoria( this.id );
  }

  cargarAuditoria( id: string) {

    this.cargando = true;

    this._auditoriaService.cargarAuditoria( id )
          .subscribe( auditoria => {
            this.cargando = false;
            this.pasosV = auditoria.pasos;
            // console.log(this.pasosV);
          });

  }

  redirigirPlaneacion() {
    this.router.navigate(['/planeacion/' + this.id]);
  }

  redirigirLista() {
    this.router.navigate(['/listas/' + this.id]);
  }

  redirigirInforme() {
    this.router.navigate(['/informe/' + this.id]);
  }

  redirigirBitacora() {
    this.router.navigate(['/bitacora/' + this.id]);
  }


  agregarInforme() {
    console.log('Aquí se agregara el Informe');

    this.cargando = true;

    // this._auditoriaService.cambiarPaso3( auditoria )
    //       .subscribe( resp => {
    //         this.cargando = false;
    //         this.cargarAuditoria( this.id );
    //       });


    // this._auditoriaService.cargarAuditoria( this.id )
    //       .subscribe( auditoria2 => {

    //         console.log(auditoria2);

    //         // let auditoria = new Auditoria(
    //         //   this.planV + '_' + this.formaEditar.value.nombre,
    //         //   this.formaEditar.value.nombre,
    //         //   objNormas,
    //         //   fechaI,
    //         //   fechaF,
    //         //   this.idPlan,
    //         //   objAuditor,
    //         //   this.formaEditar.value.objetivos,
    //         //   this.formaEditar.value.alcance,
    //         //   this.formaEditar.value.contacto,
    //         //   this.idAuditoria,
    //         //   1
    //         // );

    //         this.cargando = false;

    //         this.cargarAuditoria( this.id );

    //       });
  }

  agregarBitacora() {
    console.log('Aquí se agregara la Bitácora');

    this.cargando = true;

    // this._auditoriaService.cambiarPaso4( auditoria )
    //       .subscribe( resp => {
    //         this.cargando = false;
    //         this.cargarAuditoria( this.id );
    //       });
  }
}
