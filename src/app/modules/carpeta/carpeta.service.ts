import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Carpeta } from 'app/modules/carpeta/carpeta.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarpetaService
{
    // Private
    private _carpeta: BehaviorSubject<Carpeta | null> = new BehaviorSubject(null);
    
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for carpeta
     */
    get carpeta$(): Observable<Carpeta>
    {
        return this._carpeta.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get carpeta by id
     */
    getTramiteById(id: number): Observable<Carpeta>
    {
        return this._httpClient.get<Carpeta>(environment.baseUrl + 'carpeta/' + id).pipe(
            tap((response) => {
                this._carpeta.next(response);
            })
        );
    }
    
}
