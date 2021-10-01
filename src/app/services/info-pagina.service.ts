import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada: boolean = false;

  equipo: any[] = [];

  constructor(private http: HttpClient) {
  
    this.cargarInfo();

    this.cargarEquipo();

  }
  
  private cargarInfo() {
    // Leer archivo JSON 
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;

    })
  }

  private cargarEquipo() {
    //Cargar Equipo
    this.http.get('https://myportafolio-fb3d2-default-rtdb.firebaseio.com/equipo.json')
    .subscribe((resp: any) => {
      this.equipo = resp;
      //console.log(resp);
    })    
  }

}
