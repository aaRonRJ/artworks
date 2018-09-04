import { Component, OnInit } from '@angular/core';
import { AtworksService } from '../../services/atworks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  artworksList: any[] = [];
  page = 1;

  constructor(private _artWorkService: AtworksService) {}

  ngOnInit() {
    this.getCollection(this.page);
  }

  getCollection(page: number) {
    this.page = page;

    this._artWorkService.getCollection(page).subscribe(
      (data) => {
        this.artworksList = data;
      }
    )
  }

  disabledPrev() {
    return this.page <= 5;
  }

  disabledNext() {
    return this.page >= 5;
  }

  addPage() {
    this.page++;
  }

  restPage() {
    this.page--;
  }
}
