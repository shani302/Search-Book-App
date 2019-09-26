import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  readonly MAX_SUBTITLE_LEN: number = 90;
  readonly MAX_AUTHORS_LEN: number  = 90;

  @Input() books: Book[];
  @Input() chunkLoading: boolean;
  @Input() noMoreData: boolean;

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;

  constructor() { }

  scrollToIndex(index: number) {
    this.viewport.scrollToIndex(index);
  }

  trackByIndex(i: number) {
    return i;
  }

  getInfos(book: Book): string {
    const authors =  book.authors.length <= this.MAX_AUTHORS_LEN ? book.authors : book.authors.slice(0, this.MAX_AUTHORS_LEN) + '... ';
    return [
      authors,
      book.publishedDate
    ]
      .filter(v => v !== '')
      .join(' - ');
  }

}