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

    let auditoria = new Auditoria(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      3
    );

    this._auditoriaService.cambiarPasos( this.id, auditoria )
          .subscribe( resp => {
            this.cargando = false;
            this.cargarAuditoria( this.id );
          });

  }

  agregarBitacora() {
    console.log('Aquí se agregara la Bitácora');

    this.cargando = true;

    let auditoria = new Auditoria(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      4
    );

    this._auditoriaService.cambiarPasos( this.id, auditoria )
          .subscribe( resp => {
            this.cargando = false;
            this.cargarAuditoria( this.id );
          });
  }
}
