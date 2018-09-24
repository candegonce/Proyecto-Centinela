import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medicion-detalle',
  templateUrl: './medicion-detalle.component.html',
  styleUrls: ['./medicion-detalle.component.css']
})
export class MedicionDetalleComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  volver(){
      this.location.back();
  }
}
