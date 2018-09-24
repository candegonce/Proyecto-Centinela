import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public titulo = 'Error. Página no encontrada!';
  constructor(private location: Location) { }

  ngOnInit() {
  }

  volver(){
      this.location.back();
  }
}
