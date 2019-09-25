import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PlanGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router ) {

  }

  canActivate() {

    if (
          (this._usuarioService.usuario.tipo_Usuario === 'ROOT') ||
          (this._usuarioService.usuario.tipo_Usuario === 'ADMIN') ||
          (this._usuarioService.usuario.tipo_Usuario === 'AUDITOR_LIDER') ||
          (this._usuarioService.usuario.tipo_Usuario === 'ALTA_DIRECCION')
      ) {
      return true;
    } else {
      console.log('Bloqueado por PLAN GUARD');
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
