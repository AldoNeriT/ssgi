import { Component, OnInit } from '@angular/core';

declare function floating_labels();
declare function inicializando_datePicker();

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styles: []
})
export class InformeComponent implements OnInit {

  mostrarFormTitulo = false;
  mostrarFormCom = false;

  constructor() { }

  ngOnInit() {
    floating_labels();
    inicializando_datePicker();
  }

  mFormTitulo() {
    this.mostrarFormTitulo = !this.mostrarFormTitulo;

    floating_labels();
    inicializando_datePicker();
  }

  mFormCom() {
    this.mostrarFormCom = !this.mostrarFormCom;

    floating_labels();
    inicializando_datePicker();
  }

}
