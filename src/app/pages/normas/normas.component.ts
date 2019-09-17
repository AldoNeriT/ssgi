import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NormaService } from 'src/app/services/service.index';
import { Norma } from '../../models/norma.model';

@Component({
  selector: 'app-normas',
  templateUrl: './normas.component.html',
  styles: []
})
export class NormasComponent implements OnInit {

  normas: Norma[] = [];
  forma: FormGroup;

  constructor( public _normaService: NormaService ) {

  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      descripcion: new FormControl( null, Validators.required ),
      archivo: new FormControl( null, Validators.required ),
      color: new FormControl( null, Validators.required )
    });

    this.cargarNormas();
  }

  cargarNormas() {

    this._normaService.cargarNormas()
          .subscribe( normas => {
            console.log('RETORNO DE CARGAR NORMAS', normas);
            this.normas = normas;
          });

  }

  agregarNorma() {

    if ( this.forma.invalid ) {
      return;
    }

    let norma = new Norma(
      this.forma.value.nombre,
      this.forma.value.descripcion,
      this.forma.value.archivo,
      this.forma.value.color
    );

    this._normaService.crearNorma( norma )
          .subscribe( resp => {
            this.cargarNormas();
            // this.router.navigate(['/normas']);
          });

  }

  editarNorma() {
  }

  eliminarNorma( norma: Norma ) {

    swal({
      title: '¡Advertencia!',
      text: '¿Estas seguro de eliminar la Norma?',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    })
    .then((eliminar) => {
      if (eliminar) {
        this._normaService.eliminarNorma( norma._id )
          .subscribe( (resp: any) => {
            this.cargarNormas();
          } );
      }
    });

  }

}
