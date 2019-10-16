import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-verificacion',
  templateUrl: './lista-verificacion.component.html',
  styles: []
})
export class ListaVerificacionComponent implements OnInit {

  // id: string;

  constructor( public router: Router,
               public activatedRoute: ActivatedRoute ) {
    // activatedRoute.params.subscribe( params => {
    //   this.id = params['idP'];
    // });
  }

  ngOnInit() {
  }

  regresar( idAuditoria: string ) {
    this.router.navigate(['/listas/' + idAuditoria]);
  }

}
