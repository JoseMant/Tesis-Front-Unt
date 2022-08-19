import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { UsuariosService } from 'app/modules/admin/usuarios/usuarios.service';
import { Usuario } from 'app/modules/admin/usuarios/usuarios.types';

@Injectable({
    providedIn: 'root'
})
export class UsuariosResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _usuariosService: UsuariosService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario[]>
    {
        return this._usuariosService.getUsuarios();
    }
}

@Injectable({
    providedIn: 'root'
})
export class UsuariosUsuarioResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _usuariosService: UsuariosService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario>
    {
        return this._usuariosService.getUsuarioById(Number(route.paramMap.get('idUsuario')))
                   .pipe(
                       // Error here means the requested usuario is not available
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
