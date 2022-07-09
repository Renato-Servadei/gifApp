import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];
  public resultados: Gif[] = []

  get historial() {
    return [...this._historial]
  }

  constructor (private http: HttpClient) {
    //con esto logramos que persista el historial aunque se refresque el navegador
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    
  }

  buscarGifs( query: string) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift( query)
    this._historial = this._historial.splice(0, 10);  
      //con esta linea enviamos al local storage el historial de busquedas
    localStorage.setItem('historial', JSON.stringify(this._historial));
    //con esta guardamos las imagenes encontradas

  }
    const random = Math.floor(Math.random()*100);
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=UPJuuD6RJw5xL9jbJP4O3cBLMDSjyHGV&q=${query}&limit=10&offset=${ random }`)
            .subscribe( response => {
      console.log(response.data);
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });

  }
  
}
