import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface BooksApiServiceData {
  apiKey: string;
  apiUrl: string;
  maxItemsInResponse: number;
  responseItems: string[];
}

export interface ConfigData {
  booksService: BooksApiServiceData
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  static settings: ConfigData;

  constructor(private http: HttpClient) { }

  public load(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.http.get<ConfigData>('assets/config/app_config.json')
        .toPromise()
        .then(d => resolve(d))
        .catch(err => reject(err))
    })
      .then(
        (data: ConfigData) => {
          AppConfigService.settings = data;
        })
      .catch(err => {
        console.log(err);
      });


  }
}
