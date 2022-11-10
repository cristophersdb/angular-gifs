import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search-gifs',
  templateUrl: './search-gifs.component.html',
})
export class SearchGifsComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  buscar(termino: string) {
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) {
      return;
    }
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}
