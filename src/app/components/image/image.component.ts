import { Component, OnInit, Input } from '@angular/core';

interface ImgState {
  loaded?: boolean;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  readonly NO_THUMB_IMG_SRC: string = 'assets/image/no_cover_book.png';

  @Input() alt: string = '';

  _src: string = '';

  @Input()
  set src(src: string) {
    this._src = (src && src.trim()) || '';  //  check if there is a picture
    if (!this._src.length) {
      this.NO_THUMB_IMG_SRC;
    }
  }

  get src(): string { return this._src; }

  public state: ImgState = {
    loaded: false
  };

  constructor() { }

  ngOnInit() {
  }

  private setState(newState: ImgState) {
    this.state = { ...this.state, ...newState };
  }

  onLoad() {
    this.setState({ loaded: true });
  }

  onError() {
    this.src = this.NO_THUMB_IMG_SRC;
    this.setState({ loaded: true });
  }


}