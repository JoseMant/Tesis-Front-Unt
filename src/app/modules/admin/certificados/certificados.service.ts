import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { UserInterface, CertificadoPagination, CertificadoInterface } from 'app/modules/admin/certificados/certificados.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CertificadosService
{
    // Private
    private _users: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<CertificadoPagination | null> = new BehaviorSubject(null);
    private _certificado: BehaviorSubject<CertificadoInterface | null> = new BehaviorSubject(null);
    private _certificados: BehaviorSubject<CertificadoInterface[] | null> = new BehaviorSubject(null);
    // private _allcertificados: BehaviorSubject<CertificadoInterface[] | null> = new BehaviorSubject(null);

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
     * Getter for users
     */
     get users$(): Observable<UserInterface[]>
     {
         return this._users.asObservable();
     }
     
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
    // get allcertificados$(): Observable<CertificadoInterface[]>
    // {
    //     return this._allcertificados.asObservable();
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get users
     */
    getUsers(): Observable<UserInterface[]>
    {
        return this._httpClient.get<UserInterface[]>(environment.baseUrl + 'usuario/uraa').pipe(
            tap((users) => {
                console.log(users);
                this._users.next(users);
            })
        );
    }
    
     
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

    getCertificadosAprobados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CertificadoPagination; data: CertificadoInterface[] }>
    {
      return this._httpClient.get<{ pagination: CertificadoPagination; data: CertificadoInterface[] }>(environment.baseUrl + 'tramite/certificados/aprobados', {
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

    getCertificadosValidados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CertificadoPagination; data: CertificadoInterface[] }>
    {
      return this._httpClient.get<{ pagination: CertificadoPagination; data: CertificadoInterface[] }>(environment.baseUrl + 'tramite/certificados/validados', {
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
    //  getAllCertificados(): Observable<CertificadoInterface[]>
    // {
    //    return this._httpClient.get<CertificadoInterface[]>(environment.baseUrl + 'tramite/certificados').pipe(
    //         tap((response) => {
    //             console.log(response);
    //             // this._allcertificados.next(response);
    //         })
    //     );
    // }

    /**
     * Get certificado by id
     */
    getCertificadoById(id: number): Observable<CertificadoInterface>
    {
        return this._certificados.pipe(
            take(1),
            map((certificados) => {
                
                // Find the certificado
                const certificado = certificados.find(item => item.idTramite === id) || null;
                certificado.fut = environment.baseUrl + certificado.fut;
                certificado.voucher = environment.baseUrlStorage + certificado.voucher;
                certificado.requisitos.forEach(element => {
                    if (element.archivo) {
                        element.archivo = environment.baseUrlStorage + element.archivo;
                    }
                });
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
            switchMap(certificados => this._httpClient.post<CertificadoInterface>(environment.baseUrl + 'tramite/update', certificado).pipe(
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

    /**
     * Update product
     *
     * @param id
     * @param product
     */
    asignarUsuarioCertificados(data: any): Observable<any[]>
    {
        return this.certificados$.pipe(
            take(1),
            switchMap(certificados => this._httpClient.post<any[]>(environment.baseUrl + 'tramite/asignar', data).pipe(
                map((updatedCertificados) => {

                    // Update the messages with the new message
                    // this._certificadosService.getCertificadosValidados(0, 10, 'fecha', 'desc', query);
                    updatedCertificados.forEach(element => {
                        // Find the index of the deleted product
                        const index = certificados.findIndex(item => item.idTramite === element);

                        // Delete the product
                        certificados.splice(index, 1);
                    });

                    // Update the certificados
                    this._certificados.next(certificados);

                    // Return the new message from observable
                    return certificados;
                })
            ))
        );
    }

    /**
     * Update certificado
     *
     * @param id
     * @param certificado
     */
    updateRequisitos(id: number, tramite: CertificadoInterface): Observable<CertificadoInterface>
    {
        return this.certificados$.pipe(
            take(1),
            switchMap(certificados => this._httpClient.put<CertificadoInterface>(environment.baseUrl + 'tramite/update', tramite).pipe(
                map((updatedCertificado) => {
                    console.log(updatedCertificado);
                    // Find the index of the updated certificado
                    const index = certificados.findIndex(item => item.idTramite === id);

                    // Update the certificado
                    certificados[index] = updatedCertificado;

                    // Update the certificados
                    this._certificados.next(certificados);

                    // Return the updated certificado
                    return updatedCertificado;
                }),
                switchMap(updatedCertificado => this.certificado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Update the certificado if it's selected
                        this._certificado.next(updatedCertificado);

                        // Return the updated certificado
                        return updatedCertificado;
                    })
                ))
            ))
        );
    }
    
    uploadCertificado(id: number, tramite: any): Observable<any>
    {
        console.log(tramite);
        return this.certificados$.pipe(
            take(1),
            switchMap(certificados => this._httpClient.post<any>(environment.baseUrl + 'certificados/upload/'+ id, tramite).pipe(
                map((updatedCertificado) => {
                    console.log(updatedCertificado);
                    // Find the index of the updated certificado
                    const index = certificados.findIndex(item => item.idTramite === id);

                    // Update the certificado
                    certificados[index] = updatedCertificado;

                    // Update the certificados
                    this._certificados.next(certificados);

                    // Return the updated certificado
                    return updatedCertificado;
                }),
                switchMap(updatedCertificado => this.certificado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Update the certificado if it's selected
                        this._certificado.next(updatedCertificado);

                        // Return the updated certificado
                        return updatedCertificado;
                    })
                ))
            ))
        );
    }
}
