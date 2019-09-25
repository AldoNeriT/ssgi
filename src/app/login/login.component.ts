import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

// import swal from 'sweetalert';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  userName: string;

  constructor( public router: Router,
               public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();

    // *** Poner en el input el usuario guardado en el localStorage ***
    this.userName = localStorage.getItem('userName') || '';

    // *** Si hay datos en la variable de userName del localStorage, el check recuerdame se queda en true ***
    if ( this.userName.length > 1 ) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm) {

    if ( forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.usuario, null, null, null, null, null, forma.value.password, null, null);

    this._usuarioService.login( usuario, forma.value.recuerdame )
                  .subscribe( correcto => this.router.navigate(['/home']));
  }

  perdiCuenta() {
    // Swal.fire('¡Importante!',
    //      'Para recuperar los datos de tu cuenta, favor de comunicarte con el Administrador del Sistema',
    //      'warning');
    Swal.fire({
      title: '¡Importante!',
      text: 'Para recuperar los datos de tu cuenta, favor de comunicarte con el Administrador del Sistema',
      type: 'warning',
      animation: false,
      customClass: {
        popup: 'animated heartBeat'
      }
    });
  }

}
