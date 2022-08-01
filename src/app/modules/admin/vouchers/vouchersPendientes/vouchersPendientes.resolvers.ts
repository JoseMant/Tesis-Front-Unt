/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VoucherInterface, VoucherPagination } from '../vouchers.types';
import { VoucherPendienteService } from './vouchersPendientes.service';

@Injectable({
    providedIn: 'root'
})
export class VoucherPendienteResolver implements Resolve<any>
{
    constructor(private _voucherService: VoucherPendienteService, private _router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VoucherInterface> {
      return this._voucherService.getVoucherById(Number(route.paramMap.get('id')))
      .pipe(
        // Error here means the requested product is not available
        catchError((error) => {

          // Log the error
          console.error(error);

          // Get the parent url
          const parentUrl = state.url.split('/').slice(0, -1).join('/');

          // Navigate to there
          this._router.navigateByUrl(parentUrl);

          // Throw an error
          return throwError(error);
        })
      );
    }
}

@Injectable({
    providedIn: 'root'
})
export class VouchersPendientesResolver implements Resolve<any> {
    constructor(private _voucherService: VoucherPendienteService) { }

    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ path: any; per_page: any; prev_page_url: any; to: any;
    //     total: any; from: any; last_page: any; last_page_url: any; next_page_url: any; first_page_url: any; current_page: any; data: VoucherInterface[]; }> {
    //     return this._voucherService.getVouchersPendientes(1,10);
    // }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VoucherInterface[]> {
        return this._voucherService.getVouchersPendientes();
    }
}
