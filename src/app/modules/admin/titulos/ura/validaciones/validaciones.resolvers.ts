import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { TitulosService } from 'app/modules/admin/titulos/titulos.service';
import { TituloPagination, TituloInterface } from 'app/modules/admin/titulos/titulos.types';


@Injectable({
    providedIn: 'root'
})
export class TituloURAValidacionResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _titulosService: TitulosService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TituloInterface>
    {
        return this._titulosService.getTituloById(Number(route.paramMap.get('idTramite')))
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
export class TitulosURAValidacionesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _titulosService: TitulosService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: TituloPagination; data: TituloInterface[] }>
    {
        return this._titulosService.getTitulosValidacionURA();
    }
}
