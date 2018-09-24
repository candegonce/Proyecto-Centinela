import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispositivo-editar',
  templateUrl: './dispositivo-editar.component.html',
  styleUrls: ['./dispositivo-editar.component.css']
})
export class DispositivoEditarComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

    volver(){
      this.location.back();
  }
}
