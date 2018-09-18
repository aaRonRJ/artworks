import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  contentToSearch = '';
  @Output() searchByContent = new EventEmitter<any>();
  @Output() cleanSearch = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  close() {
    this.contentToSearch = '';
    this.cleanSearch.emit(true);
  }

  searchKeydownEnter(event) {
    if (event.keyCode === 13) {
      this.searchByContent.emit(this.contentToSearch);
    }
  }

  search() {
    this.searchByContent.emit(this.contentToSearch);
  }
}
