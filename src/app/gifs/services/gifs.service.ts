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

  constructor (private http: HttpClient) {}

  buscarGifs( query: string) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift( query)
    this._historial = this._historial.splice(0, 10);  
  }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=UPJuuD6RJw5xL9jbJP4O3cBLMDSjyHGV&q=${query}&limit=10`)
            .subscribe( response => {
              console.log(query)
      console.log(response.data);
      this.resultados = response.data;
    });

  }
  
}
