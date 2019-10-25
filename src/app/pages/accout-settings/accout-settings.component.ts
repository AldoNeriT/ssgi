import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/service.index';

// declare function init_plugins();
declare function floating_labels();

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    // init_plugins();
    floating_labels();
    
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {

    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck( link: any ) {

    let selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  colocarCheck() {

    let selectores: any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;

    for (let ref of selectores ) {
      if ( ref.getAttribute('data-theme') == tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }

  cambiarFondo() {
    this._ajustes.cambiarImagen( 'fondoForm',  'https://the1975.com/wp-content/uploads/2018/05/cropped-Facebook_ProfilePic-1.png' );
  }

}
