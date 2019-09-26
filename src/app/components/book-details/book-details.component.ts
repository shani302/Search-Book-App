import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books-service/books.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { FormResult, InfoType } from 'src/app/models/data-structures';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public book: Book;
  formResult: FormResult = {};

  constructor(private bookService: BooksService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.params.id;
    const observable = this.bookService.getBook(id);
    observable.subscribe(bookResponse => {
      if (!bookResponse) {
        this.setFormResult({ type: InfoType.ERROR, message: 'No results were found' });
      }
      this.book = this.bookService.initializeBook(bookResponse);
    }, error => {
      if (error.status === 0) {
        this.setFormResult({ type: InfoType.ERROR, message: "Error 503 - Service Unavailable. Please check your connection" });
      }
    })
  }

  private setFormResult(newState: FormResult) {
    this.formResult = { ...this.formResult, ...newState };
  }

  getInfos(book: Book): string {
    const authors =  book.authors;
    return [
      authors,
      book.publishedDate
    ]
      .filter(v => v !== '')
      .join(' - ');
  }

}
