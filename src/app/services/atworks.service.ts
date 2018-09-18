import { URL, format, language, apiKey } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AtworksService {

  constructor(private http: HttpClient) {}

  /* Get collection */
  public getCollection(page): Observable<any> {
    return this.http.get(`${URL}${language}/collection?key=${apiKey}&format=${format}&p=${page}`)
    .pipe(
      map((data: any) => {
        return data.artObjects;
      }),
      catchError(_ => {
        return of(null);
      })
    );
  }

  public getDetailArtwork(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${URL}${language}/collection/${id}?key=${apiKey}&fomat=${format}`)
      .subscribe((detailObject: any) => {
        let data = {
          objectTypes: detailObject.artObject.objectTypes,
          dating: detailObject.artObject.dating,
          matTech: ''
        };

        if (detailObject.artObject.materials.length > 0) {
          data.matTech = detailObject.artObject.materials.join(', ');
        }

        if (detailObject.artObject.techniques.length > 0) {
          if (data.matTech && data.matTech.length > 0) {
            data.matTech += `, ${detailObject.artObject.techniques.join(', ')}`;
          } else {
            data.matTech = detailObject.artObject.techniques.join(', ');
          }
        }
        
        resolve(data);
      });
    });
  }

  public getArtwork(objectNumber: string): Observable<any> {
    return this.http.get(`${URL}${language}/collection/${objectNumber}?key=${apiKey}&fomat=${format}`)
    .pipe(
      map((detailObject: any) => {
        return detailObject.artObject;
      }),
      catchError(_ => {
        return of(null);
      })
    );
  } 
}
