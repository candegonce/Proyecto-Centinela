import { ElementoVotableVo } from "./ElementoVotableVo";

export class EventoVO {    
    public id : number;
    public nombre : string;
    public descripcion : string;
    public fecha_creacion_evento : Date;
    public fecha_inicio_votacion : Date;
    public fecha_fin_votacion : Date;
    public hora_fin_votacion : number;
    public minuto_fin_votacion : number;
    public fecha_cierre_evento : Date;
    public borrado : boolean;  
    public solicitudes_id : Array<number>;
    public elementos_votables_id : Array<number>;
    public elementos_votables_vo : Array<ElementoVotableVo>;
    // public usuarios : Array<UsuarioVO>;
    // public usuarios_sociales : Array<SocialUser>;
}