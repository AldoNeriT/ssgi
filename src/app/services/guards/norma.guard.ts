import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class NormaGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router ) {

  }

  canActivate() {

    if (
          (this._usuarioService.usuario.tipo_Usuario === 'ROOT') ||
          (this._usuarioService.usuario.tipo_Usuario === 'ADMIN') ||
          (this._usuarioService.usuario.tipo_Usuario === 'AUDITOR_LIDER')
      ) {
      return true;
    } else {
      console.log('Bloqueado por NORMA GUARD');
      this.router.navigate(['/home']);
      return false;
    }
  }

}
