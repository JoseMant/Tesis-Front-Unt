import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { NgxRolesService } from 'ngx-permissions';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService
{
    private _message: BehaviorSubject<any> = new BehaviorSubject(null);
    private _code: BehaviorSubject<any> = new BehaviorSubject(null);
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _rolesService: NgxRolesService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    get message$(): Observable<any> {
        return this._message.asObservable();
    }
    
    get code$(): Observable<any> {
        return this._code.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post(environment.baseUrl + 'auth/forgot-password', {email: email});
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(code: string, password: string): Observable<any>
    {
        return this._httpClient.post(environment.baseUrl + 'auth/reset-password', {
            'code': code, 
            'password': password 
        });
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('El usuario ya ha iniciado sesión.');
        }

        return this._httpClient.post(environment.baseUrl + 'auth/sign-in', credentials).pipe(
            switchMap((response: any) => {
                
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                let user = response.user;
                // user.avatar = 'assets/images/avatars/brian-hughes.jpg';
                localStorage.setItem('user', JSON.stringify(user));

                // Store the user on the user service
                this._userService.user = user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._httpClient.post(environment.baseUrl + 'auth/refresh', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        this._rolesService.flushRoles();

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        console.log(user);
        return this._httpClient.post(environment.baseUrl + 'auth/sign-up', user);
    }

    /**
     * Sign up
     *
     * @param user
     */
    getDocument(document: string): Observable<any>
    {
        return this._httpClient.post(environment.baseUrl + 'auth/getAlumnoByDocument', {
            dni: document
        }).pipe(
            switchMap((response: any) => {
                console.log(response);

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    /**
     * Sign in using the access token
     */
    validateByCode(code: string): Observable<any>
    {
        // validate By Code
        return this._httpClient.get(environment.baseUrl + 'auth/verify/' + code).pipe(
          tap((response) => {
              console.log(response);
              this._message.next(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    resetPasswordByCode(code: string): Observable<any>
    {
        // validate By Code
        return this._httpClient.get(environment.baseUrl + 'auth/verifyCodePassword/' + code).pipe(
          tap((response) => {
              console.log(response);
              this._code.next(response.code)
            })
        );
    }
}
