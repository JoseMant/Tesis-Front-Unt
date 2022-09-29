import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { UserInterface, ConstanciaPagination, ConstanciaInterface } from 'app/modules/admin/constancias/constancias.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConstanciasService
{
    // Private
    private _users: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<ConstanciaPagination | null> = new BehaviorSubject(null);
    private _constancia: BehaviorSubject<ConstanciaInterface | null> = new BehaviorSubject(null);
    private _constancias: BehaviorSubject<ConstanciaInterface[] | null> = new BehaviorSubject(null);
    // private _allconstancias: BehaviorSubject<ConstanciaInterface[] | null> = new BehaviorSubject(null);

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
     * Getter for users
     */
     get users$(): Observable<UserInterface[]>
     {
         return this._users.asObservable();
     }
     
     /**
     * Getter for pagination
     */
    get pagination$(): Observable<ConstanciaPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for constancia
     */
    get constancia$(): Observable<ConstanciaInterface>
    {
        return this._constancia.asObservable();
    }

    /**
     * Getter for constancias
     */
    get constancias$(): Observable<ConstanciaInterface[]>
    {
        return this._constancias.asObservable();
    }

    /**
     * Getter for constancias
     */
    // get allconstancias$(): Observable<ConstanciaInterface[]>
    // {
    //     return this._allconstancias.asObservable();
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Get users
     */
    getUsers(): Observable<UserInterface[]>
    {
        return this._httpClient.get<UserInterface[]>(environment.baseUrl + 'usuario/uraa').pipe(
            tap((users) => {
                console.log(users);
                this._users.next(users);
            })
        );
    }
    
     
     getConstanciasAsignados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: ConstanciaPagination; data: ConstanciaInterface[] }>
    {
      return this._httpClient.get<{ pagination: ConstanciaPagination; data: ConstanciaInterface[] }>(environment.baseUrl + 'tramite/constancias/asignados', {
        params: {
            page: '' + page,
            size: '' + size,
            sort,
            order,
            search
        }
    }).pipe(
        tap((response) => {
          console.log(response);
          this._pagination.next(response.pagination);
          this._constancias.next(response.data);
        })
      );
    }

    // getConstanciasAprobados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    // Observable<{ pagination: ConstanciaPagination; data: ConstanciaInterface[] }>
    // {
    //   return this._httpClient.get<{ pagination: ConstanciaPagination; data: ConstanciaInterface[] }>(environment.baseUrl + 'tramite/constancias/aprobados', {
    //     params: {
    //         page: '' + page,
    //         size: '' + size,
    //         sort,
    //         order,
    //         search
    //     }
    // }).pipe(
    //     tap((response) => {
    //       console.log(response);
    //       this._pagination.next(response.pagination);
    //       this._constancias.next(response.data);
    //     })
    //   );
    // }

    getConstanciasValidados(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: ConstanciaPagination; data: ConstanciaInterface[] }>
    {
      return this._httpClient.get<{ pagination: ConstanciaPagination; data: ConstanciaInterface[] }>(environment.baseUrl + 'tramite/constancias/validados', {
        params: {
            page: '' + page,
            size: '' + size,
            sort,
            order,
            search
        }
    }).pipe(
        tap((response) => {
          console.log(response);
          this._pagination.next(response.pagination);
          this._constancias.next(response.data);
        })
      );
    }


    /**
     * Get tramites
     */
    //  getAllConstancias(): Observable<ConstanciaInterface[]>
    // {
    //    return this._httpClient.get<ConstanciaInterface[]>(environment.baseUrl + 'tramite/constancias').pipe(
    //         tap((response) => {
    //             console.log(response);
    //             this._constancias.next(response);
    //         })
    //     );
    // }

    /**
     * Get constancia by id
     */
    getConstanciaById(id: number): Observable<ConstanciaInterface>
    {
        return this._constancias.pipe(
            take(1),
            map((constancias) => {
                console.log(constancias);

                // // Find the constancia
                // const constancia = constancias.find(item => item.idTramite === id) || null;
                // console.log(constancia);
                // // Update the constancia
                // this._constancia.next(constancia);
                // // Return the constancia
                // return constancia;



                // Find the constancia
                // const constancia = constancias.find(item => item.idTramite === id) || null;
                const constancia = JSON.parse( JSON.stringify(constancias.find(item => item.idTramite === id) || null) )
                constancia.fut = environment.baseUrlStorage + constancia.fut;
                constancia.voucher = environment.baseUrlStorage + constancia.voucher;
                // if (constancia.constancia_final) {
                //     constancia.constancia_final = environment.baseUrlStorage + constancia.constancia_final;
                // }
                // constancia.requisitos.forEach(element => {
                //     if (element.archivo) {
                //         element.archivo = environment.baseUrlStorage + element.archivo;
                //     }
                // });
                console.log(constancia);
                // Update the constancia
                this._constancia.next(constancia);
                // Return the constancia
                return constancia;
            }),
            switchMap((constancia) => {

                if ( !constancia )
                {
                    return throwError('Could not found constancia with id of ' + id + '!');
                }

                return of(constancia);
            })
        );
    }

    /**
     * Update constancia
     *
     * @param id
     * @param constancia
     */
    updateConstancia(id: number, constancia: ConstanciaInterface): Observable<ConstanciaInterface>
    {
        return this.constancias$.pipe(
            take(1),
            switchMap(constancias => this._httpClient.patch<ConstanciaInterface>(environment.baseUrl + 'constancia/' + id, constancia).pipe(
                map((updatedConstancia) => {
                    console.log(updatedConstancia);
                    // Find the index of the updated constancia
                    const index = constancias.findIndex(item => item.idTramite === id);

                    // Update the constancia
                    constancias.splice(index, 1);

                    // Update the constancias
                    this._constancias.next(constancias);

                    // Return the updated constancia
                    return updatedConstancia;
                })
            ))
        );
    }

    /**
     * Update product
     *
     * @param id
     * @param product
     */
     asignarUsuarioConstancias(data: any): Observable<any[]>
     {
         return this.constancias$.pipe(
             take(1),
             switchMap(constancias => this._httpClient.post<any[]>(environment.baseUrl + 'tramite/asignar', data).pipe(
                 map((updatedConstancias) => {
 
                     // Update the messages with the new message
                     // this._constanciasService.getConstanciasValidados(0, 10, 'fecha', 'desc', query);
                     updatedConstancias.forEach(element => {
                         // Find the index of the deleted product
                         const index = constancias.findIndex(item => item.idTramite === element);
 
                         // Delete the product
                         constancias.splice(index, 1);
                     });
 
                     // Update the constancias
                     this._constancias.next(constancias);
 
                     // Return the new message from observable
                     return constancias;
                 })
             ))
         );
     }

     uploadConstancia(id: number, tramite: any): Observable<any>
     {
         console.log(tramite.getAll);
         return this.constancias$.pipe(
             take(1),
             switchMap(constancias => this._httpClient.post<any>(environment.baseUrl + 'constancias/upload/'+ id, tramite).pipe(
                 map((updatedConstancia) => {
                     console.log(updatedConstancia);
                     // Find the index of the updated constancia
                     const index = constancias.findIndex(item => item.idTramite === id);
                     
                     // Update the constancia
                     constancias.splice(index, 1);
 
                     // Update the constancias
                     this._constancias.next(constancias);
 
                     // Return the updated constancia
                     return updatedConstancia;
                 }),
                 switchMap(updatedConstancia => this.constancia$.pipe(
                     take(1),
                     filter(item => item && item.idTramite === id),
                     tap(() => {
 
                         updatedConstancia.fut = environment.baseUrl + updatedConstancia.fut;
                         updatedConstancia.voucher = environment.baseUrlStorage + updatedConstancia.voucher;
                         updatedConstancia.constancia_final = environment.baseUrlStorage + updatedConstancia.constancia_final;
                         updatedConstancia.requisitos.forEach(element => {
                             if (element.archivo) {
                                 element.archivo = environment.baseUrlStorage + element.archivo;
                             }
                         });
 
                         // Update the constancia if it's selected
                         this._constancia.next(updatedConstancia);
 
                         // Return the updated constancia
                         return updatedConstancia;
                     })
                 ))
             ))
         );
     }

     enviarConstancia(id: number): Observable<any>
     {
         console.log(id);
         return this.constancias$.pipe(
             take(1),
             switchMap(constancias => this._httpClient.get<any>(environment.baseUrl + 'constancias/enviar/'+ id).pipe(
                 map((updatedConstancia) => {
                     console.log(constancias);
                     // Find the index of the updated constancia
                     const index = constancias.findIndex(item => item.idTramite === id);
                     
                     // Update the constancia
                     constancias.splice(index, 1);
 
                     // Update the constancias
                     this._constancias.next(constancias);
 
                     // Return the updated constancia
                     return updatedConstancia;
                 }),
                 switchMap(updatedConstancia => this.constancia$.pipe(
                     take(1),
                     filter(item => item && item.idTramite === id),
                     tap(() => {
 
                         updatedConstancia.fut = environment.baseUrl + updatedConstancia.fut;
                         updatedConstancia.voucher = environment.baseUrlStorage + updatedConstancia.voucher;
                         updatedConstancia.constancia_final = environment.baseUrlStorage + updatedConstancia.constancia_final;
                        //  updatedConstancia.requisitos.forEach(element => {
                        //      if (element.archivo) {
                        //          element.archivo = environment.baseUrlStorage + element.archivo;
                        //      }
                        //  });
 
                         // Update the constancia if it's selected
                         this._constancia.next(updatedConstancia);
 
                         // Return the updated constancia
                         return updatedConstancia;
                     })
                 ))
             ))
         );
     }

    getConstanciasFirmaURAA(page: number = 0, size: number = 10, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: ConstanciaPagination; data: ConstanciaInterface[] }>
    {
      return this._httpClient.get<{ pagination: ConstanciaPagination; data: ConstanciaInterface[] }>(environment.baseUrl + 'tramite/constancias/firma_uraa', {
        params: {
            page: '' + page,
            size: '' + size,
            sort,
            order,
            search
        }
    }).pipe(
        tap((response) => {
          this._pagination.next(response.pagination);
          this._constancias.next(response.data);
        })
      );
    }
}
