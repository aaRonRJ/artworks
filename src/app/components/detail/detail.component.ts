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
      console.log('Data', data);
      this.artwork = {};
      
      this.artwork.image = data.webImage.url;
      this.artwork.title = data.title ? data.title : 'no title';
      this.artwork.author = data.principalMaker ? data.principalMaker : 'no author';
      this.artwork.description = data.label.description ? data.label.description : 'no description';
      this.artwork.type = data.objectTypes.length > 0 ? data.objectTypes.join(', '): 'no type';
      this.artwork.objectNumber = data.objectNumber;
      this.artwork.inscriptions = data.inscriptions.length > 0 ? data.inscriptions.join(', '): 'no inscriptions';
      this.artwork.plaqueDescriptionEnglish = data.plaqueDescriptionEnglish;

      if (data.principalMakers.length > 0) {
        if (data.principalMakers[0].roles.length > 0) {
          this.artwork.artist = data.principalMakers[0].roles.join(', ');
        } else {
          this.artwork.artist = 'no artist';  
        }

        if (data.principalMakers[0].productionPlaces.length > 0) {
          this.artwork.place = data.principalMakers[0].productionPlaces.join(', ');
        } else {
          this.artwork.place = 'no place';  
        }
      } else {
        this.artwork.artist = 'no artist';
        this.artwork.place = 'no place';
      }

      this.artwork.date = data.dating.presentingDate;

      this.artwork.materials = data.materials.length > 0 ? data.materials.join(', '): 'no materials';

      if (data.dimensions.length > 0) {
        this.artwork.dimensions = `${data.dimensions[0].value} cm x ${data.dimensions[1].value} cm`;
      } else {
        this.artwork.dimensions = 'no dimensions';
      }      

      console.log(this.artwork);
    });
  }

  ngOnInit() {}
}
