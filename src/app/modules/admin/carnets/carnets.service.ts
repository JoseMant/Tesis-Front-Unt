import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { UserInterface, CarnetPagination, CarnetInterface } from 'app/modules/admin/carnets/carnets.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarnetsService
{
    // Private
    private _users: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<CarnetPagination | null> = new BehaviorSubject(null);
    private _carnet: BehaviorSubject<CarnetInterface | null> = new BehaviorSubject(null);
    private _carnets: BehaviorSubject<CarnetInterface[] | null> = new BehaviorSubject(null);

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
    get pagination$(): Observable<CarnetPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for carnet
     */
    get carnet$(): Observable<CarnetInterface>
    {
        return this._carnet.asObservable();
    }

    /**
     * Getter for carnets
     */
    get carnets$(): Observable<CarnetInterface[]>
    {
        return this._carnets.asObservable();
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
    
    getCarnetsAsignados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarnetPagination; data: CarnetInterface[] }>
    {
      return this._httpClient.get<{ pagination: CarnetPagination; data: CarnetInterface[] }>(environment.baseUrl + 'tramite/carnets/asignados', {
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
          this._carnets.next(response.data);
        })
      );
    }

    getCarnetsAprobados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarnetPagination; data: CarnetInterface[] }>
    {
      return this._httpClient.get<{ pagination: CarnetPagination; data: CarnetInterface[] }>(environment.baseUrl + 'tramite/carnets/aprobados', {
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
          this._carnets.next(response.data);
        })
      );
    }

    getCarnetsRegulares(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarnetPagination; data: CarnetInterface[] }>
    {
      return this._httpClient.get<{ pagination: CarnetPagination; data: CarnetInterface[] }>(environment.baseUrl + 'tramite/carnets/regulares', {
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
          this._carnets.next(response.data);
        })
      );
    }

    getCarnetsDuplicados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarnetPagination; data: CarnetInterface[] }>
    {
      return this._httpClient.get<{ pagination: CarnetPagination; data: CarnetInterface[] }>(environment.baseUrl + 'tramite/carnets/duplicados', {
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
          this._carnets.next(response.data);
        })
      );
    }

    getCarnetsRenovaciones(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarnetPagination; data: CarnetInterface[] }>
    {
      return this._httpClient.get<{ pagination: CarnetPagination; data: CarnetInterface[] }>(environment.baseUrl + 'tramite/carnets/duplicados', {
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
          this._carnets.next(response.data);
        })
      );
    }

    getCarnetsSolicitados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarnetPagination; data: CarnetInterface[] }>
    {
      return this._httpClient.get<{ pagination: CarnetPagination; data: CarnetInterface[] }>(environment.baseUrl + 'tramite/carnets/solicitados', {
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
          this._carnets.next(response.data);
        })
      );
    }

    getCarnetsRecibidos(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarnetPagination; data: CarnetInterface[] }>
    {
      return this._httpClient.get<{ pagination: CarnetPagination; data: CarnetInterface[] }>(environment.baseUrl + 'tramite/carnets/recibidos', {
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
          this._carnets.next(response.data);
        })
      );
    }

    /**
     * Get carnet by id
     */
    getCarnetById(id: number): Observable<CarnetInterface>
    {
        return this._carnets.pipe(
            take(1),
            map((carnets) => {
                console.log(carnets);

                // Find the carnet
                const carnet = JSON.parse( JSON.stringify(carnets.find(item => item.idTramite === id) || null) )
                carnet.fut = environment.baseUrl + carnet.fut;
                carnet.voucher = environment.baseUrlStorage + carnet.voucher;
                carnet.requisitos.forEach(element => {
                    if (element.archivo) {
                        element.archivo = environment.baseUrlStorage + element.archivo;
                    }
                });
                
                // Update the carnet
                this._carnet.next(carnet);
                
                // Return the carnet
                return carnet;
            }),
            switchMap((carnet) => {

                if ( !carnet )
                {
                    return throwError('Could not found carnet with id of ' + id + '!');
                }

                return of(carnet);
            })
        );
    }

    /**
     * Update carnet
     *
     * @param id
     * @param carnet
     */
    updateCarnets(fileCarnets: any): Observable<CarnetInterface[]>
    {
        return this.carnets$.pipe(
            take(1),
            switchMap(carnets => this._httpClient.post<CarnetInterface[]>(environment.baseUrl + 'carnets/import', fileCarnets).pipe(
                map((updatedCarnets) => {
                    console.log(updatedCarnets);
                    
                    // Update the carnets
                    this._carnets.next(updatedCarnets);

                    // Return the updated carnet
                    return updatedCarnets;
                })
            ))
        );
    }

    // getCarnetsAprobadosRefresh(): Observable<CarnetInterface[]>
    // {
    //   return this._httpClient.get<CarnetInterface[]>(environment.baseUrl + 'tramite/carnets/aprobados/refresh').pipe(
    //     tap((response) => {
    //       console.log(response);
    //       response.forEach(element => {
              
    //       });
    //       // Find the index of the updated carnet
    //       // const index = carnets.findIndex(item => item.idTramite === id);

    //       // Update the carnet
    //       // carnets.splice(index, 1);

    //       this._pagination.next(response.pagination);
    //       this._carnets.next(response.data);
    //     })
    //   );
    // }

    setCarnetsValidados(): Observable<any>
    {
      return this._httpClient.get<any>(environment.baseUrl + 'carnets/validacion/sunedu').pipe(
        tap((response) => {
          console.log(response);
        //   debugger;
        })
      );
    }

    descargarExcel(): Observable<any>
    {
      return this._httpClient.get<any>(environment.baseUrl + 'carnets/export').pipe(
        tap((response) => {
          console.log(response);
        //   debugger;
        })
      );
    }

    updateRequisitos(id: number, tramite: CarnetInterface): Observable<CarnetInterface>
    {
        return this.carnets$.pipe(
            take(1),
            switchMap(carnets => this._httpClient.put<CarnetInterface>(environment.baseUrl + 'tramite/update', tramite).pipe(
                map((updatedCarnet) => {
                    console.log(updatedCarnet);
                    // debugger;
                    // Find the index of the updated carnet
                    const index = carnets.findIndex(item => item.idTramite === id);

                    if (updatedCarnet.idEstado_tramite == 8 || updatedCarnet.idEstado_tramite == 9 || updatedCarnet.idEstado_tramite == 25) {
                        // Update the carnet
                        carnets.splice(index, 1);
                    } else {
                        // Update the carnet
                        carnets[index] = updatedCarnet;
                    }

                    // Update the carnets
                    this._carnets.next(carnets);

                    // Return the updated carnet
                    return updatedCarnet;
                }),
                switchMap(updatedCarnet => this.carnet$.pipe(
                    take(1),
                    filter(item => item && item.idTramite === id),
                    tap(() => {

                        // Find the carnet
                        updatedCarnet.fut = environment.baseUrl + updatedCarnet.fut;
                        if (updatedCarnet.voucher) updatedCarnet.voucher = environment.baseUrlStorage + updatedCarnet.voucher;
                        updatedCarnet.requisitos.forEach(element => {
                            if (element.archivo) {
                                element.archivo = environment.baseUrlStorage + element.archivo;
                            }
                        });

                        // Update the carnet if it's selected
                        this._carnet.next(updatedCarnet);

                        // Return the updated carnet
                        return updatedCarnet;
                    })
                ))
            ))
        );
    }

    
    getRecibirCarnes(): Observable<CarnetInterface[]>
    {
        return this._httpClient.get<CarnetInterface[]>(environment.baseUrl + 'carnets/solicitados/recibidos');
    }

    /**
     * finalizar carnet
     *
     * @param id
     * @param carnet
     */
    finalizarCarnet(id: number, data: CarnetInterface): Observable<CarnetInterface>
    {
      return this.carnets$.pipe(
        take(1),
        switchMap(carnets => this._httpClient.put<CarnetInterface>(environment.baseUrl + 'carnets/recibidos/finalizar', data).pipe(
            map((updatedCarnet) => {
                console.log(updatedCarnet);
                // debugger;
                // Find the index of the updated carnet
                const index = carnets.findIndex(item => item.idTramite === id);

                if (updatedCarnet.idEstado_tramite == 8 || updatedCarnet.idEstado_tramite == 9 || updatedCarnet.idEstado_tramite == 25) {
                    // Update the carnet
                    carnets.splice(index, 1);
                } else {
                    // Update the carnet
                    carnets[index] = updatedCarnet;
                }

                // Update the carnets
                this._carnets.next(carnets);

                // Return the updated carnet
                return updatedCarnet;
            }),
            switchMap(updatedCarnet => this.carnet$.pipe(
                take(1),
                filter(item => item && item.idTramite === id),
                tap(() => {

                    // Update the carnet if it's selected
                    this._carnet.next(updatedCarnet);

                    // Return the updated carnet
                    return updatedCarnet;
                })
            ))
        ))
    );
    }
}
