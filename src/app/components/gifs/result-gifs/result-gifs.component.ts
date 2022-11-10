import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-result-gifs',
  templateUrl: './result-gifs.component.html',
})
export class ResultGifsComponent {
  get result() {
    return this.gifsService.result;
  }
  constructor(private gifsService: GifsService) {}
}
