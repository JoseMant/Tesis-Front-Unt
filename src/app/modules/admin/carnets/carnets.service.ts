import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { CarnetPagination, CarnetInterface } from 'app/modules/admin/carnets/carnets.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarnetsService
{
    // Private
    private _pagination: BehaviorSubject<CarnetPagination | null> = new BehaviorSubject(null);
    private _carnet: BehaviorSubject<CarnetInterface | null> = new BehaviorSubject(null);
    private _carnets: BehaviorSubject<CarnetInterface[] | null> = new BehaviorSubject(null);
    private _allcarnets: BehaviorSubject<CarnetInterface[] | null> = new BehaviorSubject(null);

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

    /**
     * Getter for carnets
     */
    get allcarnets$(): Observable<CarnetInterface[]>
    {
        return this._allcarnets.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
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
          console.log(response);
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
          console.log(response);
          this._pagination.next(response.pagination);
          this._carnets.next(response.data);
        })
      );
    }

    getCarnetsValidados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarnetPagination; data: CarnetInterface[] }>
    {
      return this._httpClient.get<{ pagination: CarnetPagination; data: CarnetInterface[] }>(environment.baseUrl + 'tramite/carnets/validados', {
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
     * Get tramites
     */
     getAllCarnets(): Observable<CarnetInterface[]>
    {
       return this._httpClient.get<CarnetInterface[]>(environment.baseUrl + 'tramite/carnets').pipe(
            tap((response) => {
                console.log(response);
                this._allcarnets.next(response);
            })
        );
    }

    /**
     * Get carnet by id
     */
    getCarnetById(id: number): Observable<CarnetInterface>
    {
        return this._allcarnets.pipe(
            take(1),
            map((carnets) => {
                console.log(carnets);

                // Find the carnet
                const carnet = carnets.find(item => item.idTramite === id) || null;
                console.log(carnet);
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
    updateCarnet(id: number, carnet: CarnetInterface): Observable<CarnetInterface>
    {
        return this.carnets$.pipe(
            take(1),
            switchMap(carnets => this._httpClient.patch<CarnetInterface>(environment.baseUrl + 'carnet/' + id, carnet).pipe(
                map((updatedCarnet) => {
                    console.log(updatedCarnet);
                    // Find the index of the updated carnet
                    const index = carnets.findIndex(item => item.idTramite === id);

                    // Update the carnet
                    carnets.splice(index, 1);

                    // Update the carnets
                    this._carnets.next(carnets);

                    // Return the updated carnet
                    return updatedCarnet;
                })
            ))
        );
    }


    descargarZip(): Observable<any[]>
    {
        return this.carnets$.pipe(
            take(1),
            switchMap(carnets => this._httpClient.get<any[]>(environment.baseUrl + 'download/fotos').pipe(
                map((updatedCertificados) => {

                    // Return the new message from observable
                    return carnets;
                })
            ))
        );
    }
}
