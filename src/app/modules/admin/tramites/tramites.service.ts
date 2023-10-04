import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { TramiteInterface } from 'app/modules/admin/tramites/tramites.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TramiteService
{
    // Private
    private _tramite: BehaviorSubject<TramiteInterface | null> = new BehaviorSubject(null);
    private _tramites: BehaviorSubject<TramiteInterface[] | null> = new BehaviorSubject(null);
    private _alumno: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _tipoTramites: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _bancos: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _unidades: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _tipoTramiteUnidades: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _facultadesEscuelas: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _motivos: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _cronogramas: BehaviorSubject<any | null> = new BehaviorSubject(null);

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
     * Getter for madurity_model
     */
    get tramite$(): Observable<TramiteInterface>
    {
        return this._tramite.asObservable();
    }

    /**
     * Getter for tramites
     */
    get tramites$(): Observable<TramiteInterface[]>
    {
        return this._tramites.asObservable();
    }

    get alumno$(): Observable<any> {
        return this._alumno.asObservable();
    }

    get tipoTramites$(): Observable<any> {
        return this._tipoTramites.asObservable();
    }

    get bancos$(): Observable<any> {
        return this._bancos.asObservable();
    }

    get unidades$(): Observable<any> {
        return this._unidades.asObservable();
    }

    get tipoTramiteUnidades$(): Observable<any> {
        return this._tipoTramiteUnidades.asObservable();
    }

    get facultadesEscuelas$(): Observable<any> {
        return this._facultadesEscuelas.asObservable();
    }

    get motivos$(): Observable<any> {
        return this._motivos.asObservable();
    }

    get cronogramas$(): Observable<any> {
        return this._cronogramas.asObservable();
    }

    getMotivos(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'motivos_certificado').pipe(
            tap((response: any[]) => {
                this._motivos.next(response);
            })
        );
    }

    getCronogramasByTipoTramiteUnidad(tipo_tramite_unidad: number, dependencia: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'cronogramas/activos/' + dependencia + '/' + tipo_tramite_unidad).pipe(
            tap((response: any[]) => {
                console.log(response);
                this._cronogramas.next(response);
            })
        );
    }

    getFacultadesEscuelas(idUnidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'facultades_alumno/' + idUnidad).pipe(
            tap((response: any[]) => {
                this._facultadesEscuelas.next(response);
            })
        );
    }

    getTipoTramiteUnidades(idTipoTramite: number, idUnidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'tipo_tramites_unidades/' + idTipoTramite + '/' + idUnidad).pipe(
            tap((response: any[]) => {
                console.log(response);
                this._tipoTramiteUnidades.next(response);
            })
        );
    }

    getRequisitos(idTipoTramiteUnidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'requisitos/' + idTipoTramiteUnidad).pipe(
            tap((response: any[]) => {
                console.log(response);
                this._tipoTramiteUnidades.next(response);
            })
        );
    }

    getUnidades(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'unidades').pipe(
            tap((response: any) => {
                // console.log(response);
                this._unidades.next(response);
            })
        );
    }

    getBancos(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'bancos').pipe(
            tap((response: any) => {
                // console.log(response);
                this._bancos.next(response);
            })
        );
    }

    getTipoTramites(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'tipos_tramites').pipe(
            tap((response: any) => {
                // console.log(response);
                this._tipoTramites.next(response);
            })
        );
    }

    /**
     * Create alumno
     */
    getDataAlumno(document: any): Observable<any>
    {
        console.log(document);
        return this._httpClient.post(environment.baseUrl + 'auth/getAlumnoByDocument', document).pipe(
            switchMap((response: any) => {
                console.log(response);

                // Return a new observable with the response
                return of(response.datos_alumno);
            })
        );
    }

    createTramite(tramite: any): Observable<TramiteInterface>
    {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.post<TramiteInterface>(environment.baseUrl + 'tramites', tramite).pipe(
                map((newTramite) => {
                    console.log(newTramite);

                    // Return the new tramite
                    return newTramite;
                })
            )),
            catchError((error) => {
                console.error(error);
                return throwError(error);
            })
        );
    }


    createTramiteSecretaria(tramite: any): Observable<TramiteInterface>
    {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.post<TramiteInterface>(environment.baseUrl + 'tramites/secretaria', tramite).pipe(
                map((newTramite) => {
                    console.log(newTramite);

                    // Return the new tramite
                    return newTramite;
                })
            )),
            catchError((error) => {
                console.error(error);
                return throwError(error);
            })
        );
    }


    createTramitesFisicos(tramite: any): Observable<any>
    {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.post<any>(environment.baseUrl + 'tramites_fisicos', tramite).pipe(
                map((newTramite) => {
                    console.log(newTramite);

                    // Return the new tramite
                    return newTramite;
                })
            )),
            catchError((error) => {
                console.error(error);
                return throwError(error);
            })
        );
    }


    /**
     * Update product
     *
     * @param id
     * @param tramite
     */
    updateVoucher(id: number, tramite: any): Observable<any> {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.post<any>(environment.baseUrl + 'vouchers/update/'+ id, tramite).pipe(
                map((updateVoucher) => {

                    // Find the index of the updated contact
                    const index = tramites.findIndex(item => item.idTramite === id);

                    // Update the contact
                    tramites[index] = updateVoucher;

                    // Update the contacts
                    this._tramites.next(tramites);

                    // Return the updated contact
                    return updateVoucher;
                }),
                switchMap(updateVoucher => this.tramite$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Update the product if it's selected
                        this._tramite.next(updateVoucher);

                        // Return the updated product
                        return updateVoucher;
                    })
                ))
            ))
        );
    }

    /**
     * Update product
     *
     * @param id
     * @param requisitos
     */
    updateRequisitos(id: number, requisitos: any): Observable<any> {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.post<any>(environment.baseUrl + 'requisitos/update/'+ id, requisitos).pipe(
                map((updateRequisitos) => {
                    console.log(updateRequisitos);
                    // Find the index of the updated contact
                    const index = tramites.findIndex(item => item.idTramite === id);

                    if (index != -1) {

                        // Update the contact
                        tramites[index] = updateRequisitos;
    
                        // Update the contacts
                        this._tramites.next(tramites);
                    }

                    // Return the updated contact
                    return updateRequisitos;
                }),
                switchMap(updateRequisitos => this.tramite$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Update the product if it's selected
                        this._tramite.next(updateRequisitos);

                        // Return the updated product
                        return updateRequisitos;
                    })
                ))
            ))
        );
    }

    /**
     * Get tramites
     */
    getTramites(): Observable<TramiteInterface[]>
    {
       return this._httpClient.get<TramiteInterface[]>(environment.baseUrl + 'tramite/usuario/all').pipe(
            tap((tramites) => {
                this._tramites.next(tramites);
            })
        );
    }

    /**
     * Get tramite by id
     */
    getTramiteById(id: number): Observable<TramiteInterface>
    {
        return this._httpClient.get<TramiteInterface>(environment.baseUrl + 'tramite/'+id).pipe(
            tap((tramite) => {
                // Find the tramite
                tramite.fut = environment.baseUrl + tramite.fut;
                if (tramite.voucher) tramite.voucher = environment.baseUrlStorage + tramite.voucher;
                if (tramite.exonerado_archivo) tramite.exonerado_archivo = environment.baseUrlStorage + tramite.exonerado_archivo;
                if (tramite.requisitos) {
                    tramite.requisitos.forEach(element => {
                        if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                    });
                }
                
                // Update the tramite
                this._tramite.next(tramite);
            })
        ); 
    }

}
