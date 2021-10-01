import { Producto } from '../interfaces/producto.interface';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }


  private cargarProductos() {
    return new Promise<void>((resolve, reject) => {
      this.http.get('https://myportafolio-fb3d2-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: any) => {
          //console.log(resp);
          this.productos = resp;

          setTimeout(() => {
            this.cargando = false;
          }, 1000);

          resolve();
        });
    });
  }


  getProducto(id: string) {
    return this.http.get(`https://myportafolio-fb3d2-default-rtdb.firebaseio.com/productos/${id}.json`)
  }



  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      //cargar coincidencias de productos
      this.cargarProductos().then(() => {
        //Aplicar el filtro
        this.filtrarProductos(termino);
      });
    } else {
      //Aplicar el filtro
      this.filtrarProductos(termino);
    }
    // this.productosFiltrado = this.productos.filter(producto => {
    //   return true;
    // });
    //console.log(this.productosFiltrado);
  }


  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if( prod.categoria.indexOf (termino ) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push( prod );
      }
    });
  }

}
