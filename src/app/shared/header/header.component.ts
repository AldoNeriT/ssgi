import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

declare function init_plugins();

import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.usuario = this._usuarioService.usuario;
  }

  menu() {

    console.log($('body').attr('class'));

    if ( $('body').attr('class') === 'fix-header card-no-border fix-sidebar mini-sidebar') {
      console.log('Menu cerrado');
      // $('body').removeClass('mini-sidebar');
    } else {
      console.log('Menu abierto');
      // $('body').addClass('mini-sidebar');
    }

  }

}
