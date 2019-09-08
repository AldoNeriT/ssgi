import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  forma: FormGroup;

  constructor( public _usuarioService: UsuarioService) { }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      // tslint:disable-next-line: prefer-const
      let pass1 = group.controls[campo1].value;
      // tslint:disable-next-line: prefer-const
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {
    this.forma = new FormGroup({
      numEmpleado: new FormControl( null, Validators.required ),
      usuario: new FormControl( null, Validators.required ),
      nombre: new FormControl( null, Validators.required ),
      priApellido: new FormControl( null, Validators.required ),
      segApellido: new FormControl(),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      telefono: new FormControl( null, Validators.required ),
      puesto: new FormControl( null, Validators.required ),
      contrasenia: new FormControl( null, Validators.required ),
      contrasenia2: new FormControl( null, Validators.required ),
      tipoUser: new FormControl( null, Validators.required ),
    }, { validators: this.sonIguales( 'contrasenia', 'contrasenia2') });

    this.forma.setValue({
      numEmpleado: '333',
      usuario: 'test_test',
      nombre: 'Test',
      priApellido: 'Prim',
      segApellido: 'Seg',
      correo: 'test@gmail.com',
      telefono: '4456589541',
      puesto: 'Jefe',
      contrasenia: '123456',
      contrasenia2: '123456',
      tipoUser: 'ADMIN'
    });
  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    // console.log( 'Forma Válida', this.forma.valid );

    // swal('Good job!', 'You clicked the button!', 'success');

    console.log( this.forma.value );

    // tslint:disable-next-line: prefer-const
    let usuario = new Usuario(
      this.forma.value.numEmpleado,
      this.forma.value.usuario,
      this.forma.value.nombre,
      this.forma.value.priApellido,
      this.forma.value.correo,
      this.forma.value.telefono,
      this.forma.value.puesto,
      this.forma.value.contrasenia,
      this.forma.value.tipoUser
    );

    this._usuarioService.crearUsuario( usuario )
    .subscribe( resp => {
      console.log( resp );
    });

  }

}
