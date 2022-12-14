import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CronogramasService } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.service';
import { Cronograma, Role,Resolucion, Unidad } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.types';

@Injectable({
    providedIn: 'root'
})
export class CronogramasResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _cronogramasService: CronogramasService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cronograma[]>
    {
        return this._cronogramasService.getCronogramas();
    }
}

@Injectable({
    providedIn: 'root'
})
export class CronogramaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _cronogramasService: CronogramasService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cronograma>
    {
        return this._cronogramasService.getCronogramaById(Number(route.paramMap.get('id')))
                   .pipe(
                       // Error here means the requested cronograma is not available
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
export class CronogramasUnidadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _cronogramasService: CronogramasService)
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
        return this._cronogramasService.getUnidades();
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserDependenciaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _cronogramasService: CronogramasService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._cronogramasService.getUserDependencia();
    }
}


@Injectable({
    providedIn: 'root'
})
export class ResolucionesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _cronogramasService: CronogramasService)
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
        return this._cronogramasService.getResoluciones();
    }
}