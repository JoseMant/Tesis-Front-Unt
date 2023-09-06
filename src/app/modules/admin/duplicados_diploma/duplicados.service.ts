import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { DuplicadosDiplomasInterface, DuplicadosDiplomasPagination } from './duplicados.types';

@Injectable({
    providedIn: 'root'
})
export class DuplicadosDiplomaService
{

    private _pagination: BehaviorSubject<DuplicadosDiplomasPagination | null> = new BehaviorSubject(null);
    private _tramitesDuplicados: BehaviorSubject<DuplicadosDiplomasInterface[] | null> = new BehaviorSubject(null);
    private _duplicado: BehaviorSubject<DuplicadosDiplomasInterface | null> = new BehaviorSubject(null);


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

    getSolicitudesDuplicados(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
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
                    if (duplicado.idTramite) duplicado.idTramite = environment.baseUrlStorage + duplicado.idTramite;
                    
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

    updateRequisitos(id: number, requisitos: any): Observable<any> {
        return this.tramitesDuplicados$.pipe(
            take(1),
            switchMap(tramitesDuplicados => this._httpClient.post<any>(environment.baseUrl + 'requisitos/update/'+ id, requisitos).pipe(
                map((updatedDuplicado) => {
                    console.log(updatedDuplicado);
                    const index = tramitesDuplicados.findIndex(item => item.idTramite === id);

                    if (updatedDuplicado.idEstado_tramite != 30 && updatedDuplicado.idEstado_tramite != 32 && updatedDuplicado.idEstado_tramite != 7 ) {
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

    

}