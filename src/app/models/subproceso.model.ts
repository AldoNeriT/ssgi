export class Subproceso {

    constructor(
        public nombreSubproceso: string,
        public proceso: {
            nombreProceso: string,
            _id: string
        },
        public archivoDigital: string,
        public _id?: string
    ) { }
}
