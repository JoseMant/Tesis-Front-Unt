import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { UsersService } from 'app/modules/admin/masters/access/users/users.service';
import { User, Role, Unidad, Tipo_documento } from 'app/modules/admin/masters/access/users/users.types';

@Injectable({
    providedIn: 'root'
})
export class UsersResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _usersService: UsersService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]>
    {
        return this._usersService.getUsers();
    }
}

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _usersService: UsersService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>
    {
        return this._usersService.getUserById(Number(route.paramMap.get('id')))
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
export class UsersRolesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _usersService: UsersService)
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
        return this._usersService.getRoles();
    }
}

@Injectable({
    providedIn: 'root'
})
export class UsersUnidadesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _usersService: UsersService)
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
        return this._usersService.getUnidades();
    }
}

@Injectable({
    providedIn: 'root'
})

export class UsersTiposDocumentosResolver implements Resolve<any>
{
    /**
    * Constructor
    */
    constructor(private _usersService: UsersService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tipo_documento[]>
    {
        return this._usersService.getTipos_documentos();
    }
}
