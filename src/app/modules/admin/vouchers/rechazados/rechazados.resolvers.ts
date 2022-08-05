import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { VouchersService } from 'app/modules/admin/vouchers/vouchers.service';
import { VoucherPagination, VoucherInterface } from 'app/modules/admin/vouchers/vouchers.types';

@Injectable({
    providedIn: 'root'
})
export class VoucherRechazadoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _vouchersService: VouchersService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VoucherInterface>
    {
        return this._vouchersService.getVoucherById(Number(route.paramMap.get('id')))
                   .pipe(
                       // Error here means the requested voucher is not available
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
export class VouchersRechazadosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _vouchersService: VouchersService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: VoucherPagination, data: VoucherInterface[] }>
    {
        return this._vouchersService.getVouchersRechazados();
    }
}
