import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CarpetaService } from './carpeta.service';
import { fuseAnimations } from '@fuse/animations';
import { Carpeta } from 'app/modules/carpeta/carpeta.types';
import { environment } from 'environments/environment';

@Component({
    selector     : 'carpeta',
    templateUrl  : './carpeta.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CarpetaComponent
{
    carpeta: Carpeta;
    columns = ['title', 'detail'];
    rows: any;
    environment = environment.baseUrlStorage

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _carpetasService: CarpetaService, 
        private _activatedRoute: ActivatedRoute, 
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
        )
    {
    }

    /**
     * On init
     */
    ngOnInit(): void {    
        this._carpetasService.carpeta$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                // Update the counts
                this.carpeta = response;
                this.rows = [
                    {
                        id: 1,
                        title: 'Denominación Diploma',
                        detail: response.denominacion
                    },
                    {
                        id: 2,
                        title: 'Código Diploma',
                        detail: response.codigo_diploma
                    },
                    {
                        id: 3,
                        title: 'Fecha Emitido',
                        detail: response.fecha_colacion
                    },
                    {
                        id: 4,
                        title: 'Abreviatura grado/tÍtulo',
                        detail: response.diploma_obtenido,
                    },
                    {
                        id: 5,
                        title: 'Modalidad de Obtención',
                        detail: response.modalidadSustentancion
                    },
                    {
                        id: 6,
                        title: 'Registrado en el libro de títulos Nro.',
                        detail: response.nro_libro
                    },
                    {
                        id: 7,
                        title: 'Folio',
                        detail: response.folio
                    },
                    {
                        id: 8,
                        title: 'Registro de secretaria general Nro.',
                        detail: response.nro_registro
                    },
                    {
                        id: 9,
                        title: 'Resolución de otorgamiento',
                        detail: 'RCU N° '+response.nro_resolucion
                    },
                    {
                        id: 10,
                        title: 'Resolución de otorgamiento',
                        detail: 'O-ORIGINAL'
                    }
                
                ]

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
  
    }
    continue(){
        // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
        this._router.navigateByUrl('home');
    }
    

}
