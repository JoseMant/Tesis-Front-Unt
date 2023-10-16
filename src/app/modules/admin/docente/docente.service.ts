import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { TramiteInterface } from 'app/modules/admin/tramites/tramites.types';
import { TramitesDocentePagination,TramitesDocenteInterface } from 'app/modules/admin/docente/docente.types';
import { environment } from 'environments/environment';



@Injectable({
    providedIn: 'root'
})
export class DocenteService
{
    // Private
    private _tramite: BehaviorSubject<TramiteInterface | null> = new BehaviorSubject(null);
    private _tramites: BehaviorSubject<TramiteInterface[] | null> = new BehaviorSubject(null);
    
    private _pagination: BehaviorSubject<TramitesDocentePagination | null> = new BehaviorSubject(null);
    private _tramitesDocente: BehaviorSubject<TramitesDocenteInterface[] | null> = new BehaviorSubject(null);
    private _docente: BehaviorSubject<TramitesDocenteInterface | null> = new BehaviorSubject(null);
    private _profesiones: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _paises: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _sedes: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _condiciones: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _dependenciasSGA: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _departamentos: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _categorias: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _dedicacionesDocente: BehaviorSubject<any | null> = new BehaviorSubject(null);

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
    get tramite$(): Observable<TramiteInterface>
    {
        return this._tramite.asObservable();
    }

    /**
     * Getter for tramites
     */
    get tramites$(): Observable<TramiteInterface[]>
    {
        return this._tramites.asObservable();
    }

    
    
    get pagination$(): Observable<TramitesDocentePagination>
    {
        return this._pagination.asObservable();
    }
    get tramitesDocente$(): Observable<TramitesDocenteInterface[]>
    {
        return this._tramitesDocente.asObservable();
    }
    get docente$(): Observable<TramitesDocenteInterface>
    {
        return this._docente.asObservable();
    }
    get profesiones$(): Observable<any> {
        return this._profesiones.asObservable();
    }
    get paises$(): Observable<any> {
        return this._paises.asObservable();
    }
    get sedes$(): Observable<any> {
        return this._sedes.asObservable();
    }
    get condiciones$(): Observable<any> {
        return this._condiciones.asObservable();
    }
    get dependenciasSGA$(): Observable<any> {
        return this._dependenciasSGA.asObservable();
    }
    get departamentos$(): Observable<any> {
        return this._departamentos.asObservable();
    }
    get categorias$(): Observable<any> {
        return this._categorias.asObservable();
    }
    get dedicacionesDocente$(): Observable<any> {
        return this._dedicacionesDocente.asObservable();
    }


  


