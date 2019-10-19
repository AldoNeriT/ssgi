import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
  }

  mFormTitulo() {
    this.mostrarFormTitulo = !this.mostrarFormTitulo;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
  }

  mFormCom() {
    this.mostrarFormCom = !this.mostrarFormCom;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
  }

  mFormConc() {
    this.mostrarFormConc = !this.mostrarFormConc;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
  }

  mFormFechas() {
    this.mostrarFormFechas = !this.mostrarFormFechas;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
  }

  mFormFechaEmision() {
    this.mostrarFormFechaEmision = !this.mostrarFormFechaEmision;

    floating_labels();
    inicializando_datePicker();
    inicializando_dateRange();
  }

}
