import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ConstanciasService } from 'app/modules/admin/constancias/constancias.service';
import { ConstanciaPagination, ConstanciaInterface } from 'app/modules/admin/constancias/constancias.types';


@Injectable({
    providedIn: 'root'
})
export class ConstanciaAprobadoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _constanciasService: ConstanciasService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ConstanciaInterface>
    {
        return this._constanciasService.getConstanciaById(Number(route.paramMap.get('idTramite')))
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

// @Injectable({
//     providedIn: 'root'
// })

// export class AllConstanciasResolver implements Resolve<any>
// {
//     /**
//      * Constructor
//      */
//     constructor(private _constanciasService: ConstanciasService,
//         private _router: Router)
//     {
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Resolver
//      *
//      * @param route
//      * @param state
//      */
//     // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ConstanciaInterface[]>
//     // {
//     //     return this._constanciasService.getConstancias();
//     // }
// }

@Injectable({
    providedIn: 'root'
})
export class ConstanciasAprobadosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _constanciasService: ConstanciasService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: ConstanciaPagination; data: ConstanciaInterface[] }>
    {
        return this._constanciasService.getConstanciasAsignados();
    }
}
