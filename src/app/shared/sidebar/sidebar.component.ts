import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {

  constructor(private gifService: GifsService) { }

  get historial() {
    return this.gifService.historial
  }

  traer( termino: string ) {
    
    this.gifService.buscarGifs(termino)
  } 

}
