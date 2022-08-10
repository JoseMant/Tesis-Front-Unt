import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { HomeService } from 'app/modules/admin/home/home.service';
import { HomeBrand, HomeCategory, HomePagination, HomeProduct, HomeTag, HomeVendor } from 'app/modules/admin/home/home.types';

@Injectable({
    providedIn: 'root'
})
export class HomeBrandsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _homeService: HomeService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomeBrand[]>
    {
        return this._homeService.getBrands();
    }
}

@Injectable({
    providedIn: 'root'
})
export class HomeCategoriesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _homeService: HomeService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomeCategory[]>
    {
        return this._homeService.getCategories();
    }
}

@Injectable({
    providedIn: 'root'
})
export class HomeProductResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _homeService: HomeService,
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomeProduct>
    {
        return this._homeService.getProductById(Number(route.paramMap.get('id')))
                   .pipe(
                       // Error here means the requested product is not available
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
export class HomeProductsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _homeService: HomeService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: HomePagination; data: HomeProduct[] }>
    {
        return this._homeService.getProducts();
    }
}

@Injectable({
    providedIn: 'root'
})
export class HomeTagsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _homeService: HomeService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomeTag[]>
    {
        return this._homeService.getTags();
    }
}

@Injectable({
    providedIn: 'root'
})
export class HomeVendorsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _homeService: HomeService)
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomeVendor[]>
    {
        return this._homeService.getVendors();
    }
}
