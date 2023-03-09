import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Resolucion, Role, Unidad } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.types';
import { environment } from 'environments/environment';
import { Cronograma } from '../cronogramas/cronogramas.types';

@Injectable({
    providedIn: 'root'
})
export class ResolucionesService
{
    // Private
    private _resolucion: BehaviorSubject<Resolucion | null> = new BehaviorSubject(null);
    private _resoluciones: BehaviorSubject<Resolucion[] | null> = new BehaviorSubject(null);
    private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
    private _unidades: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _dependencias: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _cronogramas: BehaviorSubject<Cronograma[] | null> = new BehaviorSubject(null);

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
     * Getter for resolucion
     */
    get resolucion$(): Observable<Resolucion>
    {
        return this._resolucion.asObservable();
    }

    /**
     * Getter for resoluciones
     */
    get resoluciones$(): Observable<Resolucion[]>
    {
        return this._resoluciones.asObservable();
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
     * Getter for cronogramas
     */
    get cronogramas$(): Observable<Cronograma[]>
    {
        return this._cronogramas.asObservable();
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
     * Get resoluciones
     */
    getResoluciones(): Observable<Resolucion[]>
    {
        return this._httpClient.get<Resolucion[]>(environment.baseUrl + 'resoluciones/all').pipe(
            tap((resoluciones) => {
                console.log(resoluciones);
                this._resoluciones.next(resoluciones);
            })
        );
    }

    /**
     * Search resoluciones with given query
     *
     * @param query
     */
    searchResoluciones(query: string): Observable<Resolucion[]>
    {
        return this._httpClient.get<Resolucion[]>(environment.baseUrl + 'resoluciones/search', {
            params: {query}
        }).pipe(
            tap((resoluciones) => {
                console.log(resoluciones);
                this._resoluciones.next(resoluciones);
            })
        );
    }

    /**
     * Get resolucion by id
     */
    getResolucionById(id: number): Observable<Resolucion>
    {
        return this._resoluciones.pipe(
            take(1),
            map((resoluciones) => {

                // Find the resolucion
                let resolucion = resoluciones.find(item => item.idResolucion === id) || null;
                
                if (!resolucion) {
                    resolucion = {
                        idResolucion: 0,
                        nro_resolucion: '',
                        fecha: '',
                        archivo: '',
                        estado: true
                    };
                } else {
                    if (resolucion.archivo) resolucion.archivo = environment.baseUrlStorage + resolucion.archivo;
                }

                // Update the resolucion
                this._resolucion.next(resolucion);

                // Return the resolucion
                return resolucion;
            }),
            switchMap((resolucion) => {

                if ( !resolucion )
                {
                    return throwError('Could not found resolucion with id of ' + id + '!');
                }

                return of(resolucion);
            })
        );
    }

    /**
     * Create resolucion
     */
    createResolucion(resolucion: any): Observable<Resolucion>
    {
        return this.resoluciones$.pipe(
            take(1),
            switchMap(resoluciones => this._httpClient.post<Resolucion>(environment.baseUrl + 'resoluciones/create', resolucion).pipe(
                map((newResolucion) => {

                    // Update the resoluciones with the new resolucion
                    this._resoluciones.next([newResolucion, ...resoluciones]);

                    // Return the new resolucion
                    return newResolucion;
                })
            ))
        );
    }

    /**
     * Update resolucion
     *
     * @param id
     * @param resolucion
     */
    updateResolucion(id: number, resolucion: Resolucion): Observable<Resolucion>
    {
        return this.resoluciones$.pipe(
            take(1),
            switchMap(resoluciones => this._httpClient.put<Resolucion>(environment.baseUrl + 'resoluciones/update/' + id, resolucion).pipe(
                map((updatedResolucion) => {

                    // Find the index of the updated resolucion
                    const index = resoluciones.findIndex(item => item.idResolucion === id);

                    // Update the resolucion
                    resoluciones[index] = updatedResolucion;

                    // Update the resoluciones
                    this._resoluciones.next(resoluciones);

                    // Return the updated resolucion
                    return updatedResolucion;
                }),
                switchMap(updatedResolucion => this.resolucion$.pipe(
                    take(1),
                    filter(item => item && item.idResolucion === id),
                    tap(() => {

                        // Update the resolucion if it's selected
                        this._resolucion.next(updatedResolucion);

                        // Return the updated resolucion
                        return updatedResolucion;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the resolucion
     *
     * @param id
     */
    deleteResolucion(id: number): Observable<boolean>
    {
        return this.resoluciones$.pipe(
            take(1),
            switchMap(resoluciones => this._httpClient.delete('api/apps/contacts/contact', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted resolucion
                    const index = resoluciones.findIndex(item => item.idResolucion === id);

                    // Delete the resolucion
                    resoluciones.splice(index, 1);

                    // Update the resoluciones
                    this._resoluciones.next(resoluciones);

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

    getDependenciasByUnidad(unidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dependencias/' + unidad).pipe(
            tap((response: any[]) => {
                // console.log(response);
                this._dependencias.next(response);
            })
        );
    }

    getEscuelasByDependencia(facultad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dependencia/escuelas/' + facultad).pipe(
            tap((response: any[]) => {
                this._dependencias.next(response);
            })
        );
    }

    getCronogramas(resolucion: number): Observable<Cronograma[]>
    {
        return this._httpClient.get(environment.baseUrl + 'resolucion/cronogramas/' + resolucion).pipe(
            tap((response: Cronograma[]) => {
                console.log(response)
                this._cronogramas.next(response);
            })
        );
    }

    /**
     * Update the avatar of the given resolucion
     *
     * @param id
     * @param avatar
     */
    uploadAvatar(id: number, avatar: File): Observable<Resolucion>
    {
        return this.resoluciones$.pipe(
            take(1),
            switchMap(resoluciones => this._httpClient.post<Resolucion>('api/apps/contacts/avatar', {
                id,
                avatar
            }, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedResolucion) => {

                    // Find the index of the updated resolucion
                    const index = resoluciones.findIndex(item => item.idResolucion === id);

                    // Update the resolucion
                    resoluciones[index] = updatedResolucion;

                    // Update the resoluciones
                    this._resoluciones.next(resoluciones);

                    // Return the updated resolucion
                    return updatedResolucion;
                }),
                switchMap(updatedResolucion => this.resolucion$.pipe(
                    take(1),
                    filter(item => item && item.idResolucion === id),
                    tap(() => {

                        // Update the resolucion if it's selected
                        this._resolucion.next(updatedResolucion);

                        // Return the updated resolucion
                        return updatedResolucion;
                    })
                ))
            ))
        );
    }
}
