import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    // Guardando en el LocalStorage
    localStorage.setItem( 'ajustes', JSON.stringify( this.ajustes) );
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {
      // Cargando del local Storage
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );

      this.aplicarTema( this.ajustes.tema );
    } else {
      // Usando valores por defecto
      this.aplicarTema( this.ajustes.tema );
    }
  }

  aplicarTema( tema: string ) {

    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();

  }

  cambiarImagen( id: string, url: string ) {

    this._document.getElementById('' + id).setAttribute('src', url);

  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
