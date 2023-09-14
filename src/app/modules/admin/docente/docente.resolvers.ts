import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, throwError, catchError } from 'rxjs';
import { TramiteService } from 'app/modules/admin/tramites/tramites.service';
import { TramiteInterface } from 'app/modules/admin/tramites/tramites.types';
import { DocenteService, } from './docente.service';
import { TramitesDocenteInterface, TramitesDocentePagination } from './docente.types';

@Injectable({
    providedIn: 'root'
})
export class DocenteRegistrosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _docenteService: DocenteService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: TramitesDocentePagination; data: TramitesDocenteInterface[] }>
    {
        return this._docenteService.getSolicitudesDocentes();
    }
}
@Injectable({
    providedIn: 'root'
})
export class CrearDocenteResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _docenteService: DocenteService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TramitesDocenteInterface>
    {
        return this._docenteService.getDocentesByid(Number(route.paramMap.get('idTramite')))
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
export class DocenteValidacionesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _docenteService: DocenteService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: TramitesDocentePagination; data: TramitesDocenteInterface[] }>
    {
        return this._docenteService.getDocentesValidados();
    }
}

@Injectable({
    providedIn: 'root'
})
export class DocenteFinalizadosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _docenteService: DocenteService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: TramitesDocentePagination; data: TramitesDocenteInterface[] }>
    {
        return this._docenteService.getDocentesFinalizados();
    }
}


@Injectable({
    providedIn: 'root'
})
export class DocenteValidarResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _docenteService: DocenteService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TramitesDocenteInterface>
    {
        return this._docenteService.getDocentesByid(Number(route.paramMap.get('idTramite')))
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
export class ProfesionDocenteResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _docenteService: DocenteService,
        private _router: Router)
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
        return this._docenteService.getProfesiones();
    }
}
@Injectable({
    providedIn: 'root'
})
export class PaisesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _docenteService: DocenteService,
        private _router: Router)
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
        return this._docenteService.getPaises();
    }
}
@Injectable({
    providedIn: 'root'
})
export class SedesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _docenteService: DocenteService,
        private _router: Router)
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
        return this._docenteService.getSedes();
    }
}
@Injectable({
    providedIn: 'root'
})
export class DependenciasSGAResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _docenteService: DocenteService,
        private _router: Router)
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
        return this._docenteService.getDependenciasSGA();
    }
}



@Injectable({
    providedIn: 'root'
})
export class CategoriaSGAResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _docenteService: DocenteService,
        private _router: Router)
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
        return this._docenteService.getCategorias();
    }
}
@Injectable({
    providedIn: 'root'
})
export class DedicaionesDocenteResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _docenteService: DocenteService,
        private _router: Router)
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
        return this._docenteService.getDedicacionesDocente();
    }
}



