import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { User, Role, Unidad } from 'app/modules/admin/masters/access/users/users.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService
{
    // Private
    private _user: BehaviorSubject<User | null> = new BehaviorSubject(null);
    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);
    private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
    private _unidades: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _dependencias: BehaviorSubject<any | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for user
     */
    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    /**
     * Getter for users
     */
    get users$(): Observable<User[]>
    {
        return this._users.asObservable();
    }

    /**
     * Getter for roles
     */
    get roles$(): Observable<Role[]>
    {
        return this._roles.asObservable();
    }

    /**
     * Getter for unidades
     */
    get unidades$(): Observable<Unidad[]>
    {
        return this._unidades.asObservable();
    }

    /**
     * Getter for dependencias
     */
    get dependencias$(): Observable<Unidad[]>
    {
        return this._dependencias.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get users
     */
    getUsers(): Observable<User[]>
    {
        return this._httpClient.get<User[]>(environment.baseUrl + 'users/all').pipe(
            tap((users) => {
                console.log(users);
                this._users.next(users);
            })
        );
    }

    /**
     * Search users with given query
     *
     * @param query
     */
    searchUsers(query: string): Observable<User[]>
    {
        return this._httpClient.get<User[]>(environment.baseUrl + 'users/search', {
            params: {query}
        }).pipe(
            tap((users) => {
                console.log(users);
                this._users.next(users);
            })
        );
    }

    /**
     * Get user by id
     */
    getUserById(id: number): Observable<User>
    {
        return this._users.pipe(
            take(1),
            map((users) => {

                // Find the user
                let user = users.find(item => item.idUsuario === id) || null;
                
                if (!user) {
                    user = {
                        idUsuario: 0,
                        idTipo_usuario: 0,
                        username: '',
                        nombres: '',
                        apellidos: 'Nuevo Usuario',
                        tipo_documento: 'none',
                        nro_documento: '',
                        correo: '',
                        celular:'',
                        sexo: 'none',
                        estado: true
                    };
                }

                // Update the user
                this._user.next(user);

                // Return the user
                return user;
            }),
            switchMap((user) => {

                if ( !user )
                {
                    return throwError('Could not found user with id of ' + id + '!');
                }

                return of(user);
            })
        );
    }

    /**
     * Create user
     */
    createUser(user: User): Observable<User>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.post<User>(environment.baseUrl + 'users/create', user).pipe(
                map((newUser) => {

                    // Update the users with the new user
                    this._users.next([newUser, ...users]);

                    // Return the new user
                    return newUser;
                })
            ))
        );
    }

    /**
     * Update user
     *
     * @param id
     * @param user
     */
    updateUser(id: number, user: User): Observable<User>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.put<User>(environment.baseUrl + 'users/update/' + id, user).pipe(
                map((updatedUser) => {

                    // Find the index of the updated user
                    const index = users.findIndex(item => item.idUsuario === id);

                    // Update the user
                    users[index] = updatedUser;

                    // Update the users
                    this._users.next(users);

                    // Return the updated user
                    return updatedUser;
                }),
                switchMap(updatedUser => this.user$.pipe(
                    take(1),
                    filter(item => item && item.idUsuario === id),
                    tap(() => {

                        // Update the user if it's selected
                        this._user.next(updatedUser);

                        // Return the updated user
                        return updatedUser;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the user
     *
     * @param id
     */
    deleteUser(id: number): Observable<boolean>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.delete('api/apps/contacts/contact', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted user
                    const index = users.findIndex(item => item.idUsuario === id);

                    // Delete the user
                    users.splice(index, 1);

                    // Update the users
                    this._users.next(users);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get roles
     */
    getRoles(): Observable<Role[]>
    {
        return this._httpClient.get<Role[]>(environment.baseUrl + 'roles').pipe(
            tap((roles) => {
                this._roles.next(roles);
            })
        );
    }

    /**
     * Get unidades
     */
    getUnidades(): Observable<Unidad[]>
    {
        return this._httpClient.get<Unidad[]>(environment.baseUrl + 'unidades').pipe(
            tap((response) => {
                this._unidades.next(response);
            })
        );
    }

    getDependenciasByUnidad(unidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dependencias/' + unidad).pipe(
            tap((response: any[]) => {
                // console.log(response);
                this._dependencias.next(response);
            })
        );
    }

    getEscuelasByDependencia(facultad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'dependencia/escuelas/' + facultad).pipe(
            tap((response: any[]) => {
                console.log(response);
                this._dependencias.next(response);
            })
        );
    }

    /**
     * Update the avatar of the given user
     *
     * @param id
     * @param avatar
     */
    uploadAvatar(id: number, avatar: File): Observable<User>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.post<User>('api/apps/contacts/avatar', {
                id,
                avatar
            }, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedUser) => {

                    // Find the index of the updated user
                    const index = users.findIndex(item => item.idUsuario === id);

                    // Update the user
                    users[index] = updatedUser;

                    // Update the users
                    this._users.next(users);

                    // Return the updated user
                    return updatedUser;
                }),
                switchMap(updatedUser => this.user$.pipe(
                    take(1),
                    filter(item => item && item.idUsuario === id),
                    tap(() => {

                        // Update the user if it's selected
                        this._user.next(updatedUser);

                        // Return the updated user
                        return updatedUser;
                    })
                ))
            ))
        );
    }
}
