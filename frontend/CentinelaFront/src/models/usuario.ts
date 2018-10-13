import { Sensor } from './sensor';
export class Usuario {
  idUsuario: number;
  rol: string;
  password: string;
  apeynom: string;
  sexo: string;
  email: string;
  habilitado: boolean;
  dispositivos: Sensor[];
  constructor(){}
  static fromJSON(json: any): Usuario {
        let object = Object.create(Usuario.prototype);
        Object.assign(object, json);
        return object;
    }
}