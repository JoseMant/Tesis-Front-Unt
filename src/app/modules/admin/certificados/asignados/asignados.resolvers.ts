import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CertificadosService } from 'app/modules/admin/certificados/certificados.service';
import { CertificadoPagination, CertificadoInterface } from 'app/modules/admin/certificados/certificados.types';

@Injectable({
    providedIn: 'root'
})
export class CertificadoAsignadoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _certificadosService: CertificadosService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CertificadoInterface>
    {
        return this._certificadosService.getCertificadoById(Number(route.paramMap.get('id')))
                   .pipe(
                       // Error here means the requested certificado is not available
                       catchError((error) => {
                         debugger;
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
export class CertificadosAsignadosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _certificadosService: CertificadosService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: CertificadoPagination, data: CertificadoInterface[] }>
    {
        return this._certificadosService.getCertificadosAsignados();
    }
}