import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { DuplicadosDiplomasInterface, DuplicadosDiplomasPagination } from './duplicados.types';
import { Resolucion } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.types';

@Injectable({
    providedIn: 'root'
})
export class DuplicadosDiplomaService
{

    private _pagination: BehaviorSubject<DuplicadosDiplomasPagination | null> = new BehaviorSubject(null);
    private _tramitesDuplicados: BehaviorSubject<DuplicadosDiplomasInterface[] | null> = new BehaviorSubject(null);
    private _duplicado: BehaviorSubject<DuplicadosDiplomasInterface | null> = new BehaviorSubject(null);
    private _tiposTramites: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _diplomas: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _programas_estudios: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _modalidades_sustentacion: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _resolucion: BehaviorSubject<any | null> = new BehaviorSubject(null);


    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {

    }

    get tramitesDuplicados$(): Observable<DuplicadosDiplomasInterface[]>
    {
        return this._tramitesDuplicados.asObservable();
    }
    get duplicado$(): Observable<DuplicadosDiplomasInterface>
    {
        return this._duplicado.asObservable();
    }
    get pagination$(): Observable<DuplicadosDiplomasPagination>
    {
        return this._pagination.asObservable();
    }

    get tiposTramites$(): Observable<any[]>
    {
        return this._tiposTramites.asObservable();
    }

    get modalidades_sustentacion$(): Observable<any> {
        return this._modalidades_sustentacion.asObservable();
    }

    get programas_estudios$(): Observable<any> {
        return this._programas_estudios.asObservable();
    }

    get resolucion$(): Observable<any> {
        return this._resolucion.asObservable();
    }

    get cleanCarpetas$(): Observable<DuplicadosDiplomasInterface[]>
    {
        this._tramitesDuplicados.next([]);
        return this._tramitesDuplicados.asObservable();
    }

    getDuplicadosValidados(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>
    {
        return this._httpClient.get<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>(environment.baseUrl + 'diplomas/duplicados/validar/', {
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
            this._tramitesDuplicados.next(response.data);
            })
        );
    }

