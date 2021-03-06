import { Component, OnInit } from '@angular/core';
import { AtworksService } from '../../services/atworks.service';
import { Router } from '@angular/router';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tableHeader = [
    {
      title: 'Obra',
      sortable: true,
      field: 'title'
    },
    {
      title: 'Artista',
      sortable: true,
      field: 'principalOrFirstMaker'
    },
    {
      title: 'Año',
      sortable: true,
      field: 'year'
    },
    {
      title: 'Tipo',
      sortable: true,
      field: 'objectTypes'

    },
    {
      title: 'Material/Técnica',
      sortable: true,
      field: 'matTech'
    }

  ];
  artworksList: any[];
  auxArtworksList: any[];
  page = 1;

  constructor(private _artWorkService: AtworksService,
              private _spinnerService: Ng4LoadingSpinnerService) {}

  ngOnInit() {
    this.getCollection(this.page);
  }

  getCollection(page: number) {
    this.artworksList = [];
    this.page = page;
    this._spinnerService.show();

    this._artWorkService.getCollection(page)
    .subscribe((data) => {      
      return data.forEach((artObject: any) => {
        this._artWorkService.getDetailArtwork(artObject.objectNumber)
        .then((detail: any) => {
          artObject.objectTypes = detail.objectTypes;
          artObject.matTech = detail.matTech.length > 40 ? `${detail.matTech.substring(0, 40)}...` : detail.matTech;
          artObject.year = detail.dating.sortingDate;

          this.artworksList.push(artObject);
        });

        this._spinnerService.hide();
      });
    });
  }

  changePage(page: number) {
    this.page = page;
    this.getCollection(this.page);
  }

  searchByContent(content: string) {
    if (content.replace(/ /g,'').length > 0) {
      this.auxArtworksList = this.artworksList;
      content = content.toUpperCase();

      this.artworksList = this.artworksList.filter((artwork: any) => {  
        if (artwork.title.toString().toUpperCase().includes(content) ||
        artwork.principalOrFirstMaker.toString().toUpperCase().includes(content) ||
        artwork.year.toString().toUpperCase().includes(content) ||
        artwork.objectTypes.toString().toUpperCase().includes(content) ||
        artwork.matTech.toString().toUpperCase().includes(content)) {
          return artwork;
        }
      });
    }
  }

  restoreList(restore: boolean) {
    if (restore) this.artworksList = this.auxArtworksList;
  }

  sortBy(field: string, index: number) {
    if (this.tableHeader[index].sortable) {
      this.artworksList.sort((a, b): number => {
        if (a[field] > b[field]) return -1;
        if (a[field] < b[field]) return 1;

        return 0;
      });
    } else {
      this.artworksList.sort((a, b): number => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;

        return 0;
      });      
    }
    
    this.tableHeader[index].sortable = !this.tableHeader[index].sortable;
  }
}
