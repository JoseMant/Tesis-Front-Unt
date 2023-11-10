import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ReportesService } from 'app/modules/admin/reportes/reportes.service';
import { ReportePagination, ReporteInterface, Unidad } from 'app/modules/admin/reportes/reportes.types';

@Injectable({
    providedIn: 'root'
})
export class ReportesTramitesEsperaResolver implements Resolve<any>
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
        return this._reportesService.getReporteTramitesEspera();
    }
}
