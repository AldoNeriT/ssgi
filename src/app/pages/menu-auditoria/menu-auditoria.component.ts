import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-auditoria',
  templateUrl: './menu-auditoria.component.html',
  styles: []
})
export class MenuAuditoriaComponent implements OnInit {

  constructor( public router: Router,
               public activatedRoute: ActivatedRoute
               ) { }

  ngOnInit() {
  }

  redirigirPlaneacion() {
    this.router.navigate(['/planeacion/' + 'audi' + '/' + 'user']);
  }

  redirigirLista() {
    this.router.navigate(['/listaVerificacion/' + 'audi' + '/' + 'user']);
  }

  redirigirInforme() {
    this.router.navigate(['/informe/' + 'audi' + '/' + 'user']);
  }

  redirigirBitacora() {
    this.router.navigate(['/bitacora/' + 'audi' + '/' + 'user']);
  }
}
