import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  formaMiPerfil: FormGroup;

  mostrarEditable = false;
  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService,
               public router: Router,
               public activatedRoute: ActivatedRoute
) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;

    this.formaMiPerfil = new FormGroup({
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      telefono: new FormControl( null, Validators.required )
    });
  }

  cargarDatos() {
    this.mostrarEditable = !this.mostrarEditable;

    // DATOS TEMPORALES PARA LLENAR EL FORM
    this.formaMiPerfil.setValue({
      correo: this.usuario.email,
      telefono: this.usuario.telefono
    });
  }

  actualizarMiPerfil() {
    console.log( 'Forma Válida', this.formaMiPerfil.valid );
    console.log( this.formaMiPerfil.value );

    if ( this.formaMiPerfil.invalid ) {
      return;
    }

    // *** Si el ID de la URL es igual a 'nuevo' lo convierte a null
    //     para que el servicio lo detecte para Agregar ***

    let usuario = new Usuario(
      '',
      '',
      '',
      '',
      this.formaMiPerfil.value.correo,
      this.formaMiPerfil.value.telefono,
      '',
      '',
      '',
      '',
      ''
    );

    this._usuarioService.actualizarMiPerfil( usuario)
          .subscribe( resp => {
            this.router.navigate(['/perfil']);
            this.mostrarEditable = !this.mostrarEditable;
            console.log( resp );
          });
  }

}
