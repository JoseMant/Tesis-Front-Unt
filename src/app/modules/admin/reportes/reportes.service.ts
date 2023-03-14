import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { UserInterface, ReportePagination, ReporteInterface } from 'app/modules/admin/reportes/reportes.types';
import { environment } from 'environments/environment';
import { Resolucion } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.types';

@Injectable({
    providedIn: 'root'
})
export class ReportesService
{
    // Private
    private _users: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<ReportePagination | null> = new BehaviorSubject(null);
    private _reporte: BehaviorSubject<ReporteInterface | null> = new BehaviorSubject(null);
    private _reportes: BehaviorSubject<ReporteInterface[] | null> = new BehaviorSubject(null);
    private _modalidades_sustentacion: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _programas_estudios: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _diplomas: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _resolucion: BehaviorSubject<any | null> = new BehaviorSubject(null);
    // private _facultadesEscuelas: BehaviorSubject<any | null> = new BehaviorSubject(null);

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
    get pagination$(): Observable<ReportePagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for reporte
     */
    get reporte$(): Observable<ReporteInterface>
    {
        return this._reporte.asObservable();
    }

    /**
     * Getter for reportes
     */
    // get facultadesEscuelas$(): Observable<any> {
    //     return this._facultadesEscuelas.asObservable();
    // }
    get reportes$(): Observable<ReporteInterface[]>
    {
        return this._reportes.asObservable();
    }
    get cleanReportes$(): Observable<ReporteInterface[]>
    {
        this._reportes.next([]);
        return this._reportes.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getReportesEscuela(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: ReportePagination; data: ReporteInterface[] }>
    {
      return this._httpClient.get<{ pagination: ReportePagination; data: ReporteInterface[] }>(environment.baseUrl + 'reporte/enviado/facultad', {
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
          this._reportes.next(response.data);
        })
      );
    }

    getReportesFacultad(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: ReportePagination; data: ReporteInterface[] }>
    {
      return this._httpClient.get<{ pagination: ReportePagination; data: ReporteInterface[] }>(environment.baseUrl + 'reporte/enviado/ura', {
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
          this._reportes.next(response.data);
        })
      );
    }

    getReportesUra(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: ReportePagination; data: ReporteInterface[] }>
    {
      return this._httpClient.get<{ pagination: ReportePagination; data: ReporteInterface[] }>(environment.baseUrl + 'reporte/enviado/secretaria', {
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
          this._reportes.next(response.data);
        })
      );
    }

    getReportesTesoreria(page: number = 0, size: number = 100, sort: string = 'apellidos', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: ReportePagination; data: ReporteInterface[] }>
    {
      return this._httpClient.get<{ pagination: ReportePagination; data: ReporteInterface[] }>(environment.baseUrl + 'vouchers/reporte/aprobados', {
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
          this._reportes.next(response.data);
        })
      );
    }
    
    /**
     * Get reporte by id
     */
    getReporteById(id: number): Observable<ReporteInterface>
    {
        console.log(this._reportes.value);
        return this._reportes.pipe(
            take(1),
            map((reportes) => {
                // Find the reporte
                // const reporte = reportes.find(item => item.idTramite === id) || null;
                const reporte = JSON.parse( JSON.stringify(reportes.find(item => item.idTramite === id) || null) )
                if (reporte) {
                    reporte.fut = environment.baseUrl + reporte.fut;
                    if (reporte.certificado_final) reporte.certificado_final = environment.baseUrlStorage +  reporte.certificado_final
                    if (reporte.diploma_final && reporte.idEstado_tramite==13) reporte.diploma_final = environment.baseUrl +  reporte.diploma_final
                    else if (reporte.diploma_final) reporte.diploma_final = environment.baseUrlStorage +  reporte.diploma_final
                    if (reporte.voucher) reporte.voucher = environment.baseUrlStorage + reporte.voucher;
                    if (reporte.exonerado_archivo) reporte.exonerado_archivo = environment.baseUrlStorage + reporte.exonerado_archivo;
                    if (reporte.requisitos) {
                        reporte.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });
                    }
                }
                
                // Update the reporte
                this._reporte.next(reporte);
                
                // Return the reporte
                return reporte;
            }),
            switchMap((reporte) => {

                if ( !reporte )
                {
                    return throwError('Could not found reporte with id of ' + id + '!');
                }

                return of(reporte);
            })
        );
    }
}
