import { Component, OnInit } from '@angular/core';

declare function init_plugins();
declare function inicializando_multiSelect();
declare function inicializando_dateRange();

@Component({
  selector: 'app-auditorias',
  templateUrl: './auditorias.component.html',
  styles: []
})
export class AuditoriasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
    inicializando_multiSelect();
    inicializando_dateRange();
  }

}