    getDocentesByid(id: number): Observable<TramitesDocenteInterface>
    {
        return this._tramitesDocente.pipe(
            take(1),
            map((tramitesDocente) => {
                // Find the grado
                // const grado = grados.find(item => item.idTramite === id) || null;
                const docente = JSON.parse( JSON.stringify(tramitesDocente.find(item => item.idTramite === id) || null) )
                if (docente) {
                    if (docente.requisitos) {
                        docente.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });
                    }
                    if (docente.idDocente) docente.idDocente = environment.baseUrlStorage + docente.idDocente;
                    
                }
                // Update the grado
                this._docente.next(docente);

                // Return the grado
                return docente;
            }),
            switchMap((docente) => {

                if ( !docente )
                {
                    return throwError('Could not found grado with id of ' + id + '!');
                }

                return of(docente);
            })
        );
    }
    
    getSolicitudesDocentes(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TramitesDocentePagination; data: TramitesDocenteInterface[] }>
    {
      return this._httpClient.get<{ pagination: TramitesDocentePagination; data: TramitesDocenteInterface[] }>(environment.baseUrl + 'tramites/docentes/registrar', {
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
          this._tramitesDocente.next(response.data);
        })
      );
    }

    getDocentesValidados(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TramitesDocentePagination; data: TramitesDocenteInterface[] }>
    {
      return this._httpClient.get<{ pagination: TramitesDocentePagination; data: TramitesDocenteInterface[] }>(environment.baseUrl + 'tramites/docentes/validar', {
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
          this._tramitesDocente.next(response.data);
        })
      );
    }
    
    getDocentesFinalizados(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TramitesDocentePagination; data: TramitesDocenteInterface[] }>
    {
      return this._httpClient.get<{ pagination: TramitesDocentePagination; data: TramitesDocenteInterface[] }>(environment.baseUrl + 'tramites/docentes/finalizados', {
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
          this._tramitesDocente.next(response.data);
        })
      );
    }


    
    getProfesiones(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'profesiones').pipe(
            tap((response: any) => {
                
                this._profesiones.next(response);
            })
        );
    }
    getPaises(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'paises').pipe(
            tap((response: any) => {
                
                this._paises.next(response);
            })
        );
    }
    getSedes(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'sedes').pipe(
            tap((response: any) => {
                
                this._sedes.next(response);
            })
        );
    }
    getCondicionesDocente(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'condiciones').pipe(
            tap((response: any) => {
                
                this._condiciones.next(response);
            })
        );
    }
    getDependenciasSGA(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dependenciasSGA').pipe(
            tap((response: any) => {
                
                this._dependenciasSGA.next(response);
            })
        );
    }
    DepartamentosByDependencia(dependencia: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'departamentos/' + dependencia).pipe(
            tap((response: any) => {
                this._departamentos.next(response);
            })
        );
    }

   
    getCategorias(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'categorias').pipe(
            tap((response: any) => {
               
                this._categorias.next(response);
            })
        );
    }

    getDedicacionesDocente(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dedicaciones/docente').pipe(
            tap((response: any) => {
            
                this._dedicacionesDocente.next(response);
            })
        );
    }

    createDocente(tramite: any): Observable<TramitesDocenteInterface>
    {
        return this.tramitesDocente$.pipe(
            take(1),
            switchMap(tramitesDocente => this._httpClient.post<TramitesDocenteInterface>(environment.baseUrl + 'docente/registrar', tramite).pipe(
                map((newTramite) => {
                   

                    const index = tramitesDocente.findIndex(item => item.idTramite === newTramite.idTramite);

                    if (newTramite.idEstado_tramite == 7 ) {
                        // Update the carnet
                        tramitesDocente.splice(index, 1);
                    } else {
                        // Update the carnet
                        tramitesDocente[index] = newTramite;
                    }
                    // Return the new tramite
                    return newTramite;
                })
            )),
            catchError((error) => {
                console.error(error);
                return throwError(error);
            })
        );
    }
    rechazarDocente(idTramite: number): Observable<any>
    {
        return this.tramitesDocente$.pipe(
            take(1),
            switchMap(tramitesDocente => this._httpClient.post<any>(environment.baseUrl + 'docente/rechazar/'+ idTramite,null).pipe(
                map((updateTramite) => {
                  

                    const index = tramitesDocente.findIndex(item => item.idTramite === updateTramite.idTramite);

                    if (updateTramite.idEstado_tramite == 51 ) {
                        // Update the carnet
                        tramitesDocente.splice(index, 1);
                    } else {
                        // Update the carnet
                        tramitesDocente[index] = updateTramite;
                    }
                    // Return the new tramite
                    return updateTramite;
                })
            )),
            catchError((error) => {
                console.error(error);
                return throwError(error);
            })
        );
    }
    validarDocente(tramite: any): Observable<TramitesDocenteInterface>
    {
        return this.tramitesDocente$.pipe(
            take(1),
            switchMap(tramitesDocente => this._httpClient.post<TramitesDocenteInterface>(environment.baseUrl + 'tramites/docentes/validados', tramite).pipe(
                map((newTramite) => {
                   
                    const index = tramitesDocente.findIndex(item => item.idTramite === newTramite.idTramite);

                    if (newTramite.idEstado_tramite == 15 ) {
                        // Update the carnet
                        tramitesDocente.splice(index, 1);
                    } else {
                        // Update the carnet
                        tramitesDocente[index] = newTramite;
                    }
                    // Return the new tramite
                    return newTramite;

                })
            )),
            catchError((error) => {
                console.error(error);
                return throwError(error);
            })
        );
    }

    getDocenteByCodigo(codigo: number,nro_tramite: number): Observable<TramitesDocenteInterface>
    {
        return this._httpClient.get<TramitesDocenteInterface>(environment.baseUrl + 'docente/search', {
            params: {
                codigo,
                nro_tramite
            }
        }).pipe(
            tap((docente) => {
                if (docente) {
                    if (docente.requisitos) {
                        docente.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });
                    }
                    // if (docente.idDocente) docente.idDocente = environment.baseUrlStorage + docente.idDocente;
                    
                }
                // this._docente.next(docente);
            })
        );
    }

    /**
     * Create alumno
     */
    getDataAlumno(document: any): Observable<any>
    {
        
        return this._httpClient.post(environment.baseUrl + 'auth/getAlumnoByDocument', document).pipe(
            switchMap((response: any) => {
                

                // Return a new observable with the response
                return of(response.datos_alumno);
            })
        );
    }

    createTramite(tramite: any): Observable<TramiteInterface>
    {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.post<TramiteInterface>(environment.baseUrl + 'tramites', tramite).pipe(
                map((newTramite) => {
                  

                    // Return the new tramite
                    return newTramite;
                })
            )),
            catchError((error) => {
                console.error(error);
                return throwError(error);
            })
        );
    }


}
