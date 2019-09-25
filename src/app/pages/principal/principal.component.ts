import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: []
})
export class PrincipalComponent implements OnInit {

  usuario: Usuario;
  hora: number;
  titulo: string;

  constructor( public _usuarioService: UsuarioService ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    init_plugins();
    
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
