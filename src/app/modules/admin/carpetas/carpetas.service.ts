import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { CarpetasPagination, CarpetaInterface } from 'app/modules/admin/carpetas/carpetas.types';
import { environment } from 'environments/environment';
import { Resolucion } from 'app/modules/admin/masters/carpeta/cronogramas/cronogramas.types';

@Injectable({
    providedIn: 'root'
})
export class CarpetasService
{
    // Private
    // private _users: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<CarpetasPagination | null> = new BehaviorSubject(null);
    private _carpeta: BehaviorSubject<CarpetaInterface | null> = new BehaviorSubject(null);
    private _carpetas: BehaviorSubject<CarpetaInterface[] | null> = new BehaviorSubject(null);
    private _modalidades_sustentacion: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _programas_estudios: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _diplomas: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _resolucion: BehaviorSubject<any | null> = new BehaviorSubject(null);
    private _padron: BehaviorSubject<CarpetaInterface[] | null> = new BehaviorSubject(null);
    
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
     * Getter for pagination
     */
    get pagination$(): Observable<CarpetasPagination>
    {
        return this._pagination.asObservable();
    }

    /**
     * Getter for carpeta
     */
    get carpeta$(): Observable<CarpetaInterface>
    {
        return this._carpeta.asObservable();
    }

    /**
     * Getter for carpetas
     */
    get carpetas$(): Observable<CarpetaInterface[]>
    {
        return this._carpetas.asObservable();
    }
    get cleanCarpetas$(): Observable<CarpetaInterface[]>
    {
        this._carpetas.next([]);
        return this._carpetas.asObservable();
    }

    get modalidades_sustentacion$(): Observable<any> {
        return this._modalidades_sustentacion.asObservable();
    }

    get programas_estudios$(): Observable<any> {
        return this._programas_estudios.asObservable();
    }

    get diplomas$(): Observable<any> {
        return this._diplomas.asObservable();
    }

    get resolucion$(): Observable<any> {
        return this._resolucion.asObservable();
    }
    get padron$(): Observable<CarpetaInterface[]>
    {
        return this._padron.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    

    getModalidadesSustentacion(tipo_tramite_unidad: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'modalidad/carpeta/' + tipo_tramite_unidad).pipe(
            tap((response: any) => {
                this._modalidades_sustentacion.next(response);
            })
        );
    }

