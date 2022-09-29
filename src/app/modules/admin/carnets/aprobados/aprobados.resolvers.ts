import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CarnetsService } from 'app/modules/admin/carnets/carnets.service';
import { CarnetPagination, CarnetInterface } from 'app/modules/admin/carnets/carnets.types';


@Injectable({
    providedIn: 'root'
})
export class CarnetAprobadoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _carnetsService: CarnetsService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CarnetInterface>
    {
        return this._carnetsService.getCarnetById(Number(route.paramMap.get('idTramite')))
                   .pipe(
                       // Error here means the requested madurity_level is not available
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
export class CarnetsAprobadosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _carnetsService: CarnetsService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: CarnetPagination; data: CarnetInterface[] }>
    {
        return this._carnetsService.getCarnetsAprobados();
    }
}
