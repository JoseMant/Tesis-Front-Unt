import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { GradosService } from 'app/modules/admin/grados/grados.service';
import { GradoPagination, GradoInterface } from 'app/modules/admin/grados/grados.types';


@Injectable({
    providedIn: 'root'
})
export class GradoEscuelaDiplomaResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _gradosService: GradosService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GradoInterface>
    {
        return this._gradosService.getGradoById(Number(route.paramMap.get('idTramite')))
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
export class GradosEscuelaDiplomasResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _gradosService: GradosService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
        return this._gradosService.getGradosDiplomasEscuela();
    }
}

@Injectable({
    providedIn: 'root'
})
export class ModalidadesSustentacionResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _gradosService: GradosService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
        return this._gradosService.getModalidadesSustentacion(15);
    }
}

@Injectable({
    providedIn: 'root'
})
export class ProgramasEstudiosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _gradosService: GradosService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: GradoPagination; data: GradoInterface[] }>
    {
        return this._gradosService.getProgramasEstudios();
    }
}
