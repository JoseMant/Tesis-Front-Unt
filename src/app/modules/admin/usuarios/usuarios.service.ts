import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Usuario } from 'app/modules/admin/usuarios/usuarios.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService
{
    // Private
    private _usuario: BehaviorSubject<Usuario | null> = new BehaviorSubject(null);
    private _usuarios: BehaviorSubject<Usuario[] | null> = new BehaviorSubject(null);

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
     * Getter for usuario
     */
    get usuario$(): Observable<Usuario>
    {
        return this._usuario.asObservable();
    }

    /**
     * Getter for usuarios
     */
    get usuarios$(): Observable<Usuario[]>
    {
        return this._usuarios.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get usuarios
     */
    getUsuarios(): Observable<Usuario[]>
    {
        // return this._httpClient.get<Usuario[]>('api/apps/usuarios/all').pipe(
        return this._httpClient.get<Usuario[]>(environment.baseUrl + 'usuarios').pipe(
            tap((usuarios) => {
                this._usuarios.next(usuarios);
                console.log( this._usuarios);
            })
        );
    }

    /**
     * Search usuarios with given query
     *
     * @param query
     */
    searchUsuarios(query: string): Observable<Usuario[]>
    {
        return this._httpClient.get<Usuario[]>(environment.baseUrl + 'usuario/search', {
            params: {query}
        }).pipe(
            tap((usuarios) => {
                this._usuarios.next(usuarios);
            })
        );
    }

    /**
     * Get usuario by id
     */
    getUsuarioById(idUsuario: number): Observable<Usuario>
    {
        return this._usuarios.pipe(
            take(1),
            map((usuarios) => {

                // Find the usuario
                let usuario = usuarios.find(item => item.idUsuario === idUsuario) || null;

                if (!usuario) {
                    usuario = {
                        apellidos       : 'Usuario',
                        nombres         : 'Nuevo',
                        celular         : '',
                        correo          : '',
                        nro_documento   : '',
                        nro_matricula   : '',
                        sexo            : '0',
                        tipo_documento  : '',
                        username        : '',
                        password        : '',
                        idTipo_usuario  : 0,
                        idUsuario       : 0
                      };
                }

                // Update the usuario
                this._usuario.next(usuario);

                // Return the usuario
                return usuario;
            }),
            switchMap((usuario) => {

                if ( !usuario )
                {
                    return throwError('Could not found usuario with id of ' + idUsuario + '!');
                }

                return of(usuario);
            })
        );
    }

    /**
     * Create usuario
     */
    createUsuario(): Observable<Usuario>
    {
        return this.usuarios$.pipe(
            take(1),
            switchMap(usuarios => this._httpClient.post<Usuario>('api/apps/usuarios/usuario', {}).pipe(
                map((newUsuario) => {

                    // Update the usuarios with the new usuario
                    this._usuarios.next([newUsuario, ...usuarios]);

                    // Return the new usuario
                    return newUsuario;
                })
            ))
        );
    }

    /**
     * Update usuario
     *
     * @param id
     * @param usuario
     */
    updateUsuario(idUsuario: number, usuario: Usuario): Observable<Usuario>
    {
        return this.usuarios$.pipe(
            take(1),
            switchMap(usuarios => this._httpClient.patch<Usuario>('api/apps/usuarios/usuario', {
                idUsuario,
                usuario
            }).pipe(
                map((updatedUsuario) => {

                    // Find the index of the updated usuario
                    const index = usuarios.findIndex(item => item.idUsuario === idUsuario);

                    // Update the usuario
                    usuarios[index] = updatedUsuario;

                    // Update the usuarios
                    this._usuarios.next(usuarios);

                    // Return the updated usuario
                    return updatedUsuario;
                }),
                switchMap(updatedUsuario => this.usuario$.pipe(
                    take(1),
                    filter(item => item && item.idUsuario === idUsuario),
                    tap(() => {

                        // Update the usuario if it's selected
                        this._usuario.next(updatedUsuario);

                        // Return the updated usuario
                        return updatedUsuario;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the usuario
     *
     * @param id
     */
    deleteUsuario(idUsuario: number): Observable<boolean>
    {
        return this.usuarios$.pipe(
            take(1),
            switchMap(usuarios => this._httpClient.delete('api/apps/usuarios/usuario', {params: {idUsuario}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted usuario
                    const index = usuarios.findIndex(item => item.idUsuario === idUsuario);

                    // Delete the usuario
                    usuarios.splice(index, 1);

                    // Update the usuarios
                    this._usuarios.next(usuarios);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Update the avatar of the given usuario
     *
     * @param id
     * @param avatar
     */
    uploadAvatar(idUsuario: number, avatar: File): Observable<Usuario>
    {
        return this.usuarios$.pipe(
            take(1),
            switchMap(usuarios => this._httpClient.post<Usuario>('api/apps/usuarios/avatar', {
                idUsuario,
                avatar
            }, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedUsuario) => {

                    // Find the index of the updated usuario
                    const index = usuarios.findIndex(item => item.idUsuario === idUsuario);

                    // Update the usuario
                    usuarios[index] = updatedUsuario;

                    // Update the usuarios
                    this._usuarios.next(usuarios);

                    // Return the updated usuario
                    return updatedUsuario;
                }),
                switchMap(updatedUsuario => this.usuario$.pipe(
                    take(1),
                    filter(item => item && item.idUsuario === idUsuario),
                    tap(() => {

                        // Update the usuario if it's selected
                        this._usuario.next(updatedUsuario);

                        // Return the updated usuario
                        return updatedUsuario;
                    })
                ))
            ))
        );
    }
}
