import { Producto } from '../interfaces/producto.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }


  private cargarProductos() {
    this.http.get('https://myportafolio-fb3d2-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( ( resp: any) => {
        console.log(resp);
        this.productos = resp;

        setTimeout( () => {
          this.cargando = false;
        }, 1000);

      });
  }
}
