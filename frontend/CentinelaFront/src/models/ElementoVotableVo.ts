export class ElementoVotableVo{
        id : number;
        nombre : string;
        descripcion : string;
        duenio_id : number;
        organizador_id : number;
        solicitud_id : number;
        // solicitudVo: SolicitudVO;
        imagenes_64 : Array<string>;
        votos_recibidos_ids : Array<number>;
        borrado : boolean;
        habilitado : boolean;
        datoImportante:string;
        formatted_address:string;
        evento_id:number;
        latitud:number;
        longitud:number;

        constructor(){}

}