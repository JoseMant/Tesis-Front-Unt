import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService
{
    private _user: BehaviorSubject<User | null> = new BehaviorSubject(null);
    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);
    private _contra: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _contras: BehaviorSubject<any | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    get users$(): Observable<User[]> {
        return this._users.asObservable();
    }

    get contra$(): Observable<any> {
        return this._contra.asObservable();
    }

    get contras$(): Observable<any> {
        return this._contras.asObservable();
    }
    /**
     * Update product
     *
     * @param id
     * @param user
     */
    updateUser(user: User): Observable<User> {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.put<User>(environment.baseUrl + 'settings/user', user).pipe(
                map((updatedUser) => {
                    // Update the products
                    this._users.next(users);
                    localStorage.setItem('user', JSON.stringify(user));

                    // Store the user on the user service
                    this._userService.user = updatedUser;

                    // Return the updated product
                    return updatedUser;
                })
            ))
        );
    }

    /**
     * Update product
     *
     * @param contra
     */
    resetPassword(contra: any): Observable<any> {
        return this.contras$.pipe(
            take(1),
            switchMap(contras => this._httpClient.put<any>(environment.baseUrl + 'settings/password', contra).pipe(
                map((resetPassword) => {
                    console.log(resetPassword)
                    // Update the products
                    this._contras.next(contras);

                    // Return the updated product
                    return resetPassword;
                })
            )),
            catchError((error) => {
                console.error(error);
                return throwError(error);
            })
        );
    }
}