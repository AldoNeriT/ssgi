import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../services/service.index';
import { SubprocesoService } from '../../services/subproceso/subproceso.service';
import { Proceso } from '../../models/proceso.model';
import { Subproceso } from '../../models/subproceso.model';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styles: []
})
export class ProcesosComponent implements OnInit {

  procesos: Proceso[] = [];
  subprocesos: Subproceso[] = [];
  // forma: FormGroup;
  // formaEditar: FormGroup;

  // idNor: string;

  // cargando = true;

  constructor( public _procesoService: ProcesoService,
               public _subprocesoService: SubprocesoService ) { }

  ngOnInit() {
    this.cargarProcesos();
    // this.cargarSubprocesos();
  }

  cargarProcesos() {

    // this.cargando = true;

    this._procesoService.cargarProcesos()
          .subscribe( procesos => {
            this.procesos = procesos;
            // console.log(this.procesos);
            // this.cargando = false;
          });

  }

  // cargarSubprocesos() {

  //   // this.cargando = true;

  //   this._subprocesoService.cargarSubprocesos()
  //         .subscribe( subprocesos => {
  //           this.subprocesos = subprocesos;
  //           // this.cargando = false;
  //         });

  // }

  cargarSubprocesosProceso( proceso: Proceso ) {

    // this.cargando = true;

    this._subprocesoService.cargarSubprocesosProceso( proceso._id )
          .subscribe( subprocesos => {
            this.subprocesos = subprocesos;
            console.log(this.subprocesos);
            // this.cargando = false;
          });

  }

  agregarSubproceso( id: string ) {
    console.log(id);
  }

}
