import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = '35brzdWZaewU044eeRRbURrF4UVCPzEy';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public result: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.result = JSON.parse(localStorage.getItem('resultado')!) || [];
    /*     if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp: any) => {
        console.log(resp);
        this.result = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.result));
      });
  }
}
