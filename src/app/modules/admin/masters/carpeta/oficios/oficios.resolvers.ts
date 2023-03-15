import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { OficiosService } from 'app/modules/admin/masters/carpeta/oficios/oficios.service';
import { Oficio, Resolucion } from 'app/modules/admin/masters/carpeta/oficios/oficios.types';

@Injectable({
    providedIn: 'root'
})
export class OficiosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _oficiosService: OficiosService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Oficio[]>
    {
        return this._oficiosService.getOficios();
    }
}

@Injectable({
    providedIn: 'root'
})
export class OficioResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _oficiosService: OficiosService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Oficio>
    {
        return this._oficiosService.getOficioById(Number(route.paramMap.get('id')))
                   .pipe(
                       // Error here means the requested user is not available
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
export class OficiosResolucionesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _oficiosService: OficiosService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolucion[]>
    {
        return this._oficiosService.getResoluciones(Number(route.paramMap.get('id')));
    }
}