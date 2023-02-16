import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Oficio, Role, Unidad,Resolucion } from 'app/modules/admin/masters/carpeta/oficios/oficios.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OficiosService
{
    // Private
    private _oficio: BehaviorSubject<Oficio | null> = new BehaviorSubject(null);
    private _oficios: BehaviorSubject<Oficio[] | null> = new BehaviorSubject(null);
    private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
    private _unidades: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _dependencias: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _resoluciones: BehaviorSubject<Resolucion[] | null> = new BehaviorSubject(null);

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
     * Getter for oficio
     */
    get oficio$(): Observable<Oficio>
    {
        return this._oficio.asObservable();
    }

    /**
     * Getter for oficios
     */
    get oficios$(): Observable<Oficio[]>
    {
        return this._oficios.asObservable();
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


    /**
     * Getter for resoluciones
     */
     get resoluciones$(): Observable<Resolucion[]>
     {
         return this._resoluciones.asObservable();
     }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get oficios
     */
    getOficios(): Observable<Oficio[]>
    {
        return this._httpClient.get<Oficio[]>(environment.baseUrl + 'oficios/all').pipe(
            tap((oficios) => {
                console.log(oficios);
                this._oficios.next(oficios);
            })
        );
    }

    /**
     * Search oficios with given query
     *
     * @param query
     */
    searchOficios(query: string): Observable<Oficio[]>
    {
        return this._httpClient.get<Oficio[]>(environment.baseUrl + 'oficios/search', {
            params: {query}
        }).pipe(
            tap((oficios) => {
                console.log(oficios);
                this._oficios.next(oficios);
            })
        );
    }

    /**
     * Get oficio by id
     */
    getOficioById(id: number): Observable<Oficio>
    {
        return this._oficios.pipe(
            take(1),
            map((oficios) => {

                // Find the oficio
                let oficio = oficios.find(item => item.idOficio === id) || null;
                
                if (!oficio) {
                    oficio = {
                        idOficio: 0,
                        nro_oficio: '',
                        fecha: '',
                        archivo: '',
                        estado: true
                    };
                } else {
                    if (oficio.archivo) oficio.archivo = environment.baseUrlStorage + oficio.archivo;
                }

                // Update the oficio
                this._oficio.next(oficio);

                // Return the oficio
                return oficio;
            }),
            switchMap((oficio) => {

                if ( !oficio )
                {
                    return throwError('Could not found oficio with id of ' + id + '!');
                }

                return of(oficio);
            })
        );
    }

    /**
     * Create oficio
     */
    createOficio(oficio: any): Observable<Oficio>
    {
        return this.oficios$.pipe(
            take(1),
            switchMap(oficios => this._httpClient.post<Oficio>(environment.baseUrl + 'oficios/create', oficio).pipe(
                map((newOficio) => {
                    newOficio.archivo = environment.baseUrl + newOficio.archivo;
                    // Update the oficios with the new oficio
                    this._oficios.next([newOficio, ...oficios]);

                    // Return the new oficio
                    return newOficio;
                })
            ))
        );
    }

    /**
     * Update oficio
     *
     * @param id
     * @param oficio
     */
    updateOficio(id: number, oficio: Oficio): Observable<Oficio>
    {
        return this.oficios$.pipe(
            take(1),
            switchMap(oficios => this._httpClient.put<Oficio>(environment.baseUrl + 'oficios/update/' + id, oficio).pipe(
                map((updatedOficio) => {

                    // Find the index of the updated oficio
                    const index = oficios.findIndex(item => item.idOficio === id);

                    // Update the oficio
                    oficios[index] = updatedOficio;

                    // Update the oficios
                    this._oficios.next(oficios);

                    // Return the updated oficio
                    return updatedOficio;
                }),
                switchMap(updatedOficio => this.oficio$.pipe(
                    take(1),
                    filter(item => item && item.idOficio === id),
                    tap(() => {

                        // Update the oficio if it's selected
                        this._oficio.next(updatedOficio);

                        // Return the updated oficio
                        return updatedOficio;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the oficio
     *
     * @param id
     */
    deleteOficio(id: number): Observable<boolean>
    {
        return this.oficios$.pipe(
            take(1),
            switchMap(oficios => this._httpClient.delete('api/apps/contacts/contact', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted oficio
                    const index = oficios.findIndex(item => item.idOficio === id);

                    // Delete the oficio
                    oficios.splice(index, 1);

                    // Update the oficios
                    this._oficios.next(oficios);

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
                console.log(response);
                this._dependencias.next(response);
            })
        );
    }

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
     * Update the avatar of the given oficio
     *
     * @param id
     * @param avatar
     */
    uploadAvatar(id: number, avatar: File): Observable<Oficio>
    {
        return this.oficios$.pipe(
            take(1),
            switchMap(oficios => this._httpClient.post<Oficio>('api/apps/contacts/avatar', {
                id,
                avatar
            }, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedOficio) => {

                    // Find the index of the updated oficio
                    const index = oficios.findIndex(item => item.idOficio === id);

                    // Update the oficio
                    oficios[index] = updatedOficio;

                    // Update the oficios
                    this._oficios.next(oficios);

                    // Return the updated oficio
                    return updatedOficio;
                }),
                switchMap(updatedOficio => this.oficio$.pipe(
                    take(1),
                    filter(item => item && item.idOficio === id),
                    tap(() => {

                        // Update the oficio if it's selected
                        this._oficio.next(updatedOficio);

                        // Return the updated oficio
                        return updatedOficio;
                    })
                ))
            ))
        );
    }
}
