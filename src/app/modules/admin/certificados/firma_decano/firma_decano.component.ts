import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'certificados-firma-decano',
    templateUrl    : './firma_decano.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificadosFirmaDecanoComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
