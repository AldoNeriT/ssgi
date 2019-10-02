import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-auditoria',
  templateUrl: './menu-auditoria.component.html',
  styles: []
})
export class MenuAuditoriaComponent implements OnInit {

  id: string;

  constructor( public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.id = params['idA'];
    });
  }

  ngOnInit() {
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
