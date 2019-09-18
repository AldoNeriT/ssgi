import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstitucionService } from '../../services/institucion/institucion.service';
import { Institucion } from '../../models/institucion.model';

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styles: []
})
export class InstitucionComponent implements OnInit {

  instituciones: Institucion[] = [];

  formaInstitucion: FormGroup;
  mostrarEditable = false;

  mostrarBtnAgregar: boolean;

  idIns: string;

  constructor( public _institucionService: InstitucionService ) { }

  ngOnInit() {
    this.formaInstitucion = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      domicilio: new FormControl( null, Validators.required ),
      telefono: new FormControl( null, Validators.required ),
      imagen: new FormControl( null, Validators.required )
    });

    this.cargarInstituciones();
  }

  cargarInstituciones() {

    this._institucionService.cargarInstituciones()
          .subscribe( instituciones => {
            this.instituciones = instituciones.instituciones;
            if ( instituciones.cuantos === 0) {
              this.mostrarBtnAgregar = true;
            } else {
              this.mostrarBtnAgregar = false;
            }
          });

  }

  agregarInstitucion() {

    if ( this.formaInstitucion.invalid ) {
      return;
    }

    if ( this.idIns === null) {
      let institucion = new Institucion(
        this.formaInstitucion.value.nombre,
        this.formaInstitucion.value.domicilio,
        this.formaInstitucion.value.telefono
      );

      this._institucionService.crearInstitucion( institucion )
            .subscribe( resp => {
              this.mostrarEditable = false;
              this.cargarInstituciones();
            });
    } else {
      let institucion = new Institucion(
        this.formaInstitucion.value.nombre,
        this.formaInstitucion.value.domicilio,
        this.formaInstitucion.value.telefono,
        this.idIns
      );

      this._institucionService.crearInstitucion( institucion )
            .subscribe( resp => {
              this.mostrarEditable = false;
              this.cargarInstituciones();
            });
    }

  }

  pasarDatos( institucion: Institucion ) {

    this.mostrarEditable = true;

    this.formaInstitucion.setValue({
      nombre: institucion.nombreInstitucion,
      domicilio: institucion.domicilio,
      telefono: institucion.telefono,
      imagen: 'Sin Imagen'
    });

    this.idIns = institucion._id;

  }

  // *** ESTE METODO ES DE EMERGENCIA PARA BORRAR ***
  eliminarInstitucion( ) {

    swal({
      title: '¡Advertencia!',
      text: '¿Estás seguro de eliminar la Institución?',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    })
    .then((eliminar) => {
      if (eliminar) {
        this._institucionService.eliminarInstitucion( this.idIns )
          .subscribe( (resp: any) => {
            this.cargarInstituciones();
          } );
      }
    });

    this.mostrarEditable = false;

  }

}
