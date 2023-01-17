import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { UserInterface, GradoPagination, GradoInterface } from 'app/modules/admin/grados/grados.types';
import { environment } from 'environments/environment';
import { Resolucion } from '../masters/bachiller_grado/cronogramas/cronogramas.types';

@Injectable({
    providedIn: 'root'
})
export class GradosService
{
    // Private
    private _users: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<GradoPagination | null> = new BehaviorSubject(null);
    private _grado: BehaviorSubject<GradoInterface | null> = new BehaviorSubject(null);
    private _grados: BehaviorSubject<GradoInterface[] | null> = new BehaviorSubject(null);
    private _modalidades_sustentacion: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _programas_estudios: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _diplomas: BehaviorSubject<any | null> = new BehaviorSubject(null);

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
    get pagination$(): Observable<GradoPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for grado
     */
    get grado$(): Observable<GradoInterface>
    {
        return this._grado.asObservable();
    }

    /**
     * Getter for grados
     */
    get grados$(): Observable<GradoInterface[]>
    {
        return this._grados.asObservable();
    }
    get cleanGrados$(): Observable<GradoInterface[]>
    {
        this._grados.next([]);
        return this._grados.asObservable();
    }

    get modalidades_sustentacion$(): Observable<any> {
        return this._modalidades_sustentacion.asObservable();
    }

    get programas_estudios$(): Observable<any> {
        return this._programas_estudios.asObservable();
    }

