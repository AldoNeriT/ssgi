import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

// declare function init_plugins();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  usuario: Usuario;
  hora: number;
  titulo: string;

  // barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };

  // barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // barChartType = 'bar';
  // barChartLegend = true;

  // barChartData = [
  //   {data: [65, 85, 65, 96, 45, 25, 65], label: 'Serie A'},
  //   {data: [65, 85, 65, 96, 45, 25, 65], label: 'Serie B'}
  // ];

  pieChartLabels = ['En uso', 'Libre'];
  pieChartData = [112, 400];
  pieChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: ['rgba(41, 128, 185, 1)', 'rgba(189, 195, 199, 1)'],
    },
  ];

  constructor( public _usuarioService: UsuarioService ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    // init_plugins();

    this.hora = new Date().getHours();
    this.saludo();
  }

  saludo() {
    if ( this.hora >= 0  &&  this.hora < 5 ) {
      this.titulo = 'Buenas Noches';
      return;
    }
    if ( this.hora >= 5  &&  this.hora < 12 ) {
      this.titulo = 'Buenos Días';
      return;
    }
    if ( this.hora >= 12  &&  this.hora < 19 ) {
      this.titulo = 'Buenas Tardes';
      return;
    }
    if ( this.hora >= 19  &&  this.hora <= 23 ) {
      this.titulo = 'Buenas Noches';
      return;
    }
  }

}
