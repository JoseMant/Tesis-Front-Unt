import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { User, Role, Tag } from 'app/modules/admin/masters/access/users/users.types';
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
    private _tags: BehaviorSubject<Tag[] | null> = new BehaviorSubject(null);

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
     * Getter for tags
     */
    get tags$(): Observable<Tag[]>
    {
        return this._tags.asObservable();
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
     * Get tags
     */
    getTags(): Observable<Tag[]>
    {
        return this._httpClient.get<Tag[]>('api/apps/contacts/tags').pipe(
            tap((tags) => {
                this._tags.next(tags);
            })
        );
    }

    /**
     * Create tag
     *
     * @param tag
     */
    createTag(tag: Tag): Observable<Tag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.post<Tag>('api/apps/contacts/tag', {tag}).pipe(
                map((newTag) => {

                    // Update the tags with the new tag
                    this._tags.next([...tags, newTag]);

                    // Return new tag from observable
                    return newTag;
                })
            ))
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