    get diplomas$(): Observable<any> {
        return this._diplomas.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get users
     */
    // getUsers(): Observable<UserInterface[]>
    // {
    //     return this._httpClient.get<UserInterface[]>(environment.baseUrl + 'usuario/uraa').pipe(
    //         tap((users) => {
    //             console.log(users);
    //             this._users.next(users);
    //         })
    //     );
    // }
    
     
    // getGradosAsignados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    // Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    // {
    //   return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'tramite/grados/asignados', {
    //     params: {
    //         page: '' + page,
    //         size: '' + size,
    //         sort,
    //         order,
    //         search
    //     }
    // }).pipe(
    //     tap((response) => {
    //       console.log(response);
    //       this._pagination.next(response.pagination);
    //       this._grados.next(response.data);
    //     })
    //   );
    // }


    getGradosValidados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/validados/escuela', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosAprobados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/aprobados/escuela', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosRevalidados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/revalidados/escuela', {
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
          this._grados.next(response.data);
        })
      );
    }


    getGradosValidadosFacultad(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/validados/facultad', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosAprobadosFacultad(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/aprobados/facultad', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosRevalidadosFacultad(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/revalidados/facultad', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosDiplomasEscuela(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/diplomas/escuela', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosDiplomasFacultad(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/diplomas/facultad', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosValidacionURA(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/validacion/ura', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosDiplomasURA(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/diplomas/ura', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosValidadosSecretaria(resolucion: string, page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[]; resolucion: Resolucion }>
    {
        console.log(resolucion);
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'grados/validados/secretaria/' + resolucion, {
        params: {
            page: '' + page,
            size: '' + size,
            sort,
            order,
            search
        }
    }).pipe(
        tap((response) => {
            console.log(response)
          this._pagination.next(response.pagination);
          this._grados.next(response.data);
        })
      );
    }


    getGradosFirmaDecano(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/firma/decano', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosFirmaSecretaria(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/firma/secretaria', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosFirmaRector(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/firma/rector', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosPendientesImpresion(resolucion: string, page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[]; resolucion: Resolucion }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'grados/pendientes/impresion/' + resolucion, {
        params: {
            page: '' + page,
            size: '' + size,
            sort,
            order,
            search
        }
    }).pipe(
        tap((response) => {
            console.log(response)
          this._pagination.next(response.pagination);
          this._grados.next(response.data);
        })
      );
    }

    getGradosFinalizados(page: number = 0, size: number = 10, sort: string = 'fecha_colacion', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/finalizados', {
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
          this._grados.next(response.data);
        })
      );
    }

    getGradosSecretariaObservados(page: number = 0, size: number = 10, sort: string = 'fecha_colacion', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/secretaria/observados', {
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
            this._grados.next(response.data);
        })
      );
    }
    
    /**
     * Get grado by id
     */
    getGradoById(id: number): Observable<GradoInterface>
    {
        // console.log(this._grados);
        return this._grados.pipe(
            take(1),
            map((grados) => {
                // Find the grado
                // const grado = grados.find(item => item.idTramite === id) || null;
                const grado = JSON.parse( JSON.stringify(grados.find(item => item.idTramite === id) || null) )
                if (grado) {
                    grado.fut = environment.baseUrl + grado.fut;
                    if (grado.certificado_final) grado.certificado_final = environment.baseUrlStorage +  grado.certificado_final
                    if (grado.diploma_final && grado.idEstado_tramite==13) grado.diploma_final = environment.baseUrl +  grado.diploma_final
                    else grado.diploma_final = environment.baseUrlStorage +  grado.diploma_final
                    if (grado.voucher) grado.voucher = environment.baseUrlStorage + grado.voucher;
                    if (grado.exonerado) grado.exonerado = environment.baseUrlStorage + grado.exonerado;
                    if (grado.requisitos) {
                        grado.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });
                    }
                }
                
                // Update the grado
                this._grado.next(grado);
                
                // Return the grado
                return grado;
            }),
            switchMap((grado) => {

                if ( !grado )
                {
                    return throwError('Could not found grado with id of ' + id + '!');
                }

                return of(grado);
            })
        );
    }

    /**
     * Update grado
     *
     * @param id
     * @param grado
     */
    updateGrado(id: number, grado: GradoInterface): Observable<GradoInterface>
    {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.put<GradoInterface>(environment.baseUrl + 'tramite/update', grado).pipe(
                map((updatedGrado) => {
                    console.log(updatedGrado);
                    // debugger;
                    // Find the index of the updated grado
                    const index = grados.findIndex(item => item.idTramite === id);

                    if (updatedGrado.idEstado_tramite != 17 && updatedGrado.idEstado_tramite != 20 && updatedGrado.idEstado_tramite != 7 ) {
                        // Update the grado
                        grados.splice(index, 1);
                    } else {
                        // Update the grado
                        grados[index] = updatedGrado;
                    }

                    // Update the grados
                    this._grados.next(grados);

                    // Return the updated grado
                    return updatedGrado;
                }),
                switchMap(updatedGrado => this.grado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Update the grado if it's selected
                        this._grado.next(updatedGrado);

                        // Return the updated grado
                        return updatedGrado;
                    })
                ))
            ))
        );
    }

    /**
     * Update product
     *
     * @param id
     * @param product
     */
    // asignarUsuarioGrados(data: any): Observable<any[]>
    // {
    //     return this.grados$.pipe(
    //         take(1),
    //         switchMap(grados => this._httpClient.post<any[]>(environment.baseUrl + 'tramite/asignar', data).pipe(
    //             map((updatedGrados) => {

    //                 // Update the messages with the new message
    //                 // this._gradosService.getGradosValidados(0, 10, 'fecha', 'desc', query);
    //                 updatedGrados.forEach(element => {
    //                     // Find the index of the deleted product
    //                     const index = grados.findIndex(item => item.idTramite === element);

    //                     // Delete the product
    //                     grados.splice(index, 1);
    //                 });

    //                 // Update the grados
    //                 this._grados.next(grados);

    //                 // Return the new message from observable
    //                 return grados;
    //             })
    //         ))
    //     );
    // }

    /**
     * Update grado
     *
     * @param id
     * @param grado
     */
    updateRequisitos(id: number, requisitos: any): Observable<any> {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.post<any>(environment.baseUrl + 'requisitos/update/'+ id, requisitos).pipe(
                map((updatedGrado) => {
                    console.log(updatedGrado);
                    // debugger;
                    // Find the index of the updated grado
                    const index = grados.findIndex(item => item.idTramite === id);

                    if (updatedGrado.idEstado_tramite != 30 && updatedGrado.idEstado_tramite != 32 && updatedGrado.idEstado_tramite != 7 ) {
                        // Update the grado
                        grados.splice(index, 1);
                    } else {
                        // Update the grado
                        grados[index] = updatedGrado;
                    }

                    // Update the grados
                    this._grados.next(grados);

                    // Return the updated grado
                    return updatedGrado;
                }),
                switchMap(updatedGrado => this.grado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedGrado.fut = environment.baseUrl + updatedGrado.fut;
                        if (updatedGrado.voucher) updatedGrado.voucher = environment.baseUrlStorage + updatedGrado.voucher;
                        if (updatedGrado.exonerado_archivo) updatedGrado.exonerado_archivo = environment.baseUrlStorage + updatedGrado.exonerado_archivo;
                        updatedGrado.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the grado if it's selected
                        this._grado.next(updatedGrado);

                        // Return the updated grado
                        return updatedGrado;
                    })
                ))
            ))
        );
    }
    
    updateEstado(id: number, data: any): Observable<any> {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.put<any>(environment.baseUrl + 'grados/correccion', data).pipe(
                map((updatedGrado) => {
                    console.log(updatedGrado);
                    
                    // Find the index of the updated grado
                    const index = grados.findIndex(item => item.idTramite === id);

                    if (updatedGrado.idEstado_tramite != 31 && updatedGrado.idEstado_tramite != 33 ) {
                        // Update the grado
                        grados.splice(index, 1);
                    }

                    // Update the grados
                    this._grados.next(grados);

                    // Return the updated grado
                    return updatedGrado;
                }),
                switchMap(updatedGrado => this.grado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedGrado.fut = environment.baseUrl + updatedGrado.fut;
                        if (updatedGrado.voucher) updatedGrado.voucher = environment.baseUrlStorage + updatedGrado.voucher;
                        if (updatedGrado.exonerado_archivo) updatedGrado.exonerado_archivo = environment.baseUrlStorage + updatedGrado.exonerado_archivo;
                        updatedGrado.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the grado if it's selected
                        this._grado.next(updatedGrado);

                        // Return the updated grado
                        return updatedGrado;
                    })
                ))
            ))
        );
    }
    
    sendFacultad(id: number, data: any): Observable<any> {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.put<any>(environment.baseUrl + 'grados/envio/facultad', data).pipe(
                map((updatedGrado) => {
                    console.log(updatedGrado);
                    
                    // Find the index of the updated grado
                    const index = grados.findIndex(item => item.idTramite === id);

                    if (updatedGrado.idEstado_tramite == 20 ) {
                        // Update the grado
                        grados.splice(index, 1);
                    }

                    // Update the grados
                    this._grados.next(grados);

                    // Return the updated grado
                    return updatedGrado;
                }),
                switchMap(updatedGrado => this.grado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedGrado.fut = environment.baseUrl + updatedGrado.fut;
                        if (updatedGrado.voucher) updatedGrado.voucher = environment.baseUrlStorage + updatedGrado.voucher;
                        if (updatedGrado.exonerado_archivo) updatedGrado.exonerado_archivo = environment.baseUrlStorage + updatedGrado.exonerado_archivo;
                        updatedGrado.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the grado if it's selected
                        this._grado.next(updatedGrado);

                        // Return the updated grado
                        return updatedGrado;
                    })
                ))
            ))
        );
    }
    
    sendEscuela(id: number, data: any): Observable<any> {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.put<any>(environment.baseUrl + 'grados/envio/escuela', data).pipe(
                map((updatedGrado) => {
                    console.log(updatedGrado);
                    
                    // Find the index of the updated grado
                    const index = grados.findIndex(item => item.idTramite === id);

                    if (updatedGrado.idEstado_tramite == 36) {
                        // Update the grado
                        grados.splice(index, 1);
                    }

                    // Update the grados
                    this._grados.next(grados);

                    // Return the updated grado
                    return updatedGrado;
                }),
                switchMap(updatedGrado => this.grado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedGrado.fut = environment.baseUrl + updatedGrado.fut;
                        if (updatedGrado.voucher) updatedGrado.voucher = environment.baseUrlStorage + updatedGrado.voucher;
                        if (updatedGrado.exonerado_archivo) updatedGrado.exonerado_archivo = environment.baseUrlStorage + updatedGrado.exonerado_archivo;
                        updatedGrado.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the grado if it's selected
                        this._grado.next(updatedGrado);

                        // Return the updated grado
                        return updatedGrado;
                    })
                ))
            ))
        );
    }
    
    sendDatos(id: number, data: any): Observable<any> {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.put<any>(environment.baseUrl + 'grados/datos', data).pipe(
                map((updatedGrado) => {
                    console.log(updatedGrado);
                    
                    // Find the index of the updated grado
                    const index = grados.findIndex(item => item.idTramite === id);

                    if (updatedGrado.idEstado_tramite == 38 || updatedGrado.idEstado_tramite == 7 || updatedGrado.idEstado_tramite == 15) {
                        // Update the grado
                        grados.splice(index, 1);
                    }

                    // Update the grados
                    this._grados.next(grados);

                    // Return the updated grado
                    return updatedGrado;
                }),
                switchMap(updatedGrado => this.grado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedGrado.fut = environment.baseUrl + updatedGrado.fut;
                        if (updatedGrado.voucher) updatedGrado.voucher = environment.baseUrlStorage + updatedGrado.voucher;
                        if (updatedGrado.exonerado_archivo) updatedGrado.exonerado_archivo = environment.baseUrlStorage + updatedGrado.exonerado_archivo;
                        if (updatedGrado.requisitos) {
                            updatedGrado.requisitos.forEach(element => {
                                if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                            });
                        }

                        // Update the grado if it's selected
                        this._grado.next(updatedGrado);

                        // Return the updated grado
                        return updatedGrado;
                    })
                ))
            ))
        );
    }
    
    sendUraa(id: number, data: any): Observable<any> {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.put<any>(environment.baseUrl + 'grados/envio/ura', data).pipe(
                map((updatedGrado) => {
                    console.log(updatedGrado);
                    
                    // Find the index of the updated grado
                    const index = grados.findIndex(item => item.idTramite === id);

                    if (updatedGrado.idEstado_tramite == 7 ) {
                        // Update the grado
                        grados.splice(index, 1);
                    }

                    // Update the grados
                    this._grados.next(grados);

                    // Return the updated grado
                    return updatedGrado;
                }),
                switchMap(updatedGrado => this.grado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedGrado.fut = environment.baseUrl + updatedGrado.fut;
                        if (updatedGrado.voucher) updatedGrado.voucher = environment.baseUrlStorage + updatedGrado.voucher;
                        if (updatedGrado.exonerado_archivo) updatedGrado.exonerado_archivo = environment.baseUrlStorage + updatedGrado.exonerado_archivo;
                        updatedGrado.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the grado if it's selected
                        this._grado.next(updatedGrado);

                        // Return the updated grado
                        return updatedGrado;
                    })
                ))
            ))
        );
    }
    
    uploadGrado(id: number, tramite: any): Observable<any>
    {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.post<any>(environment.baseUrl + 'grados/upload/'+ id, tramite).pipe(
                map((updatedGrado) => {
                    console.log(updatedGrado);
                    // Find the index of the updated grado
                    const index = grados.findIndex(item => item.idTramite === id);
                    
                    // Update the grado
                    grados.splice(index, 1);

                    // Update the grados
                    this._grados.next(grados);

                    // Return the updated grado
                    return updatedGrado;
                }),
                switchMap(updatedGrado => this.grado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        updatedGrado.fut = environment.baseUrl + updatedGrado.fut;
                        if (updatedGrado.voucher) updatedGrado.voucher = environment.baseUrlStorage + updatedGrado.voucher;
                        if (updatedGrado.exonerado_archivo) updatedGrado.exonerado_archivo = environment.baseUrlStorage + updatedGrado.exonerado_archivo;
                        if (updatedGrado.diploma_final) updatedGrado.diploma_final = environment.baseUrlStorage + updatedGrado.diploma_final;
                        updatedGrado.requisitos.forEach(element => {
                            if (element.archivo) {
                                element.archivo = environment.baseUrlStorage + element.archivo;
                            }
                        });

                        // Update the grado if it's selected
                        this._grado.next(updatedGrado);

                        // Return the updated grado
                        return updatedGrado;
                    })
                ))
            ))
        );
    }

    getModalidadesSustentacion(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'modalidad/carpeta').pipe(
            tap((response: any[]) => {
                this._modalidades_sustentacion.next(response);
            })
        );
    }

    getProgramasEstudios(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'programas_estudios/carpeta').pipe(
            tap((response: any[]) => {
                this._programas_estudios.next(response);
            })
        );
    }

    getDiplomasByTipoTramiteUnidad(unidad: number, tipo_tramite_unidad: number, dependencia_detalle: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'diplomas/carpeta/' + unidad + "/" + tipo_tramite_unidad + "/" + dependencia_detalle).pipe(
            tap((response: any[]) => {
                this._diplomas.next(response);
            })
        );
    }

    sendNotification(id: number, data: any): Observable<any>
    {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.post<any>(environment.baseUrl + 'tramites/notification', data).pipe(
                map((isSent: boolean) => {
                    // Find the index of the updated grados
                    const index = grados.findIndex(item => item.idTramite === id);
                    
                    // Delete the product
                    grados.splice(index, 1);

                    // Update the grados
                    this._grados.next(grados);

                    // Return the updated grados
                    return isSent;
                }),
            ))
        );
    }

    registrarLibro(resolucion: Resolucion): Observable<any>
    {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.put<any[]>(environment.baseUrl + 'grados/registrar/libro', {"idResolucion":resolucion}).pipe(
                map((updatedGrados) => {
                    console.log(updatedGrados);
                    // debugger;
                    // Update the messages with the new message
                    // this._gradosService.getGradosValidados(0, 10, 'fecha', 'desc', query);
                    updatedGrados.forEach(element => {
                        // Find the index of the deleted product
                        const index = grados.findIndex(item => item.idTramite === element.idTramite);
        
                        // Delete the product
                        grados.splice(index, 1);
                    });
        
                    // Update the grados
                    this._grados.next(grados);
        
                    // Return the new message from observable
                    return grados;
                })
            ))
        );
    }

    editCodigoDiploma(grado: GradoInterface, apply: boolean): Observable<any>
    {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.put<any[]>(environment.baseUrl + 'create/codigo', {
                "grado":grado,
                "flag": apply
            }).pipe(
                map((updatedGrados) => {
                    console.log(updatedGrados);
                    
                    // Update the messages with the new message
                    updatedGrados.forEach(element => {
                        // Find the index of the deleted product
                        const index = grados.findIndex(item => item.idTramite === element.idTramite);
        
                        // Delete the product
                        // grados.splice(index, 1);
                        grados[index] = element;
                        
                    });
        
                    // Update the grados
                    this._grados.next(grados);
        
                    // Return the new message from observable
                    return grados;
                })
            ))
        );
    }
}
