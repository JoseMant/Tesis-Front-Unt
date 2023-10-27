import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { VoucherPagination, VoucherInterface } from 'app/modules/admin/vouchers/vouchers.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VouchersService
{
    // Private
    private _pagination: BehaviorSubject<VoucherPagination | null> = new BehaviorSubject(null);
    private _voucher: BehaviorSubject<VoucherInterface | null> = new BehaviorSubject(null);
    private _bancos: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _vouchers: BehaviorSubject<VoucherInterface[] | null> = new BehaviorSubject(null);

    private _validacion: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
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
    get pagination$(): Observable<VoucherPagination>
    {
        return this._pagination.asObservable();
    }

    get bancos$(): Observable<any> {
        return this._bancos.asObservable();
    }

    get validacion$(): Observable<any[]>
    {
        return this._validacion.asObservable();
    }


    /**
     * Getter for voucher
     */
    get voucher$(): Observable<VoucherInterface>
    {
        return this._voucher.asObservable();
    }

    /**
     * Getter for vouchers
     */
    get vouchers$(): Observable<VoucherInterface[]>
    {
        return this._vouchers.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getVouchersPendientes(page: number = 0, size: number = 100, sort: string = 'nro_tramite', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: VoucherPagination; data: VoucherInterface[] }>
    {
        return this._httpClient.get<{ pagination: VoucherPagination; data: VoucherInterface[] }>(environment.baseUrl + 'vouchers/pendientes', {
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
                this._vouchers.next(response.data);
            })
        );
    }

    getVouchersAprobados(page: number = 0, size: number = 100, sort: string = 'nro_tramite', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
    Observable<{ pagination: VoucherPagination; data: VoucherInterface[] }>
    {
      return this._httpClient.get<{ pagination: VoucherPagination; data: VoucherInterface[] }>(environment.baseUrl + 'vouchers/aprobados', {
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
          this._vouchers.next(response.data);
        })
      );
    }

    getVouchersRechazados(page: number = 0, size: number = 100, sort: string = 'nro_tramite', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
    Observable<{ pagination: VoucherPagination; data: VoucherInterface[] }>
    {
      return this._httpClient.get<{ pagination: VoucherPagination; data: VoucherInterface[] }>(environment.baseUrl + 'vouchers/rechazados', {
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
          this._vouchers.next(response.data);
        })
      );
    }

    /**
     * Get voucher by id
     */
    getVoucherById(id: number): Observable<VoucherInterface>
    {
        return this._vouchers.pipe(
            take(1),
            map((vouchers) => {

                // Find the voucher
                const voucher = vouchers.find(item => item.idVoucher === id) || null;

                // Update the voucher
                this._voucher.next(voucher);

                // Return the voucher
                return voucher;
            }),
            switchMap((voucher) => {

                if ( !voucher )
                {
                    return throwError('Could not found voucher with id of ' + id + '!');
                }

                return of(voucher);
            })
        );
    }

    /**
     * Update voucher
     *
     * @param id
     * @param voucher
     */
    updateVoucher(id: number, voucher: VoucherInterface): Observable<VoucherInterface>
    {
        return this.vouchers$.pipe(
            take(1),
            switchMap(vouchers => this._httpClient.put<VoucherInterface>(environment.baseUrl + 'voucher/' + id, voucher).pipe(
                map((updatedVoucher) => {
                    console.log(updatedVoucher);
                    // Find the index of the updated voucher
                    const index = vouchers.findIndex(item => item.idVoucher === id);

                    // Update the voucher
                    vouchers.splice(index, 1);

                    // Update the vouchers
                    this._vouchers.next(vouchers);

                    // Return the updated voucher
                    return updatedVoucher;
                })
            ))
        );
    }

    getBancos(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'bancos').pipe(
            tap((response: any) => {
                // console.log(response);
                this._bancos.next(response);
            })
        );
    }

    validarDatosVoucher(historialForm: any, idTramite: any): Observable<any>
    {
        return this.validacion$.pipe(
            take(1),
            switchMap(validaciones => this._httpClient.put<any>(environment.baseUrl + 'vouchers/pendientes/validarVoucher/' + idTramite, historialForm).pipe(
                map((response) => {
                    console.log(response);
                    // debugger;
                    // Update the messages with the new message

                    // });
        
                    // Update the carpetas
                    // this._historial.next(response);
        
                    // Return the new message from observable
                    return response;
                })
            ))
        );

        
    }

}