    getDuplicadoByid(id: number): Observable<DuplicadosDiplomasInterface>
    {
        return this._tramitesDuplicados.pipe(
            take(1),
            map((tramitesDuplicados) => {
                const duplicado = JSON.parse( JSON.stringify(tramitesDuplicados.find(item => item.idTramite === id) || null) )
                if (duplicado) {
                    duplicado.fut = environment.baseUrl + duplicado.fut;
                    if (duplicado.voucher) duplicado.voucher = environment.baseUrlStorage + duplicado.voucher;
                    if (duplicado.exonerado_archivo) duplicado.exonerado_archivo = environment.baseUrlStorage + duplicado.exonerado_archivo;
                    if (duplicado.requisitos) {
                        duplicado.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });
                    }
                    
                }
                
                this._duplicado.next(duplicado);
                return duplicado;
            }),
            switchMap((duplicado) => {

                if ( !duplicado )
                {
                    return throwError('Could not found docente with id of ' + id + '!');
                }
                return of(duplicado);
            })
        );
    }

    updateDuplicado(id: number, duplicado: DuplicadosDiplomasInterface): Observable<DuplicadosDiplomasInterface>
    {
        return this.tramitesDuplicados$.pipe(
            take(1),
            switchMap(tramitesDuplicados => this._httpClient.put<DuplicadosDiplomasInterface>(environment.baseUrl + 'tramite/update', duplicado).pipe(
                map((updatedDuplicado) => {
                    console.log(updatedDuplicado);
                    const index = tramitesDuplicados.findIndex(item => item.idTramite === id);

                    if (updatedDuplicado.idEstado_tramite != 17 && updatedDuplicado.idEstado_tramite != 20 && updatedDuplicado.idEstado_tramite != 7 ) {
                        
                        tramitesDuplicados.splice(index, 1);
                    } else {
                       
                        tramitesDuplicados[index] = updatedDuplicado;
                    }
                    this._tramitesDuplicados.next(tramitesDuplicados);
                    return updatedDuplicado;
                }),
                switchMap(updatedDuplicado => this.duplicado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        this._duplicado.next(updatedDuplicado);
                        return updatedDuplicado;
                    })
                ))
            ))
        );
    }

    
    getDuplicadosAprobados(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>
    {
        return this._httpClient.get<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>(environment.baseUrl + 'diplomas/duplicados/aprobar/', {
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
            this._tramitesDuplicados.next(response.data);
            })
        );
    }

    getDuplicadosRevalidados(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>
    {
        return this._httpClient.get<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>(environment.baseUrl + 'diplomas/duplicados/revalidar/', {
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
            this._tramitesDuplicados.next(response.data);
            })
        );
    }

    getDuplicadosValidadosUra(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', idTipo_tramite_unidad: number = 0, search: string = ''):
    Observable<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>
    {
        return this._httpClient.get<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>(environment.baseUrl + 'diplomas/duplicados/validar/ura', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search,
                idTipo_tramite_unidad

            }
        }).pipe(
            tap((response) => {
            this._pagination.next(response.pagination);
            this._tramitesDuplicados.next(response.data);
            })
        );
    }

    // URA
    getDuplicadosDatosDiploma(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', idTipo_tramite_unidad: number = 0, search: string = ''):
    Observable<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>
    {
        return this._httpClient.get<{ pagination: DuplicadosDiplomasPagination; data: DuplicadosDiplomasInterface[] }>(environment.baseUrl + 'diplomas/duplicados/datos/diplomas/ura', {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search,
                idTipo_tramite_unidad

            }
        }).pipe(
            tap((response) => {
            this._pagination.next(response.pagination);
            this._tramitesDuplicados.next(response.data);
            })
        );
    }

    updateRequisitos(id: number, requisitos: any): Observable<any> {
        return this.tramitesDuplicados$.pipe(
            take(1),
            switchMap(tramitesDuplicados => this._httpClient.post<any>(environment.baseUrl + 'requisitos/update/'+ id, requisitos).pipe(
                map((updatedDuplicado) => {
                    const index = tramitesDuplicados.findIndex(item => item.idTramite === id);
                    if (updatedDuplicado.idEstado_tramite == 57 || updatedDuplicado.idEstado_tramite == 7) {
                        tramitesDuplicados.splice(index, 1);
                    } else {
                        tramitesDuplicados[index] = updatedDuplicado;
                    }
                    this._tramitesDuplicados.next(tramitesDuplicados);
                    return updatedDuplicado;
                }),
                switchMap(updatedDuplicado => this.duplicado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedDuplicado.fut = environment.baseUrl + updatedDuplicado.fut;
                        if (updatedDuplicado.voucher) updatedDuplicado.voucher = environment.baseUrlStorage + updatedDuplicado.voucher;
                        if (updatedDuplicado.exonerado_archivo) updatedDuplicado.exonerado_archivo = environment.baseUrlStorage + updatedDuplicado.exonerado_archivo;
                        updatedDuplicado.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });

                        // Update the grado if it's selected
                        this._duplicado.next(updatedDuplicado);

                        // Return the updated grado
                        return updatedDuplicado;
                    })
                ))
            ))
        );
    }

    sendDatos(id: number, data: any): Observable<any> {
        return this.tramitesDuplicados$.pipe(
            take(1),
            switchMap(tramitesDuplicados => this._httpClient.put<any>(environment.baseUrl + 'diplomas/duplicados/datos', data).pipe(
                map((updatedDuplicado) => {
                    console.log(updatedDuplicado);

                    // Find the index of the updated grado
                    const index = tramitesDuplicados.findIndex(item => item.idTramite === id);

                    if (updatedDuplicado.idEstado_tramite == 42) {
                        // Update the grado
                        tramitesDuplicados.splice(index, 1);
                    }

                    // Update the grados
                    this._tramitesDuplicados.next(tramitesDuplicados);

                    // Return the updated grado
                    return updatedDuplicado;
                }),
                switchMap(updatedDuplicado => this.duplicado$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {
                        updatedDuplicado.fut = environment.baseUrl + updatedDuplicado.fut;
                        if (updatedDuplicado.voucher) updatedDuplicado.voucher = environment.baseUrlStorage + updatedDuplicado.voucher;
                        if (updatedDuplicado.exonerado_archivo) updatedDuplicado.exonerado_archivo = environment.baseUrlStorage + updatedDuplicado.exonerado_archivo;
                        if (updatedDuplicado.requisitos) {
                            updatedDuplicado.requisitos.forEach(element => {
                                if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                            });
                        }

                        // Update the grado if it's selected
                        this._duplicado.next(updatedDuplicado);

                        // Return the updated grado
                        return updatedDuplicado;
                    })
                ))
            ))
        );
    }

    // SECRETARÍA GENERAL

    getResolucionRectoral(resolucion: string): Observable<{ resolucion: Resolucion }>
    {
        return this._httpClient.get<{ resolucion: Resolucion }>(environment.baseUrl + 'resolucion/secretaria/' + resolucion).pipe(
            tap((response) => {
                console.log(response);
            })
        );
    }

    getTipoTramitesDuplicados(): Observable<any>
    {
        return this._httpClient.get<any[]>(environment.baseUrl + 'tipos_unidad_tramite/validacion_ura').pipe(
            tap((response) => {
                this._tiposTramites.next(response);
            })
        );
    }

    getDiplomasByTipoTramiteUnidad(unidad: number, tipo_tramite_unidad: number, programa: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'diplomas/carpeta/' + unidad + "/" + tipo_tramite_unidad + "/" + programa).pipe(
            tap((response: any[]) => {
                this._diplomas.next(response);
            })
        );
    }

    getModalidadesSustentacion(tipo_tramite_unidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'modalidad/carpeta/' + tipo_tramite_unidad).pipe(
            tap((response: any) => {
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

    
}