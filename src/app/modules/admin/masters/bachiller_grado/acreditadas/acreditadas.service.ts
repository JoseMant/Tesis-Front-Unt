import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Acreditada,  Unidad } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AcreditadasService
{
    // Private
    private _acreditada: BehaviorSubject<Acreditada | null> = new BehaviorSubject(null);
    private _acreditadas: BehaviorSubject<Acreditada[] | null> = new BehaviorSubject(null);
    // private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
    private _unidades: BehaviorSubject<Unidad[] | null> = new BehaviorSubject(null);
    private _tipoTramiteUnidades: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _dependencias: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _user: BehaviorSubject<any | null> = new BehaviorSubject(null);
    
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
     * Getter for acreditada
     */
    get acreditada$(): Observable<Acreditada>
    {
        return this._acreditada.asObservable();
    }

    /**
     * Getter for acreditadas
     */
    get acreditadas$(): Observable<Acreditada[]>
    {
        return this._acreditadas.asObservable();
    }

    /**
     * Getter for roles
     */
    // get roles$(): Observable<Role[]>
    // {
    //     return this._roles.asObservable();
    // }

    /**
     * Getter for unidades
     */
    get unidades$(): Observable<Unidad[]>
    {
        return this._unidades.asObservable();
    }

    /**
     * Getter for dependencias
     */
    get dependencias$(): Observable<Unidad[]>
    {
        return this._dependencias.asObservable();
    }

    /**
     * Getter for user
     */
    get user$(): Observable<Unidad[]>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get acreditadas
     */
    getAcreditadas(): Observable<Acreditada[]>
    {
        return this._httpClient.get<Acreditada[]>(environment.baseUrl + 'acreditadas/all').pipe(
            tap((acreditadas) => {
                console.log(acreditadas)
                this._acreditadas.next(acreditadas);
            })
        );
    }

    /**
     * Search acreditadas with given query
     *
     * @param query
     */
    searchAcreditadas(query: string): Observable<Acreditada[]>
    {
        return this._httpClient.get<Acreditada[]>(environment.baseUrl + 'acreditadas/search', {
            params: {query}
        }).pipe(
            tap((acreditadas) => {
                console.log(acreditadas);
                this._acreditadas.next(acreditadas);
            })
        );
    }

    /**
     * Get acreditada by id
     */
    getAcreditadaById(id: number): Observable<Acreditada>
    {
        return this._acreditadas.pipe(
            take(1),
            map((acreditadas) => {

                // Find the acreditada
                let acreditada = acreditadas.find(item => item.idAcreditacion === id) || null;
                console.log(acreditada);
                
                if (!acreditada) {
                    acreditada = {
                        idAcreditacion: 0,
                        idUnidad                : 0,
                        idDependencia           : 0,
                        fecha_inicio          : '',
                        fecha_fin     : '',
                        empresa_acreditadora : '',
                    };
                }

                // Update the acreditada
                this._acreditada.next(acreditada);

                // Return the acreditada
                return acreditada;
            }),
            switchMap((acreditada) => {

                if ( !acreditada )
                {
                    return throwError('Could not found acreditada with id of ' + id + '!');
                }

                return of(acreditada);
            })
        );
    }

    /**
     * Create acreditada
     */
    createAcreditada(acreditada: Acreditada): Observable<Acreditada>
    {
        return this.acreditadas$.pipe(
            take(1),
            switchMap(acreditadas => this._httpClient.post<Acreditada>(environment.baseUrl + 'acreditadas/create', acreditada).pipe(
                map((newAcreditada) => {

                    // Update the acreditadas with the new acreditada
                    this._acreditadas.next([newAcreditada, ...acreditadas]);

                    // Return the new acreditada
                    return newAcreditada;
                })
            ))
        );
    }

    /**
     * Update acreditada
     *
     * @param id
     * @param acreditada
     */
    updateAcreditada(id: number, acreditada: Acreditada): Observable<Acreditada>
    {
        return this.acreditadas$.pipe(
            take(1),
            switchMap(acreditadas => this._httpClient.put<Acreditada>(environment.baseUrl + 'acreditadas/update/' + id, acreditada).pipe(
                map((updatedAcreditada) => {

                    // Find the index of the updated acreditada
                    const index = acreditadas.findIndex(item => item.idAcreditacion === id);

                    // Update the acreditada
                    acreditadas[index] = updatedAcreditada;

                    // Update the acreditadas
                    this._acreditadas.next(acreditadas);

                    // Return the updated acreditada
                    return updatedAcreditada;
                }),
                switchMap(updatedAcreditada => this.acreditada$.pipe(
                    take(1),
                    filter(item => item && item.idAcreditacion === id),
                    tap(() => {

                        // Update the acreditada if it's selected
                        this._acreditada.next(updatedAcreditada);

                        // Return the updated acreditada
                        return updatedAcreditada;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the acreditada
     *
     * @param id
     */
    deleteAcreditada(id: number): Observable<boolean>
    {
        return this.acreditadas$.pipe(
            take(1),
            switchMap(acreditadas => this._httpClient.delete('api/apps/contacts/contact', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted acreditada
                    const index = acreditadas.findIndex(item => item.idAcreditacion === id);

                    // Delete the acreditada
                    acreditadas.splice(index, 1);

                    // Update the acreditadas
                    this._acreditadas.next(acreditadas);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get roles
     */
    // getRoles(): Observable<Role[]>
    // {
    //     return this._httpClient.get<Role[]>(environment.baseUrl + 'roles').pipe(
    //         tap((roles) => {
    //             this._roles.next(roles);
    //         })
    //     );
    // }

    /**
     * Get unidades
     */
    getUnidades(): Observable<Unidad[]>
    {
        return this._httpClient.get<Unidad[]>(environment.baseUrl + 'unidades').pipe(
            tap((response) => {
                this._unidades.next(response);
            })
        );
    }

    /**
     * Get unidades
     */
    getUserDependencia(): Observable<Unidad[]>
    {
        return this._httpClient.get<any>(environment.baseUrl + 'acreditadas/unidad/dependencia').pipe(
            tap((response) => {
                console.log(response);
                this._user.next(response);
            })
        );
    }

    getTipoTramiteUnidades(idUnidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'tipo_tramites_unidades/2/' + idUnidad).pipe(
            tap((response: any) => {
                console.log(response);
                this._tipoTramiteUnidades.next(response.tipo_tramite_unidad);
            })
        );
    }

    getDependenciasByUnidad(unidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dependencias/' + unidad).pipe(
            tap((response: any[]) => {
                console.log(response);
                this._dependencias.next(response);
            })
        );
    }

    
}
