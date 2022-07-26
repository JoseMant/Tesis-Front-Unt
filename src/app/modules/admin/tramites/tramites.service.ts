import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CertificadoInterface } from 'app/modules/admin/tramites/tramites.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CertificadoService
{
    // Private
    private _certificado: BehaviorSubject<CertificadoInterface | null> = new BehaviorSubject(null);
    private _certificados: BehaviorSubject<CertificadoInterface[] | null> = new BehaviorSubject(null);
    private _alumno: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _tipoTramites: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _bancos: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _unidades: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _tipoTramiteUnidades: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _facultadesEscuelas: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _motivos: BehaviorSubject<any | null> = new BehaviorSubject(null);

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
    get certificado$(): Observable<CertificadoInterface>
    {
        return this._certificado.asObservable();
    }

    /**
     * Getter for certificados
     */
    get certificados$(): Observable<CertificadoInterface[]>
    {
        return this._certificados.asObservable();
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

    getMotivos(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'motivos_certificado').pipe(
            tap((response: any[]) => {
                console.log(response);
                this._motivos.next(response);
            })
        );
    }

    getFacultadesEscuelas(idUnidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'facultades_alumno/' + idUnidad).pipe(
            tap((response: any[]) => {
                console.log(response);
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
                console.log(response);
                this._unidades.next(response);
            })
        );
    }

    getBancos(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'bancos').pipe(
            tap((response: any) => {
                console.log(response);
                this._bancos.next(response);
            })
        );
    }

    getTipoTramites(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'tipos_tramites').pipe(
            tap((response: any) => {
                console.log(response);
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

    createCertificado(certificado: any): Observable<CertificadoInterface>
    {
        return this.certificados$.pipe(
            take(1),
            switchMap(certificados => this._httpClient.post<CertificadoInterface>(environment.baseUrl + 'tramites', certificado).pipe(
                map((newCertificado) => {
                    console.log(newCertificado);

                    // Return the new certificado
                    return newCertificado;
                })
            )),
            catchError((error) => {
                console.error(error);
                return throwError(error);
            })
        );
    }
}
