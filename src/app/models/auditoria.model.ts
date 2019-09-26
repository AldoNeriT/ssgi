export class Auditoria {

    constructor(
        public nombreAuditoria: string,
        public nombre: string,
        public normas: Object,
        public fechaInicial: Date,
        public fechaFinal: Date,
        public plan: string,
        public grupoAuditor: Object,
        public auditados: Object,
        public objetivos: string,
        public alcance: string,
        public contacto: string,
        public progreso?: string,
        public _id?: string,
        public estado?: string
    ) { }
}