    getProgramasEstudios(): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'programas_estudios/carpeta').pipe(
            tap((response: any[]) => {
                this._programas_estudios.next(response);
            })
        );
    }

    getDiplomasByTipoTramiteUnidad(unidad: number, tipo_tramite_unidad: number, programa: number): Observable<any>
    {
        return this._httpClient.get(environment.baseUrl + 'diplomas/carpeta/' + unidad + "/" + tipo_tramite_unidad + "/" + programa).pipe(
            tap((response: any[]) => {
                this._diplomas.next(response);
            })
        );
    }
    
    getResolucion(resolucion: string): Observable<{ resolucion: Resolucion }>
    {
        return this._httpClient.get<{ resolucion: Resolucion }>(environment.baseUrl + 'resolucion/secretaria/' + resolucion).pipe(
            tap((response) => {
                console.log(response);
            })
        );
    }

    getCarpetasValidadosSecretaria(resolucion: number, page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>
    {
        return this._httpClient.get<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'grados/validados/secretaria/' + resolucion, {
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
                this._carpetas.next(response.data);
                this._resolucion.next(response.resolucion);
            })
        );
    }

    getCarpetasFirmaDecano(resolucion: number, page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>
    {
        return this._httpClient.get<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'grados/firma/decano/' + resolucion, {
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
                this._carpetas.next(response.data);
                this._resolucion.next(response.resolucion);
            })
        );
    }

    getCarpetasFirmasRector(resolucion: number, page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>
    {
        return this._httpClient.get<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'grados/firma/rector/' + resolucion, {
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
                this._carpetas.next(response.data);
                this._resolucion.next(response.resolucion);
            })
        );
    }

    getCarpetasFirmasSecretaria(resolucion: number, page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>
    {
        return this._httpClient.get<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'grados/firma/secretaria/' + resolucion, {
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
                this._carpetas.next(response.data);
                this._resolucion.next(response.resolucion);
            })
        );
    }

    getCarpetasPendientesImpresion(resolucion: number, page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>
    {
      return this._httpClient.get<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'grados/pendientes/impresion/' + resolucion, {
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
            this._carpetas.next(response.data);
            this._resolucion.next(response.resolucion);
        })
      );
    }

    getCarpetasFinalizadas(resolucion: number, page: number = 0, size: number = 100, sort: string = 'fecha', order: 'asc' | 'desc' | '' = 'desc', search: string = ''):
    Observable<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>
    {
        return this._httpClient.get<{ pagination: CarpetasPagination; data: CarpetaInterface[]; resolucion: Resolucion }>(environment.baseUrl + 'carpetas/finalizadas/' + resolucion, {
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
                this._carpetas.next(response.data);
                this._resolucion.next(response.resolucion);
            })
        );
    }
    /**
     * Get carpeta by id
     */
    getCarpetaById(id: number): Observable<CarpetaInterface>
    {
        console.log(this._carpetas.value);
        return this._carpetas.pipe(
            take(1),
            map((carpetas) => {
                // Find the carpeta
                // const carpeta = carpetas.find(item => item.idTramite === id) || null;
                const carpeta = JSON.parse( JSON.stringify(carpetas.find(item => item.idTramite === id) || null) )
                if (carpeta) {
                    carpeta.fut = environment.baseUrl + carpeta.fut;
                    if (carpeta.certificado_final) carpeta.certificado_final = environment.baseUrlStorage +  carpeta.certificado_final
                    if (carpeta.diploma_final && carpeta.idEstado_tramite==13) carpeta.diploma_final = environment.baseUrl +  carpeta.diploma_final
                    else if (carpeta.diploma_final) carpeta.diploma_final = environment.baseUrlStorage +  carpeta.diploma_final
                    if (carpeta.voucher) carpeta.voucher = environment.baseUrlStorage + carpeta.voucher;
                    if (carpeta.exonerado_archivo) carpeta.exonerado_archivo = environment.baseUrlStorage + carpeta.exonerado_archivo;
                    if (carpeta.requisitos) {
                        carpeta.requisitos.forEach(element => {
                            if (element.archivo) element.archivo = environment.baseUrlStorage + element.archivo;
                        });
                    }
                }
                
                // Update the carpeta
                this._carpeta.next(carpeta);
                
                // Return the carpeta
                return carpeta;
            }),
            switchMap((carpeta) => {

                if ( !carpeta )
                {
                    return throwError('Could not found carpeta with id of ' + id + '!');
                }

                return of(carpeta);
            })
        );
    }

    registrarLibro(resolucion: Resolucion): Observable<any>
    {
        return this.carpetas$.pipe(
            take(1),
            switchMap(carpetas => this._httpClient.put<any[]>(environment.baseUrl + 'grados/registrar/libro', {"idResolucion":resolucion}).pipe(
                map((updatedGrados) => {
                    console.log(updatedGrados);
                    // debugger;
                    // Update the messages with the new message
                    // this._carpetasService.getGradosValidados(0, 10, 'fecha', 'desc', query);
                    updatedGrados.forEach(element => {
                        // Find the index of the deleted product
                        const index = carpetas.findIndex(item => item.idTramite === element.idTramite);
        
                        // Delete the product
                        carpetas.splice(index, 1);
                    });
        
                    // Update the carpetas
                    this._carpetas.next(carpetas);
        
                    // Return the new message from observable
                    return carpetas;
                })
            ))
        );
    }
    updatePadronAprobados(filePadron: any): Observable<CarpetasService[]>
    {
        return this.padron$.pipe(
            take(1),
            switchMap(carnets => this._httpClient.post<CarpetasService[]>(environment.baseUrl + 'correccion/padron_sunedu', filePadron).pipe(
                map((updatedPadron) => {
                    console.log(updatedPadron);
                    
                    // Update the carnets
                    // this._padron.next(updatedPadron);

                    // Return the updated carnet
                    return updatedPadron;
                })
            ))
        );
    }
    firmaDecano(resolucion: Resolucion): Observable<any>
    {
        return this.carpetas$.pipe(
            take(1),
            switchMap(carpetas => this._httpClient.put<any[]>(environment.baseUrl + 'firmas/decano', {"idResolucion":resolucion}).pipe(
                map((updatedGrados) => {
                    console.log(updatedGrados);
                    // debugger;
                    // Update the messages with the new message
                    // this._carpetasService.getGradosValidados(0, 10, 'fecha', 'desc', query);
                    // updatedGrados.forEach(element => {
                    //     // Find the index of the deleted product
                    //     const index = carpetas.findIndex(item => item.idTramite === element.idTramite);
        
                    //     // Delete the product
                    //     carpetas.splice(index, 1);
                    // });
        
                    // Update the carpetas
                    this._carpetas.next(updatedGrados);
        
                    // Return the new message from observable
                    return updatedGrados;
                })
            ))
        );
    }

    firmaRector(resolucion: Resolucion): Observable<any>
    {
        return this.carpetas$.pipe(
            take(1),
            switchMap(carpetas => this._httpClient.put<any[]>(environment.baseUrl + 'firmas/rector', {"idResolucion":resolucion}).pipe(
                map((updatedGrados) => {
                    console.log(updatedGrados);
                    // debugger;
                    // Update the messages with the new message
                    // this._carpetasService.getGradosValidados(0, 10, 'fecha', 'desc', query);
                    // updatedGrados.forEach(element => {
                    //     // Find the index of the deleted product
                    //     const index = carpetas.findIndex(item => item.idTramite === element.idTramite);
        
                    //     // Delete the product
                    //     carpetas.splice(index, 1);
                    // });
        
                    // Update the carpetas
                    this._carpetas.next(updatedGrados);
        
                    // Return the new message from observable
                    return updatedGrados;
                })
            ))
        );
    }

    firmaSecretaria(resolucion: Resolucion): Observable<any>
    {
        return this.carpetas$.pipe(
            take(1),
            switchMap(carpetas => this._httpClient.put<any[]>(environment.baseUrl + 'firmas/secretaria', {"idResolucion":resolucion}).pipe(
                map((updatedGrados) => {
                    console.log(updatedGrados);
                    // debugger;
                    // Update the messages with the new message
                    // this._carpetasService.getGradosValidados(0, 10, 'fecha', 'desc', query);
                    // updatedGrados.forEach(element => {
                    //     // Find the index of the deleted product
                    //     const index = carpetas.findIndex(item => item.idTramite === element.idTramite);
        
                    //     // Delete the product
                    //     carpetas.splice(index, 1);
                    // });
        
                    // Update the carpetas
                    this._carpetas.next(updatedGrados);
        
                    // Return the new message from observable
                    return updatedGrados;
                })
            ))
        );
    }

    uploadDiplomas(fileDiplomas: any): Observable<CarpetaInterface[]>
    {
        return this.carpetas$.pipe(
            take(1),
            switchMap(carpetas => this._httpClient.post<CarpetaInterface[]>(environment.baseUrl + 'upload/diplomas', fileDiplomas).pipe(
                map((updatedCarpetas) => {
                    console.log(updatedCarpetas);
                    
                    // Update the carnets
                    this._carpetas.next(updatedCarpetas);

                    // Return the updated carnet
                    return updatedCarpetas;
                })
            ))
        );
    }

    finalizarTramites(resolucion: Resolucion): Observable<any>
    {
        return this.carpetas$.pipe(
            take(1),
            switchMap(carpetas => this._httpClient.post<any[]>(environment.baseUrl + 'carpetas/finalizar', {"idResolucion":resolucion}).pipe(
                map((updatedGrados) => {
                    console.log(updatedGrados);
                    // debugger;
                    // Update the messages with the new message
                    // this._carpetasService.getGradosValidados(0, 10, 'fecha', 'desc', query);
                    updatedGrados.forEach(element => {
                        // Find the index of the deleted product
                        const index = carpetas.findIndex(item => item.idTramite === element.idTramite);
        
                        // Delete the product
                        carpetas.splice(index, 1);
                    });
        
                    // Update the carpetas
                    this._carpetas.next(carpetas);
        
                    // Return the new message from observable
                    return carpetas;
                })
            ))
        );
    }

    editCodigoDiploma(carpeta: CarpetaInterface, apply: boolean): Observable<any>
    {
        return this.carpetas$.pipe(
            take(1),
            switchMap(carpetas => this._httpClient.put<any[]>(environment.baseUrl + 'create/codigo', {
                "grado":carpeta,
                "flag": apply
            }).pipe(
                map((updatedGrados) => {
                    // console.log(updatedGrados);
                    // Update the messages with the new message
                    updatedGrados.forEach(element => {
                        // Find the index of the deleted product
                        const index = carpetas.findIndex(item => item.idTramite === element.idTramite);

                        // Delete the product
                        // carpetas.splice(index, 1);
                        carpetas[index] = element;

                    });

                    // Update the carpetas
                    this._carpetas.next(carpetas);

                    // Return the new message from observable
                    return carpetas;
                })
            ))
        );
    }
}
