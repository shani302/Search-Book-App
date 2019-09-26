import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfigService, BooksApiServiceData } from '../app-config/app-config.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { isEmpty as _isEmpty } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  // according to google books api

  private config: BooksApiServiceData;

  constructor(private http: HttpClient, ) {
    this.config = AppConfigService.settings.booksService;
  }


  getList(queryString: string): Observable<Book[]> {
    if (_isEmpty(queryString)) {       //  check if query not empty before search
      return throwError("Could not generate query");
    }
    const responseFieldsQuery = `totalItems,items(${this.config.responseItems.join(',')})`;
    const params: HttpParams = new HttpParams()
      .set('q', queryString)
      .set('fields', responseFieldsQuery)  // fields the response should contain
      .set('maxResults', `${this.config.maxItemsInResponse}`)  // limit to 20 results
      .set('key', this.config.apiKey);

    return this.http.get<Book[]>(this.config.apiUrl, { params }).pipe(   // pipe - do something before return the observable
      map((data: any) => data.items ? this.convertList(data.items) : []));   //  return the final books after serializer
  }

  private convertList(list: any[]): Book[] {
    return list.map(item => this.initializeBook(item));
  }

  initializeBook(responseItem: any): Book {
    const volumeInfo = responseItem.volumeInfo;
    const dateYear = new Date(volumeInfo.publishedDate).getFullYear();
    return new Book(
      responseItem.id || '',
      volumeInfo.title || '',
      volumeInfo.subtitle || '',
      (volumeInfo.authors && volumeInfo.authors.join(', ')) || '',      // can be more, than 1 authors               
      volumeInfo.description || '',
      isNaN(dateYear) ? '' : dateYear.toString(),         // only need the year from date
      (volumeInfo.imageLinks && volumeInfo.imageLinks.smallThumbnail) || ''
    );
  }

  getBook(id: string): Observable<Book> {
    const params: HttpParams = new HttpParams({fromString: 'projection=lite&fields=id%2C%20volumeInfo%2Ftitle%2C%20volumeInfo%2Fsubtitle%2C%20volumeInfo%2Fauthors%2C%20volumeInfo%2Fdescription%2C%20volumeInfo%2FpublishedDate%2C%20volumeInfo%2FimageLinks%2FsmallThumbnail'})
      .append('key', this.config.apiKey);
    return this.http.get<Book>(this.config.apiUrl + "/" + id, {responseType:"json",params});
  }



}