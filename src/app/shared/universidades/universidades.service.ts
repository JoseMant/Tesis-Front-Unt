import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { UniversidadPagination, UniversidadInterface } from 'app/shared/universidades/universidades.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UniversidadesService
{
    // Private
    private _pagination: BehaviorSubject<UniversidadPagination | null> = new BehaviorSubject(null);
    private _universidad: BehaviorSubject<UniversidadInterface | null> = new BehaviorSubject(null);
    private _universidades: BehaviorSubject<UniversidadInterface[] | null> = new BehaviorSubject(null);

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
     * Getter for pagination
     */
    get pagination$(): Observable<UniversidadPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for universidad
     */
    get universidad$(): Observable<UniversidadInterface>
    {
        return this._universidad.asObservable();
    }

    /**
     * Getter for universidades
     */
    get universidades$(): Observable<UniversidadInterface[]>
    {
        return this._universidades.asObservable();
    }
    get cleanUniversidades$(): Observable<UniversidadInterface[]>
    {
        this._universidades.next([]);
        return this._universidades.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getUniversidades(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'universidades').pipe(
            tap((response: any[]) => {
                this._universidades.next(response);
            })
        );
    }
    
    /**
     * Get universidad by id
     */
    getUniversidadById(id: number): Observable<UniversidadInterface>
    {
        // console.log(this._universidades);
        return this._universidades.pipe(
            take(1),
            map((universidades) => {
                // Find the universidad
                // const universidad = universidades.find(item => item.idUniversidad === id) || null;
                const universidad = JSON.parse( JSON.stringify(universidades.find(item => item.idUniversidad === id) || null) )
                                
                // Update the universidad
                this._universidad.next(universidad);
                
                // Return the universidad
                return universidad;
            }),
            switchMap((universidad) => {

                if ( !universidad )
                {
                    return throwError('Could not found universidad with id of ' + id + '!');
                }

                return of(universidad);
            })
        );
    }
}
