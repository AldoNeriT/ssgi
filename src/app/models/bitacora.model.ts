export class Bitacora {

    constructor(
        public fecha: string,
        public salida: string,
        public correccion: string,
        public causa: string,
        public antecedentes: string,
        public requiere: string,
        public accion: string,
        public fechaCumplimiento: string,
        public responsable: string,
        public fechaCierre: string,
        public _id?: string,
        public estado?: boolean
    ) { }
}