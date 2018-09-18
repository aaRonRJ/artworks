import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  @Output() changeCurrentPage = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  changePage(page: number) {
    this.currentPage = page;
    this.changeCurrentPage.emit(page);
  }

  next(page: number) {
    if ((page + 1) <= 5) {
      this.changePage(page + 1);
    } 
  }

  back(page: number) {
    if ((page - 1) >= 1) {
      this.changePage(page - 1);
    } 
  }
}
