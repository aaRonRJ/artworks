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
}
