import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'certificados-firma-uraa',
    templateUrl    : './firma_uraa.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificadosFirmaURAAComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
