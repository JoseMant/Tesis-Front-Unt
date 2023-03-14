import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ReportesService } from 'app/modules/admin/reportes/reportes.service';
import { ReportePagination, ReporteInterface } from 'app/modules/admin/reportes/reportes.types';


@Injectable({
    providedIn: 'root'
})
export class ReporteURAValidacionResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _reportesService: ReportesService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReporteInterface>
    {
        return this._reportesService.getReporteById(Number(route.paramMap.get('idTramite')))
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
export class ReportesURAValidacionesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _reportesService: ReportesService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: ReportePagination; data: ReporteInterface[] }>
    {
        return this._reportesService.getReportesUra();
    }
}
