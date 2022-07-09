import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[] = [];
  public resultados: Gif[] = []
  private url: string = 'https://api.giphy.com/v1/gifs/search'

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

    const params = new HttpParams()
    .set('api_key', environment.apiKey)
    .set('limit', '10')
    .set('q', query)
    .set('offset', Math.floor(Math.random()*100));
    console.log(params.toString())
    
    this.http.get<SearchGifsResponse>(`${this.url }`, { params})
            .subscribe( response => {

      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });

  }
  
}
