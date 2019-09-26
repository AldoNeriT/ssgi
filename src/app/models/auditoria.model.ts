export class Auditoria {

    constructor(
        public nombreAuditoria: string,
        public norma: string,
        public fechaInicial: string,
        public fechaFinal: string,
        public planE: string,
        public grupoAuditor: string,
        public auditados: string,
        public objetivos: string,
        public alcance: string,
        public contacto: string,
        public progreso: string,
        public _id?: string,
        public estado?: string
    ) { }
}