import { Component, OnInit } from '@angular/core';
import { InputData, FormResult, InfoType, KeywordParams } from 'src/app/models/data-structures';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books-service/books.service';
import { isEmpty as _isEmpty } from 'lodash';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchInputData: InputData = new InputData();
  noMoreData: boolean = false;
  formSubmitted: boolean = false;
  chunkLoading: boolean = false;
  allBooks: Book[];
  formResult: FormResult = {};
  queryString: string = "";

  constructor(private booksService: BooksService) { }

  ngOnInit() {

    if (localStorage.getItem("lastSearch")) {

      // set the last query
      this.queryString = localStorage.getItem("lastSearch");

      // get the reasults
      this.allBooks = JSON.parse(localStorage.getItem("lastSearchBooks"));
    }

  }

  public doSearch() {

    // clear the results
    this.formResult = { type: InfoType.NONE, message: "" };
    this.noMoreData = false;
    this.formSubmitted = true;

    // check if its valid search
    const stringKeywordParams = this.paramsToString(this.searchInputData);  // this line check which property has value , in the end, keywordParams = stringMap = long one string
    if (!this.isParamsValid(stringKeywordParams)) {   //  check if stringKeywordParams has a value
      this.setFormResult({ type: InfoType.ERROR, message: "Can not build query for searching. Please refill the input fields" });
      return;
    }

    // generate query
    this.queryString = this.buildQuery(stringKeywordParams);  // this line add +, "params" etc. to send the right request to api

    // store the last search
    if (this.queryString != localStorage.getItem("lastSearch")) {
      localStorage.setItem('lastSearch', this.queryString);  // storing last search to the local storage
    }

    // get the reasults
    const observable = this.booksService.getList(this.queryString);
    observable.subscribe(books => {
      this.allBooks = books;
        if (this.allBooks.length === 0) {
          // this.allBooks = [];  
          this.setFormResult({ type: InfoType.ERROR, message: 'No results were found for your search' });
        }
      localStorage.setItem('lastSearchBooks', JSON.stringify(this.allBooks));

      // stop loading
      this.chunkLoading = false;
      this.formSubmitted = false;

    }, error => {
      this.handleError(error);
    })
  }

  public isParamsValid(stringKeywordParams: KeywordParams): boolean {
    if (!stringKeywordParams) {
      return false;
    }
    if (stringKeywordParams) {
      return true;
    }
  }

  private paramsToString(searchData: InputData): KeywordParams {
    const mapped: KeywordParams = {
      inauthor: searchData.author,
      intitle: searchData.title
    };
    const stringMap = Object
      .entries(mapped)
      .filter(([k, v]) => v.trim() !== '')
      .map(([k, v]) => ({ [k]: v.trim() }))
      .reduce((acc, v) => {    //  return long one string
        return { ...acc, ...v };
      });
    return _isEmpty(stringMap) ? null : stringMap;
  }

  private buildQuery(params: KeywordParams): string {
    const stringKeywords = Object
      .keys(params)
      .map(key => `${key}:${params[key]}`)
      .join('+');
    return stringKeywords;
  }

  private handleError(error: any) {
    if (error.status === 0) {    //  0 probably from http.get
      this.setFormResult({ type: InfoType.ERROR, message: "Error 503 - Service Unavailable. Please check your connection" });
    }
    this.chunkLoading = false;
    this.formSubmitted = false;
  }

  private setFormResult(newState: FormResult) {
    this.formResult = { ...this.formResult, ...newState };
  }

  isInvalid() {
    return Object
      .entries(this.searchInputData)
      .every(([k, v]) => v.trim() === '');   // check if all inputData is empty (not need)
  }




}
