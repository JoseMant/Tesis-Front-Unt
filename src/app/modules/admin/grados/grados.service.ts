import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { UserInterface, GradoPagination, GradoInterface } from 'app/modules/admin/grados/grados.types';
import { environment } from 'environments/environment';

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
    
     
    getGradosAsignados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'tramite/grados/asignados', {
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


    getGradosValidados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/titulos/validados/escuela', {
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
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/titulos/aprobados/escuela', {
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
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/titulos/revalidados/escuela', {
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
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/titulos/validados/facultad', {
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
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/titulos/aprobados/facultad', {
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
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'grados/titulos/revalidados/facultad', {
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



    getGradosFirmaURAA(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'tramite/grados/firma_uraa', {
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

    getGradosFirmaDecano(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
      return this._httpClient.get<{ pagination: GradoPagination; data: GradoInterface[] }>(environment.baseUrl + 'tramite/grados/firma_decano', {
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
                    grado.voucher = environment.baseUrlStorage + grado.voucher;
                    if (grado.grado_final) {
                        grado.grado_final = environment.baseUrlStorage + grado.grado_final;
                    }
                    grado.requisitos.forEach(element => {
                        if (element.archivo) {
                            element.archivo = environment.baseUrlStorage + element.archivo;
                        }
                    });
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

                    if (updatedGrado.idEstado_tramite == 30 ) {
                        // Update the grado
                        grados.splice(index, 1);
                    }else if(updatedGrado.idEstado_tramite == 19){
                        grados.splice(index, 1);
                    }
                    else {
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
    asignarUsuarioGrados(data: any): Observable<any[]>
    {
        return this.grados$.pipe(
            take(1),
            switchMap(grados => this._httpClient.post<any[]>(environment.baseUrl + 'tramite/asignar', data).pipe(
                map((updatedGrados) => {

                    // Update the messages with the new message
                    // this._gradosService.getGradosValidados(0, 10, 'fecha', 'desc', query);
                    updatedGrados.forEach(element => {
                        // Find the index of the deleted product
                        const index = grados.findIndex(item => item.idTramite === element);

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

                    if (updatedGrado.idEstado_tramite == 31 ) {
                        // Update the grado
                        grados.splice(index, 1);
                    }
                    else {
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
                        updatedGrado.voucher = environment.baseUrlStorage + updatedGrado.voucher;
                        updatedGrado.grado_final = environment.baseUrlStorage + updatedGrado.grado_final;
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
}
