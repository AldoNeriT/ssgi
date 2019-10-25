import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BitacoraService, UsuarioService, InstitucionService } from '../../services/service.index';
import { Bitacora } from '../../models/bitacora.model';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import * as $ from 'jquery';

// declare function init_plugins();
declare function floating_labels();
declare function inicializando_datePicker();

@Component({
  selector: 'app-bitacora-acciones',
  templateUrl: './bitacora-acciones.component.html',
  styles: []
})
export class BitacoraAccionesComponent implements OnInit {

  // @ViewChild('txtNombreV', { static: false }) txtNombreV: ElementRef;
  // @ViewChild('txtDescripcionV', { static: false }) txtDescripcionV: ElementRef;
  // @ViewChild('txtArchV', { static: false }) txtArchV: ElementRef;
  // @ViewChild('txtColorV', { static: false }) txtColorV: ElementRef;

  bitacoras: Bitacora[] = [];
  forma: FormGroup;
  formaEditar: FormGroup;

  idBit: string;

  cargando = true;

  institucionV: string;

  constructor( public _bitacoraService: BitacoraService,
               public _usuarioService: UsuarioService,
               public _institucionService: InstitucionService,
               public router: Router,
               public activatedRoute: ActivatedRoute ) {

  }

  ngOnInit() {
    floating_labels();
    inicializando_datePicker();

    this.forma = new FormGroup({
      fecha: new FormControl( null, Validators.required ),
      salida: new FormControl( null, Validators.required ),
      correccion: new FormControl( null, Validators.required ),
      causa: new FormControl( null, Validators.required ),
      antecedentes: new FormControl( null, Validators.required ),
      requiere: new FormControl( null, Validators.required ),
      accion: new FormControl( null, Validators.required ),
      fecha_cumplimiento: new FormControl( null, Validators.required ),
      responsable: new FormControl( null, Validators.required ),
      fecha_cierre: new FormControl( null, Validators.required )
    });

    this.formaEditar = new FormGroup({
      fecha: new FormControl( null, Validators.required ),
      salida: new FormControl( null, Validators.required ),
      correccion: new FormControl( null, Validators.required ),
      causa: new FormControl( null, Validators.required ),
      antecedentes: new FormControl( null, Validators.required ),
      requiere: new FormControl( null, Validators.required ),
      accion: new FormControl( null, Validators.required ),
      fecha_cumplimiento: new FormControl( null, Validators.required ),
      responsable: new FormControl( null, Validators.required ),
      fecha_cierre: new FormControl( null, Validators.required )
    });

    this.cargarBitacoras();
    this.cargarInstitucion();
  }

  cargarInstitucion() {

    this.cargando = true;

    this._institucionService.cargarInstituciones()
        .subscribe( instituciones => {
          // this.institucion = instituciones.instituciones;
          // console.log(instituciones.instituciones[0]);

          this.institucionV = instituciones.instituciones[0].nombreInstitucion;

          this.cargando = false;
          floating_labels();
          inicializando_datePicker();
        });

  }

  cargarBitacoras() {

    // this.cargando = true;

    // this._bitacoraService.cargarBitacoras()
    //       .subscribe( bitacoras => {
    //         this.bitacoras = bitacoras;
    //         this.cargando = false;

    //         floating_labels();
    //         inicializando_datePicker();
    //       });

  }

  agregarBitacora() {

    if ( this.forma.invalid ) {
      return;
    }

    // let bitacora = new Bitacora(
    //   this.forma.value.nombre,
    //   this.forma.value.descripcion,
    //   this.forma.value.archivo,
    //   this.forma.value.color
    // );

    // this._bitacoraService.crearBitacora( bitacora )
    //       .subscribe( resp => {
    //         this.cargarBitacoras();
    //       });

  }

  // formVer( bitacora: Bitacora ) {

  //   // this.txtNombreV.nativeElement.innerText = norma.nombreNorma;
  //   // this.txtDescripcionV.nativeElement.innerText = norma.descripcion;
  //   // this.txtArchV.nativeElement.innerText = norma.archivoDigital;

  //   // if ( norma.color === 'secondary') {
  //   //   this.txtColorV.nativeElement.innerText = 'Blanco';
  //   // }
  //   // if ( norma.color === 'info') {
  //   //   this.txtColorV.nativeElement.innerText = 'Azul';
  //   // }
  //   // if ( norma.color === 'success') {
  //   //   this.txtColorV.nativeElement.innerText = 'Verde';
  //   // }
  //   // if ( norma.color === 'primary') {
  //   //   this.txtColorV.nativeElement.innerText = 'Morado';
  //   // }
  //   // if ( norma.color === 'danger') {
  //   //   this.txtColorV.nativeElement.innerText = 'Rojo';
  //   // }
  //   // if ( norma.color === 'warning') {
  //   //   this.txtColorV.nativeElement.innerText = 'Amarillo';
  //   // }

  // }

  formEditable( bitacora: Bitacora ) {

    // this.formaEditar.setValue({
    //   nombre: norma.nombreNorma,
    //   descripcion: norma.descripcion,
    //   archivo: norma.archivoDigital,
    //   color: norma.color
    // });

    // this.idBit = bitacora._id;

    $('#modalBitacoraEditar > div > div > div > form > div.m-b-40').addClass('focused');
  }

  editarBitacora() {

    // let bitacora = new Bitacora(
    //   this.formaEditar.value.nombre,
    //   this.formaEditar.value.descripcion,
    //   this.formaEditar.value.archivo,
    //   this.formaEditar.value.color,
    //   this.idNor
    // );

    // this._bitacoraService.crearBitacora( bitacora )
    //         .subscribe( resp => {
    //           this.cargarBitacoras();
    //         });

  }

  eliminarBitacora( bitacora: Bitacora ) {

    Swal.fire({
      title: '¡Advertencia!',
      text: `¿Estás seguro de eliminar esta Bitácora?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      cancelButtonColor: '#e74c3c',
      animation: false,
      customClass: {
        popup: 'animated tada'
      }
    }).then((eliminar) => {
      if (eliminar.value) {
        // this._bitacoraService.eliminarBitacora( bitacora._id )
        //   .subscribe( (resp: any) => {
        //     this.cargarBitacoras();
        //   } );
      }
    });

  }



}
