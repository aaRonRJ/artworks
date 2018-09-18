import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AtworksService } from '../../services/atworks.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: string;
  artwork: any;

  constructor(private _route: ActivatedRoute,
              private _artWorks: AtworksService) {
    this._route.params.subscribe((params: Params) => this.id = params['objectNumber']);

    this._artWorks.getArtwork(this.id)
    .subscribe(data => {
      this.artwork = data;
    });
  }

  ngOnInit() {}
}
