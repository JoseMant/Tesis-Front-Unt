import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { TramiteInterface } from 'app/modules/admin/tramites/tramites.types';
import { environment } from 'environments/environment';
import { TramitesResolucionesInterface, TramitesResolucionesPagination } from './resoluciones.types';



@Injectable({
    providedIn: 'root'
})
export class ResolucionesService
{
    // Private
    
    

    // private _pagination: BehaviorSubject<TramitesResolucionesInterface | null> = new BehaviorSubject(null);

    private _pagination: BehaviorSubject<TramitesResolucionesPagination | null> = new BehaviorSubject(null);
    private _tramite: BehaviorSubject<TramitesResolucionesInterface | null> = new BehaviorSubject(null);
    private _tramites: BehaviorSubject<TramitesResolucionesInterface[] | null> = new BehaviorSubject(null);

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


    /**
     * Getter for tramites
     */


    
    
    get pagination$(): Observable<TramitesResolucionesPagination>
    {
        return this._pagination.asObservable();
    }
    get tramites$(): Observable<TramitesResolucionesInterface[]>
    {
        return this._tramites.asObservable();
    }
    get tramite$(): Observable<TramitesResolucionesInterface>
    {
        return this._tramite.asObservable();
    }
    
    getResolucionesValidar(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TramitesResolucionesPagination; data: TramitesResolucionesInterface[] }>
    {
      return this._httpClient.get<{ pagination: TramitesResolucionesPagination; data: TramitesResolucionesInterface[] }>(environment.baseUrl + 'tramites/resoluciones/validar', {
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
          this._tramites.next(response.data);
        })
      );
    }

    getResolucionByid(id: number): Observable<TramitesResolucionesInterface>
    {
        return this._tramites.pipe(
            take(1),
            map((tramites) => {
                // Find the resolución
                const resolucion = JSON.parse( JSON.stringify(tramites.find(item => item.idTramite === id) || null) )
                if (resolucion) {
                    if (resolucion.requisitos) {
                        resolucion.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });
                    }  
                }
                // Update the resolución
                this._tramite.next(resolucion);

                // Return the resolución
                return resolucion;
            }),
            switchMap((resolucion) => {

                if ( !resolucion )
                {
                    return throwError('Could not found resolución with id of ' + id + '!');
                }

                return of(resolucion);
            })
        );
    }

    updateRequisitos(id: number, tramite: TramitesResolucionesInterface): Observable<TramitesResolucionesInterface>
    {
        return this.tramites$.pipe(
            take(1),
            switchMap(tramites => this._httpClient.put<TramitesResolucionesInterface>(environment.baseUrl + 'tramites/resoluciones/update', tramite).pipe(
                map((updatedResolucion) => {
                    console.log(updatedResolucion);
                    // debugger;
                    // Find the index of the updated certificado
                    const index = tramites.findIndex(item => item.idTramite === id);

                    if (updatedResolucion.idEstado_tramite == 8) {
                        // Update the certificado
                        tramites.splice(index, 1);
                    } else if(updatedResolucion.idEstado_tramite == 9){
                        tramites.splice(index, 1);
                    }
                    else {
                        // Update the certificado
                        tramites[index] = updatedResolucion;
                    }

                    // Update the certificados
                    this._tramites.next(tramites);

                    // Return the updated certificado
                    return updatedResolucion;
                }),
                switchMap(updatedResolucion => this.tramite$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Update the certificado if it's selected
                        this._tramite.next(updatedResolucion);

                        // Return the updated certificado
                        return updatedResolucion;
                    })
                ))
            ))
        );
    }

    getResolucionesFinalizadas(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TramitesResolucionesPagination; data: TramitesResolucionesInterface[] }>
    {
      return this._httpClient.get<{ pagination: TramitesResolucionesPagination; data: TramitesResolucionesInterface[] }>(environment.baseUrl + 'tramites/resoluciones/finalizadas', {
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
          this._tramites.next(response.data);
        })
      );
    }

    getResolucionesObservadas(page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: TramitesResolucionesPagination; data: TramitesResolucionesInterface[] }>
    {
      return this._httpClient.get<{ pagination: TramitesResolucionesPagination; data: TramitesResolucionesInterface[] }>(environment.baseUrl + 'tramites/resoluciones/observadas', {
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
          this._tramites.next(response.data);
        })
      );
    }

}
