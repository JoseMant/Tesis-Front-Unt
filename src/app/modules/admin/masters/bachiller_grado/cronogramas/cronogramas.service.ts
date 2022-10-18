import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Cronograma, Role, Unidad } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CronogramasService
{
    // Private
    private _cronograma: BehaviorSubject<Cronograma | null> = new BehaviorSubject(null);
    private _cronogramas: BehaviorSubject<Cronograma[] | null> = new BehaviorSubject(null);
    private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
    private _unidades: BehaviorSubject<Unidad[] | null> = new BehaviorSubject(null);
    private _tipoTramiteUnidades: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _dependencias: BehaviorSubject<any | null> = new BehaviorSubject(null);
    
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
     * Getter for cronograma
     */
    get cronograma$(): Observable<Cronograma>
    {
        return this._cronograma.asObservable();
    }

    /**
     * Getter for cronogramas
     */
    get cronogramas$(): Observable<Cronograma[]>
    {
        return this._cronogramas.asObservable();
    }

    /**
     * Getter for roles
     */
    get roles$(): Observable<Role[]>
    {
        return this._roles.asObservable();
    }

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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get cronogramas
     */
    getCronogramas(): Observable<Cronograma[]>
    {
        return this._httpClient.get<Cronograma[]>(environment.baseUrl + 'cronogramas/all').pipe(
            tap((cronogramas) => {
                console.log(cronogramas)
                this._cronogramas.next(cronogramas);
            })
        );
    }

    /**
     * Search cronogramas with given query
     *
     * @param query
     */
    searchCronogramas(query: string): Observable<Cronograma[]>
    {
        return this._httpClient.get<Cronograma[]>(environment.baseUrl + 'cronogramas/search', {
            params: {query}
        }).pipe(
            tap((cronogramas) => {
                console.log(cronogramas);
                this._cronogramas.next(cronogramas);
            })
        );
    }

    /**
     * Get cronograma by id
     */
    getCronogramaById(id: number): Observable<Cronograma>
    {
        return this._cronogramas.pipe(
            take(1),
            map((cronogramas) => {

                // Find the cronograma
                let cronograma = cronogramas.find(item => item.idCronograma_carpeta === id) || null;
                console.log(cronograma);
                
                if (!cronograma) {
                    cronograma = {
                        idCronograma_carpeta: 0,
                        tipo_colacion           : 'none',
                        idUnidad                : 0,
                        idTipo_tramite_unidad   : 0,
                        idDependencia           : 0,
                        fecha_colacion          : '',
                        fecha_cierre_alumno     : '',
                        fecha_cierre_secretaria : '',
                        fecha_cierre_decanato   : '',
                    };
                }

                // Update the cronograma
                this._cronograma.next(cronograma);

                // Return the cronograma
                return cronograma;
            }),
            switchMap((cronograma) => {

                if ( !cronograma )
                {
                    return throwError('Could not found cronograma with id of ' + id + '!');
                }

                return of(cronograma);
            })
        );
    }

    /**
     * Create cronograma
     */
    createCronograma(cronograma: Cronograma): Observable<Cronograma>
    {
        return this.cronogramas$.pipe(
            take(1),
            switchMap(cronogramas => this._httpClient.post<Cronograma>(environment.baseUrl + 'cronogramas/create', cronograma).pipe(
                map((newCronograma) => {

                    // Update the cronogramas with the new cronograma
                    this._cronogramas.next([newCronograma, ...cronogramas]);

                    // Return the new cronograma
                    return newCronograma;
                })
            ))
        );
    }

    /**
     * Update cronograma
     *
     * @param id
     * @param cronograma
     */
    updateCronograma(id: number, cronograma: Cronograma): Observable<Cronograma>
    {
        return this.cronogramas$.pipe(
            take(1),
            switchMap(cronogramas => this._httpClient.put<Cronograma>(environment.baseUrl + 'cronogramas/update/' + id, cronograma).pipe(
                map((updatedCronograma) => {

                    // Find the index of the updated cronograma
                    const index = cronogramas.findIndex(item => item.idCronograma_carpeta === id);

                    // Update the cronograma
                    cronogramas[index] = updatedCronograma;

                    // Update the cronogramas
                    this._cronogramas.next(cronogramas);

                    // Return the updated cronograma
                    return updatedCronograma;
                }),
                switchMap(updatedCronograma => this.cronograma$.pipe(
                    take(1),
                    filter(item => item && item.idCronograma_carpeta === id),
                    tap(() => {

                        // Update the cronograma if it's selected
                        this._cronograma.next(updatedCronograma);

                        // Return the updated cronograma
                        return updatedCronograma;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the cronograma
     *
     * @param id
     */
    deleteCronograma(id: number): Observable<boolean>
    {
        return this.cronogramas$.pipe(
            take(1),
            switchMap(cronogramas => this._httpClient.delete('api/apps/contacts/contact', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted cronograma
                    const index = cronogramas.findIndex(item => item.idCronograma_carpeta === id);

                    // Delete the cronograma
                    cronogramas.splice(index, 1);

                    // Update the cronogramas
                    this._cronogramas.next(cronogramas);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get roles
     */
    getRoles(): Observable<Role[]>
    {
        return this._httpClient.get<Role[]>(environment.baseUrl + 'roles').pipe(
            tap((roles) => {
                this._roles.next(roles);
            })
        );
    }

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
