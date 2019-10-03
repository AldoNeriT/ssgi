import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare function init_plugins();
declare function inicializando_multiSelect();
declare function inicializando_clockPicker();

@Component({
  selector: 'app-planeacion',
  templateUrl: './planeacion.component.html',
  styles: []
})
export class PlaneacionComponent implements OnInit {

  // planeaciones: Planeacion[] = [];
  // auditoria: any[] = [];
  // forma: FormGroup;
  // formaEditar: FormGroup;

  id: string;
  // arrFechasT: any[] = [];
  // arrFechas: any[] = [];

  cargando = true;

  // objetivosV: string;
  // alcanceV: string;
  // normasV: string;

  constructor( public router: Router,
               public activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe( params => {
      this.id = params['idA'];
    });
  }

  ngOnInit() {
    init_plugins();
    inicializando_multiSelect();
    inicializando_clockPicker();
  }

  regresar() {
    this.router.navigate(['/planeacion/' + this.id]);
  }

}
