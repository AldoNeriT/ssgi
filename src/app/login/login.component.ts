import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  recuerdame: boolean = false;
  userName: string;

  constructor( public router: Router,
               public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();

    // Poner en el input el usuario guardado en el localStorage
    this.userName = localStorage.getItem('userName') || '';

    // Si hay datos en la variable de userName del localStorage, el check recuerdame se queda en true
    if ( this.userName.length > 1 ) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm) {

    if ( forma.invalid) {
      return;
    }

    // tslint:disable-next-line: prefer-const
    let usuario = new Usuario(null, forma.value.usuario, null, null, null, null, null, forma.value.password, null, null);

    this._usuarioService.login( usuario, forma.value.recuerdame )
                  .subscribe( correcto => this.router.navigate(['/dashboard']));

    // Adentro del suscribe se crea el console.log de la respuesta, que retorna el objeto
    // console.log( forma.valid );
    // console.log( forma.value );
    // this.router.navigate(['/dashboard']);
  }

  perdiCuenta() {
    swal('¡Importante!', 'Para recuperar los datos de tu cuenta, favor de comunicarte con el Administrador del Sistema', 'warning');
  }

}
