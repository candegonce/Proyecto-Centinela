import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {

  public titulo: string;
    public usuario: Usuario;
    
    constructor( private _route: ActivatedRoute, private _router: Router, 
                 private _usuarioService: UsuarioService){
        this.titulo = "Registro de usuario";
        this.usuario = new Usuario();
    }

    ngOnInit(){
        console.log("Registro componente cargado correctamente.");
    }

    onSubmit(){
        console.log(this.usuario);
        this.usuario.rol="USUARIO";
        this.usuario.habilitado= true;
        this._usuarioService.agregarUsuario(this.usuario).subscribe(
            response => {
             alert('Usuario creado corretamente.');
             this.usuario = new Usuario();
            },
            error => {
                console.log(<any>error);
                if ( error.status == 409){
                    alert('Usuario ya existe...');
                }
            }
         );
    }

    volver(){
        this._router.navigate(['/']);
    }

}
