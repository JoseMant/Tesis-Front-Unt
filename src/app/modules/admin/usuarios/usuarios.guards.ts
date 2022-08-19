import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosDetailsComponent } from 'app/modules/admin/usuarios/details/details.component';

@Injectable({
    providedIn: 'root'
})
export class CanDeactivateUsuariosDetails implements CanDeactivate<UsuariosDetailsComponent>
{
    canDeactivate(
        component: UsuariosDetailsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        // Get the next route
        let nextRoute: ActivatedRouteSnapshot = nextState.root;
        while ( nextRoute.firstChild )
        {
            nextRoute = nextRoute.firstChild;
        }

        // If the next state doesn't contain '/usuarios'
        // it means we are navigating away from the
        // usuarios app
        if ( !nextState.url.includes('/usuarios') )
        {
            // Let it navigate
            return true;
        }

        // If we are navigating to another usuario...
        if ( nextRoute.paramMap.get('id') )
        {
            // Just navigate
            return true;
        }
        // Otherwise...
        else
        {
            // Close the drawer first, and then navigate
            return component.closeDrawer().then(() => true);
        }
    }
}
