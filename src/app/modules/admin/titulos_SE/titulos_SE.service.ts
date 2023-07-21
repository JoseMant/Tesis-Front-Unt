import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { UserInterface, TituloPagination, TituloInterface } from 'app/modules/admin/titulos_SE/titulos_SE.types';
import { environment } from 'environments/environment';
import { Resolucion } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.types';

@Injectable({
    providedIn: 'root'
})
export class TitulosService
{
    // Private
    private _users: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<TituloPagination | null> = new BehaviorSubject(null);
    private _titulo: BehaviorSubject<TituloInterface | null> = new BehaviorSubject(null);
    private _titulos: BehaviorSubject<TituloInterface[] | null> = new BehaviorSubject(null);
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
    get pagination$(): Observable<TituloPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for titulo
     */
    get titulo$(): Observable<TituloInterface>
    {
        return this._titulo.asObservable();
    }

    /**
     * Getter for titulos
     */
    get titulos$(): Observable<TituloInterface[]>
    {
        return this._titulos.asObservable();
    }
    get cleanTitulos$(): Observable<TituloInterface[]>
    {
        this._titulos.next([]);
        return this._titulos.asObservable();
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

    getTitulosValidados(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/validados/especialidad', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosAprobados(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/aprobados/especialidad', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosRevalidados(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/revalidados/especialidad', {
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
          this._titulos.next(response.data);
        })
      );
    }


    getTitulosValidadosFacultad(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/validados/facultadSE', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosAprobadosFacultad(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/aprobados/facultadSE', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosRevalidadosFacultad(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/revalidados/facultadSE', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosDiplomasEspecialidad(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/diplomas/especialidad', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosDiplomasFacultad(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/diplomas/facultadSE', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosValidacionURA(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/validacion/uraSE', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosDiplomasURA(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/diplomas/uraSE', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosValidadosSecretaria(resolucion: string, page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[]; resolucion: Resolucion }>
    {
        console.log(resolucion);
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'titulos/validados/secretaria/' + resolucion, {
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
          this._titulos.next(response.data);
        })
      );
    }


    getTitulosFirmaDecano(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/firma/decano', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosFirmaSecretaria(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/firma/secretaria', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosFirmaRector(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/firma/rector', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosPendientesImpresion(resolucion: string, page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[]; resolucion: Resolucion }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'titulos/pendientes/impresion/' + resolucion, {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosFinalizados(page: number = 0, size: number = 100, sort: string = 'fecha_colacion', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/finalizados', {
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
          this._titulos.next(response.data);
        })
      );
    }

    getTitulosSecretariaObservados(page: number = 0, size: number = 100, sort: string = 'fecha_colacion', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
    Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
      return this._httpClient.get<{ pagination: TituloPagination; data: TituloInterface[] }>(environment.baseUrl + 'titulos/secretaria/observados', {
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
            this._titulos.next(response.data);
        })
      );
    }
    
    /**
     * Get titulo by id
     */
    getTituloById(id: number): Observable<TituloInterface>
    {
        // console.log(this._titulos);
        return this._titulos.pipe(
            take(1),
            map((titulos) => {
                // Find the titulo
                // const titulo = titulos.find(item => item.idTramite === id) || null;
                const titulo = JSON.parse( JSON.stringify(titulos.find(item => item.idTramite === id) || null) )
                if (titulo) {
                    titulo.fut = environment.baseUrl + titulo.fut;
                    if (titulo.certificado_final) titulo.certificado_final = environment.baseUrlStorage +  titulo.certificado_final
                    // if (titulo.diploma_final && titulo.idEstado_tramite==13) titulo.diploma_final = environment.baseUrl +  titulo.diploma_final
                    // else titulo.diploma_final = environment.baseUrlStorage +  titulo.diploma_final
                    if (titulo.voucher) titulo.voucher = environment.baseUrlStorage + titulo.voucher;
                    if (titulo.exonerado_archivo) titulo.exonerado_archivo = environment.baseUrlStorage + titulo.exonerado_archivo;
                    if (titulo.requisitos) {
                        titulo.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });
                    }
                }
                
                // Update the titulo
                this._titulo.next(titulo);
                
                // Return the titulo
                return titulo;
            }),
            switchMap((titulo) => {

                if ( !titulo )
                {
                    return throwError('Could not found titulo with id of ' + id + '!');
                }

                return of(titulo);
            })
        );
    }

    /**
     * Update titulo
     *
     * @param id
     * @param titulo
     */
    updateTitulo(id: number, titulo: TituloInterface): Observable<TituloInterface>
    {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.put<TituloInterface>(environment.baseUrl + 'tramite/update', titulo).pipe(
                map((updatedTitulo) => {
                    console.log(updatedTitulo);
                    // debugger;
                    // Find the index of the updated titulo
                    const index = titulos.findIndex(item => item.idTramite === id);

                    if (updatedTitulo.idEstado_tramite != 17 && updatedTitulo.idEstado_tramite != 20 && updatedTitulo.idEstado_tramite != 7 ) {
                        // Update the titulo
                        titulos.splice(index, 1);
                    } else {
                        // Update the titulo
                        titulos[index] = updatedTitulo;
                    }

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulo
                    return updatedTitulo;
                }),
                switchMap(updatedTitulo => this.titulo$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Update the titulo if it's selected
                        this._titulo.next(updatedTitulo);

                        // Return the updated titulo
                        return updatedTitulo;
                    })
                ))
            ))
        );
    }
    
    updateTituloRequisito(id: number, titulo: TituloInterface): Observable<TituloInterface>
    {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.put<TituloInterface>(environment.baseUrl + 'tramite/update/requisito', titulo).pipe(
                map((updatedTitulo) => {
                    
                    // Find the index of the updated titulo
                    const index = titulos.findIndex(item => item.idTramite === id);

                    if (updatedTitulo.idEstado_tramite != 17 && updatedTitulo.idEstado_tramite != 20 && updatedTitulo.idEstado_tramite != 7 ) {
                        // Update the titulo
                        titulos.splice(index, 1);
                    } else {
                        // Update the titulo
                        if (updatedTitulo.certificado_final) updatedTitulo.certificado_final = environment.baseUrlStorage +  updatedTitulo.certificado_final
                        titulos[index] = updatedTitulo;
                    }

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulo
                    return updatedTitulo;
                }),
                switchMap(updatedTitulo => this.titulo$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Update the titulo if it's selected
                        this._titulo.next(updatedTitulo);

                        // Return the updated titulo
                        return updatedTitulo;
                    })
                ))
            ))
        );
    }

    /**
     * Update titulo
     *
     * @param id
     * @param titulo
     */
    updateRequisitos(id: number, requisitos: any): Observable<any> {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.post<any>(environment.baseUrl + 'requisitos/update/'+ id, requisitos).pipe(
                map((updatedTitulo) => {
                    console.log(updatedTitulo);
                    // debugger;
                    // Find the index of the updated titulo
                    const index = titulos.findIndex(item => item.idTramite === id);

                    if (updatedTitulo.idEstado_tramite != 30 && updatedTitulo.idEstado_tramite != 32 && updatedTitulo.idEstado_tramite != 7 ) {
                        // Update the titulo
                        titulos.splice(index, 1);
                    } else {
                        // Update the titulo
                        titulos[index] = updatedTitulo;
                    }

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulo
                    return updatedTitulo;
                }),
                switchMap(updatedTitulo => this.titulo$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedTitulo.fut = environment.baseUrl + updatedTitulo.fut;
                        if (updatedTitulo.voucher) updatedTitulo.voucher = environment.baseUrlStorage + updatedTitulo.voucher;
                        if (updatedTitulo.exonerado_archivo) updatedTitulo.exonerado_archivo = environment.baseUrlStorage + updatedTitulo.exonerado_archivo;
                        updatedTitulo.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the titulo if it's selected
                        this._titulo.next(updatedTitulo);

                        // Return the updated titulo
                        return updatedTitulo;
                    })
                ))
            ))
        );
    }
    
    updateEstado(id: number, data: any): Observable<any> {
        console.log(data);
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.put<any>(environment.baseUrl + 'titulos/correccionSE', data).pipe(
                map((updatedTitulo) => {
                    
                    // Find the index of the updated titulo
                    const index = titulos.findIndex(item => item.idTramite === id);

                    if (updatedTitulo.idEstado_tramite != 31 && updatedTitulo.idEstado_tramite != 33 ) {
                        // Update the titulo
                        titulos.splice(index, 1);
                    }

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulo
                    return updatedTitulo;
                }),
                switchMap(updatedTitulo => this.titulo$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedTitulo.fut = environment.baseUrl + updatedTitulo.fut;
                        if (updatedTitulo.voucher) updatedTitulo.voucher = environment.baseUrlStorage + updatedTitulo.voucher;
                        if (updatedTitulo.exonerado_archivo) updatedTitulo.exonerado_archivo = environment.baseUrlStorage + updatedTitulo.exonerado_archivo;
                        updatedTitulo.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the titulo if it's selected
                        this._titulo.next(updatedTitulo);

                        // Return the updated titulo
                        return updatedTitulo;
                    })
                ))
            ))
        );
    }
    
    sendFacultad(id: number, data: any): Observable<any> {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.put<any>(environment.baseUrl + 'titulos/envio/facultadSE', data).pipe(
                map((updatedTitulo) => {
                    console.log(updatedTitulo);
                    
                    // Find the index of the updated titulo
                    const index = titulos.findIndex(item => item.idTramite === id);

                    if (updatedTitulo.idEstado_tramite == 20 ) {
                        // Update the titulo
                        titulos.splice(index, 1);
                    }

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulo
                    return updatedTitulo;
                }),
                switchMap(updatedTitulo => this.titulo$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedTitulo.fut = environment.baseUrl + updatedTitulo.fut;
                        if (updatedTitulo.voucher) updatedTitulo.voucher = environment.baseUrlStorage + updatedTitulo.voucher;
                        if (updatedTitulo.exonerado_archivo) updatedTitulo.exonerado_archivo = environment.baseUrlStorage + updatedTitulo.exonerado_archivo;
                        updatedTitulo.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the titulo if it's selected
                        this._titulo.next(updatedTitulo);

                        // Return the updated titulo
                        return updatedTitulo;
                    })
                ))
            ))
        );
    }
    
    sendEspecialidad(id: number, data: any): Observable<any> {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.put<any>(environment.baseUrl + 'titulos/envio/especialidad', data).pipe(
                map((updatedTitulo) => {
                    console.log(updatedTitulo);
                    
                    // Find the index of the updated titulo
                    const index = titulos.findIndex(item => item.idTramite === id);

                    if (updatedTitulo.idEstado_tramite == 36) {
                        // Update the titulo
                        titulos.splice(index, 1);
                    }

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulo
                    return updatedTitulo;
                }),
                switchMap(updatedTitulo => this.titulo$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedTitulo.fut = environment.baseUrl + updatedTitulo.fut;
                        if (updatedTitulo.voucher) updatedTitulo.voucher = environment.baseUrlStorage + updatedTitulo.voucher;
                        if (updatedTitulo.exonerado_archivo) updatedTitulo.exonerado_archivo = environment.baseUrlStorage + updatedTitulo.exonerado_archivo;
                        updatedTitulo.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the titulo if it's selected
                        this._titulo.next(updatedTitulo);

                        // Return the updated titulo
                        return updatedTitulo;
                    })
                ))
            ))
        );
    }
    
    sendDatos(id: number, data: any): Observable<any> {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.put<any>(environment.baseUrl + 'titulos/datosSE', data).pipe(
                map((updatedTitulo) => {
                    console.log(updatedTitulo);
                    
                    // Find the index of the updated titulo
                    const index = titulos.findIndex(item => item.idTramite === id);

                    if (updatedTitulo.idEstado_tramite == 38 || updatedTitulo.idEstado_tramite == 7 || updatedTitulo.idEstado_tramite == 42) {
                        // Update the titulo
                        titulos.splice(index, 1);
                    }

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulo
                    return updatedTitulo;
                }),
                switchMap(updatedTitulo => this.titulo$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedTitulo.fut = environment.baseUrl + updatedTitulo.fut;
                        if (updatedTitulo.voucher) updatedTitulo.voucher = environment.baseUrlStorage + updatedTitulo.voucher;
                        if (updatedTitulo.exonerado_archivo) updatedTitulo.exonerado_archivo = environment.baseUrlStorage + updatedTitulo.exonerado_archivo;
                        if (updatedTitulo.requisitos) {
                            updatedTitulo.requisitos.forEach(element => {
                                if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                            });
                        }

                        // Update the titulo if it's selected
                        this._titulo.next(updatedTitulo);

                        // Return the updated titulo
                        return updatedTitulo;
                    })
                ))
            ))
        );
    }
    
    sendUraa(id: number, data: any): Observable<any> {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.put<any>(environment.baseUrl + 'titulos/envio/ura', data).pipe(
                map((updatedTitulo) => {
                    console.log(updatedTitulo);
                    
                    // Find the index of the updated titulo
                    const index = titulos.findIndex(item => item.idTramite === id);

                    if (updatedTitulo.idEstado_tramite == 7 ) {
                        // Update the titulo
                        titulos.splice(index, 1);
                    }

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulo
                    return updatedTitulo;
                }),
                switchMap(updatedTitulo => this.titulo$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedTitulo.fut = environment.baseUrl + updatedTitulo.fut;
                        if (updatedTitulo.voucher) updatedTitulo.voucher = environment.baseUrlStorage + updatedTitulo.voucher;
                        if (updatedTitulo.exonerado_archivo) updatedTitulo.exonerado_archivo = environment.baseUrlStorage + updatedTitulo.exonerado_archivo;
                        updatedTitulo.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the titulo if it's selected
                        this._titulo.next(updatedTitulo);

                        // Return the updated titulo
                        return updatedTitulo;
                    })
                ))
            ))
        );
    }
    
    uploadTitulo(id: number, tramite: any): Observable<any>
    {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.post<any>(environment.baseUrl + 'titulos/upload/'+ id, tramite).pipe(
                map((updatedTitulo) => {
                    console.log(updatedTitulo);
                    // Find the index of the updated titulo
                    const index = titulos.findIndex(item => item.idTramite === id);
                    
                    // Update the titulo
                    titulos.splice(index, 1);

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulo
                    return updatedTitulo;
                }),
                switchMap(updatedTitulo => this.titulo$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        updatedTitulo.fut = environment.baseUrl + updatedTitulo.fut;
                        if (updatedTitulo.voucher) updatedTitulo.voucher = environment.baseUrlStorage + updatedTitulo.voucher;
                        if (updatedTitulo.exonerado_archivo) updatedTitulo.exonerado_archivo = environment.baseUrlStorage + updatedTitulo.exonerado_archivo;
                        if (updatedTitulo.diploma_final) updatedTitulo.diploma_final = environment.baseUrlStorage + updatedTitulo.diploma_final;
                        updatedTitulo.requisitos.forEach(element => {
                            if (element.archivo) {
                                element.archivo = environment.baseUrlStorage + element.archivo;
                            }
                        });

                        // Update the titulo if it's selected
                        this._titulo.next(updatedTitulo);

                        // Return the updated titulo
                        return updatedTitulo;
                    })
                ))
            ))
        );
    }

    getModalidadesSustentacion(tipo_tramite_unidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'modalidad/carpeta/' + tipo_tramite_unidad).pipe(
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
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.post<any>(environment.baseUrl + 'tramites/notification', data).pipe(
                map((isSent: boolean) => {
                    // Find the index of the updated titulos
                    const index = titulos.findIndex(item => item.idTramite === id);
                    
                    // Delete the product
                    titulos.splice(index, 1);

                    // Update the titulos
                    this._titulos.next(titulos);

                    // Return the updated titulos
                    return isSent;
                }),
            ))
        );
    }

    registrarLibro(resolucion: Resolucion): Observable<any>
    {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.put<any[]>(environment.baseUrl + 'titulos/registrar/libro', {"idResolucion":resolucion}).pipe(
                map((updatedTitulos) => {
                    console.log(updatedTitulos);
                    // debugger;
                    // Update the messages with the new message
                    // this._titulosService.getTitulosValidados(0, 10, 'fecha', 'desc', query);
                    updatedTitulos.forEach(element => {
                        // Find the index of the deleted product
                        const index = titulos.findIndex(item => item.idTramite === element.idTramite);
        
                        // Delete the product
                        titulos.splice(index, 1);
                    });
        
                    // Update the titulos
                    this._titulos.next(titulos);
        
                    // Return the new message from observable
                    return titulos;
                })
            ))
        );
    }

    editCodigoDiploma(titulo: TituloInterface, apply: boolean): Observable<any>
    {
        return this.titulos$.pipe(
            take(1),
            switchMap(titulos => this._httpClient.put<any[]>(environment.baseUrl + 'create/codigo', {
                "titulo":titulo,
                "flag": apply
            }).pipe(
                map((updatedTitulos) => {
                    console.log(updatedTitulos);
                    
                    // Update the messages with the new message
                    updatedTitulos.forEach(element => {
                        // Find the index of the deleted product
                        const index = titulos.findIndex(item => item.idTramite === element.idTramite);
        
                        // Delete the product
                        // titulos.splice(index, 1);
                        titulos[index] = element;
                        
                    });
        
                    // Update the titulos
                    this._titulos.next(titulos);
        
                    // Return the new message from observable
                    return titulos;
                })
            ))
        );
    }
}
