import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { CertificadoPagination, CertificadoInterface } from 'app/modules/admin/certificados/certificados.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CertificadosService
{
    // Private
    private _pagination: BehaviorSubject<CertificadoPagination | null> = new BehaviorSubject(null);
    private _certificado: BehaviorSubject<CertificadoInterface | null> = new BehaviorSubject(null);
    private _certificados: BehaviorSubject<CertificadoInterface[] | null> = new BehaviorSubject(null);
    private _allcertificados: BehaviorSubject<CertificadoInterface[] | null> = new BehaviorSubject(null);

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
    get pagination$(): Observable<CertificadoPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for certificado
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

    /**
     * Getter for certificados
     */
    get allcertificados$(): Observable<CertificadoInterface[]>
    {
        return this._allcertificados.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    getCertificadosAsignados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CertificadoPagination; data: CertificadoInterface[] }>
    {
      return this._httpClient.get<{ pagination: CertificadoPagination; data: CertificadoInterface[] }>(environment.baseUrl + 'tramite/certificados/asignados', {
        params: {
            page: '' + page,
            size: '' + size,
            sort,
            order,
            search
        }
    }).pipe(
        tap((response) => {
          console.log(response);
          this._pagination.next(response.pagination);
          this._certificados.next(response.data);
        })
      );
    }

    /**
     * Get tramites
     */
     getAllCertificados(): Observable<CertificadoInterface[]>
    {
       return this._httpClient.get<CertificadoInterface[]>(environment.baseUrl + 'tramite/certificados').pipe(
            tap((response) => {
                console.log(response);
                this._allcertificados.next(response);
            })
        );
    }

    /**
     * Get certificado by id
     */
    getCertificadoById(id: number): Observable<CertificadoInterface>
    {
        return this._allcertificados.pipe(
            take(1),
            map((certificados) => {
                console.log(certificados);

                // Find the certificado
                const certificado = certificados.find(item => item.idTramite === id) || null;
                console.log(certificado);
                // Update the certificado
                this._certificado.next(certificado);
                // Return the certificado
                return certificado;
            }),
            switchMap((certificado) => {

                if ( !certificado )
                {
                    return throwError('Could not found certificado with id of ' + id + '!');
                }

                return of(certificado);
            })
        );
    }

    /**
     * Update certificado
     *
     * @param id
     * @param certificado
     */
    updateCertificado(id: number, certificado: CertificadoInterface): Observable<CertificadoInterface>
    {
        return this.certificados$.pipe(
            take(1),
            switchMap(certificados => this._httpClient.patch<CertificadoInterface>(environment.baseUrl + 'certificado/' + id, certificado).pipe(
                map((updatedCertificado) => {
                    console.log(updatedCertificado);
                    // Find the index of the updated certificado
                    const index = certificados.findIndex(item => item.idTramite === id);

                    // Update the certificado
                    certificados.splice(index, 1);

                    // Update the certificados
                    this._certificados.next(certificados);

                    // Return the updated certificado
                    return updatedCertificado;
                })
            ))
        );
    }
}
