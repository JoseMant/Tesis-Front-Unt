import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IndicadoresService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

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
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any>
    {
        // return this._httpClient.get('api/dashboards/project').pipe(
        return this._httpClient.get(environment.baseUrl + 'indicadores').pipe(
            tap((response: any) => {
                // response['gradosIndicador1'] = {
                //     overview: {
                //         '2016': {
                //             'ingresantes'  : 197,
                //             'egresados'    : 72,
                //             'indicador'    : 6
                //         },
                //         '2017': {
                //             'ingresantes'  : 214,
                //             'egresados'    : 75,
                //             'indicador'    : 3
                //         },
                //         '2018': {
                //             'ingresantes'  : 197,
                //             'egresados'    : 72,
                //             'indicador'    : 6
                //         }
                //     },
                //     labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                //     series  : {
                //         '2016': [
                //             {
                //                 name: 'Ingresantes',
                //                 type: 'line',
                //                 data: [37, 32, 39, 27, 18, 24, 20]
                //             },
                //             {
                //                 name: 'Egresados',
                //                 type: 'column',
                //                 data: [9, 8, 10, 12, 7, 11, 15]
                //             }
                //         ],
                //         '2017': [
                //             {
                //                 name: 'Ingresantes',
                //                 type: 'line',
                //                 data: [42, 28, 43, 34, 20, 25, 22]
                //             },
                //             {
                //                 name: 'Egresados',
                //                 type: 'column',
                //                 data: [11, 10, 8, 11, 8, 10, 17]
                //             }
                //         ],
                //         '2018': [
                //             {
                //                 name: 'Ingresantes',
                //                 type: 'line',
                //                 data: [37, 32, 39, 27, 18, 24, 20]
                //             },
                //             {
                //                 name: 'Egresados',
                //                 type: 'column',
                //                 data: [9, 8, 10, 12, 7, 11, 15]
                //             }
                //         ]
                //     }
                // }
                // console.log(response);
                this._data.next(response);
            })
        );
    }
}
