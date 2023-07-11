import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { HomePagination, HomeTramite } from 'app/modules/admin/home/home.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomeService
{
    // Private
    private _pagination: BehaviorSubject<HomePagination | null> = new BehaviorSubject(null);
    private _tramite: BehaviorSubject<HomeTramite | null> = new BehaviorSubject(null);
    private _tramites: BehaviorSubject<HomeTramite[] | null> = new BehaviorSubject(null);
    
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
    get pagination$(): Observable<HomePagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for tramite
     */
    get tramite$(): Observable<HomeTramite>
    {
        return this._tramite.asObservable();
    }

    /**
     * Getter for tramites
     */
    get tramites$(): Observable<HomeTramite[]>
    {
        return this._tramites.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get tramites
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getTramites(page: number = 0, size: number = 100, sort: string = 'created_at', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
        Observable<{ pagination: HomePagination; data: HomeTramite[] }>
    {
        return this._httpClient.get<{ pagination: HomePagination; data: HomeTramite[] }>(environment.baseUrl + 'tramite/usuario', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._tramites.next(response.data);
            })
        );
    }

    /**
     * Get tramite by id
     */
    getTramiteById(id: number): Observable<HomeTramite>
    {
        return this._tramites.pipe(
            take(1),
            map((tramites) => {

                // Find the tramite
                const tramite = tramites.find(item => item.idTramite === id) || null;

                // Update the tramite
                this._tramite.next(tramite);

                // Return the tramite
                return tramite;
            }),
            switchMap((tramite) => {

                if ( !tramite )
                {
                    return throwError('Could not found tramite with id of ' + id + '!');
                }

                return of(tramite);
            })
        );
    }

    /**
     * Create tramite
     */
    createTramite(): Observable<HomeTramite>
    {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.post<HomeTramite>('api/apps/ecommerce/inventory/tramite', {}).pipe(
                map((newTramite) => {

                    // Update the tramites with the new tramite
                    this._tramites.next([newTramite, ...tramites]);

                    // Return the new tramite
                    return newTramite;
                })
            ))
        );
    }

    /**
     * Update tramite
     *
     * @param id
     * @param tramite
     */
    updateTramite(id: number, tramite: HomeTramite): Observable<HomeTramite>
    {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.patch<HomeTramite>('api/apps/ecommerce/inventory/tramite', {
                id,
                tramite
            }).pipe(
                map((updatedTramite) => {

                    // Find the index of the updated tramite
                    const index = tramites.findIndex(item => item.idTramite === id);

                    // Update the tramite
                    tramites[index] = updatedTramite;

                    // Update the tramites
                    this._tramites.next(tramites);

                    // Return the updated tramite
                    return updatedTramite;
                }),
                switchMap(updatedTramite => this.tramite$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Update the tramite if it's selected
                        this._tramite.next(updatedTramite);

                        // Return the updated tramite
                        return updatedTramite;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the tramite
     *
     * @param id
     */
    deleteTramite(id: number): Observable<boolean>
    {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.post(environment.baseUrl + 'tramites/anular', {idTramite: id}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted tramite
                    const index = tramites.findIndex(item => item.idTramite === id);

                    // Delete the tramite
                    tramites.splice(index, 1);

                    // Update the tramites
                    this._tramites.next(tramites);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    sendNotification(id: number, data: any): Observable<any>
    {
        return this.tramites$.pipe(
            take(1),
            switchMap(certificados => this._httpClient.post<any>(environment.baseUrl + 'tramites/anular', data).pipe(
                map((isSent: boolean) => {
                    // Find the index of the updated certificado
                    const index = certificados.findIndex(item => item.idTramite === id);
                    
                    // Update the certificado
                    // certificados[index] = updatedCertificado;

                    // Update the certificados
                    // this._certificados.next(certificados);

                    // Return the updated certificado
                    return isSent;
                }),
            ))
        );
    }
}
