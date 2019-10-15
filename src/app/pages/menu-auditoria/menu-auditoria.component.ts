import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

declare function init_plugins();

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
               public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.id = params['idA'];
    });
  }

  ngOnInit() {
    init_plugins();
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
    this.router.navigate(['/listaVerificacion/' + this.id + '/' + 'user']);
  }

  redirigirInforme() {
    this.router.navigate(['/informe/' + this.id + '/' + 'user']);
  }

  redirigirBitacora() {
    this.router.navigate(['/bitacora/' + this.id + '/' + 'user']);
  }
}
