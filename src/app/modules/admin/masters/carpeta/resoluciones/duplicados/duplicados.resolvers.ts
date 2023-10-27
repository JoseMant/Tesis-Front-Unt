import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ResolucionesService } from 'app/modules/admin/masters/carpeta/resoluciones/duplicados/duplicados.service';
import { Resolucion, Role, Unidad,Tipo_Resolucion } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.types';
import { TramiteInterface } from 'app/modules/admin/tramites/tramites.types';

@Injectable({
    providedIn: 'root'
})
export class ResolucionesDuplicadosResolver implements Resolve<any>
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
export class ResolucionRectoralResolver implements Resolve<any>
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
export class ResolucionesRectoralesUnidadesResolver implements Resolve<any>
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

@Injectable({
    providedIn: 'root'
})
export class ResolucionRectoralTramitesDuplicadosResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TramiteInterface[]>
    {
        return this._resolucionesService.getTramitesDuplicados(Number(route.paramMap.get('id')));
    }
}

@Injectable({
    providedIn: 'root'
})
export class Tipos_ResolucionDuplicadosResolver implements Resolve<any>
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tipo_Resolucion[]>
    {
        return this._resolucionesService.getTipos_Resolucion();
    }
}