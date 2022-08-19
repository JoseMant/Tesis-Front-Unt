import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Contact, Country, Tag } from 'app/modules/admin/usuarios/contacts.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ContactsService
{
    // Private
    private _contact: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _contacts: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
    private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(null);
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
     * Getter for contact
     */
    get contact$(): Observable<any>
    {
        return this._contact.asObservable();
    }

    /**
     * Getter for contacts
     */
    get contacts$(): Observable<any[]>
    {
        return this._contacts.asObservable();
    }

    /**
     * Getter for countries
     */
    get countries$(): Observable<Country[]>
    {
        return this._countries.asObservable();
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
     * Get contacts
     */
    getContacts(): Observable<any[]>
    {
        // return this._httpClient.get<any[]>('api/apps/contacts/all').pipe(
        return this._httpClient.get<any[]>(environment.baseUrl + 'usuarios').pipe(
            tap((contacts) => {
                this._contacts.next(contacts);
                console.log(contacts);
            })
        );
    }

    /**
     * Search contacts with given query
     *
     * @param query
     */
    searchContacts(query: string): Observable<any[]>
    {
        return this._httpClient.get<any[]>('api/apps/contacts/search', {
            params: {query}
        }).pipe(
            tap((contacts) => {
                this._contacts.next(contacts);
            })
        );
    }

    /**
     * Get contact by id
     */
    getContactById(idUsuario: number): Observable<any>
    {
        return this._contacts.pipe(
            take(1),
            map((contacts) => {
                console.log(contacts);
                // Find the contact
                const contact = contacts.find(item => item.idUsuario === idUsuario) || null;
                console.log(contact);

                // Update the contact
                this._contact.next(contact);

                // Return the contact
                return contact;
            }),
            switchMap((contact) => {

                if ( !contact )
                {
                    return throwError('Could not found contact with id of ' + idUsuario + '!');
                }

                return of(contact);
            })
        );
    }

    /**
     * Create contact
     */
    createContact(): Observable<any>
    {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<any>('api/apps/contacts/contact', {}).pipe(
                map((newContact) => {

                    // Update the contacts with the new contact
                    this._contacts.next([newContact, ...contacts]);

                    // Return the new contact
                    return newContact;
                })
            ))
        );
    }

    /**
     * Update contact
     *
     * @param id
     * @param contact
     */
    updateContact(idUsuario: number, contact: any): Observable<any>
    {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.patch<any>('api/apps/contacts/contact', {
                idUsuario,
                contact
            }).pipe(
                map((updatedContact) => {

                    // Find the index of the updated contact
                    const index = contacts.findIndex(item => item.idUsuario === idUsuario);

                    // Update the contact
                    contacts[index] = updatedContact;

                    // Update the contacts
                    this._contacts.next(contacts);

                    // Return the updated contact
                    return updatedContact;
                }),
                switchMap(updatedContact => this.contact$.pipe(
                    take(1),
                    filter(item => item && item.idUsuario === idUsuario),
                    tap(() => {

                        // Update the contact if it's selected
                        this._contact.next(updatedContact);

                        // Return the updated contact
                        return updatedContact;
                    })
                ))
            ))
        );
    }

    /**
     * Delete the contact
     *
     * @param id
     */
    deleteContact(idUsuario: number): Observable<boolean>
    {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.delete('api/apps/contacts/contact', {params: {idUsuario}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted contact
                    const index = contacts.findIndex(item => item.idUsuario === idUsuario);

                    // Delete the contact
                    contacts.splice(index, 1);

                    // Update the contacts
                    this._contacts.next(contacts);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Get countries
     */
    getCountries(): Observable<Country[]>
    {
        return this._httpClient.get<Country[]>('api/apps/contacts/countries').pipe(
            tap((countries) => {
                this._countries.next(countries);
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
     * Update the tag
     *
     * @param id
     * @param tag
     */
    updateTag(id: string, tag: Tag): Observable<Tag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.patch<Tag>('api/apps/contacts/tag', {
                id,
                tag
            }).pipe(
                map((updatedTag) => {

                    // Find the index of the updated tag
                    const index = tags.findIndex(item => item.id === id);

                    // Update the tag
                    tags[index] = updatedTag;

                    // Update the tags
                    this._tags.next(tags);

                    // Return the updated tag
                    return updatedTag;
                })
            ))
        );
    }

    /**
     * Delete the tag
     *
     * @param id
     */
    deleteTag(id: string): Observable<boolean>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this._httpClient.delete('api/apps/contacts/tag', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted tag
                    const index = tags.findIndex(item => item.id === id);

                    // Delete the tag
                    tags.splice(index, 1);

                    // Update the tags
                    this._tags.next(tags);

                    // Return the deleted status
                    return isDeleted;
                }),
                filter(isDeleted => isDeleted),
                switchMap(isDeleted => this.contacts$.pipe(
                    take(1),
                    map((contacts) => {

                        // Iterate through the contacts
                        contacts.forEach((contact) => {

                            const tagIndex = contact.tags.findIndex(tag => tag === id);

                            // If the contact has the tag, remove it
                            if ( tagIndex > -1 )
                            {
                                contact.tags.splice(tagIndex, 1);
                            }
                        });

                        // Return the deleted status
                        return isDeleted;
                    })
                ))
            ))
        );
    }

    /**
     * Update the avatar of the given contact
     *
     * @param id
     * @param avatar
     */
    uploadAvatar(idUsuario: number, avatar: File): Observable<any>
    {
        return this.contacts$.pipe(
            take(1),
            switchMap(contacts => this._httpClient.post<any>('api/apps/contacts/avatar', {
                idUsuario,
                avatar
            }, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedContact) => {

                    // Find the index of the updated contact
                    const index = contacts.findIndex(item => item.idUsuario === idUsuario);

                    // Update the contact
                    contacts[index] = updatedContact;

                    // Update the contacts
                    this._contacts.next(contacts);

                    // Return the updated contact
                    return updatedContact;
                }),
                switchMap(updatedContact => this.contact$.pipe(
                    take(1),
                    filter(item => item && item.idUsuario === idUsuario),
                    tap(() => {

                        // Update the contact if it's selected
                        this._contact.next(updatedContact);

                        // Return the updated contact
                        return updatedContact;
                    })
                ))
            ))
        );
    }
}
