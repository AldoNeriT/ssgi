export class Informe {

    constructor(
        public auditoria: string,
        public proceso: string,
        public fecha: string,
        public oportunidadesMejora: string,
        public comentarios: string,
        public conclusiones: string,
        public auditorL: string,
        public director: string,
        public fechaAuditorias: string,
        public fechaEmision: string,
        public _id?: string,
        public estado?: boolean
    ) { }
}
