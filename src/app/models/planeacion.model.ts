export class Planeacion {

    constructor(
        public fecha: string,
        public horario: string,
        public proceso: Object,
        public actividad: string,
        public criterio: string,
        public participantes: Object,
        public contacto: Object,
        public area: string,
        public auditoria: Object,
        public _id?: string,
        public enviar?: boolean,
        public estado?: boolean
    ) { }
}
