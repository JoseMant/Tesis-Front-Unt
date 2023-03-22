import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private _diplomas: BehaviorSubject<any | null> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }

  get diplomas$(): Observable<any>
    {
        return this._diplomas.asObservable();
    }

  getDatos(id:string): Observable<any>{
    // console.log(environment.baseUrl+'carpeta/'+id)
    return this._httpClient.get(environment.baseUrl+'carpeta/'+id).pipe(
      tap((response) => {
          this._diplomas.next(response);
      })
  );;

    // return this._httpClient.get(environment.baseUrl+'carpeta/'+id);
  }


}