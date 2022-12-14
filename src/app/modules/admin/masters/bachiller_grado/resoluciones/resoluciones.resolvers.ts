import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ResolucionesService } from 'app/modules/admin/masters/bachiller_grado/resoluciones/resoluciones.service';
import { Resolucion, Role, Unidad } from 'app/modules/admin/masters/bachiller_grado/resoluciones/resoluciones.types';

@Injectable({
    providedIn: 'root'
})
export class ResolucionesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _resolucionesService: ResolucionesService)
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
        return this._resolucionesService.getResoluciones();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ResolucionResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _resolucionesService: ResolucionesService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resolucion>
    {
        return this._resolucionesService.getResolucionById(Number(route.paramMap.get('id')))
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
export class ResolucionesRolesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _resolucionesService: ResolucionesService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]>
    {
        return this._resolucionesService.getRoles();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ResolucionesUnidadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _resolucionesService: ResolucionesService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Unidad[]>
    {
        return this._resolucionesService.getUnidades();
    }
}
