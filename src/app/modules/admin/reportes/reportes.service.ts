import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { UserInterface, ReportePagination, ReporteInterface, Unidad } from 'app/modules/admin/reportes/reportes.types';
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
    private _unidades: BehaviorSubject<Unidad[] | null> = new BehaviorSubject(null);
    private _tipoTramiteUnidades: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _dependencias: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _dependencias_detalle: BehaviorSubject<any | null> = new BehaviorSubject(null);
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

    /**
     * Getter for unidades
     */
    get unidades$(): Observable<Unidad[]>
    {
        return this._unidades.asObservable();
    }

    /**
     * Getter for dependencias
     */
    get dependencias$(): Observable<Unidad[]>
    {
        return this._dependencias.asObservable();
    }

    /**
     * Getter for dependencias detalle
     */
    get dependencias_detalle$(): Observable<Unidad[]>
    {
        return this._dependencias_detalle.asObservable();
    }

    /**
     * Getter for cronogramas
     */
    get cronogramas$(): Observable<Unidad[]>
    {
        return this._cronogramas.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getReporteStatusTramites(idUnidad: number = 0, idDependencia: number = 0, idDependencia_detalle: number = 0, idTipo_tramite_unidad: number = 0, cronograma: number = 0, 
        page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: ReportePagination; data: ReporteInterface[] }>
    {
      return this._httpClient.get<{ pagination: ReportePagination; data: ReporteInterface[] }>(environment.baseUrl + 'reporte/elaboracion_carpeta/status_tramites', {
        params: {
            idUnidad,
            idDependencia,
            idDependencia_detalle,
            idTipo_tramite_unidad,
            cronograma,
            page: '' + page,
            size: '' + size,
            sort,
            order,
            search
        }
    }).pipe(
        tap((response) => {
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

    getReporteVouchersAprobados(fecha_inicio: string, fecha_fin: string, page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: ReportePagination; data: ReporteInterface[] }>
    {
      return this._httpClient.get<{ pagination: ReportePagination; data: ReporteInterface[] }>(environment.baseUrl + 'reporte/tesoreria/aprobados', {
        params: {
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            page: '' + page,
            size: '' + size,
            sort,
            order,
            search
        }
    }).pipe(
        tap((response) => {
          this._pagination.next(response.pagination);
          this._reportes.next(response.data);
        })
      );
    }

    /**
     * Get unidades
     */
    getUnidades(): Observable<Unidad[]>
    {
        return this._httpClient.get<Unidad[]>(environment.baseUrl + 'unidades').pipe(
            tap((response) => {
                this._unidades.next(response);
            })
        );
    }

    getTipoTramiteUnidades(idUnidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'tipo_tramites_unidades/2/' + idUnidad).pipe(
            tap((response: any) => {
                console.log(response);
                this._tipoTramiteUnidades.next(response.tipo_tramite_unidad);
            })
        );
    }

    getDependenciasByUnidad(unidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dependencias/' + unidad).pipe(
            tap((response: any[]) => {
                this._dependencias.next(response);
            })
        );
    }

    getDependenciaByDependenciaDetalle(dependencia_detalle: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dependencia/' + dependencia_detalle).pipe(
            tap((response: any[]) => {
                this._dependencias.next(response);
            })
        );
    }

    getDependenciaDetalleByDependencia(dependencia: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dependencias_detalle/' + dependencia).pipe(
            tap((response: any[]) => {
                this._dependencias_detalle.next(response);
            })
        );
    }

    getCronogramasByDependencia(dependencia: number, tipo_tramite_unidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'cronogramas/dependencia/' + dependencia + "/" + tipo_tramite_unidad).pipe(
            tap((response: any[]) => {
                this._cronogramas.next(response);
            })
        );
    }
}
