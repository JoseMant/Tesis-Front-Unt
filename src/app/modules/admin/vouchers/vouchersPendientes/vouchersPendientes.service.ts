/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { VoucherInterface, VoucherPagination } from '../vouchers.types';

@Injectable({
    providedIn: 'root'
})
export class VoucherPendienteService
{
    // Private
    private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _vouchersPendientes: BehaviorSubject<VoucherInterface[] | null> = new BehaviorSubject(null);
    private _voucherPendiente: BehaviorSubject<VoucherInterface | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    get pagination$(): Observable<any> {
        return this._pagination.asObservable();
    }

    get vouchersPendientes$(): Observable<VoucherInterface[]> {
        return this._vouchersPendientes.asObservable();
    }

    get voucherPendiente$(): Observable<VoucherInterface> {
        return this._voucherPendiente.asObservable();
    }

    // getVouchersPendientes(page: number = 1, size: number = 10):
    // Observable<{ path: any; per_page: any; prev_page_url: any; to: any;
    //     total: any; from: any; last_page: any; last_page_url: any; next_page_url: any; first_page_url: any; current_page: any; data: VoucherInterface[]; }> {
    //         console.log(page);
    //         console.log(size);
    //   return this._httpClient.get<{ path: any; per_page: any; prev_page_url: any; to: any;
    //     total: any; from: any; last_page: any; last_page_url: any; next_page_url: any; first_page_url: any; current_page: any; data: VoucherInterface[]; }>(
    //       environment.baseUrl + 'vouchers-pendientes/' + size + '/', {
    //     params: {
    //         page: '' + page
    //     }
    //   }).pipe(
    //     tap((response) => {
    //         console.log(response);
    //         const pagination = {
    //            current_page: response.current_page,
    //            first_page_url: response.first_page_url,
    //            from: response.from,
    //            lastPage: response.last_page,
    //            last_page_url: response.last_page_url,
    //            nextPageUrl: response.next_page_url,
    //            path: response.path,
    //            per_page: response.per_page,
    //            prev_page_url: response.prev_page_url,
    //            to: response.to,
    //            total: response.total,
    //         };
    //       this._pagination.next(pagination);
    //       this._vouchersPendientes.next(response.data);
    //     })
    //   );
    // }

    getVouchersPendientes():
    Observable<{vouchers: VoucherInterface[]}> {
      return this._httpClient.get< {vouchers: VoucherInterface[]}>(
          environment.baseUrl + 'vouchers-pendientes').pipe(
        tap((response) => {
            console.log(response);
          this._vouchersPendientes.next(response.vouchers);
        })
      );
    }

    /**
     * Get product by id
     */
    getVoucherById(id: number): Observable<VoucherInterface> {
      return this._vouchersPendientes.pipe(
        take(1),
        map((vulnerabilities) => {
          // Find the product
          const voucherPendiente = vulnerabilities.find(item => item.idVoucher === id) || null;
          // Update the product
          this._voucherPendiente.next(voucherPendiente);

          // Return the product
          return voucherPendiente;
        }),
        switchMap((voucherPendiente) => {

          if ( !voucherPendiente )
          {
            return throwError('Could not found voucherPendiente with id of ' + id + '!');
          }

          return of(voucherPendiente);
        })
      );
    }

}
