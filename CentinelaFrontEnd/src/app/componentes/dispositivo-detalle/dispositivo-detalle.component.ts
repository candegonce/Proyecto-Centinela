import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispositivo-detalle',
  templateUrl: './dispositivo-detalle.component.html',
  styleUrls: ['./dispositivo-detalle.component.css']
})
export class DispositivoDetalleComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

    volver(){
      this.location.back();
  }
}
